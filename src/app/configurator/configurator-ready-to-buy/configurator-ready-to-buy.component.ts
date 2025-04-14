import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { CommonModule } from '@angular/common';
import { ConfiguratorService } from '../../../services/configurator.service';
import { IColor, IConfigurator, IConfiguratorPut, IPopularConfigs } from '../../../models/configurator.interface';
import { config, forkJoin } from 'rxjs';

@Component({
  selector: 'app-configurator-ready-to-buy',
  imports: [NavbarComponent, ConfiguratorFooterComponent, CommonModule],
  templateUrl: './configurator-ready-to-buy.component.html',
  styleUrl: './configurator-ready-to-buy.component.css'
})
export class ConfiguratorReadyToBuyComponent {
  configurator: IConfigurator [] = []
  popularConfig: IPopularConfigs [] = []
  colors: IColor[] = [];
  cardImages: { [key: number]: string } = {};

  constructor (private configuratorService: ConfiguratorService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      configs: this.configuratorService.getConfigurators(),
      colors: this.configuratorService.getColors(),
      engines: this.configuratorService.getEngines(),
      transmissionTypes: this.configuratorService.getTransmissionTypes()
    }).subscribe({
      next: (results) => {
        this.configurator = results.configs;
        this.colors = results.colors;
        this.loadCardImages();
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  loadCardImages(): void {
    this.configurator.forEach(color => {
      this.configuratorService.getConfiguratorColorImage(color.id).subscribe({
        next: (imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.cardImages[color.id] = objectURL;
        },
        error: (error) => {
          console.error(`Hiba a kép lekérdezése során (ID: ${color.id}):`, error);
        }
      });
    });
  }
}
