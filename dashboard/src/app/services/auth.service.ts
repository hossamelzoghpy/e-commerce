import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = '';
  private authRoute: string = '';
  private apiKey: string = '';
  currentUser = new BehaviorSubject(null);
  loginPhoto: string = 'phone.svg';

  constructor(private _HttpClient: HttpClient, private _GlobalService: GlobalService, private _Router: Router) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.authRoute = this._GlobalService.authRoute;
    this.apiKey = this._GlobalService.apiKey;
    if (localStorage.getItem('user') !== null) { this.saveCurrentUser() };
  }

  saveCurrentUser() {
    const token: any = localStorage.getItem('user');
    this.currentUser.next(jwtDecode(token));
  }

  checkToken() {
    const token: any = localStorage.getItem('user');
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp! < Date.now() / 1000) {
      this.logout();
      this._Router.navigate(['/login'])
    }
  }

  addCsrf(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}`, {
      headers: { "X-API-KEY": `${this.apiKey}` },
      withCredentials: true
    })
  }

  login(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/login`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  sendMail(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/forgetPassword`, formData, {
      headers: {
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  verifyCode(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.authRoute}/verifyCode`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('verify')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  resetPassword(formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.authRoute}/resetCode`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('verify')}`,
        "X-API-KEY": `${this.apiKey}`,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null)
  }
}
