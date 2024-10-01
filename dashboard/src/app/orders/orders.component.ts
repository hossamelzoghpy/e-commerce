import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrdersService } from '../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  productsImage: string = '';
  pagination: any = {};
  page: number = 1;
  limit: number = 50;
  search: string = '';
  sort: string = '-createdAt';
  constructor(private _AuthService: AuthService, private _OrdersService: OrdersService) { }

  getAllOrders() {
    this._OrdersService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.orders = res.data;
        this.pagination = res.pagination
      },
      error: (err) => { }
    })
  }

  updatePaid(orderId: string) {
    this._OrdersService.updatePaid(orderId).subscribe({
      next: (res) => {
        this.getAllOrders();
        alert('order paid successfully');
      },
      error: (err) => { }
    })
  }

  updateDelivered(orderId: string) {
    this._OrdersService.updateDelivered(orderId).subscribe({
      next: (res) => {
        this.getAllOrders();
        alert('order delivered successfully');
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.getAllOrders();
  }

  searchData(search: string) {
    this.search = search;
    this.getAllOrders();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.productsImage = this._OrdersService.productsImage;
    this.getAllOrders();
  }
}
