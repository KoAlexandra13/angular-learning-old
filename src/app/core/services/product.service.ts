import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductFilter } from '../../shared/models/filter.module';
import { Product, ProductWithReviews } from '../../shared/models/product.model';
import { Review } from '../../shared/models/review.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private reviewsUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}
  
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

    return this.http.get<ProductWithReviews[]>(this.apiUrl, { params });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getReviewsByProductId(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewsUrl}/?productId=${productId}`);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }
}