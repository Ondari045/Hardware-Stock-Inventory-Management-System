import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpBackend, HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../app/_services/token-storage.service'

const addHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const requestHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ItemsServiceService {
  apiUrl: string = 'https://stock-inv.herokuapp.com/v1/product/add/';
  api2: string = 'https://stock-inv.herokuapp.com/v1/product/request/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }
   // Create new item
  postItem(name: string, received: string, in_stock: string, spoiled: string, buying_price: number, selling_price: number): Observable<any> {
      return this.httpClient.post(this.apiUrl,{
        name, received, in_stock, spoiled, buying_price, selling_price
      }, 
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this.tokenStorage.getToken()}` })
      });
  }
  //Request Item
  requestItem(item_name: string, s_name: string, s_email: string, quantity: any): Observable<any> {
    return this.httpClient.post(this.api2,{
      item_name, s_name, s_email, quantity
        }, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Token ${this.tokenStorage.getToken()}` })
        });
}
}