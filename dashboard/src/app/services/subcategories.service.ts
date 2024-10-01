import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  private baseUrl: string = '';
  private categoriesRoute: string = '';
  private subcategoryRoute: string = '';
  private apiKey: string = '';
  constructor(private _GlobalService: GlobalService, private _HttpClient: HttpClient) {
    this.baseUrl = this._GlobalService.baseUrl;
    this.categoriesRoute = _GlobalService.categoriesRoute;
    this.subcategoryRoute = this._GlobalService.subcategoriesRoute;
    this.apiKey = this._GlobalService.apiKey;
  }
  getAll(limit: number = 50, page: number = 1, sort: string = 'name', search: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.subcategoryRoute}?limit=${limit}&page=${page}&sort=${sort}&search=${search}`, {
      headers: {
        'X-API-KEY': this.apiKey,
      },
      withCredentials: true
    })
  };

  getAllFilter(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.categoriesRoute}/${categoryId}/subcategories?limit=200&sort=name`, {
      headers: {
        'X-API-KEY': this.apiKey,
      },
      withCredentials: true
    })
  }

  getOne(categoryId: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}${this.subcategoryRoute}/${categoryId}`, {
      headers: {
        'X-API-KEY': this.apiKey,
      },
      withCredentials: true
    })
  };

  createOne(formData: any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}${this.subcategoryRoute}`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': this.apiKey,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  };

  updateOne(categoryId: string, formData: any): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}${this.subcategoryRoute}/${categoryId}`, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': this.apiKey,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }

  deleteOne(categoryId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}${this.subcategoryRoute}/${categoryId}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('user')}`,
        'X-API-KEY': this.apiKey,
        "X-CSRF-Token": `${Cookies.get('cookies')}`
      },
      withCredentials: true
    })
  }
}
