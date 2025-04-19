import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ICard } from '../../models/oldModels.interface';
import { oldModelsService } from '../../services/oldModelsService.service';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PastModelNewComponent } from '../modals/past-model-new/past-model-new.component';

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

  constructor(private router: Router, private oldModelsService: oldModelsService, private modalService: NgbModal) {}

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
    this.openModal()
    
    console.log('Hozzáadás gombra kattintva');
  }

  onDeleteItem(id: number) {
    if (confirm('Biztosan törölni szeretnéd ezt az elemet?')) {
      this.oldModelsService.deleteOldModels(id).subscribe({
        next: () => {
          this.cardData = this.cardData.filter(card => card.id !== id);
          alert('Sikeresen törölve!');
        },
        error: (error) => {
          console.error(`Hiba a törlés során (ID: ${id}):`, error);
          alert('Hiba történt a törlés során. Kérlek, próbáld újra!');
        }
      });
    }
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

  openModal() {
    const modalRef = this.modalService.open(PastModelNewComponent);
      modalRef.componentInstance.name = 'New';
      modalRef.componentInstance.isEditing = false; 
  }

  ngOnDestroy(): void {
    Object.values(this.cardImages).forEach(url => URL.revokeObjectURL(url));
    this.subscriptions.unsubscribe();
  }
}
