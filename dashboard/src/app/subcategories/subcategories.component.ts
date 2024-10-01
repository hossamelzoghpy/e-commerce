import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SubcategoriesService } from '../services/subcategories.service';

@Component({
  selector: 'app-subcategories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './subcategories.component.html',
  styleUrl: './subcategories.component.scss'
})
export class SubcategoriesComponent implements OnInit, OnDestroy {
  subscription: any;
  subcategories: any[] = [];
  length: number = 0;
  pagination: any = {};
  limit: number = 50;
  page: number = 1;
  sort: string = 'category name';
  search: string = '';
  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService) { }

  loadSubcategories() {
    this.subscription = this._SubcategoriesService.getAll(this.limit, this.page, this.sort, this.search).subscribe({
      next: (res) => {
        this.subcategories = res.data;
        this.length = res.length;
        this.pagination = res.pagination;
      },
      error: (err) => { }
    })
  }

  deleteSubcategory(categoryId: string) {
    this._SubcategoriesService.deleteOne(categoryId).subscribe({
      next: (res) => {
        this.loadSubcategories();
        alert('Subcategory deleted successfully')
      },
      error: (err) => { }
    })
  }

  changePage(page: number) {
    this.page = page;
    this.loadSubcategories();
  }

  searchData(search: string) {
    this.search = search;
    this.loadSubcategories();
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadSubcategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
