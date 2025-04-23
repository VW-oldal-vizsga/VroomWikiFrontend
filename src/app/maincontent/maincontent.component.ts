
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

  getHistory(item: any) {
    switch (this.translate.currentLang) {
      case 'hu':
        return item.history;
      case 'en':
        return item.historyEN;
      case 'de':
        return item.historyDU;
      default:
        return item.history;
    }
  }
  getHistory2(item: any) {
    switch (this.translate.currentLang) {
      case 'hu':
        return item.history2;
      case 'en':
        return item.history2EN;
      case 'de':
        return item.history2DU;
      default:
        return item.history2;
    }
  }

  getHistory3(item:any) {
    switch (this.translate.currentLang) {
      case 'hu':
        return item.history3;
      case 'en':
        return item.history3EN;
      case 'de':
        return item.history3DU;
      default:
        return item.history3;
    }
  }

  getTitle(item:any) {
    switch (this.translate.currentLang) {
      case 'hu':
        return item.title;
      case 'en':
        return item.titleEN;
      case 'de':
        return item.titleDU;
      default:
        return item.title;
    }
  }
}
