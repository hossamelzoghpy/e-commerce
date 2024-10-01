import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })
  phoneImage: string = '';
  invalidLogin: string = '';
  subscription: any;
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  login(formData: FormGroup) {
    this._AuthService.login(formData.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('user', res.token)
          this._AuthService.saveCurrentUser()
        }
        this._Router.navigate(['/home'])
      }, error: (err) => {
        this.invalidLogin = err.error.message
      }
    })
  }

  getCsrf() {
    this.subscription = this._AuthService.addCsrf().subscribe({
      next: (res) => { },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this.phoneImage = this._AuthService.loginPhoto
    this.getCsrf();
  }

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
