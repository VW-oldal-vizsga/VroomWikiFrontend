import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./oldmodels.component.css'] // styleUrl -> styleUrls
})
export class OldmodelsComponent implements OnInit { // OnInit implementálása
  cardData: ICard[] = [];

  constructor(private router: Router, private oldModelsService: oldModelsService) {}

  // Az id típusa number, de a navigate stringgé konvertálja az URL-ben
  navigateToDetail(id: number) {
    this.router.navigate(['/cards', id]);
  }

  ngOnInit(): void {
    this.oldModelsService.getOldModels().subscribe({
      next: (data) => {
        this.cardData = data;
        console.log('Adatok:', this.cardData);
      },
      error: (error) => {
        console.error('Hiba a lekérdezés során:', error);
      }
    });
  }
}