import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { ConfiguratorService } from '../../../services/configurator.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-configurator-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent, TranslatePipe],
  templateUrl: './configurator-main.component.html',
  styleUrls: ['./configurator-main.component.css']
})
export class ConfiguratorMainComponent implements OnInit {
  cardImage: string = '';

  constructor(
    private router: Router,
    private configuratorService: ConfiguratorService
  ) {}

  ngOnInit(): void {
    this.loadMainImage();
  }

  navigateToCar(): void {
    this.configuratorService.setConfigName('Golf'); // Modell nevének beállítása
    this.router.navigate(['/configPreComp']); // Második lépéshez navigálás
  }

  private loadMainImage(): void {
    this.configuratorService.getGolfMainImage().subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.cardImage = objectURL;
        console.log('Kép URL:', this.cardImage);
      },
      error: (error) => {
        console.error('Hiba a fő kép lekérdezése során:', error);
      }
    });
  }
}