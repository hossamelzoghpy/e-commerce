import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = '';
  private usersRoute: string = '';
  userImage: string = '';
  apiKey: string = ``
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.usersRoute = this._GlobalService.usersRoute;
    this.apiKey = this._GlobalService.apiKey;
    this.userImage = this._GlobalService.usersImage;
  }

  getUser(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.usersRoute}/me`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  updateUser(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.usersRoute}/updateMe`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  changeUserPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.usersRoute}/changeMyPassword`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

  deleteUser(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.usersRoute}/deleteMe`, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`,
        authorization: `Bearer ${localStorage.getItem('user')}`
      },
      withCredentials: true
    })
  }

}
