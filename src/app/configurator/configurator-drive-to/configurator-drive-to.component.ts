import { Component, OnInit } from '@angular/core';
import { ConfiguratorService } from '../../../services/configurator.service';
import { IEngine, ITransmissionType } from '../../../models/configurator.interface';
import { NavbarComponent } from '../../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguratorFooterComponent } from '../configurator-footer/configurator-footer.component';

@Component({
  selector: 'app-configurator-drive-to',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule, ConfiguratorFooterComponent],
  templateUrl: './configurator-drive-to.component.html',
  styleUrls: ['./configurator-drive-to.component.css'] 
})
export class ConfiguratorDriveToComponent implements OnInit { 
  engines: IEngine[] = [];
  transmissions: ITransmissionType[] = [];
  totalPrice: number = 0;
  selectedEngine: IEngine | null = null;
  selectedTransmission: ITransmissionType | null = null;

  constructor(private configuratorService: ConfiguratorService) {}

  ngOnInit(): void {
    this.loadData();
    this.subscribeToPriceChanges();
  }

  private loadData(): void {
    this.configuratorService.getEngines().subscribe(engines => {
      this.engines = engines;
    });
    this.configuratorService.getTransmissionTypes().subscribe(transmissions => {
      this.transmissions = transmissions;
    });
  }

  private subscribeToPriceChanges(): void {
    this.configuratorService.totalPrice$.subscribe(price => {
      this.totalPrice = price;
    });
  }

  onEngineChange(event: Event): void {
    const target = event.target as HTMLSelectElement; 
    const id = Number(target.value); 
    const selectedEngine = this.engines.find(e => e.id === id);
    if (selectedEngine) {
      this.selectedEngine = selectedEngine;
      this.configuratorService.setEngine(selectedEngine.id);
      this.updatePriceWithSelection();
    }
  }

  onTransmissionChange(event: Event): void {
    const target = event.target as HTMLSelectElement; 
    const id = Number(target.value); 
    const selectedTransmission = this.transmissions.find(t => t.id === id);
    if (selectedTransmission) {
      this.selectedTransmission = selectedTransmission;
      this.configuratorService.setTransmission(selectedTransmission.id);
      this.updatePriceWithSelection();
    }
  }

  private updatePriceWithSelection(): void {
    let newPrice = 0;

    const basePrice = this.configuratorService.getConfig().price || 0;

    if (this.selectedEngine && this.selectedEngine.price !== undefined) {
      newPrice += this.selectedEngine.price;
    }

    if (this.selectedTransmission && this.selectedTransmission.price !== undefined) {
      newPrice += this.selectedTransmission.price 
    }

    this.configuratorService.updateTotalPrice(basePrice + newPrice);
  }
}