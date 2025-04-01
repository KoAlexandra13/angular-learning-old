import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  addToCart(product: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, product);
  }

  updateCartItem(productId: string, count: number): Observable<Cart> {
    return this.http.patch<Cart>(`${this.apiUrl}/${productId.toString()}`, { count });
  }

  removeFromCart(productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${productId}`);
  }
}