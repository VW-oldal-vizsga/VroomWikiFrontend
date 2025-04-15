import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from '../../../services/configurator.service';
import { IColor, IConfigurator, IConfiguratorPut, IEngine, IPopularConfigs, ITransmissionType } from '../../../models/configurator.interface';
import { config, forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-configurator-ready-to-buy',
  imports: [NavbarComponent, ConfiguratorFooterComponent, CommonModule, IonicModule],
  templateUrl: './configurator-ready-to-buy.component.html',
  styleUrl: './configurator-ready-to-buy.component.css'
})
export class ConfiguratorReadyToBuyComponent {
  configurator: IConfiguratorPut [] = []
  popularConfig: IPopularConfigs [] = []
  secondColor:IColor[] = []
  maxIdConfigurators: IConfiguratorPut[] = [];
  maxId: number | null = this.maxKereses()
  selectedColor: string | null = localStorage.getItem('selectedColor')
  selectedColorNumber = Number(this.selectedColor)
  colors: IColor[] = [];
  engines: IEngine[] = [];
  transmissionType: ITransmissionType[] = []
  cardImages: { [key: number]: string } = {};

  constructor (private configuratorService: ConfiguratorService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      configs: this.configuratorService.getConfigurators(),
      colors: this.configuratorService.getColors(),
      engines: this.configuratorService.getEngines(),
      transmissionTypes: this.configuratorService.getTransmissionTypes(),
    }).subscribe({
      next: (results) => {
        this.configurator = results.configs;
        this.colors = results.colors;
        this.engines = results.engines;
        this.transmissionType = results.transmissionTypes;
        this.loadCardImages();
        this.storeMaxIdConfigurator()
        this.setSecondColor()
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  loadCardImages(): void {
    this.configuratorService.getConfiguratorColorImage(Number(this.selectedColor)).subscribe({
      next: (imageBlob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.cardImages[Number(this.selectedColor)] = objectURL;
        
      },
      error: (error) => {
        console.error(`Hiba a kép lekérdezése során (ID: ${Number(this.selectedColor)}):`, error);
      }
    });
  }

  getEngineData(engineId: number): IEngine | undefined {
    return this.engines.find(e => e.id === engineId);
  }

  getColorData(colorId: number): IColor | undefined {
    return this.colors.find(c => c.id === colorId);
  }

  getTransmissionTypeData(transmissionTypeId:number): ITransmissionType | undefined {
    return this.transmissionType.find(t => t.id === transmissionTypeId)
  }

  maxKereses(): number | null {
    if (this.configurator.length === 0) {
        return null;
    }
    
    let maxElem: number | null = null;
    for (const elem of this.configurator) {
        if (elem.id !== undefined && elem.id !== null) {
            if (maxElem === null || elem.id > maxElem) {
                maxElem = elem.id;
            }
        }
    }
    
    return maxElem;
  }

  getConfiguratorByMaxId(): IConfiguratorPut | null {
    const maxId = this.maxKereses();
    
    if (maxId === null) {
        return null;
    }
    
    const foundConfig = this.configurator.find(elem => elem.id === maxId);
    
    return foundConfig || null;
  }

  storeMaxIdConfigurator(): void {
    const maxConfig = this.getConfiguratorByMaxId();
    if (maxConfig !== null) {
      this.maxIdConfigurators = [maxConfig];

    }
  }

  getCredit(price: number): number {
    return this.configuratorService.getCredit(price);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  navigateToMainAndDelete() {
    this.router.navigate(['/configuratorMain'])
    this.configuratorService.deleteConfigurators(this.maxId)
  }

  secondColorData(colorId: number): IColor | undefined {
    return this.colors.find(c => c.id === colorId);
  }

  setSecondColor(): void {
    if (this.selectedColorNumber) {
      const color = this.secondColorData(this.selectedColorNumber);
      if (color) {
        this.secondColor = [color];
      }
    }
  }
}
