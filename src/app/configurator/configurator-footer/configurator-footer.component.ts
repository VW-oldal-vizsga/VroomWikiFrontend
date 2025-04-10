import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfiguratorService } from '../../../services/configurator.service';
import { IColor, IConfiguratorPut, IPopularConfigs, ISelectConfigurator } from '../../../models/configurator.interface';
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
  userId: number | null = null;
  selectedConfig: IPopularConfigs | null = null;
  config: ISelectConfigurator | null = null;
  totalPrice: number = 0;
  selectedColor: IColor | null = null;
  colors: IColor[] = [];
  currentRoute: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private configuratorService: ConfiguratorService,
    private router: Router
  ) {
    // Router események
    this.subscriptions.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.updateFooterData();
      })
    );

    // Selected config előfizetés
    this.subscriptions.add(
      this.configuratorService.selectedConfig$.subscribe(config => {
        this.selectedConfig = config;
      })
    );

    // Config előfizetés
    this.subscriptions.add(
      this.configuratorService.config$.subscribe(config => {
        this.config = config;
        if (config) {
          this.loadColor(config.color_Id);
        }
      })
    );

    // Total price előfizetés
    this.subscriptions.add(
      this.configuratorService.totalPrice$.subscribe(total => {
        this.totalPrice = total;
      })
    );
  }

  ngOnInit(): void {
    this.loadColors();
    this.updateFooterData();
    // user_id lekérése localStorage-ból és átadása a ConfiguratorService-nek
    this.loadUserId();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private loadUserId(): void {
    const userId = localStorage.getItem('user_id');
    this.userId = userId ? Number(userId) : null;
    console.log('User ID betöltve:', this.userId);
    // user_id átadása a ConfiguratorService-nek
    if (this.userId !== null && this.config && this.userId !== this.config.user_id) {
      this.configuratorService.setUserId(this.userId);
    }
  }

  loadColors(): void {
    this.configuratorService.getColors().subscribe({
      next: (colors) => {
        this.colors = colors;
        if (this.config) {
          this.loadColor(this.config.color_Id);
        }
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
    if (this.config) {
      const configToSave: IConfiguratorPut = {
        id: this.config.id || null, // Új konfiguráció esetén null
        configName: this.config.configName,
        user_id: this.config.user_id,
        color_id: this.config.color_Id,
        engine_id: this.config.engine_Id,
        transmissionType_Id: this.config.transmissionType_Id,
        price: this.config.price
      };
      this.configuratorService.saveConfig(configToSave).subscribe({
        next: (savedConfig) => {
          // Ellenőrizzük, hogy az id nem undefined
          if (savedConfig.id !== undefined) {
            this.configuratorService.setConfigId(savedConfig.id);
          } else {
            console.warn('A visszakapott konfiguráció nem tartalmaz id-t:', savedConfig);
          }
          this.router.navigate(['/configReady']);
        },
        error: (err) => {
          console.error('Hiba a konfiguráció mentésekor:', err);
        }
      });
    } else {
      console.error('Nincs érvényes konfiguráció a mentéshez');
    }
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

  createNewConfig(): void {
    this.configuratorService.createNewConfig();
  }

  private updateFooterData(): void {
    this.selectedConfig = this.configuratorService.getSelectedConfig();
    this.config = this.configuratorService.getConfig();
    this.totalPrice = this.configuratorService.getTotalPrice();
    if (this.config) {
      this.loadColor(this.config.color_Id);
    }
  }
}