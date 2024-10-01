import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { SubcategoriesService } from '../services/subcategories.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  categories: any[] = [];
  subcategories: any[] = [];
  // ---------
  productName: string = '';
  productDescription: string = '';
  productCategory: string = '';
  productSubcategory: string = '';
  productPrice: string = '0';
  productQuantity: string = '0';
  productCover: any;
  productImages: any;
  getCover(event: any) {
    const cover = event.target.files[0];
    if (cover) {
      this.productCover = cover;
    }
  }

  getImages(event: any) {
    const images = event.target.files;
    if (images) {
      this.productImages = images;
    }
  }
  // ---------

  constructor(private _AuthService: AuthService, private _ProductsService: ProductsService,
    private _CategoriesService: CategoriesService, private _SubcategoriesService: SubcategoriesService,
    private _Router: Router) { }

  loadCategories() {
    this._CategoriesService.getAll(200, 1, 'name', '').subscribe({
      next: (res) => { this.categories = res.data },
      error: (err) => { }
    })
  }

  loadSubcategories(categoryId: string) {
    this.productCategory = categoryId;
    this._SubcategoriesService.getAllFilter(categoryId).subscribe({
      next: (res) => { this.subcategories = res.data },
      error: (err) => { }
    })
  }

  createProduct() {
    const formData = new FormData();
    formData.append('name', this.productName);
    formData.append('description', this.productDescription);
    formData.append('category', this.productCategory);
    formData.append('subcategory', this.productSubcategory);
    formData.append('quantity', this.productQuantity);
    formData.append('price', this.productPrice);
    if (this.productCover) {
      formData.append('cover', this.productCover);
    };
    if (this.productImages) {
      for (let i = 0; i < this.productImages.length; i++) {
        formData.append('images', this.productImages[i]);
      }
      console.log(formData.get('images'));
    };
    this._ProductsService.createOne(formData).subscribe({
      next: (res) => {
        alert('product added');
        this._Router.navigate(['/products']);
      },

    })
  }

  ngOnInit(): void {
    this._AuthService.checkToken();
    this.loadCategories();
  }

}
