import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { IColor, IConfiguratorPut, IEngine, ITransmissionType } from '../../../models/configurator.interface';
import { ConfiguratorService } from '../../../services/configurator.service';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})

export class UpdateModalComponent implements OnInit {
  @Input() configData!: IConfiguratorPut;
  colors: IColor[] = [];
  engines: IEngine[] = [];
  transmissionTypes: ITransmissionType[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private configuratorService: ConfiguratorService
  ) {}

  ngOnInit(): void {
    this.loadOptions();
  }

  loadOptions(): void {
    forkJoin({
      colors: this.configuratorService.getColors(),
      engines: this.configuratorService.getEngines(),
      transmissionTypes: this.configuratorService.getTransmissionTypes()
    }).subscribe({
      next: (results) => {
        this.colors = results.colors;
        this.engines = results.engines;
        this.transmissionTypes = results.transmissionTypes;
        this.updatePrice();
      },
      error: (error) => {
        console.error('Hiba az opciók betöltésekor:', error);
      }
    });
  }

  updatePrice(): void {
    const selectedColor = this.colors.find(c => c.id === this.configData.color_Id);
    const selectedEngine = this.engines.find(e => e.id === this.configData.engine_Id);
    const selectedTransmission = this.transmissionTypes.find(t => t.id === this.configData.transmissionType_Id);

    let totalPrice = 0;
    if (selectedColor) totalPrice += selectedColor.price;
    if (selectedEngine) totalPrice += selectedEngine.price;
    if (selectedTransmission) totalPrice += selectedTransmission.price;

    this.configData.price = totalPrice;
  }

  save(): void {
    this.activeModal.close(this.configData);
  }
}