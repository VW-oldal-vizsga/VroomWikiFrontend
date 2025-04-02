import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { configurator } from '../../../services/configurator.service';
import { IConfigurator, IPopularConfigs } from '../../../models/configurator.interface';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-configurator-footer',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './configurator-footer.component.html',
  styleUrl: './configurator-footer.component.css'
})
export class ConfiguratorFooterComponent implements OnInit {
  selectedConfig: IPopularConfigs | null = null;
  currentRoute: string = '';

  constructor(private configurators: configurator, private router: Router) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url; 
      if (!event.url.includes('/configColor') && !event.url.includes('/configReady') && !event.url.includes('/configPreComp')) {
        this.configurators.clearSelectedConfig();
      }
    });


    this.configurators.selectedConfig$.subscribe(config => {
      this.selectedConfig = config;
    });
  }

  ngOnInit(): void {
    this.selectedConfig = this.configurators.getSelectedConfig();
  }

  getCredit(price: number): number {
    return this.configurators.getCredit(price);
  }

  navigateToReadyToBuy() {
    this.router.navigate(['/configReady']);
  }

  navigateToConfig() {
    this.router.navigate(['/configEquipment']);
  }
  navigateToDriveTo() {
    this.router.navigate(['/configDriveTo'])
  }
}