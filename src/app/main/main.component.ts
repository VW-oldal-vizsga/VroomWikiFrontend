import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MaincontentComponent } from "../maincontent/maincontent.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NavbarComponent, MaincontentComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
