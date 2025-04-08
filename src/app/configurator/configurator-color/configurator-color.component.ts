import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ConfiguratorService } from '../../../services/configurator.service';
import { IColor } from '../../../models/configurator.interface';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-configurator-color',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ConfiguratorFooterComponent, TranslatePipe],
  templateUrl: './configurator-color.component.html',
  styleUrls: ['./configurator-color.component.css']
})
export class ConfiguratorColorComponent implements OnInit {
  colors: IColor[] = [];
  cardImages: { [key: number]: string } = {};
  selectedColorId: number | null = null;

  constructor(private configuratorService: ConfiguratorService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.configuratorService.getColors().subscribe({
      next: (colors) => {
        this.colors = colors;
        this.loadCardImages();
        const currentConfig = this.configuratorService.getConfig();
        if (currentConfig.color_Id) {
          this.selectedColorId = currentConfig.color_Id;
        }
      },
      error: (err) => {
        console.error('Hiba a színek betöltésekor:', err);
      }
    });
  }

  loadCardImages(): void {
    this.colors.forEach(color => {
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

  selectConfiguration(color: IColor): void {
    this.selectedColorId = color.id;
    this.configuratorService.setColor(color.id, color.price);
  }

  getColorCodes(colorId: number | null): string | undefined {
    const foundColor = this.colors.find(color => color.id === colorId);
    return foundColor?.colorCode;
  }

  getColorName(colorId: number | null): string | undefined {
    const foundColor = this.colors.find(color => color.id === colorId);
    return foundColor?.name;
  }
}