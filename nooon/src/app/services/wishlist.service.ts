import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl: string = '';
  private wishlistRoute: string = '';
  productImage: string = '';
  apiKey: string = ``;
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.wishlistRoute = this._GlobalService.wishlistRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.productImage=this._GlobalService.productsImage;
  };

  addToWishlist(product: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.wishlistRoute}`, { product }, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }
  getWishlist(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.wishlistRoute}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  deleteFromWishlist(product: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.wishlistRoute}/${product}`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }
}
