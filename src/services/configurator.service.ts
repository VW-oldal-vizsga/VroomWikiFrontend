import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import { IColor, IConfigurator, IEngine, ISelectConfigurator, ITransmissionType } from '../models/configurator.interface';

@Injectable({
  providedIn: 'root'
})
export class configurator {
    private apiUrl = 'http://localhost:5269/api/Configurator';
    private selectedConfigs: IConfigurator[] = [];
    private selectedConfigSubject = new BehaviorSubject<IConfigurator | null>(null);
    selectedConfig$ = this.selectedConfigSubject.asObservable();

    private config: ISelectConfigurator = {
      userId : 0,
      configName: '',
      engine_Id: 0,
      color_Id: 0,
      transmissionType_Id: 0,
      price: 0
    }
    private configSubject = new BehaviorSubject<ISelectConfigurator>(this.config);
    
    
    constructor(private http: HttpClient) {
      const savedConfig = localStorage.getItem('carConfig');
      if (savedConfig) {
        this.config = JSON.parse(savedConfig);
        this.configSubject.next(this.config);
      }
      console.log(this.config);
      
     }

    getConfigurators(): Observable<IConfigurator[]> {
      return this.http.get<IConfigurator[]>(`${this.apiUrl}`)
    }

    getGolfMainImage(): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/image/1`, {responseType: 'blob'});
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

    getConfiguratorImage(id: number | undefined): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/image/${id}`, { responseType: 'blob' });
    }

    getSelectedConfigs(): IConfigurator[] {
      return this.selectedConfigs;
    }
  
    getSelectedConfig(): IConfigurator | null {
      return this.selectedConfigSubject.value;
    }
  
    setSelectedConfig(config: IConfigurator | null): void {
      this.selectedConfigSubject.next(config);
    }
  
    clearSelectedConfig(): void {
      this.selectedConfigSubject.next(null);
    }

    getCredit(price: number): number {
      return price / 60;
    }

    setEngine(engineId: number) {
      this.config.engine_Id = engineId;
      this.updateConfig();
    }
  
    setColor(colorId: number) {
      this.config.color_Id = colorId;
      this.updateConfig();
    }
  
    setUser(userId: number) {
      this.config.userId = userId;
      this.updateConfig();
    }
    
    setConfigName(configName: string) {
      this.config.configName = configName;
      this.updateConfig();
    }

    setTransmission(transmissionId: number) {
      this.config.transmissionType_Id = transmissionId;
      this.updateConfig();
    }
    setPrice(price:number) {
      this.config.price = price;
      this.updateConfig();
    }
  

    getConfigObservable() {
      return this.configSubject.asObservable();
    }
  

    private updateConfig() {
      this.configSubject.next(this.config);
      localStorage.setItem('carConfig', JSON.stringify(this.config));
    }

}