import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';
import { configurator } from '../../../services/configurator.service';

@Component({
  selector: 'app-configurator-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configurator-main.component.html',
  styleUrls: ['./configurator-main.component.css']
})
export class ConfiguratorMainComponent implements OnInit {
  cardImage: string = '';

  constructor(
    private router: Router,
    private configurator: configurator,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadMainImage();
  }

  navigateToCar(): void {
    this.router.navigate(['/configPreComp']);
  }

  private loadMainImage(): void {
    this.configurator.getGolfMainImage().subscribe({
      next: (imageBlob: Blob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.cardImage = objectURL;
        this.cdr.detectChanges(); 
        console.log('Kép URL:', this.cardImage); 
      },
      error: (error) => {
        console.error('Hiba a fő kép lekérdezése során:', error);
      }
    });
  }
}