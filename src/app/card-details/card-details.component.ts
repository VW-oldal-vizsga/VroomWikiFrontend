import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ICard } from '../../models/oldModels.interface';
import { oldModelsService } from '../../services/oldModelsService.service';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  cardData: ICard[] = [];
  selectedCard: ICard | undefined;
  selectedCardImage: string | undefined; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oldModelsService: oldModelsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id !== null) {
        const numericId = parseInt(id, 10);

        this.oldModelsService.getOldModelsById(numericId).subscribe({
          next: (data) => {
            this.cardData = data;

            this.selectedCard = this.cardData.find(c => c.id === numericId);
            if (!this.selectedCard) {
              console.warn(`Nincs találat az id-vel: ${numericId}`);
            } else {
              // Ha a kártya megtalálható, lekérjük a képét
              this.getCardImage(numericId);
            }
          },
          error: (error) => {
            console.error('Hiba a modellek lekérdezése során:', error);
          }
        });
      }
    });
  }

  // Új metódus a kép lekérésére
  private getCardImage(id: number): void {
    this.oldModelsService.getOldModelsImage(id).subscribe({
      next: (imageBlob) => {
        const objectURL = URL.createObjectURL(imageBlob);
        this.selectedCardImage = objectURL;
      },
      error: (error) => {
        console.error('Hiba a kép lekérdezése során:', error);
      }
    });
  }
  
  

  navigateToDetail() {
    this.router.navigate(['/oldmodels']);
  }
}
