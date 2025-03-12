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

}