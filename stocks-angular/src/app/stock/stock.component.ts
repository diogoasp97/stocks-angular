import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stock } from './stock';
import { StockService } from './stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public stocks: Stock[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
  }

  public getStocks(): void {
    this.stockService.getStocks().subscribe(
      (response: Stock[]) => {
        this.stocks = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }





}
