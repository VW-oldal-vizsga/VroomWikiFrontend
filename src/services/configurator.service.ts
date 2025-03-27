import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import { IColor, IConfigurator, IEngine, ITransmissionType } from '../models/configurator.interface';

@Injectable({
  providedIn: 'root'
})
export class configurator {

    private apiUrl = 'http://localhost:5269/api/Configurator';
    private selectedConfigs: IConfigurator[] = [];
    private selectedConfigSubject = new BehaviorSubject<IConfigurator | null>(null);
    selectedConfig$ = this.selectedConfigSubject.asObservable();

    constructor(private http: HttpClient) { }

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



}