import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Opiniao } from './opiniao';

@Injectable({
    providedIn: 'root'
})

export class StockService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public addStock(opiniao: Opiniao): Observable<Opiniao> {
      return this.http.post<Opiniao>(`${this.apiServerUrl}/opiniao/add`, opiniao);
    }
    
}