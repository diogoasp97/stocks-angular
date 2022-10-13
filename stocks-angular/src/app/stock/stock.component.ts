import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Opiniao } from '../opiniao/opiniao';
import { Stock } from './stock';
import { StockService } from './stock.service';

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
  public comentarios: String[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getStocks();
    this.test();
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

  public test(): void{
    for(const stock of this.stocks){
      this.comentarios.push("lol");
    }
  }

  public onOpenModal(stock: Stock, mode: string): void{
    console.log("Entrou no open Modal com " + mode);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode==='add'){
      console.log("deveria dar add");
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








}
