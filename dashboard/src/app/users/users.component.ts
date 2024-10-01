import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  pagination: any = {};
  page: number = 1;
  limit: number = 50;
  sort: string = 'name';
  search: string = '';
  role: string = 'admin';
  userImage: string = '';
  constructor(private _AuthService: AuthService, private _UsersService: UsersService) { }

  getAllUsers() {
    this._UsersService.getAll(this.limit, this.page, this.sort, this.search, this.role).subscribe({
      next: (res) => {
        this.users = res.data;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  changeActive(userId: string, active: boolean) {
    this._UsersService.updateOne(userId, { active: !active }).subscribe({
      next: (res) => {
        this.getAllUsers();
        alert('user updated');
      },
      error: (err) => { }
    })
  }

  deleteUser(userId: string) {
    this._UsersService.deleteOne(userId).subscribe({
      next: (res) => {
        this.getAllUsers();
        alert('user deleted')
      }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.getAllUsers();
  }

  searchData(search: string) {
    this.search = search;
    this.getAllUsers();
  }

  filterUsers(role: string) {
    this.role = role;
    this.getAllUsers();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.userImage = this._UsersService.userImage;
    this.getAllUsers();
  }

}
