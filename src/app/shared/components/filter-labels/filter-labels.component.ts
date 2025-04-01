import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductFilter } from '../../models/filter.module';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-labels',
  templateUrl: './filter-labels.component.html',
  styleUrls: ['./filter-labels.component.css'],
  imports: [
    CommonModule,
  ],
})
export class FilterLabelsComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<ProductFilter>();
  @Input() filterForm!: FormGroup;

  labels: Record<string, string> = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private generateLabels(params: ProductFilter): Record<string, string> {
    const labels: Record<string, string> = {};

    if (params['priceMin'] || params['priceMax']) {
      const from = params['priceMin'] ? `from $${params['priceMin']}` : '';
      const to = params['priceMax'] ? `to $${params['priceMax']}` : '';
      
      labels['price'] = 'Price: ' + from + ' ' + to;
    }
    if (params['ratingMin'] || params['ratingMax']) {
      const from = params['ratingMin'] ? `from ${params['ratingMin']}` : '';
      const to = params['ratingMax'] ? `to ${params['ratingMax']}` : '';

      labels['rating'] = 'Rating: ' + from + ' ' + to + ' stars';
    }
    if (params['inStock']) {
      labels['inStock'] = 'In Stock';
    }
    if (params['hasReviews']) {
      labels['hasReviews'] = 'Has Reviews';
    }

    return labels;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.setAppliedFilters(params);
    });
  }

  setAppliedFilters(params: ProductFilter) {
    this.labels = this.generateLabels(params);
  }

  removeFilterValue(param: string) {
    const updatedFilters = { ...this.route.snapshot.queryParams };

    if (param === 'price' || param === 'rating') {
      delete updatedFilters[`${param}Min`];
      delete updatedFilters[`${param}Max`];

      this.filterForm.get(`${param}Min`)?.reset();
      this.filterForm.get(`${param}Max`)?.reset();
    } else {
      delete updatedFilters[param];
      this.filterForm.get(param)?.reset();
    }
    
    this.router.navigate([], { queryParams: updatedFilters })
    .then(() => {
      this.filtersChanged.emit(updatedFilters);
      this.setAppliedFilters(updatedFilters);
    });
  }
}