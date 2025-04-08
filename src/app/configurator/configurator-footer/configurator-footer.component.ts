import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfiguratorService } from '../../../services/configurator.service';
import { IColor, IPopularConfigs, ISelectConfigurator } from '../../../models/configurator.interface';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-configurator-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './configurator-footer.component.html',
  styleUrls: ['./configurator-footer.component.css']
})
export class ConfiguratorFooterComponent implements OnInit, OnDestroy {
  selectedConfig: IPopularConfigs | null = null;
  config: ISelectConfigurator = { configName: '', color_Id: 0, engine_Id: 0, transmissionType_Id: 0, price: 0 };
  totalPrice: number = 0;
  selectedColor: IColor | null = null;
  colors: IColor[] = [];
  currentRoute: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private configuratorService: ConfiguratorService,
    private router: Router
  ) {
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.updateFooterData();
      })
    );

    this.subscriptions.add(
      this.configuratorService.selectedConfig$.subscribe(config => {
        this.selectedConfig = config;
      })
    );

    this.subscriptions.add(
      this.configuratorService.config$.subscribe(config => {
        this.config = config;
        this.loadColor(config.color_Id);
      })
    );

    this.subscriptions.add(
      this.configuratorService.totalPrice$.subscribe(total => {
        this.totalPrice = total;
      })
    );
  }

  ngOnInit(): void {
    this.loadColors();
    this.updateFooterData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadColors(): void {
    this.configuratorService.getColors().subscribe({
      next: (colors) => {
        this.colors = colors;
        this.loadColor(this.config.color_Id);
      },
      error: (err) => {
        console.error('Hiba a színek betöltésekor:', err);
      }
    });
  }

  loadColor(colorId: number): void {
    this.selectedColor = this.colors.find(color => color.id === colorId) || null;
  }

  getCredit(price: number): number {
    return this.configuratorService.getCredit(price);
  }

  navigateToReadyToBuy(): void {
    this.router.navigate(['/configReady']);
  }

  navigateToConfig(): void {
    this.router.navigate(['/configEquipment']);
  }

  navigateToColor(): void {
    this.router.navigate(['/configColor']);
  }

  navigateToDriveTo(): void {
    this.router.navigate(['/configDriveTo']);
  }

  private updateFooterData(): void {
    this.selectedConfig = this.configuratorService.getSelectedConfig();
    this.config = this.configuratorService.getConfig();
    this.totalPrice = this.configuratorService.getTotalPrice();
    this.loadColor(this.config.color_Id);
  }
}