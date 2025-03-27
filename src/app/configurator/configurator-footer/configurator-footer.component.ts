import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { configurator } from '../../../services/configurator.service';
import { IConfigurator } from '../../../models/configurator.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configurator-footer',
  imports: [CommonModule],
  templateUrl: './configurator-footer.component.html',
  styleUrl: './configurator-footer.component.css'
})
export class ConfiguratorFooterComponent implements OnInit {

  selectedConfig: IConfigurator | null = null;

  constructor(private configurators: configurator, private router: Router) {
    this.configurators.selectedConfig$.subscribe(config => {
      this.selectedConfig = config;
    });
  }

  ngOnInit(): void {
    this.selectedConfig = this.configurators.getSelectedConfig();
  }

  getCredit(price: number): number {
    return price / 48;
  }

  navigateToReadyToBuy() {
    this.router.navigate(['/configReady']);
  }
  navigateToConfig() {
    this.router.navigate(['/configColor']);
  }
}