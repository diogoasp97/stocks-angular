import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from './stock';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class StockService {
    private apiServerUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient){}

    public getStocks(): Observable<Stock[]>{
        return this.http.get<Stock[]>(`${this.apiServerUrl}/stock/all`);
    }

    public addStock(stock: Stock): Observable<Stock> {
      return this.http.post<Stock>(`${this.apiServerUrl}/stock/add`, stock);
    }
    
    public updateStock(stock: Stock): Observable<Stock> {
      return this.http.put<Stock>(`${this.apiServerUrl}/stock/update`, stock);
    }
    
    public deleteStock(stockId: number): Observable<void> {
      return this.http.delete<void>(`${this.apiServerUrl}/stock/delete/${stockId}`);
    }


}