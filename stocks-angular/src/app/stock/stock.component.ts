import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Stock } from './stock';
import { StockService } from './stock.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public stocks: Stock[];
  public editedStock: Stock;
  public deletedStock: Stock;
  public infoStock: Stock;
  public commentStock: Stock;
  public date: Date;
  public comentario: string;

  constructor(private stockService: StockService, private datePipe: DatePipe) { }

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

  public onOpenModal(stock: Stock, mode: string): void{
    console.log("Entrou no open Modal com " + mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      button.setAttribute('data-target', '#addStockModal');
    }
    if(mode==='edit'){
      button.setAttribute('data-target', '#updateStockModal');
      this.editedStock = stock;
    }
    if(mode==='delete'){
      button.setAttribute('data-target', '#deleteStockModal');
      this.deletedStock = stock;
    }
    if(mode==='info'){
      button.setAttribute('data-target', '#infoStockModal');
      this.infoStock = stock;
    }
    if(mode==='comment'){
      button.setAttribute('data-target', '#commentStockModal');
      this.commentStock = stock;
    }

    container.appendChild(button);
    button.click();
  }

  public searchStocks(key: string): void{
    const results: Stock[] = [];
    for(const stock of this.stocks){
      if  (stock.name.toLowerCase().indexOf(key.toLowerCase()) !== -1 
      ||  stock.ticker.toLowerCase().indexOf(key.toLowerCase()) !== -1 )  {
        results.push(stock);
      }
    }

      this.stocks = results;

      if(results.length === 0 || !key){
        this.getStocks();
      }
  }


  public onAddStock(addForm: NgForm): void{
    document.getElementById('add-stock-form').click();
    this.stockService.addStock(addForm.value).subscribe(
      (response: Stock) => {
        console.log(response);
        this.getStocks();
        addForm.reset();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onDeleteStock(stockId: number): void{
    this.stockService.deleteStock(stockId).subscribe(
      (response: void) => {
        console.log(response);
        this.getStocks();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateStock(stock: Stock): void{
    this.stockService.updateStock(stock).subscribe(
      (response: Stock) => {
        console.log(response);
        this.getStocks();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public insertComment(stock: Stock, stockId: number, comment: string): void{
    this.date = new Date(Date.now());
    this.stockService.addComment(stock, stockId, comment, this.datePipe.transform(this.date, "yyyy-MM-dd")).subscribe(
      (response: Stock) => {
        console.log(response);
        document.getElementById('closeButton').click();
        this.comentario = '';
        this.getStocks();
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }








}
