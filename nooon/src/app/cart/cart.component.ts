import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any = {};
  taxPrice: number = 100;
  subscription: any;
  length: number = 0;
  productImage: string = '';
  couponForm = new FormGroup({
    name: new FormControl(null, [Validators.required])
  })
  constructor(private _AuthService: AuthService, private _CartService: CartService,
    private _OrdersService: OrdersService, private _Router: Router) { }

  loadCart() {
    this.subscription = this._CartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data;
        this.length = res.length;
      },
      error: (err) => { }
    })
  }

  removeProduct(itemId: string) {
    this._CartService.removeFromCart(itemId).subscribe({
      next: (res) => {
        this.loadCart();
        alert('product removed from cart')
      },
      error: (err) => { }
    })
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        alert('cart is clear');
        this._Router.navigate(['/home']);
      },
      error: (err) => { }
    })
  }

  applyCoupon(formData: FormGroup) {
    this._CartService.applyCoupon(formData.value).subscribe({
      next: (res) => {
        this.loadCart();
        alert('coupon applied');
      },
      error: (err) => { }
    })
  }

  checkout() {
    this._OrdersService.createOrder().subscribe({
      next: (res) => {
        alert('order created successfully');
        this._Router.navigate(['/myOrders']);
      },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._CartService.productImage;
    this.loadCart();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
