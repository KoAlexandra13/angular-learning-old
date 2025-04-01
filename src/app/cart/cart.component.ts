import { Component, OnInit } from '@angular/core';
import { CartService } from '../core/services/cart.service';
import { Cart } from '../shared/models/cart.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.cartItems.forEach(item => {
        this.productService.getProductById(item.id).subscribe(product => {
          item.stock = product.stock;
        });
      });
    });
  }

  addToCart(product: Cart): void {
    const cartItem = this.cartItems.find(item => item.id === product.id);
    if (cartItem && cartItem?.stock && cartItem.count < cartItem?.stock) {
      this.cartService.updateCartItem(product.id, cartItem.count + 1).subscribe(() => {
        this.loadCartItems();
      });
    }
  }

  updateCartItem(productId: string, count: number): void {
    this.cartService.updateCartItem(productId, count).subscribe(() => {
      this.loadCartItems();
    });
  }

  removeFromCart(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCartItems();
    });
  }

  get paginatedItems(): Cart[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.cartItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number[] {
    const totalPages = Math.ceil(this.cartItems.length / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}