import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { configurator } from '../../../services/configurator.service';
import { IConfigurator, IPopularConfigs, ISelectConfigurator } from '../../../models/configurator.interface';
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
  carConfig: ISelectConfigurator[] = []
  colorId:number = this.getColorId()

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


  carConfigGet() {
    const storedConfig = localStorage.getItem("carConfig");
    if (storedConfig) {
      this.carConfig = JSON.parse(storedConfig);
    } else {
      this.carConfig = []; 
    }
    
  }

  saveCarConfig(config: ISelectConfigurator[]) {
    this.carConfig = config;
    localStorage.setItem("carConfig", JSON.stringify(this.carConfig));
  }

  ngOnInit(): void {
    this.selectedConfig = this.configurators.getSelectedConfig();
    this.carConfigGet() 
    console.log(this.getColorId());
    
  }

  getCredit(price: number): number {
    return this.configurators.getCredit(price);
  }

  navigateToColor() {
    this.router.navigate(['/configColor'])
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

  getColorId():number {
    const colorId = 0
    this.carConfig.forEach((adat)=>{
      adat.color_Id === colorId
    })
    return colorId
  }

}