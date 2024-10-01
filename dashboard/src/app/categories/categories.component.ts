import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  categories: any[] = [];
  length: number = 0;
  pagination: any = {};
  limit: number = 50;
  page: number = 1;
  sort: string = 'name';
  search: string = '';
  constructor(private _AuthService: AuthService, private _CategoriesService: CategoriesService) { }

  loadCategories() {
    this.subscription = this._CategoriesService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.categories = res.data;
        this.length = res.length;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  deleteCategory(categoryId: string) {
    this._CategoriesService.deleteOne(categoryId).subscribe({
      next: (res) => {
        this.loadCategories();
        alert('category deleted successfully')
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadCategories();
  }

  searchData(search: string) {
    this.search = search;
    this.loadCategories();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
