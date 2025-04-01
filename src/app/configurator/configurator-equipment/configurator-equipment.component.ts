import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { IColor, IConfigurator, IEngine, ISelectConfigurator, ITransmissionType } from '../../../models/configurator.interface';
import { Router } from '@angular/router';
import { configurator } from '../../../services/configurator.service';
import { forkJoin } from 'rxjs';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-configurator-equipment',
  standalone:true,
  imports: [CommonModule,NavbarComponent,ConfiguratorFooterComponent, TranslatePipe],
  templateUrl: './configurator-equipment.component.html',
  styleUrl: './configurator-equipment.component.css'
})
export class ConfiguratorEquipmentComponent {
    configurators: IConfigurator[] = [];
    colors: IColor[] = [];
    engines: IEngine[] = [];
    transmissionTypes: ITransmissionType[] = [];
    cardImages: { [key: number]: string } = {};
    config: ISelectConfigurator[] = []
  
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

    navigateToColor(): void {
      this.router.navigate(['/configColor'])
    }
  
    filterSpecificConfigurations(ids: number[]): void {
      this.configurators = this.configurators.filter(config => ids.includes(config.id));
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
  

    getCredit(price: number): number {
      return this.configurator.getCredit(price);
    }

    selectConfiguration(config: ISelectConfigurator) {
      this.configurator.setConfigName(config.configName);
      this.configurator.setEngine(config.engine_Id);
      this.configurator.setTransmission(config.transmissionType_Id);
      this.configurator.setPrice(config.price);
    }
}
