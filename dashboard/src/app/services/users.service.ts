import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl: string = '';
  private usersRoute: string = '';
  private apiKey: string = '';
  userImage: string = '';
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = _GlobalService.baseUrl;
    this.usersRoute = _GlobalService.usersRoute;
    this.userImage = _GlobalService.userImage;
    this.apiKey = _GlobalService.apiKey;
  }
  getAll(limit: number = 50, page: number = 1, sort: string = 'name', search: string = '', role = 'admin'): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.usersRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}&role=${role}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  getOne(userId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.usersRoute}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  createOne(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.usersRoute}`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  updateOne(userId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.usersRoute}/${userId}`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  changePassword(userId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.usersRoute}/${userId}/changePassword`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

  deleteOne(userId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.usersRoute}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'X-CSRF-Token': `${Cookies.get('cookies')}`,
        'X-API-KEY': `${this.apiKey}`
      },
      withCredentials: true
    })
  }

}
