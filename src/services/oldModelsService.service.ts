import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import { ICard } from '../models/oldModels.interface';

@Injectable({
  providedIn: 'root'
})
export class oldModelsService {
    cardData: ICard [] = []

    private apiUrl = 'http://localhost:5269';

    constructor(private http: HttpClient) { }

    getOldModels(): Observable<ICard[]> {
        return this.http.get<ICard[]>(`${this.apiUrl}/api/PastModels`)
    }

    getOldModelsById(id:number): Observable<ICard[]> {
      return this.http.get<ICard[]>(`${this.apiUrl}/api/PastModels/${id}`)
    }

    getOldModelsImage(id: number | undefined): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/api/PastModels/image/${id}`, { responseType: 'blob' });
    }

    addOldModels(newCard:ICard): Observable<ICard[]> {
      return this.http.post<ICard[]>(`${this.apiUrl}/api/PastModels`, newCard)
    }

    deleteOldModels(id: number | null): Observable<any> {
      if (id === null) {
        throw new Error('Érvénytelen konfigurátor ID');
      }
      return this.http.delete<void>(`${this.apiUrl}/api/PastModels/${id}`);
    }
    
    

}