import { Injectable } from '@angular/core';
import { configurator } from './configurator.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalPrice: number = 0;
  private totalSource = new BehaviorSubject<number>(0);  
  currentTotal = this.totalSource.asObservable();

  private temporaryTotal: number = 0; 
  private lastColorPrice: number = 0;

  constructor(private configurator: configurator) {
    this.loadPrice(); 
  }

  updateTemporaryTotal(newColorPrice: number) {
    this.temporaryTotal = this.totalPrice - this.lastColorPrice + newColorPrice;
    this.lastColorPrice = newColorPrice;

    this.totalSource.next(this.temporaryTotal);
  }

  saveTotal() {
    this.totalPrice = this.temporaryTotal; 
    this.totalSource.next(this.totalPrice);  
    this.saveTotalToStorage(this.totalPrice);
  }

  private saveTotalToStorage(price: number) {
    localStorage.setItem('totalPrice', price.toString());
  }

  private loadPrice(): void {
    const priceObject = this.configurator.getItem<{ price: number }>('carConfig');
    this.totalPrice = priceObject ? priceObject.price : 0; 

    this.totalSource.next(this.totalPrice);
    this.temporaryTotal = this.totalPrice; 
  }
}
