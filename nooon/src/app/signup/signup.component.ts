import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  phoneImage: string = '';
  passwordError: string = '';
  emailError: string = '';
  phoneError: string = '';
  signupForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  })
  constructor(private _AuthService: AuthService, private _Router: Router) { }

  signup(formData: FormGroup) {
    this._AuthService.signup(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.token);
        this._AuthService.saveCurrentUser();
        this._Router.navigate(['/home']);
      },
      error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'email') { this.emailError = error.msg };
          if (error.path === 'password') { this.passwordError = error.msg };
          if (error.path === 'phone') { this.phoneError = error.msg };
        })
      }
    })
  }
  ngOnInit(): void {
    this.phoneImage = this._AuthService.authPhoto;
  }
}
