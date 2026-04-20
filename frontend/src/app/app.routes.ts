import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { InfoComponent } from './pages/info/info';
import { CategoriesComponent } from './pages/categories/categories';
import { CartComponent } from './pages/cart/cart';
import { SellComponent } from './pages/sell/sell';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'QuickMart | Home' },
  { path: 'products', component: ProductsComponent, title: 'QuickMart | Product Catalog' },
  { path: 'categories', component: CategoriesComponent, title: 'QuickMart | Categories' },
  { path: 'cart', component: CartComponent, title: 'QuickMart | Shopping Cart' },
  { path: 'sell', component: SellComponent, title: 'QuickMart | Sell Product' },
  { path: 'login', component: LoginComponent, title: 'QuickMart | Login' },
  { path: 'register', component: RegisterComponent, title: 'QuickMart | Registration' },
  { path: 'info/:type', component: InfoComponent, title: 'QuickMart | Help Center' },
  { path: 'about', redirectTo: 'info/about-us' },
  { path: '**', redirectTo: '' }
];
