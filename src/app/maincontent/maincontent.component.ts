
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { mainPageData } from '../../services/mainPageData.service';
import { IMainData } from '../../models/mainPageData.interface';

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
  constructor(private mainPageData : mainPageData ) {}

  mainData: IMainData[] = [];

  activeIndex: number | null = null;


  toggle(index: number): void {
    this.accordionData[index].open = !this.accordionData[index].open;
  }

  ngOnInit(): void {
    this.mainPageData.getMainData().subscribe({
      next: (data) => {
        this.mainData = data;
        console.log('Adatok:', this.mainData);
      },
      error: (error) => {
        console.error('Hiba a lekérdezés során:', error);
      }
    });
  }
}
