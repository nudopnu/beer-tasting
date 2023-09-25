import { AfterContentInit, Component, Input } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-resource-provider',
  templateUrl: './resource-provider.component.html',
  styleUrls: ['./resource-provider.component.scss']
})
export class ResourceProviderComponent implements AfterContentInit {

  @Input() resourceClasses: Array<any> = [];
  resources$: any;

  constructor(private resourceProvider: ResourceProviderService) { }

  ngAfterContentInit(): void {
    const observables = this.resourceProvider
      .getResources(this.resourceClasses)
      .map(resource => resource.asObservable());
    this.resources$ = combineLatest(observables);
  }
}
