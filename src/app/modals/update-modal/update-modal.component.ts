import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { IColor, IConfiguratorPut, IEngine, ITransmissionType } from '../../../models/configurator.interface';
import { ConfiguratorService } from '../../../services/configurator.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslatePipe],
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.css']
})
export class UpdateModalComponent implements OnInit {
  @Input() configData!: IConfiguratorPut;
  @Input() isEditing: boolean = false;
  selectedColor: IColor | null = null;
  selectedEngine: IEngine | null = null;
  selectedTransmission: ITransmissionType | null = null;
  totalPrice: number = 0;
  colors: IColor[] = [];
  engines: IEngine[] = [];
  transmissionTypes: ITransmissionType[] = [];
  errorMessage: string | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private configuratorService: ConfiguratorService,
    private cdr: ChangeDetectorRef
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
        this.totalPrice = this.configData.price;

        this.selectedColor = this.colors.find(c => c.id === this.configData.color_Id) || null;
        this.selectedEngine = this.engines.find(e => e.id === this.configData.engine_Id) || null;
        this.selectedTransmission = this.transmissionTypes.find(t => t.id === this.configData.transmissionType_Id) || null;

        this.cdr.detectChanges();
      },
      error: (error) => {
        this.errorMessage = 'Hiba az opciók betöltésekor.';
        console.error('Hiba az opciók betöltésekor:', error);
      }
    });
  }

  onColorChange(colorId: number | string): void {
    const id = Number(colorId);
    const newColor = this.colors.find(c => c.id === id);
    if (newColor) {
      this.updateColorPrice(newColor);
    } else {
      console.warn('Nem található szín az ID-val:', id);
    }
  }

  onEngineChange(engineId: number | string): void {
    const id = Number(engineId);
    console.log('Motor megváltozott, új engineId:', id);
    const newEngine = this.engines.find(e => e.id === id);
    if (newEngine) {
      this.updateEnginePrice(newEngine);
    } else {
      console.warn('Nem található motor az ID-val:', id);
    }
  }

  onTransmissionChange(transmissionId: number | string): void {
    const id = Number(transmissionId);
    console.log('Váltó megváltozott, új transmissionId:', id);
    const newTransmission = this.transmissionTypes.find(t => t.id === id);
    if (newTransmission) {
      this.updateTransmissionPrice(newTransmission);
    } else {
      console.warn('Nem található váltó az ID-val:', id);
    }
  }

  updateColorPrice(newColor: IColor): void {
    if (this.selectedColor && this.selectedColor.price) {
      this.totalPrice -= this.selectedColor.price;
    }
    this.totalPrice += newColor.price || 0;
    this.selectedColor = newColor;
    this.cdr.detectChanges();
  }

  updateEnginePrice(newEngine: IEngine): void {
    if (this.selectedEngine && this.selectedEngine.price) {
      this.totalPrice -= this.selectedEngine.price;
    }
    this.totalPrice += newEngine.price || 0;
    this.selectedEngine = newEngine;
    this.cdr.detectChanges();
  }

  updateTransmissionPrice(newTransmission: ITransmissionType): void {
    console.log('updateTransmissionPrice fut, új váltó:', newTransmission);
    if (this.selectedTransmission && this.selectedTransmission.price) {
      this.totalPrice -= this.selectedTransmission.price;
    }
    this.totalPrice += newTransmission.price || 0;
    this.selectedTransmission = newTransmission;
    this.cdr.detectChanges();
  }

  save(): void {
    if (this.isEditing) {
      this.configuratorService.updateConfigurators(this.configData.id!, this.configData).subscribe({
        next: () => {
          this.activeModal.close(this.configData);
        },
        error: (error) => {
          this.errorMessage = 'Hiba történt a konfiguráció mentésekor.';
          console.error('Update config error:', error);
        }
      });
    } else {
      this.activeModal.close();
    }
  }
}