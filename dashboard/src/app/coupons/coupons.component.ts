import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss'
})
export class CouponsComponent implements OnInit, OnDestroy {
  coupons: any[] = [];
  subscription: any;
  pagination: any = {};
  page: number = 1;
  limit: number = 50;
  search: string = '';
  sort: string = '-expireTime';
  constructor(private _AuthService: AuthService, private _couponsService: CouponsService) { }

  getAllCoupons() {
    this.subscription = this._couponsService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.coupons = res.data;
        this.pagination = res.pagination
      },
      error: (err) => { }
    })
  }

  deleteCoupon(couponId: string) {
    this._couponsService.deleteOne(couponId).subscribe({
      next: (res) => {
        this.getAllCoupons();
        alert('Coupon Deleted Successfully')
      },
      error(err) { },
    })
  }

  changePage(page: number) {
    this.page = page;
    this.getAllCoupons();
  }

  searchData(search: string) {
    this.search = search;
    this.getAllCoupons();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.getAllCoupons();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
