import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { configurator } from '../../../services/configurator.service';
import { IColor, IConfigurator } from '../../../models/configurator.interface';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-configurator-color',
  standalone:true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './configurator-color.component.html',
  styleUrl: './configurator-color.component.css'
})
export class ConfiguratorColorComponent {
  configurators: IConfigurator[] = [];
  colors: IColor[] = [];
  cardImages: { [key: number]: string } = {};
  selectedColorId: number | null = null;

  constructor(private router: Router, private configurator: configurator) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      configurators: this.configurator.getConfigurators(),
      colors: this.configurator.getColors(),

    }).subscribe({
      next: (results) => {
        this.configurators = results.configurators;
        this.colors = results.colors;
        this.loadCardImages()
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
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

  selectColor(colorId: number) {
    this.selectedColorId = colorId;
  }


}
