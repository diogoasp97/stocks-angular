import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './stock';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class StockService {
    private apiServerUtl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getStocks(): Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUtl}/stock/all`);
    }


}