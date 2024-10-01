import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private baseUrl: string = '';
  private couponsRoute: string = '';
  private apiKey: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.baseUrl = _GlobalService.baseUrl;
    this.couponsRoute = _GlobalService.couponsRoute;
    this.apiKey = _GlobalService.apiKey;
  }

  getAll(limit: number = 50, page: number = 1, sort: string = '-expireTime', search: string = ''): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.couponsRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  getOne(couponId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.couponsRoute}/${couponId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  createOne(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.couponsRoute}`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  updateOne(couponId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.couponsRoute}/${couponId}`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  deleteOne(couponId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.couponsRoute}/${couponId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

}
