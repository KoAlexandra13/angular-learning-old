import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../../shared/models/product.model';
import { Review } from '../../shared/models/review.model';
import { Cart } from '../../shared/models/cart.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: false,
})

export class ProductDetailsComponent implements OnInit {
  product!: Product;
  reviews: Review[] = [];
  cart: Cart[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    
    if (productId) {
      this.productService.getProductById(productId).subscribe(data => {
        this.product = data;
      });

      this.productService.getReviewsByProductId(productId).subscribe(data => {
        this.reviews = data;
      });
    }
  }

  addToCart(): void {
    if (!this.product || this.product.stock <= 0) return;

    const existingItem = this.cart.find(item => item.id === this.product.id);

    if (existingItem) {
      existingItem.count++;
    } else {
      this.cart.push({
        id: this.product.id,
        title: this.product.title,
        count: 1,
        price: this.product.price,
      });
    }
  }

  removeFromCart(): void {
    const index = this.cart.findIndex(item => item.id === this.product.id);
    if (index !== -1) {
      if (this.cart[index].count > 1) {
        this.cart[index].count--;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  getCartItem(productId: string | undefined): Cart | undefined {
    if (!productId) return;
    return this.cart.find(item => item.id === productId);
  }

}
