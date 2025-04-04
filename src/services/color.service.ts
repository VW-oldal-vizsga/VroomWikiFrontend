import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IColor } from '../models/configurator.interface';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private apiUrl = 'http://localhost:5269/api/Configurator/colors';

  private colorSource = new BehaviorSubject<IColor | null>(this.loadColorFromStorage());
  currentColor = this.colorSource.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {}

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(this.apiUrl);
  }

  changeColor(color: IColor) {
    this.colorSource.next(color);
    this.saveColorToStorage(color);
    this.cartService.updateTemporaryTotal(color.price)
  }

  private saveColorToStorage(color: IColor) {
    localStorage.setItem('selectedColor', JSON.stringify(color));
  }

  private loadColorFromStorage(): IColor | null {
    const savedColor = localStorage.getItem('selectedColor');
    return savedColor ? JSON.parse(savedColor) : null;
  }
}
