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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private oldModelsService: oldModelsService
  ) {}

  ngOnInit(): void {
    // Paraméter lekérdezése
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      if (id !== null) { // Ellenőrizzük, hogy van-e érték
        const numericId = parseInt(id, 10); // String -> Number konverzió

        // Adatok lekérése a service-től
        this.oldModelsService.getOldModelsById(numericId).subscribe({
          next: (data) => {
            this.cardData = data;
            console.log('Adatok:', this.cardData);

            // Megkeressük a kiválasztott kártyát
            this.selectedCard = this.cardData.find(c => c.id === numericId);
            if (!this.selectedCard) {
              console.warn(`Nincs találat az id-vel: ${numericId}`);
            }
          },
          error: (error) => {
            console.error('Hiba a lekérdezés során:', error);
          }
        });
      }
    });
  }

  navigateToDetail() {
    this.router.navigate(['/oldmodels']);
  }
}
