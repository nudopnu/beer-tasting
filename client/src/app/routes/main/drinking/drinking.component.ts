import { Component, Input } from '@angular/core';
import * as _ from "lodash";
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'beer-drinking',
  templateUrl: './drinking.component.html',
  styleUrls: ['./drinking.component.scss']
})
export class DrinkingComponent {

  @Input() user: User | undefined;

  beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);

  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  }
}
