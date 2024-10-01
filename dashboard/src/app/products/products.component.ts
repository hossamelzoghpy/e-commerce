import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from './../services/products.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  subscription: any;
  limit: number = 15;
  page: number = 1;
  sort: string = 'category subcategory name';
  search: string = '';
  pagination: any = {};
  productImage: string = '';
  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService) { }

  loadProducts() {
    this.subscription = this._ProductsService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.products = res.data
        this.pagination = res.pagination
      },
      error: (err) => { }
    })
  }

  deleteProduct(productId: string) {
    this._ProductsService.deleteOne(productId).subscribe({
      next: (res) => {
        this.loadProducts();
        alert('product deleted');
      },
      error: (err) => { }
    })
  }

  searchData(search: string) {
    this.search = search;
    this.loadProducts();
  }

  changePage(page: number) {
    this.page = page;
    this.loadProducts();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._ProductsService.productsImage;
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
