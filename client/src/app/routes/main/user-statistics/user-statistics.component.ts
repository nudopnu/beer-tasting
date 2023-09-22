import { Component, Input } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { Observable, filter, map } from 'rxjs';
import { UserData } from 'src/app/core/models/user-data.model';
import { User } from 'src/app/core/models/user.model';
import { UserDataResource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-user-statistics',
  templateUrl: './user-statistics.component.html',
  styleUrls: ['./user-statistics.component.scss']
})
export class UserStatisticsComponent {
  @Input() user!: User;
  userData$: Observable<UserData[]>;

  constructor(resourceProvider: ResourceProviderService) {
    const userDataResource = resourceProvider.getResource(UserDataResource);
    const x = this;
    this.userData$ = userDataResource.asObservable().pipe(
      map(userDatas => userDatas.filter(userData => x.user.id === userData?.user.id))
    );
  }

  

}
