import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configurator-main',
  standalone:true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configurator-main.component.html',
  styleUrl: './configurator-main.component.css'
})
export class ConfiguratorMainComponent {
  constructor (private router:Router) {}

  navigateToCar() {
    this.router.navigate(['/configPreComp']);
  }
}
