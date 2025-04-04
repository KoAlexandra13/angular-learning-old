import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

@Directive({
  selector: '[appAvailability]',
  standalone: false,
})
export class AvailabilityDirective implements OnChanges {
  @Input() stock = 0;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    this.updateAvailabilityText();
  }

  private updateAvailabilityText() {
    let availabilityText = '';
    let className = '';

    if (this.stock > 10) {
      availabilityText = 'In Stock';
      className = 'in-stock';
    } else if (this.stock > 0) {
      availabilityText = `Only ${this.stock} left!`;
      className = 'low-stock';
    } else {
      availabilityText = 'Out of Stock';
      className = 'out-of-stock';
    }

    this.el.nativeElement.textContent = availabilityText;
    this.el.nativeElement.className = className;
  }
}