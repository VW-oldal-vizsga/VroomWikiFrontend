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
    { image:'assets/images/poloVivo.png', text: "Polo Vivo"},
    { image:"assets/images/taigo.jpg", text: "Taigo"},
    { image:"http://www.kepfeltoltes.eu/view.php?filename=4462018_Volkswagen_Touare.jpg", text: "Touareg"},
    { image:"http://www.kepfeltoltes.eu/view.php?filename=3522018_Volkswagen_Arteon.jpg", text: "Arteon"}
  ]
}
