import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ConfiguratorService } from '../../../services/configurator.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IColor, IEngine, IPopularConfigs, ITransmissionType } from '../../../models/configurator.interface';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-configurator-pre-compiled',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ConfiguratorFooterComponent, TranslatePipe],
  templateUrl: './configurator-pre-compiled.component.html',
  styleUrls: ['./configurator-pre-compiled.component.css']
})
export class ConfiguratorPreCompiledComponent implements OnInit {
  popularConfigs: IPopularConfigs[] = [];
  colors: IColor[] = [];
  engines: IEngine[] = [];
  transmissionTypes: ITransmissionType[] = [];
  cardImages: { [key: number]: string } = {};

  constructor(
    private router: Router,
    private configuratorService: ConfiguratorService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      configs: this.configuratorService.getPopularConfigs(),
      colors: this.configuratorService.getColors(),
      engines: this.configuratorService.getEngines(),
      transmissionTypes: this.configuratorService.getTransmissionTypes()
    }).subscribe({
      next: (results) => {
        this.popularConfigs = results.configs;
        this.colors = results.colors;
        this.engines = results.engines;
        this.transmissionTypes = results.transmissionTypes;
        this.loadCardImages();
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  loadCardImages(): void {
    this.popularConfigs.forEach(config => {
      this.configuratorService.getConfiguratorImage(config.id).subscribe({
        next: (imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.cardImages[config.id] = objectURL;
        },
        error: (error) => {
          console.error(`Hiba a kép lekérdezése során (ID: ${config.id}):`, error);
        }
      });
    });
  }

  selectConfig(config: IPopularConfigs): void {
    const currentSelected = this.configuratorService.getSelectedConfig();
    if (currentSelected === config) {
      this.configuratorService.clearSelectedConfig();
    } else {
      this.configuratorService.setSelectedConfig(config);
    }
  }

  getButtonText(config: IPopularConfigs): string {
    return this.configuratorService.getSelectedConfig() === config ? 'Kiválasztva' : 'Kiválasztás';
  }

  isConfigSelected(config: IPopularConfigs): boolean {
    return this.configuratorService.getSelectedConfig() === config;
  }

  getEngineData(engineId: number): IEngine | undefined {
    return this.engines.find(e => e.id === engineId);
  }

  getColorData(colorId: number): IColor | undefined {
    return this.colors.find(c => c.id === colorId);
  }

  getTransmissionData(transmissionId: number): ITransmissionType | undefined {
    return this.transmissionTypes.find(t => t.id === transmissionId);
  }
}