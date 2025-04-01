import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { CartComponent } from './cart/cart.component';
import { AuthComponent } from './auth/auth.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'product/edit/:id', component: EditProductComponent },        
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'auth', component: AuthComponent }, 
];