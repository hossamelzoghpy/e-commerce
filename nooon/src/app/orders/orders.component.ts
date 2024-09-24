import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { Pagination } from '../interfaces/pagination';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {
  subscription: any;
  orders: any[] = [];
  productImage: string = '';
  search: string = '';
  page: number = 1;
  pagination: Pagination = {};
  constructor(private _AuthService: AuthService, private _OrdersService: OrdersService) { };

  loadOrders() {
    this.subscription = this._OrdersService.getOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadOrders();
  }

  searchProducts(search: string) {
    this.search = search;
    this.loadOrders();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productImage = this._OrdersService.productImage;
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
