import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ICard } from '../../models/oldModels.interface';
import { oldModelsService } from '../../services/oldModelsService.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

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
  isAdmin: boolean = false;

  private subscriptions = new Subscription();
  private userService = inject(UserService);

  constructor(private router: Router, private oldModelsService: oldModelsService) {}

  ngOnInit(): void {
    const sub = this.userService.user$.subscribe(user => {
      this.isAdmin = user?.roles?.includes('Admin') ?? false;
    });
    this.subscriptions.add(sub);

    this.oldModelsService.getOldModels().subscribe({
      next: (data) => {
        this.cardData = data;
        this.loadCardImages();
      },
      error: (error) => {
        console.error('Hiba a lekérdezés során:', error);
      }
    });
  }

  navigateToDetail(id: number) {
    this.router.navigate(['/cards', id]);
  }

  onAddItem() {
    console.log('Hozzáadás gombra kattintva');
  }

  onDeleteItem(id: number) {
    console.log(`Törlés gombra kattintva, ID: ${id}`);
  }

  private loadCardImages(): void {
    this.cardData.forEach(card => {
      this.oldModelsService.getOldModelsImage(card.id).subscribe({
        next: (imageBlob) => {
          const objectURL = URL.createObjectURL(imageBlob);
          this.cardImages[card.id] = objectURL;
        },
        error: (error) => {
          console.error(`Hiba a kép lekérdezése során (ID: ${card.id}):`, error);
        }
      });
    });
  }

  ngOnDestroy(): void {
    Object.values(this.cardImages).forEach(url => URL.revokeObjectURL(url));
    this.subscriptions.unsubscribe();
  }
}
