import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oldmodels',
  standalone:true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './oldmodels.component.html',
  styleUrl: './oldmodels.component.css'
})
export class OldmodelsComponent {
  cardData = [
    { image: 'assets/poloVivo.png', text: 'Polo Vivo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
    { image: 'assets/taigo.jpg', text: 'Taigo' },
  ];
}
