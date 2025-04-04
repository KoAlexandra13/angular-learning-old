import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { appRoutes } from './app.routes';

import { CartComponent } from './cart/cart.component';
import { FiltersComponent } from './shared/components/filters/filters.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { EditProductComponent }from './product/edit-product/edit-product.component';

import { HeaderComponent } from './shared/components/header/header.component';
import { FilterLabelsComponent } from './shared/components/filter-labels/filter-labels.component';
import { ReviewListComponent } from './shared/components/review-list/review-list.component';

import { CartService } from './cart/cart.service';
import { ProductService } from './product/product.service';
import { AuthService } from './auth/auth.service';

import { AuthGuard } from './auth/auth.guard';

import { SearchPipe } from './shared/pipes/search.pipe';
import { AvailabilityDirective } from './shared/directives/availability.directive';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    FiltersComponent,
    ProductDetailsComponent,
    EditProductComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    FilterLabelsComponent,
    ReviewListComponent,
    SearchPipe,
    AvailabilityDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CartService,
    ProductService,
    AuthService,
    AuthGuard
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }