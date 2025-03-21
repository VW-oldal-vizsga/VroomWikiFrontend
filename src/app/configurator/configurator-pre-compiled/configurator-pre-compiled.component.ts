import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { configurator } from '../../../services/configurator.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { IColor, IConfigurator, IEngine, ITransmissionType } from '../../../models/configurator.interface';

@Component({
  selector: 'app-configurator-pre-compiled',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configurator-pre-compiled.component.html',
  styleUrl: './configurator-pre-compiled.component.css'
})
export class ConfiguratorPreCompiledComponent {

  configurators: IConfigurator[] = [];
  colors: IColor[] = [];
  engines: IEngine[] = [];
  transmissionTypes: ITransmissionType[] = [];
  cardImages: { [key: number]: string } = {};
  configuratorGroups: IConfigurator[][] = [];
  selectedConfigs: IConfigurator[] = []; // Új tömb a kiválasztott konfigurációk tárolására

  constructor(private router: Router, private configurator: configurator) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      configurators: this.configurator.getConfigurators(),
      colors: this.configurator.getColors(),
      engines: this.configurator.getEngines(),
      transmissionTypes: this.configurator.getTransmissionTypes(),
    }).subscribe({
      next: (results) => {
        this.configurators = results.configurators;
        this.colors = results.colors;
        this.engines = results.engines;
        this.transmissionTypes = results.transmissionTypes;
        this.loadCardImages();
        this.filterSpecificConfigurations([2, 3, 4, 5]);
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  navigateToCar(): void {
    this.router.navigate(['/configPreComp']);
  }

  filterSpecificConfigurations(ids: number[]): void {
    this.configuratorGroups = [this.configurators.filter(config => ids.includes(config.id))];
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

  private loadCardImages(): void {
    this.configurators.forEach(config => {
      this.configurator.getConfiguratorImage(config.id).subscribe({
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

  getButtonText(item: IConfigurator): string {
    return this.selectedConfigs.some(c => c.id === item.id) ? 'Kiválasztva' : 'Kiválasztás';
  }

  selectConfig(config: IConfigurator): void {
    const index = this.selectedConfigs.findIndex(c => c.id === config.id);
    if (index === -1) {
      this.selectedConfigs.push(config);
      console.log(`Hozzáadva: ${config.configName}`, this.selectedConfigs);
    } else {
      this.selectedConfigs.splice(index, 1);
      console.log(`Eltávolítva: ${config.configName}`, this.selectedConfigs);
    }
  }

  isConfigSelected(item: IConfigurator): boolean {
    return this.selectedConfigs.some(c => c.id === item.id);
  }
}
