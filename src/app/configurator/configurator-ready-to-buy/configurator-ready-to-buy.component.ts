import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configurator-ready-to-buy',
  imports: [NavbarComponent, ConfiguratorFooterComponent, CommonModule],
  templateUrl: './configurator-ready-to-buy.component.html',
  styleUrl: './configurator-ready-to-buy.component.css'
})
export class ConfiguratorReadyToBuyComponent {

}
