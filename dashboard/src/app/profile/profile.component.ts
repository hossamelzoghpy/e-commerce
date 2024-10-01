import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: any;
  infoError: string = '';
  currentPasswordError: string = '';
  passwordError: string = '';
  user: any = {};
  userImage: string = '';
  userName: string = '';
  imageFile: any;
  getFile(event: any) {
    const image = event.target.files[0];
    if (image) { this.imageFile = image };
  }

  passwordForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })
  constructor(private _AuthService: AuthService, private _ProfileService: ProfileService) { }

  loadLoggedUser() {
    this.subscription = this._ProfileService.getLoggedUser().subscribe({
      next: (res) => { this.user = res.data },
      error: (err) => { }
    })
  }

  updateLoggedUser() {
    const formData = new FormData();
    formData.append('name', this.userName);
    if (this.imageFile) { formData.append('image', this.imageFile) };
    this._ProfileService.updateLoggedUser(formData).subscribe({
      next: (res) => {
        this.loadLoggedUser();
        alert('user information updated')
      }
    })
  }

  changeUserPassword(formData: FormGroup) {
    this._ProfileService.updateLoggedUserPassword(formData.value).subscribe({
      next: (res) => {
        localStorage.setItem('user', res.token);
        this._AuthService.saveCurrentUser();
        alert('password changed')
      }, error: (err) => {
        err.error.errors.map((error: any) => {
          if (error.path === 'currentPassword') { this.currentPasswordError = error.msg }
          else if (error.path === 'password') { this.passwordError = error.msg }
        })
      }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.userImage = this._ProfileService.userImage;
    this.loadLoggedUser();
  };

  ngOnDestroy(): void { this.subscription.unsubscribe() };
}
