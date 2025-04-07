import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  // Simulated sales data based on your provided structure
  private mockData = [
    { id: 1, year: 2014, totalSale: 10.1, totalIncome: 202.1 },
    { id: 2, year: 2015, totalSale: 10.4, totalIncome: 213.4 },
    { id: 3, year: 2016, totalSale: 10.3, totalIncome: 217.6 },
    { id: 4, year: 2017, totalSale: 10.6, totalIncome: 228 },
    { id: 5, year: 2018, totalSale: 10.8, totalIncome: 235.9 },
    { id: 6, year: 2019, totalSale: 10.9, totalIncome: 251.9 },
    { id: 7, year: 2020, totalSale: 9.3, totalIncome: 212.3 },
    { id: 8, year: 2021, totalSale: 8.3, totalIncome: 249.2 },
    { id: 9, year: 2022, totalSale: 8.3, totalIncome: 245.1 },
    { id: 10, year: 2023, totalSale: 9.1, totalIncome: 322.2 },
  ];

  getSalesData(): Observable<any[]> {
    return of(this.mockData); // Simulate an API call
  }
}