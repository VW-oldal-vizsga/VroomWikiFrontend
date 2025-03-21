import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { IColor, IConfigurator, IEngine, ITransmissionType } from '../models/configurator.interface';

@Injectable({
  providedIn: 'root'
})
export class configurator {

    private apiUrl = 'http://localhost:5269/api/Configurator';
    private selectedConfigs: IConfigurator[] = [];

    constructor(private http: HttpClient) { }

    getConfigurators(): Observable<IConfigurator[]> {
      return this.http.get<IConfigurator[]>(`${this.apiUrl}`)
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
  
    setSelectedConfigs(configs: IConfigurator[]): void {
      this.selectedConfigs = configs;
    }
  
    addSelectedConfig(config: IConfigurator): void {
      if (!this.selectedConfigs.some(c => c.id === config.id)) {
        this.selectedConfigs.push(config);
      }
    }
  
    removeSelectedConfig(config: IConfigurator): void {
      const index = this.selectedConfigs.findIndex(c => c.id === config.id);
      if (index !== -1) {
        this.selectedConfigs.splice(index, 1);
      }
    }


}