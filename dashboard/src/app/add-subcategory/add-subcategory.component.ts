import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SubcategoriesService } from '../services/subcategories.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.scss'
})
export class AddSubcategoryComponent implements OnInit {
  subscription: any;
  categories: any[] = [];
  subcategoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50)]),
    category: new FormControl(null, [Validators.required]),
  })

  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService,
    private _CategoriesService: CategoriesService, private _Router: Router) { }

  addSubcategory(formData: FormGroup) {
    this._SubcategoriesService.createOne(formData.value).subscribe({
      next: (res) => {
        alert('New Category Added');
        this._Router.navigate(['/subcategories'])
      },
      error: (err) => { }
    })
  }

  loadCategories() {
    this.subscription = this._CategoriesService.getAll(200, 1, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadCategories();
  }
}
