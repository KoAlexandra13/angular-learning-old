import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartHttpService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  addItem(product: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, product);
  }

  updateItem(productId: string, count: number): Observable<Cart> {
    return this.http.patch<Cart>(`${this.apiUrl}/${productId.toString()}`, { count });
  }

  removeItem(productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${productId}`);
  }
}