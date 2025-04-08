import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ConfiguratorService } from '../../../services/configurator.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IColor, IConfigurator, IEngine, ITransmissionType } from '../../../models/configurator.interface';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-configurator-equipment',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ConfiguratorFooterComponent, TranslatePipe],
  templateUrl: './configurator-equipment.component.html',
  styleUrls: ['./configurator-equipment.component.css']
})
export class ConfiguratorEquipmentComponent implements OnInit {
  configurators: IConfigurator[] = [];
  colors: IColor[] = [];
  engines: IEngine[] = [];
  transmissionTypes: ITransmissionType[] = [];
  cardImages: { [key: number]: string } = {};
  selectedConfig: IConfigurator | null = null;

  constructor(
    private router: Router,
    private configuratorService: ConfiguratorService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      configurators: this.configuratorService.getConfigurators(),
      engines: this.configuratorService.getEngines(),
      transmissionTypes: this.configuratorService.getTransmissionTypes()
    }).subscribe({
      next: (results) => {
        this.configurators = results.configurators;
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
    this.configurators.forEach(config => {
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

  selectConfiguration(config: IConfigurator): void {
    if (this.selectedConfig === config) {
      this.selectedConfig = null;
      this.configuratorService.setConfigName('');
      this.configuratorService.setEngine(0);
      this.configuratorService.setTransmission(0);
      this.configuratorService.setPrice(0);
    } else {
      this.selectedConfig = config;
      this.configuratorService.setConfigName(config.configName);
      this.configuratorService.setEngine(config.engine_Id);
      this.configuratorService.setTransmission(config.transmissionType_Id);
      this.configuratorService.setPrice(config.price);
    }
  }

  getButtonText(item: IConfigurator): string {
    return this.selectedConfig === item ? 'Kiválasztva' : 'Kiválasztás';
  }

  isConfigSelected(item: IConfigurator): boolean {
    return this.selectedConfig === item;
  }

  getEngineData(engineId: number): IEngine | undefined {
    return this.engines.find(e => e.id === engineId);
  }

  getTransmissionData(transmissionId: number): ITransmissionType | undefined {
    return this.transmissionTypes.find(t => t.id === transmissionId);
  }

  getCredit(price: number): number {
    return this.configuratorService.getCredit(price);
  }
}