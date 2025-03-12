import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-configurator',
  standalone:true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './car-configurator.component.html',
  styleUrl: './car-configurator.component.css'
})
export class CarConfiguratorComponent {

}
