
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { mainPageData } from '../../services/mainPageData.service';
import { IMainData } from '../../models/mainPageData.interface';
import { IHistory } from '../../models/mainPageHistory.interface';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-maincontent',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './maincontent.component.html',
  styleUrl: './maincontent.component.css'
})
export class MaincontentComponent {
  constructor(private mainPageData : mainPageData , private translate: TranslateService) {
    this.translate.setDefaultLang('hu'); 
    this.translate.use('hu');
  }
  
  apiImage = "http://localhost:5269/api/MainPage_Sales/image/1"
  chairmanImage = "http://localhost:5269/api/MainPage_Sales/imageChairman/1"
  bratislavaFactory = "http://localhost:5269/api/MainPage_Sales/imageBratislava/1"
  wolfsburgFactory = "http://localhost:5269/api/MainPage_Sales/imageWolfsburg/1"
  dresdenFactory = "http://localhost:5269/api/MainPage_Sales/imageDresden/1"
  
  
  historyData: IHistory [] = [
  ];

  mainData: IMainData[] = [];

  activeIndex: number | null = null;


  toggle(index: number): void {
    this.historyData[index].open = !this.historyData[index].open;
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
    }),
    this.mainPageData.getMainHistory().subscribe({
      next: (data) => {
        this.historyData = data;
        console.log('Adatok:', this.historyData);
      },
      error: (error) => {
        console.error('Hiba a lekérdezés során:', error);
      }
    })
    

  }
}
