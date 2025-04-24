import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ICard } from '../../models/oldModels.interface';
import { oldModelsService } from '../../services/oldModelsService.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [NavbarComponent, CommonModule, TranslatePipe],
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
    private oldModelsService: oldModelsService,
    private translate: TranslateService
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

  getDescription(item: any) {
    switch (this.translate.currentLang) {
      case 'hu':
        return item.descriptionHU;
      case 'en':
        return item.descriptionEN;
      case 'de':
        return item.descriptionDE;
      default:
        return item.descriptionHU;
    }
  }
  getDesign(item: any) {
    switch (this.translate.currentLang) {
      case 'hu':
        return item.designHU;
      case 'en':
        return item.designEN;
      case 'de':
        return item.designDE;
      default:
        return item.designHU;
    }
  }
}
