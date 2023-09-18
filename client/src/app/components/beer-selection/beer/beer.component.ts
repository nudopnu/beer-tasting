import { Component, Input } from '@angular/core';

@Component({
  selector: 'beer-beer',
  templateUrl: './beer.component.html',
  styleUrls: ['./beer.component.scss']
})
export class BeerComponent {
  @Input() beer: any;
}
