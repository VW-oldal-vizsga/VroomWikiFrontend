import { Component } from '@angular/core';
import { cardData } from '../cards';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-details',
  imports: [NavbarComponent,CommonModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  card: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.card = cardData.find(c => c.id === id);
    });
  }

  navigateToDetail() {
    this.router.navigate(['/oldmodels']);
  }
}
