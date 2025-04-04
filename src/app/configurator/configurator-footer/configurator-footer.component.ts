import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { configurator } from '../../../services/configurator.service';
import { IColor, IPopularConfigs, ISelectConfigurator } from '../../../models/configurator.interface';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { TranslatePipe } from '@ngx-translate/core';
import { forkJoin, Subscription } from 'rxjs';
import { ColorService } from '../../../services/color.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-configurator-footer',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './configurator-footer.component.html',
  styleUrl: './configurator-footer.component.css'
})
export class ConfiguratorFooterComponent implements OnInit, OnDestroy {
  configName:string = '';
  total:number = 0
  selectedConfig: IPopularConfigs | null = null;
  currentRoute: string = '';
  carConfig: ISelectConfigurator[] = [];
  colors: IColor[] = [];
  color: IColor | null = null;
  selectedColorId: number | null = null;
  colorName: string | undefined = undefined;
  private subscriptions: Subscription = new Subscription();

  constructor(private configurators: configurator, private router: Router, private colorService: ColorService, private cartService: CartService) {
  
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
      if (!event.url.includes('/configColor') && !event.url.includes('/configReady') && !event.url.includes('/configPreComp')) {
        this.configurators.clearSelectedConfig();
      }
    });

    this.subscriptions.add(
      this.configurators.selectedConfig$.subscribe(config => {
        this.selectedConfig = config;
      })
    );

    this.subscriptions.add(
      this.configurators.carConfig$.subscribe(config => {
        this.carConfig = config;
        this.selectedColorId = this.getColorId() ?? null;
        this.colorName = this.getColorName(this.selectedColorId);
      })
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData(): void {
    forkJoin({
      colors: this.configurators.getColors(),
    }).subscribe({
      next: (results) => {
        this.colors = results.colors;
        this.colorService.currentColor.subscribe(color => this.color = color);
        this.cartService.currentTotal.subscribe(total => this.total = total)
        this.carConfig = this.configurators.getCarConfig();
        this.selectedConfig = this.configurators.getSelectedConfig();
        this.selectedColorId = this.getColorId() ?? null;
        this.colorName = this.getColorName(this.selectedColorId);
        this.getConfigName()
        console.log('localStorage carConfig:', localStorage.getItem("carConfig"));
        

      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  getCredit(price: number): number {
    return this.configurators.getCredit(price);
  }

  navigateToColor() {
    this.router.navigate(['/configColor']);
  }

  navigateToReadyToBuy() {
    this.router.navigate(['/configReady']);
  }

  navigateToConfig() {
    this.router.navigate(['/configEquipment']);
  }

  navigateToDriveTo() {
    this.router.navigate(['/configDriveTo']);
    this.saveTotal()
  }

  getColorName(colorId: number | null): string | undefined {
    const foundName = this.colors.find(color => color.id === colorId);
    return foundName?.name;
  }

  getColorId(): number | undefined {
    const foundId = this.carConfig.find(color => color.color_Id !== undefined);
    return foundId?.color_Id;
  }

  changeColor(color: IColor) {
    this.colorService.changeColor(color);
  }

  saveTotal() {
    this.cartService.saveTotal();
  }

  getConfigName() {
    const configNameObject = this.configurators.getItem<{ configName: string }>('carConfig');
    this.configName = configNameObject ? configNameObject.configName : 'string'; 
  }

}