import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductFilter } from '../shared/models/filter.module';
import { Product, ProductWithReviews } from '../shared/models/product.model';
import { Review } from '../shared/models/review.model';
import { ProductHttpService } from './product-http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private productHttpService: ProductHttpService) {}
  
  getProducts(filters: ProductFilter = {}): Observable<ProductWithReviews[]> {
    let params = new HttpParams();

    if (filters.priceMin) params = params.set('price_gte', filters.priceMin);
    if (filters.priceMax) params = params.set('price_lte', filters.priceMax);
    if (filters.ratingMin) params = params.set('rating.rate_gte', filters.ratingMin);
    if (filters.ratingMax) params = params.set('rating.rate_lte', filters.ratingMax);
    if (filters.inStock) params = params.set('stock_gte', "1");
    if (filters.hasReviews) {
      params = params.set('_embed', 'reviews');
    }

    return this.productHttpService.fetchProducts(params);
  }

  deleteProduct(id: string): Observable<void> {
    return this.productHttpService.deleteProduct(id);
  }

  getProductById(id: string): Observable<Product> {
    return this.productHttpService.fetchProductById(id);
  }

  getReviewsByProductId(productId: string): Observable<Review[]> {
    return this.productHttpService.fetchReviewsByProductId(productId);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.productHttpService.updateProduct(id, product);
  }
}