import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CategoriesService } from '../services/categories.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {
  categoryForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.min(2), Validators.max(50)])
  })

  constructor(private _AuthService: AuthService, private _CategoryService: CategoriesService, private _Router: Router) { }

  addCategory(formData: FormGroup) {
    this._CategoryService.createOne(formData.value).subscribe({
      next: (res) => {
        alert('New Category Added');
        this._Router.navigate(['/categories'])
      },
      error: (err) => { }
    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
  }

}
