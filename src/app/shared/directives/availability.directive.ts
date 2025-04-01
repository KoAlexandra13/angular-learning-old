import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appAvailability]'
})
export class AvailabilityDirective implements OnChanges {
  @Input() stock = 0;

  constructor(private el: ElementRef) {}

  ngOnChanges(): void {
    let stockText = '';
    let color = '';

    if (this.stock > 10) {
      stockText = 'In Stock';
      color = 'green';
    } else if (this.stock > 0) {
      stockText = 'Almost Sold Out';
      color = 'orange';
    } else {
      stockText = 'Out of Stock';
      color = 'red';
    }

    this.el.nativeElement.textContent = stockText;
    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style.fontWeight = 'bold';
  }
}
