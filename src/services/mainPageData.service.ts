import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';

import { IMainData } from '../models/mainPageData.interface';

@Injectable({
  providedIn: 'root'
})
export class mainPageData {

    private apiUrl = 'http://localhost:5269';

    constructor(private http: HttpClient) { }

    getMainData(): Observable<IMainData[]> {
        return this.http.get<IMainData[]>(`${this.apiUrl}/api/MainPage_Sales/mainpage`);
      }

}