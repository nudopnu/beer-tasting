import { Component, Input } from '@angular/core';

@Component({
  selector: 'beer-beer-selection',
  templateUrl: './beer-selection.component.html',
  styleUrls: ['./beer-selection.component.scss']
})
export class BeerSelectionComponent {
  @Input() beers = [...Array(10)].map((_, i) => i + 1);
}
