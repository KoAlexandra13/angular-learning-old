import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductWithReviews } from '../shared/models/product.model';
import { Review } from '../shared/models/review.model';

@Injectable({ providedIn: 'root' })
export class ProductHttpService {
  private apiUrl = 'http://localhost:3000/products';
  private reviewsUrl = 'http://localhost:3000/reviews';

  constructor(private http: HttpClient) {}
  
  fetchProducts(params: HttpParams): Observable<ProductWithReviews[]> {
    return this.http.get<ProductWithReviews[]>(this.apiUrl, { params });
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  fetchProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  fetchReviewsByProductId(productId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.reviewsUrl}/?productId=${productId}`);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.apiUrl}/${id}`, product);
  }
}