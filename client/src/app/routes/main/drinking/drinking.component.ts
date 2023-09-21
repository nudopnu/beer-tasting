import { Component, Input } from '@angular/core';
import * as _ from "lodash";
import { User } from 'src/app/core/models/user.model';
import { DrinkingStateResource, SettingsResource } from 'src/app/core/resources/resources';
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
  selectedBeer: number | undefined;
  videoDeviceId: string;
  drinkingStateResource;
  drinkingState$;
  RatingTooltips = ['ekelhaft', 'geht so', 'normal', 'gut', 'köstlich'];
  userRating = 0;

  constructor(resourceProvider: ResourceProviderService) {
    const settings = resourceProvider.getResource(SettingsResource).get();
    this.numberOfSamples = settings.numberOfSamples;
    this.videoDeviceId = settings.videoInputDevice!.deviceId;
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), this.numberOfSamples);
    this.drinkingStateResource = resourceProvider.getResource(DrinkingStateResource);
    this.drinkingState$ = this.drinkingStateResource.asObservable();
    this.drinkingStateResource.set("Choosing");
  }

  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), this.numberOfSamples);
  }

  onBeerSelect(selectedBeer: number) {
    this.drinkingStateResource.set("Preparing");
    this.selectedBeer = selectedBeer;
  }

  onStartDrinking() {
    this.drinkingStateResource.set("Drinking");
  }

  onBeerCompleted() {
    this.drinkingStateResource.set("Rating");
    if (this.selectedBeer) {
      this.beers = this.beers.filter(beer => beer !== this.selectedBeer);
    }
  }
}
