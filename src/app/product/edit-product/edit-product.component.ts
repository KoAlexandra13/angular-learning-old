import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  standalone: false,
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  productId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {
    this.editProductForm = this.formBuilder.group({
      image: [''],
      title: ['', Validators.required],
      price: [null, [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]],
      stock: [null, [Validators.required, Validators.pattern('^[0-9]*$')]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(product => {
        this.editProductForm.patchValue({
          image: product.image,
          title: product.title,
          price: product.price,
          stock: product.stock,
          description: product.description
        });
      });
    }
  }

  get price() {
    return this.editProductForm.get('price');
  }

  get stock() {
    return this.editProductForm.get('stock');
  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      this.productService.updateProduct(this.productId, this.editProductForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}