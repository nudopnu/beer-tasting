import { Component, Input } from '@angular/core';
import * as _ from "lodash";
import { User } from 'src/app/core/models/user.model';
import { SettingsResource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-drinking',
  templateUrl: './drinking.component.html',
  styleUrls: ['./drinking.component.scss']
})
export class DrinkingComponent {

  @Input() user: User | undefined;
  numberOfSamples: number;
  beers: number[];

  constructor(resourceProvider: ResourceProviderService) {
    const settings = resourceProvider.getResource(SettingsResource).get();
    this.numberOfSamples = settings.numberOfSamples;
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), this.numberOfSamples);
  }


  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), this.numberOfSamples);
  }

  onBeerSelect(selectedBeer: number) {
    console.log(selectedBeer);

    // Later:
    // this.beers = this.beers.filter(beer => beer !== selectedBeer);
  }
}
