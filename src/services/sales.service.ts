import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { SalesData } from '../models/sales.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  constructor(private http: HttpClient) {}

  getSalesData(): Observable<SalesData[]> {
    return this.http.get<SalesData[]>("http://localhost:5269/api/MainPage_Sales/sales")
  }
}