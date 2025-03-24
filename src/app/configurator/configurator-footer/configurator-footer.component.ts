import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { configurator } from '../../../services/configurator.service';
import { forkJoin } from 'rxjs';
import { IConfigurator } from '../../../models/configurator.interface';

@Component({
  selector: 'app-configurator-footer',
  imports: [CommonModule],
  templateUrl: './configurator-footer.component.html',
  styleUrl: './configurator-footer.component.css'
})
export class ConfiguratorFooterComponent {

  configurator:IConfigurator [] = []

  constructor(private configurators: configurator) {}

  ngOnInit(): void {
      this.loadData();
    }
  
    loadData(): void {
      forkJoin({
        configurators: this.configurators.getConfigurators(),

      }).subscribe({
        next: (results) => {
          this.configurator = results.configurators;
        },
        error: (err) => {
          console.error('Hiba az adatok betöltésekor:', err);
        }
      });
    }


}
