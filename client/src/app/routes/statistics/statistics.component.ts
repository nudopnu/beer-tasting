import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserData } from 'src/app/core/models/user-data.model';
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

  constructor(
    public resourceProvider: ResourceProviderService,
  ) {
    const userDataResource = resourceProvider.getResource(UserDataResource);
    this.userData$ = userDataResource.asObservable();
  }
}
