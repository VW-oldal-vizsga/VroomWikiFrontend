import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { cardData } from '../cards';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oldmodels',
  standalone:true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './oldmodels.component.html',
  styleUrl: './oldmodels.component.css'
})
export class OldmodelsComponent {
  cardData = cardData;
  
  constructor(private router: Router) {}

  navigateToDetail(id: string) {
    this.router.navigate(['/cards', id]);
  }
}
