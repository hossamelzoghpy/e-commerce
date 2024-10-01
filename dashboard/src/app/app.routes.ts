import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { rolesGuard } from './guards/roles.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', title: 'login', component: LoginComponent },
  { path: 'home', title: 'Home', canActivate: [authGuard], loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  {
    path: 'categories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Categories', loadComponent: () => import('./categories/categories.component').then(m => m.CategoriesComponent), },
      { path: 'create', title: 'create Category', loadComponent: () => import('./add-category/add-category.component').then(m => m.AddCategoryComponent) },
      { path: ':id/update', title: 'update Category', loadComponent: () => import('./update-category/update-category.component').then(m => m.UpdateCategoryComponent) }
    ]
  },
  {
    path: 'subcategories', canActivate: [authGuard],
    children: [
      { path: '', title: 'All Subcategories', loadComponent: () => import('./subcategories/subcategories.component').then(m => m.SubcategoriesComponent) },
      { path: 'create', title: 'create Subcategory', loadComponent: () => import('./add-subcategory/add-subcategory.component').then(m => m.AddSubcategoryComponent) },
      { path: ':id/update', title: 'update Subcategory', loadComponent: () => import('./update-subcategory/update-subcategory.component').then(m => m.UpdateSubcategoryComponent) }
    ]
  },
  {
    path: 'products', canActivate: [authGuard],
    children: [
      { path: '', title: 'products', loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) },
      { path: 'create', title: 'create product', loadComponent: () => import('./add-product/add-product.component').then(m => m.AddProductComponent) },
      { path: ':id/update', title: 'update product', loadComponent: () => import('./update-product/update-product.component').then(m => m.UpdateProductComponent) }
    ]
  },

  {
    path: 'coupons', canActivate: [authGuard],
    children: [
      { path: '', title: 'coupons', loadComponent: () => import('./coupons/coupons.component').then(m => m.CouponsComponent) },
      { path: 'create', title: 'create coupon', loadComponent: () => import('./add-coupon/add-coupon.component').then(m => m.AddCouponComponent) },
      { path: ':id/update', title: 'update coupon', loadComponent: () => import('./update-coupon/update-coupon.component').then(m => m.UpdateCouponComponent) }
    ]
  },

  {
    path: 'orders', canActivate: [authGuard],
    children: [
      { path: '', title: 'orders', loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) },
    ]
  },
  {
    path: 'users', canActivate: [authGuard, rolesGuard],
    children: [
      { path: '', title: 'users', loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) },
      { path: 'create', title: 'create user', loadComponent: () => import('./add-user/add-user.component').then(m => m.AddUserComponent) },
      { path: ':id', title: 'user details', loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent) },
    ]
  },
  { path: 'profile', title: 'profile', loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent) },
  { path: 'forgetPassword', title: 'forget password', loadComponent: () => import('./forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
  { path: '**', title: '404 Not Found', component: NotFoundComponent },
];
