import { Component } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { Observable, map } from 'rxjs';
import { UserData } from 'src/app/core/models/user-data.model';
import { User } from 'src/app/core/models/user.model';
import { UserDataResource } from 'src/app/core/resources/resources';
import { ExportService } from 'src/app/services/export.service';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  userData$: Observable<UserData[]>;
  avgBeerRatings$: Observable<{ beer: number; rating: number; }[]>;
  avgUserBeerExpressions$: Observable<{ user: string; beer: number; avg: FaceExpressions; }[]>;
  angriestBeer$: Observable<any>;
  happiestBeer$: Observable<any>;
  avgBeerExpressions$: Observable<{ beer: string; avg: FaceExpressions; }[]>;
  mostSurprisedBeer$: Observable<{ beer: string; avg: FaceExpressions; }[]>;
  mostDisgustedBeer$: Observable<{ beer: string; avg: FaceExpressions; }[]>;
  sadestBeer$: Observable<{ beer: string; avg: FaceExpressions; }[]>;

  constructor(
    public resourceProvider: ResourceProviderService,
  ) {
    const userDataResource = resourceProvider.getResource(UserDataResource);
    this.userData$ = userDataResource.asObservable();
    this.avgBeerRatings$ = this.userData$.pipe(
      map(this.toAvgBeerRatings),
      map(ratings => ratings.sort((a, b) => b.rating - a.rating))
    );
    this.avgUserBeerExpressions$ = this.userData$.pipe(
      map(userDataEntries => userDataEntries.flatMap(dataEntry => dataEntry.beerReactions.map(reaction => ({ user: dataEntry.user.id, reaction })))),
      map(reactions => reactions.map(({ user, reaction }) => {
        const { recording: expressions, beer } = reaction;
        const avg = this.avgFaceExpression(expressions);
        return { user, beer, avg }
      }))
    );

    this.avgBeerExpressions$ = this.avgUserBeerExpressions$.pipe(
      map(ratings => ratings.reduce((prev, elem) => {
        const { beer, avg } = elem;
        if (!!prev[beer])
          prev[beer].push(avg);
        else
          prev[beer] = [avg];
        return prev;
      }, {} as { [s: string]: FaceExpressions[] })),
      map(beers => Object.keys(beers).map(key => ({ beer: key, avg: this.avgFaceExpression(beers[key]) } as { beer: string, avg: FaceExpressions }))),
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

  private avgFaceExpression(expressions: FaceExpressions[]) {
    return {
      angry: this.avg(expressions.map(exp => exp.angry)),
      disgusted: this.avg(expressions.map(exp => exp.disgusted)),
      fearful: this.avg(expressions.map(exp => exp.fearful)),
      happy: this.avg(expressions.map(exp => exp.happy)),
      neutral: this.avg(expressions.map(exp => exp.neutral)),
      sad: this.avg(expressions.map(exp => exp.sad)),
      surprised: this.avg(expressions.map(exp => exp.surprised)),
    } as FaceExpressions;
  }

  private toAvgBeerRatings(userDataEntries: UserData[]) {
    const allRatings = new Map<number, Array<number>>();
    userDataEntries
      .flatMap(dataEntry => dataEntry.beerReactions)
      .forEach(reaction => {
        const { rating, beer } = reaction;
        const ratings = allRatings.get(beer) || [];
        allRatings.set(beer, [...ratings, rating]);
      });
    const result = [...allRatings.keys()].map(key => {
      const ratings = allRatings.get(key)
      const avgRating = ratings!.reduce((prev, elem) => prev + elem, 0) / ratings!.length;
      return {
        beer: key,
        rating: avgRating,
      }
    })
    return result;
  }

  private avg(numbers: number[]) {
    let sum = 0;
    for (const number of numbers) {
      sum += number;
    }
    return sum / numbers.length;
  }

  private normalize(expression: FaceExpressions) {
    let sum = 0;
    sum += expression.angry;
    sum += expression.disgusted;
    sum += expression.fearful;
    sum += expression.happy;
    sum += expression.neutral;
    sum += expression.sad;
    sum += expression.surprised;
    const factor = 1 / sum;
    return {
      angry: expression.angry * factor,
      disgusted: expression.disgusted * factor,
      fearful: expression.fearful * factor,
      happy: expression.happy * factor,
      neutral: expression.neutral * factor,
      sad: expression.sad * factor,
      surprised: expression.surprised * factor,
    } as FaceExpressions
  }
}
