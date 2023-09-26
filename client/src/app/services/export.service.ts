import { Injectable } from '@angular/core';
import { UserData } from '../core/models/user-data.model';
import { ResourceProviderService } from './resource-provider.service';
import { UserDataResource } from '../core/resources/resources';
import { RxjsUtils } from '../core/rxjs-utils';
import { FaceExpressionUtils } from '../core/face-detection/face-expression-utils';
import { firstValueFrom, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  readonly EXPORT_FILENAME = "recordings.json";

  constructor(
    private resourceProvider: ResourceProviderService,
  ) { }

  async export() {
    const userData = await firstValueFrom(this.resourceProvider.getResource(UserDataResource).asObservable().pipe(
      RxjsUtils.innerFlatMap(dataEntry => dataEntry.beerReactions.map(reaction => ({
        user: dataEntry.user,
        beer: reaction.beer,
        avgFaceExpressions: FaceExpressionUtils.normalize(FaceExpressionUtils.avg(reaction.recording)),
        rating: reaction.rating,
        recordedTime: reaction.recordedTime,
      }))),
      RxjsUtils.innerMap(entry => ({
        userId: entry.user.id,
        userGender: entry.user.gender,
        userGeneration: entry.user.generation,
        beerId: entry.beer.assignedNumber,
        beerName: entry.beer.name,
        rating: entry.rating,
        avgNormAngry: entry.avgFaceExpressions.angry,
        avgNormDisgusted: entry.avgFaceExpressions.disgusted,
        avgNormHappy: entry.avgFaceExpressions.happy,
        avgNormSad: entry.avgFaceExpressions.sad,
        avgNormSurprised: entry.avgFaceExpressions.surprised,
        recordedTime: entry.recordedTime.toLocaleString(),
      })),
    ));
    console.log(userData);
    const objectUrl = URL.createObjectURL(new Blob([JSON.stringify(userData)], {
      type: "application/json",
    }));
    const tmpLink = document.createElement('a');
    tmpLink.href = objectUrl;
    tmpLink.setAttribute("download", this.EXPORT_FILENAME);
    tmpLink.click();
    tmpLink.remove();
  }
}
