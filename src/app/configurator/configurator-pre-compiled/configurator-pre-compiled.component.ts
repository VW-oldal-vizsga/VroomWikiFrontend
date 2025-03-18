import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { configurator } from '../../../services/configurator.service';

@Component({
  selector: 'app-configurator-pre-compiled',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './configurator-pre-compiled.component.html',
  styleUrl: './configurator-pre-compiled.component.css'
})
export class ConfiguratorPreCompiledComponent {

  

  constructor (private configurator:configurator) {}

  

  
}
