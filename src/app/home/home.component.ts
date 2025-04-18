import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product/product.service';
import { HeaderSearchService } from '../shared/components/header/header.service';
import { Product, ProductWithReviews } from '../shared/models/product.model';
import { ProductFilter } from '../shared/models/filter.module';
import { CartService } from '../cart/cart.service';
import { Cart } from '../shared/models/cart.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit {
  @Input() searchQuery = '';
  products: Product[] | ProductWithReviews[] = [];
  cart: Cart[] = [];
  noProductsFound = false;
  totalProducts = 0;
  labels: Record<string, string> = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private searchService: HeaderSearchService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fetchProducts(params);
    });
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });
    this.loadCartItems();
  }

  fetchProducts(filters: ProductFilter) {
    this.productService.getProducts(filters).subscribe((data) => {
      if (filters.hasReviews) {
        data = data.filter(item => item?.reviews && item?.reviews?.length > 0);
      }

      this.products = data;
      this.totalProducts = data.length;
      this.noProductsFound = data.length === 0;
    });
  }

  loadCartItems(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cart = items;
    });
  }

  addToCart(product: Product): void {
    const cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      this.cartService.updateCartItem(product.id, cartItem.count + 1).subscribe(() => {
        cartItem.count++;
      });
    } else {
      const newCartItem: Cart = { id: product.id, title: product.title, count: 1, price: product.price };
      this.cartService.addToCart(newCartItem).subscribe(() => {
        this.cart.push(newCartItem);
      });
    }
  }

  removeFromCart(productId: string): void {
    const cartItem = this.cart.find(item => item.id === productId);
    if (cartItem) {
      if (cartItem.count > 1) {
        this.cartService.updateCartItem(productId, cartItem.count - 1).subscribe(() => {
          cartItem.count--;
        });
      } else {
        this.cartService.removeFromCart(productId).subscribe(() => {
          this.cart = this.cart.filter(item => item.id !== productId);
        });
      }
    }
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }

  editProduct(productId: string) {
    this.router.navigate(['/product/edit', productId]);
  }

  getProductCartCount(productId: string): number {
    const cartItem = this.cart.find(item => item.id === productId);
    return cartItem ? cartItem.count : 0;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}