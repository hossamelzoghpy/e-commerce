import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string = '';
  private productsRoute: string = '';
  private apiKey: string = '';
  productsImage: string = '';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.baseUrl = _GlobalService.baseUrl;
    this.apiKey = _GlobalService.apiKey;
    this.productsRoute = _GlobalService.productsRoute;
    this.productsImage = _GlobalService.productsImages;
  }

  getAll(limit: number = 50, page: number = 1, sort: string = '-createdAt', search: string = ''): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.productsRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, {
      headers: { 'X-API-KEY': this.apiKey },
      withCredentials: true
    })
  }

  getOne(productId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.productsRoute}/${productId}`, {
      headers: { 'X-API-KEY': this.apiKey },
      withCredentials: true
    })
  }

  createOne(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.productsRoute}`, formData, {
      headers: {
        'X-API-KEY': this.apiKey,
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'authorization': `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  updateOne(productId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.productsRoute}/${productId}`, formData, {
      headers: {
        'X-API-KEY': this.apiKey,
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'authorization': `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  deleteOne(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.productsRoute}/${productId}`, {
      headers: {
        'X-API-KEY': this.apiKey,
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'authorization': `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

}
