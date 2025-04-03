import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { configurator } from '../../../services/configurator.service';
import { IColor, IConfigurator, ISelectConfigurator } from '../../../models/configurator.interface';
import { forkJoin } from 'rxjs';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ColorService } from '../../../services/color.service';

@Component({
  selector: 'app-configurator-color',
  standalone:true,
  imports: [NavbarComponent,CommonModule, ConfiguratorFooterComponent, TranslatePipe],
  templateUrl: './configurator-color.component.html',
  styleUrl: './configurator-color.component.css'
})
export class ConfiguratorColorComponent {
  configurators: IConfigurator[] = [];
  colors: IColor[] = [];
  cardImages: { [key: number]: string } = {};
  selectedColorId: number | null = null;
  config: ISelectConfigurator[] = []

  constructor(private configurator: configurator,private colorService: ColorService) {}

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
        this.colorService.getColors().subscribe(colors => {
          this.colors = colors;
        });
        
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  private loadCardImages(): void {
    this.colors.forEach(color => {
      this.configurator.getConfiguratorColorImage(color.id).subscribe({
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

  

  selectColor(colorId: number) {
    this.selectedColorId = colorId;
  }

  selectConfiguration(colorId: number) {
    this.configurator.setColor(colorId)
    this.selectColor(colorId)
  }


  getColorCodes(colorId: number | null): string | undefined {
    const foundColor = this.colors.find(color => color.id === colorId);
    return foundColor ? foundColor.colorCode : undefined;
  }

  getColorName(colorId: number | null): string | undefined {
    const foundName = this.colors.find(color => color.id === colorId)
    return foundName ? foundName.name : undefined;
  }

  changeColor(color: IColor) {
    this.colorService.changeColor(color);
  }
}
