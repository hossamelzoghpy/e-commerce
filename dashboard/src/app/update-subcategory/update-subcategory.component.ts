import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-update-subcategory',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-subcategory.component.html',
  styleUrl: './update-subcategory.component.scss'
})
export class UpdateSubcategoryComponent {
  subcategoryId: string = '';
  categories: any[] = [];
  subcategory: any = {};
  subscription: any;
  categorySubscription: any;
  subcategoryForm = new FormGroup({
    name: new FormControl(null),
    category: new FormControl(null)
  })

  constructor(private _AuthService: AuthService, private _SubcategoriesService: SubcategoriesService,
    private _CategoriesService: CategoriesService, private _Router: Router, private _ActivatedRoute: ActivatedRoute
  ) { }

  loadSubcategory(subcategoryId: string) {
    this.subscription = this._SubcategoriesService.getOne(subcategoryId).subscribe({
      next: (res) => { this.subcategory = res.data },
      error: (err) => { }
    })
  }

  loadCategories() {
    this.categorySubscription = this._CategoriesService.getAll(200, 1, 'name', '').subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => { }
    })
  }

  updateSubcategory(subcategoryId: string, formData: FormGroup) {
    this._SubcategoriesService.updateOne(subcategoryId, formData.value).subscribe({
      next: (res) => {
        alert('category updated');
        this._Router.navigate(['/subcategories']);
      },
      error: () => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.subcategoryId = this._ActivatedRoute.snapshot.params['id'];
    this.loadSubcategory(this.subcategoryId)
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.categorySubscription.unsubscribe();
  }
}
