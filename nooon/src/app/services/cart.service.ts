import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl: string = '';
  private cartsRoute: string = '';
  productImage: string = '';
  apiKey: string = ``;
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.cartsRoute = this._GlobalService.cartsRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.productImage = this._GlobalService.productsImage;
  };

  getCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.cartsRoute}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  addToCart(product: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.cartsRoute}`, { product }, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  applyCoupon(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.cartsRoute}/applyCoupon`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  removeFromCart(item: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.cartsRoute}/${item}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  clearCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.cartsRoute}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }



}
