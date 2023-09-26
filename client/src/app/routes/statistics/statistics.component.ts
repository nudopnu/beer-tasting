import { Component } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { Observable, groupBy, map } from 'rxjs';
import { FaceExpressionUtils } from 'src/app/core/face-detection/face-expression-utils';
import { MathUtils } from 'src/app/core/math-utils';
import { Beer } from 'src/app/core/models/beer.model';
import { Settings } from 'src/app/core/models/settings.model';
import { UserData } from 'src/app/core/models/user-data.model';
import { SettingsResource, UserDataResource } from 'src/app/core/resources/resources';
import { RxjsUtils } from 'src/app/core/rxjs-utils';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  userData$: Observable<UserData[]>;
  avgBeerRatings$: Observable<{ beer: Beer; rating: number; }[]>;
  angriestBeer$: Observable<any>;
  happiestBeer$: Observable<any>;
  avgBeerExpressions$: Observable<{ beer: Beer; avg: FaceExpressions; }[]>;
  mostSurprisedBeer$: Observable<{ beer: Beer; avg: FaceExpressions; }[]>;
  mostDisgustedBeer$: Observable<{ beer: Beer; avg: FaceExpressions; }[]>;
  sadestBeer$: Observable<{ beer: Beer; avg: FaceExpressions; }[]>;
  settings$: Observable<Settings>;

  constructor(
    public resourceProvider: ResourceProviderService,
  ) {
    const userDataResource = resourceProvider.getResource(UserDataResource);
    const settingsResource = resourceProvider.getResource(SettingsResource);
    this.settings$ = settingsResource.asObservable();
    this.userData$ = userDataResource.asObservable();

    this.avgBeerRatings$ = this.userData$.pipe(
      RxjsUtils.innerFlatMap(dataEntry => dataEntry.beerReactions),
      RxjsUtils.innerGroupBy("beer"),
      RxjsUtils.innerMap(group => ({
        beer: group.key,
        rating: MathUtils.avg(group.items.map(reaction => reaction.rating))
      })),
      map(ratings => ratings.sort((a, b) => b.rating - a.rating))
    );

    this.avgBeerExpressions$ = this.userData$.pipe(
      RxjsUtils.innerFlatMap(dataEntry => dataEntry.beerReactions),
      RxjsUtils.innerMap(reaction => ({
        beer: reaction.beer,
        avg: FaceExpressionUtils.avg(reaction.recording),
      })),
    );

    this.angriestBeer$ = this.avgBeerExpressions$.pipe(
      map(entries => entries.sort((a, b) => b.avg.angry - a.avg.angry))
    );

    this.happiestBeer$ = this.avgBeerExpressions$.pipe(
      map(entries => entries.sort((a: any, b: any) => b.avg.happy - a.avg.happy))
    );

    this.mostSurprisedBeer$ = this.avgBeerExpressions$.pipe(
      map(entries => entries.sort((a: any, b: any) => b.avg.surprised - a.avg.surprised))
    );

    this.mostDisgustedBeer$ = this.avgBeerExpressions$.pipe(
      map(entries => entries.sort((a: any, b: any) => b.avg.disgusted - a.avg.disgusted))
    );

    this.sadestBeer$ = this.avgBeerExpressions$.pipe(
      map(entries => entries.sort((a: any, b: any) => b.avg.sad - a.avg.sad))
    );
  }

}
