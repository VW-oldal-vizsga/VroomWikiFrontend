import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-maincontent',
  imports: [CommonModule],
  templateUrl: './maincontent.component.html',
  styleUrl: './maincontent.component.css'
})
export class MaincontentComponent {
  accordionData = [
    { title: "Első", content: "Első tartalom", open: false},
    { title: "Második", content: "Első tartalom", open: false},
    { title: "Harmadik", content: "Első tartalom", open: false},
    { title: "Negyedik", content: "Első tartalom", open: false}

  ]

  activeIndex: number | null = null;


  toggle(index: number): void {
    this.accordionData[index].open = !this.accordionData[index].open;
  }
}
