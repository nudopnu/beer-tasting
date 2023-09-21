import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'beer-beer-selection',
  templateUrl: './beer-selection.component.html',
  styleUrls: ['./beer-selection.component.scss']
})
export class BeerSelectionComponent implements OnChanges {

  beerSlots: number[] = [];
  @Input() beers: number[] = [];
  @Output() onBeerSelect = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue } = changes['beers'];
    if (!previousValue || currentValue.length !== previousValue.length) {
      this.beerSlots = [...Array(currentValue.length)].map((_, i) => i);
    }
  }

  getBeer(index: number) {
    return this.beers[index];
  }
}
