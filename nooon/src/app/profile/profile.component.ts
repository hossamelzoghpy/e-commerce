import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit, OnDestroy {
  subscription: any;
  user: any = {};
  userImage: string = '';
  userPhoto: any;
  username: string = '';
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })
  constructor(private _AuthService: AuthService, private _ProfileService: ProfileService) { };

  getImage(event: any) {
    const image = event.target.files[0];
    if (image) {
      this.userPhoto = image;
    }
  }

  loadUser() {
    this.subscription = this._ProfileService.getUser().subscribe({
      next: (res) => {
        this.user = res.data;
      },
      error: (err) => { }
    })
  }

  updateUser() {
    const userForm = new FormData();
    if (this.username) {
      userForm.append('name', this.username);
    }
    if (this.userPhoto) {
      userForm.append('image', this.userPhoto);
    }
    this._ProfileService.updateUser(userForm).subscribe({
      next: () => {
        this.loadUser();
        alert('user data updated')
      },

    })
  }

  changePassword(formData: FormGroup) {
    this._ProfileService.changeUserPassword(formData.value).subscribe({
      next: (res) => {
        alert('your password changed')
        localStorage.setItem('user', res.token);
        this._AuthService.saveCurrentUser();
      },
      error: () => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.userImage = this._ProfileService.userImage;
    this.loadUser();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
