import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl: string = '';
  private profileRoute: string = '';
  userImage: string = '';
  apiKey: string = '';
  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.profileRoute = this._GlobalService.usersRoute;
    this.userImage = this._GlobalService.userImage;
    this.apiKey = this._GlobalService.apiKey;
  }

  getLoggedUser(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.profileRoute}/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    }
    )
  }

  updateLoggedUser(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.profileRoute}/updateMe`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  updateLoggedUserPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.profileRoute}/changeMyPassword`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }
}
