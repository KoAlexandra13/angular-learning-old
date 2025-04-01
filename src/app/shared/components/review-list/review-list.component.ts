import { Component, Input } from '@angular/core';
import { Review } from '../../models/review.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
  imports: [
    CommonModule,
  ]
})
export class ReviewListComponent {
  @Input() reviews: Review[] = [];
}
