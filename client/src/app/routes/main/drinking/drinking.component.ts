import { Component, Input } from '@angular/core';
import * as _ from "lodash";
import { DrinkingState } from 'src/app/core/models/drinking-state.model';
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
  RatingTooltips = ['ekelhaft!', 'geht so', 'normal', 'gut', 'köstlich!'];
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

  getInstruction(state: DrinkingState) {
    switch (state) {
      case 'Choosing': return 'Nach Auswahl ihres Getränks haben Sie ca. 20 Sekunden Zeit für die Verkostung:';
      case 'Preparing': return 'Bereiten Sie sich vor...';
      case 'Drinking': return 'Prost!';
      case 'Rating': return 'Bitte bewerten Sie ihr Getränk:';
    }
  }

  onBeerSelect(selectedBeer: number) {
    this.drinkingStateResource.set("Preparing");
    this.selectedBeer = selectedBeer;
  }

  onStartDrinking() {
    this.drinkingStateResource.set("Drinking");
  }

  onBeerCompleted() {
    this.userRating = 0;
    this.drinkingStateResource.set("Rating");
    if (this.selectedBeer) {
      this.beers = this.beers.filter(beer => beer !== this.selectedBeer);
    }
  }

  onNextBeer() {
    this.drinkingStateResource.set("Choosing");
  }
}
