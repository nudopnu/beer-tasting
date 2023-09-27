import { AfterContentInit, Component, Input } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { Database } from 'src/app/core/database/database';
import { Resource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-resource-provider',
  templateUrl: './resource-provider.component.html',
  styleUrls: ['./resource-provider.component.scss']
})
export class ResourceProviderComponent implements AfterContentInit {

  @Input() resourceClasses: Array<new <T extends Resource>(database: Database) => T> = [];
  resources$!: Observable<Array<any>>;

  constructor(private resourceProvider: ResourceProviderService) { }

  ngAfterContentInit(): void {
    const observables = this.resourceProvider
      .getResources(this.resourceClasses)
      .map(resource => resource.asObservable());
    this.resources$ = combineLatest(observables);
  }
}
