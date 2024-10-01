import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl: string = '';
  private ordersRoute: string = '';
  private apiKey: string = '';
  productsImage: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.baseUrl = _GlobalService.baseUrl;
    this.ordersRoute = _GlobalService.orderRoute;
    this.apiKey = _GlobalService.apiKey;
    this.productsImage = _GlobalService.productsImages
  }

  getAll(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string = ''): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.ordersRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  getOne(orderId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.ordersRoute}/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  updateDelivered(orderId: string): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.ordersRoute}/${orderId}/delivered`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  updatePaid(orderId: string): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.ordersRoute}/${orderId}/paid`, {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }
}
