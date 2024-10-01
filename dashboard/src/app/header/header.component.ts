import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: any = {};
  constructor(private _AuthService: AuthService, private _Router: Router) { }
  logout() {
    this._AuthService.logout();
    this._Router.navigate(['/login'])
  }

  ngOnInit(): void {
    this.user = this._AuthService.currentUser.getValue();
  }
}
