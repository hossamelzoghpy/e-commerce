import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = 'http://localhost:3300';
  authRoute: string = '/api/v1/authen';
  productsRoute: string = '/api/v1/products';
  reviewsRoute: string = '/api/v1/reviews';
  cartsRoute: string = '/api/v1/carts';
  ordersRoute: string = '/api/v1/orders';
  wishlistRoute: string = '/api/v1/wishlist';
  productsImage: string = `${this.baseUrl}/images/products/`;
  usersRoute: string = '/api/v1/users';
  usersImage: string = `${this.baseUrl}/images/users/`;
  apiKey: string = 'secret123';
  constructor() { }
}
