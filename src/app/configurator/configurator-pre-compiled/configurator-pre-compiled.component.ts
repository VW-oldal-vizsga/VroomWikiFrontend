import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { configurator } from '../../../services/configurator.service';
import { Router } from '@angular/router';

import { forkJoin } from 'rxjs';
import { IColor, IConfigurator, IEngine, ITransmissionType } from '../../../models/configurator.interface';

@Component({
  selector: 'app-configurator-pre-compiled',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configurator-pre-compiled.component.html',
  styleUrl: './configurator-pre-compiled.component.css'
})
export class ConfiguratorPreCompiledComponent {

  configurators: IConfigurator[] = [];
  colors: IColor[] = [];
  engines: IEngine[] = [];
  transmissionTypes: ITransmissionType[] = [];

  constructor(private router: Router, private configurator: configurator) {}

  

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    forkJoin({
      configurators: this.configurator.getConfigurators(),
      colors: this.configurator.getColors(),
      engines: this.configurator.getEngines(),
      transmissionTypes: this.configurator.getTransmissionTypes(),
    }).subscribe({
      next: (results) => {
        this.configurators = results.configurators;
        this.colors = results.colors;
        this.engines = results.engines;
        this.transmissionTypes = results.transmissionTypes;
      },
      error: (err) => {
        console.error('Hiba az adatok betöltésekor:', err);
      }
    })
    
  }

  navigateToCar(): void {
    this.router.navigate(['/configPreComp']);
  }

  getEngineData(engineId: number): IEngine | undefined {
    return this.engines.find(e => e.id === engineId);
  }

  getColorData(colorId: number): IColor | undefined {
    return this.colors.find(c => c.id === colorId);
  }

  getTransmissionData(transmissionId: number): ITransmissionType | undefined {
    return this.transmissionTypes.find(t => t.id === transmissionId);
  }
}
