import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ICard } from '../../models/oldModels.interface';
import { oldModelsService } from '../../services/oldModelsService.service';

@Component({
  selector: 'app-oldmodels',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './oldmodels.component.html',
  styleUrls: ['./oldmodels.component.css'] 
})
export class OldmodelsComponent implements OnInit, OnDestroy {
  cardData: ICard[] = [];
  cardImages: { [key: number]: string } = {};

  constructor(private router: Router, private oldModelsService: oldModelsService) {}

  navigateToDetail(id: number) {
    this.router.navigate(['/cards', id]);
  }

  ngOnInit(): void {
    this.oldModelsService.getOldModels().subscribe({
      next: (data) => {
        this.cardData = data;
        // Fetch images for all cards
        this.loadCardImages();
      },
      error: (error) => {
        console.error('Hiba a lekérdezés során:', error); // "Error during query"
      }
    });
  }

  private loadCardImages(): void {
    this.cardData.forEach(card => {
      this.oldModelsService.getOldModelsImage(card.id).subscribe({
        next: (imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.cardImages[card.id] = objectURL; // Store image URL by card ID
        },
        error: (error) => {
          console.error(`Hiba a kép lekérdezése során (ID: ${card.id}):`, error); // "Error during image query"
        }
      });
    });
  }

  ngOnDestroy(): void {
    // Clean up object URLs to prevent memory leaks
    Object.values(this.cardImages).forEach(url => URL.revokeObjectURL(url));
  }
}