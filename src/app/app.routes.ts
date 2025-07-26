import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './core/guards';

export const routes: Routes = [
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./app/home/home.component').then((m) => m.HomeComponent),
    title: 'Home - Gen Commerce',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./app/products/products.component').then(
        (m) => m.ProductsComponent
      ),
    title: 'Products - Gen Commerce',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./app/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
    title: 'Product Details - Gen Commerce',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./app/login/login.component').then((m) => m.LoginComponent),
    title: 'Login - Gen Commerce',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./app/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    title: 'Register - Gen Commerce',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./app/cart/cart.component').then((m) => m.CartComponent),
    title: 'Shopping Cart - Gen Commerce',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./app/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
    canActivate: [authGuard],
    title: 'Checkout - Gen Commerce',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./app/user-dashboard/user-dashboard.component').then(
        (m) => m.UserDashboardComponent
      ),
    canActivate: [authGuard],
    title: 'User Dashboard - Gen Commerce',
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./app/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    canActivate: [adminGuard],
    title: 'Admin Dashboard - Gen Commerce',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
