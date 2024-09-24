import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl: string = '';
  private ordersRoute: string = '';
  productImage: string = '';
  apiKey: string = ``;
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.ordersRoute = this._GlobalService.ordersRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.productImage = this._GlobalService.productsImage;
  };

  getOrders(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.ordersRoute}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  createOrder(): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.ordersRoute}`, { address: { city: 'Shebin', state: 'Menofia' } }, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }
}
