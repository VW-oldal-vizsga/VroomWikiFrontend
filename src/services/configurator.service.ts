import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IColor, IConfigurator, IConfiguratorPut, IEngine, IPopularConfigs, ISelectConfigurator, ITransmissionType } from '../models/configurator.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  private apiUrl = 'http://localhost:5269/api/Configurator';

  private selectedConfigSubject = new BehaviorSubject<IPopularConfigs | null>(null);
  selectedConfig$ = this.selectedConfigSubject.asObservable();

  private config: ISelectConfigurator = {
    id: null,
    configName: '',
    user_id: null,
    color_Id: 0,
    engine_Id: 0,
    transmissionType_Id: 0,
    price: 0
  };
  private configSubject = new BehaviorSubject<ISelectConfigurator>(this.config);
  config$ = this.configSubject.asObservable();

  private totalPriceSubject = new BehaviorSubject<number>(0);
  totalPrice$ = this.totalPriceSubject.asObservable();

  private currentColorPrice: number = 0;

  constructor(private http: HttpClient) {}

  getConfigurators(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  deleteConfigurators(id: number | null): Observable<any> {
    if (id === null) {
      throw new Error('Érvénytelen konfigurátor ID');
    }
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPopularConfigs(): Observable<IPopularConfigs[]> {
    return this.http.get<IPopularConfigs[]>(`${this.apiUrl}/popularconfigs`);
  }

  getColors(): Observable<IColor[]> {
    return this.http.get<IColor[]>(`${this.apiUrl}/colors`);
  }

  getEngines(): Observable<IEngine[]> {
    return this.http.get<IEngine[]>(`${this.apiUrl}/engines`);
  }

  getTransmissionTypes(): Observable<ITransmissionType[]> {
    return this.http.get<ITransmissionType[]>(`${this.apiUrl}/transmissions`);
  }

  getGolfMainImage(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/popularconfigs/image/1`, { responseType: 'blob' });
  }

  getConfiguratorImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/popularconfigs/image/${id}`, { responseType: 'blob' });
  }

  getConfiguratorColorImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/color/image/${id}`, { responseType: 'blob' });
  }

  getUserConfigs(userId: number): Observable<ISelectConfigurator[]> {
    return this.http.get<ISelectConfigurator[]>(`${this.apiUrl}/user/${userId}/configs`);
  }

  saveConfig(config: IConfiguratorPut): Observable<ISelectConfigurator> {
    return this.http.post<ISelectConfigurator>(`${this.apiUrl}`, config);
  }

  setSelectedConfig(config: IPopularConfigs | null): void {
    this.selectedConfigSubject.next(config);
    if (config && config.price !== undefined) {
      this.updateTotalPrice(config.price);
    }
  }

  getSelectedConfig(): IPopularConfigs | null {
    return this.selectedConfigSubject.value;
  }

  clearSelectedConfig(): void {
    this.selectedConfigSubject.next(null);
    this.updateTotalPrice(0);
  }

  setConfigName(configName: string): void {
    this.config.configName = configName;
    this.updateConfig();
  }

  setColor(colorId: number, price?: number): void {
    this.config.color_Id = colorId;
    if (price !== undefined) {
      const newTotalPrice = this.config.price + price;
      this.updateTotalPrice(newTotalPrice);
      this.currentColorPrice = price;
    }
    this.updateConfig();
  }

  setUserId(userId: number | null): void {
    if (userId !== undefined) {
      this.config.user_id = userId;
      this.updateConfig();
    }
  }

  setConfigId(id: number | null): void {
    this.config.id = id;
    this.updateConfig();
  }

  setEngine(engineId: number): void {
    this.config.engine_Id = engineId;
    this.updateConfig();
  }

  setTransmission(transmissionId: number): void {
    this.config.transmissionType_Id = transmissionId;
    this.updateConfig();
  }

  setPrice(price: number): void {
    this.config.price = price;
    this.updateTotalPrice(price + this.currentColorPrice);
    this.updateConfig();
  }

  getConfig(): ISelectConfigurator {
    return this.configSubject.value;
  }

  getTotalPrice(): number {
    return this.totalPriceSubject.getValue();
  }

  updateTotalPrice(price: number): void {
    if (price >= 0) {
      this.totalPriceSubject.next(price);
    } else {
      console.warn('Az ár nem lehet negatív:', price);
    }
  }

  getCredit(price: number): number {
    return price / 60;
  }

  createNewConfig(): void {
    this.config = {
      id: null,
      configName: '',
      user_id: this.config.user_id, 
      color_Id: 0,
      engine_Id: 0,
      transmissionType_Id: 0,
      price: 0
    };
    this.updateConfig();
    this.updateTotalPrice(0);
  }

  private updateConfig(): void {
    this.configSubject.next({ ...this.config });
  }


}