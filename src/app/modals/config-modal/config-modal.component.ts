import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { IColor, IConfiguratorPut, IEngine, ITransmissionType } from '../../../models/configurator.interface';
import { ConfiguratorService } from '../../../services/configurator.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-config-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.css']
})
export class ConfigModalComponent implements OnInit {
  @Input() configData: IConfiguratorPut | undefined;
  imageUrl: string | undefined;
  colors: IColor[] = [];
  engines: IEngine[] = [];
  configurator: IConfiguratorPut[] = [];
  transmissionTypes: ITransmissionType[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private configuratorService: ConfiguratorService
  ) {}

  ngOnInit(): void {
    this.loadData()
    if (this.configData?.color_Id) {
      this.configuratorService.getConfiguratorColorImage(this.configData.color_Id).subscribe({
        next: (imageBlob: Blob) => {
          this.imageUrl = URL.createObjectURL(imageBlob);
        },
        error: (error) => {
          console.error(`Hiba a kép lekérdezése során (ID: ${this.configData?.color_Id}):`, error);
          this.imageUrl = 'placeholder-image.jpg';
        }
      });
    }
    
  }

  loadData(): void {
    forkJoin({
      configurators: this.configuratorService.getConfigurators(),
      engines: this.configuratorService.getEngines(),
      transmissionTypes: this.configuratorService.getTransmissionTypes(),
      colors: this.configuratorService.getColors()
    }).subscribe({
      next: (results) => {
        this.configurator = results.configurators;
        this.engines = results.engines;
        this.transmissionTypes = results.transmissionTypes;
        this.colors = results.colors
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    });
  }

  getEngineData(engineId: number): IEngine | undefined {
    return this.engines.find(e => e.id === engineId);
  }

  getColorData(colorId: number): IColor | undefined {
    return this.colors.find(c => c.id === colorId);
  }

  getTransmissionTypeData(transmissionTypeId:number): ITransmissionType | undefined {
    return this.transmissionTypes.find(t => t.id === transmissionTypeId)
  }

  close(): void {
    this.activeModal.dismiss('Close click');
  }
}