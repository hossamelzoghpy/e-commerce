import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { WishlistService } from '../services/wishlist.service';
import { Products } from '../interfaces/products';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {
  subscription: any;
  wishlist: Products[] = [];
  length: number = 0;
  productImage: string = '';
  constructor(private _AuthService: AuthService, private _WishlistService: WishlistService, private _CartService: CartService) { };

  loadWishlist() {
    this.subscription = this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.data;
        this.length = res.length;
      },
      error: (err) => { }
    })
  }

  deleteFromWishlist(productId: string) {
    this._WishlistService.deleteFromWishlist(productId).subscribe({
      next: (res) => {
        alert('product removed from wishlist');
        this.loadWishlist();
      },
      error: (err) => { }
    })
  }

  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (res) => { alert('product added to your cart') },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._WishlistService.productImage;
    this.loadWishlist();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
