import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService) {
    this._AuthService.currentUser.subscribe({
      next: () => {
        if (this._AuthService.currentUser.getValue() !== null) {
          this.isLogin = true
        } else { this.isLogin = false }
      }
    })
  }

  logout() { 
    this._AuthService.logout();
  }

}
