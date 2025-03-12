import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { IMainData } from '../models/mainPageData.interface';
import { IHistory } from '../models/mainPageHistory.interface';

@Injectable({
  providedIn: 'root'
})
export class mainPageData {

    private apiUrl = 'http://localhost:5269';

    constructor(private http: HttpClient) { }

    getMainData(): Observable<IMainData[]> {
        return this.http.get<IMainData[]>(`${this.apiUrl}/api/MainPage_Sales/mainpage`);
      }

    getMainHistory(): Observable<IHistory[]> {
      return this.http.get<IHistory[]>(`${this.apiUrl}/api/MainPage_Sales/mainpage/history`);
    }


}