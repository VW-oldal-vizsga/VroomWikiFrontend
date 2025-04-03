import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IColor } from '../models/configurator.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private apiUrl = 'http://localhost:5269/api/Configurator/colors';

  private colorSource = new BehaviorSubject<IColor | null>(null);
  currentColor = this.colorSource.asObservable();

  constructor(private http: HttpClient) {}

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(this.apiUrl);
  }

  changeColor(color: IColor) {
    this.colorSource.next(color);
  }
}
