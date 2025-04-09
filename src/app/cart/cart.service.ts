import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cart } from '../shared/models/cart.model';
import { CartHttpService } from './cart-http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<Cart[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private cartHttpService: CartHttpService) {
    this.loadCartItems();
  }

  getCartItems(): Observable<Cart[]> {
    return this.cartHttpService.getItems().pipe(
      tap(items => this.cartItemsSubject.next(items))
    );
  }

  addToCart(product: Cart): Observable<Cart> {
    return this.cartHttpService.addItem(product).pipe(
      tap(() => this.loadCartItems())
    );
  }

  updateCartItem(productId: string, count: number): Observable<Cart> {
    return this.cartHttpService.updateItem(productId, count).pipe(
      tap(() => this.loadCartItems())
    );
  }

  removeFromCart(productId: string): Observable<Cart> {
    return this.cartHttpService.removeItem(productId).pipe(
      tap(() => this.loadCartItems())
    );
  }
  
  private loadCartItems(): void {
    this.cartHttpService.getItems().subscribe(
      items => this.cartItemsSubject.next(items)
    );
  }
}