import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFilter } from '../../models/filter.module';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  standalone: false,
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
    const filters = {...this.filtersForm.value};
  
    const numericFields = ['priceMin', 'priceMax', 'ratingMin', 'ratingMax'];
    
    numericFields.forEach(field => {
      if (filters[field] !== null && filters[field] !== '' && !isNaN(filters[field])) {
        const value = Number(filters[field]);
        if (value < 0) {
          filters[field] = 0;
        }
      }
    });
  
    Object.keys(filters).forEach((key) => {
      if (!filters[key] && filters[key] !== 0) {
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
