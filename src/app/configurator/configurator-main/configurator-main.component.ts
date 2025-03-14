import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-configurator-main',
  standalone:true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configurator-main.component.html',
  styleUrl: './configurator-main.component.css'
})
export class ConfiguratorMainComponent {

}
