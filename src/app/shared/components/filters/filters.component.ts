import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFilter } from '../../models/filter.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class FiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<ProductFilter>();
  filtersForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.filtersForm = this.fb.group({
      priceMin: [''],
      priceMax: [''],
      ratingMin: [''],
      ratingMax: [''],
      inStock: [false],
      hasReviews: [false],
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filtersForm.patchValue(params);
    });
  }

  applyFilters() {
    const filters = this.filtersForm.value;

    Object.keys(filters).forEach((key) => {
      if (!filters[key]) {
        delete filters[key];
      }
    });

    this.router.navigate([], { queryParams: filters });
    this.filtersChanged.emit(filters);
  }

  clearFilters() {
    this.filtersForm.reset();
    this.router.navigate([], { queryParams: {} });
    this.filtersChanged.emit({});
  }
}
