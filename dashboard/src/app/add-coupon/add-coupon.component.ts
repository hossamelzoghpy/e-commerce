import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CouponsService } from '../services/coupons.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-coupon',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.scss'
})
export class AddCouponComponent implements OnInit {
  couponForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    discount: new FormControl(null, [Validators.required]),
    expireTime: new FormControl(null, [Validators.required])
  })
  constructor(private _AuthService: AuthService, private _CouponsService: CouponsService, private _Router: Router) { }

  createCoupon(formData: FormGroup) {
    this._CouponsService.createOne(formData.value).subscribe({
      next: (res) => {
        alert('coupon created');
        this._Router.navigate(['/coupons'])
      },
      error: (err) => { },
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

}
