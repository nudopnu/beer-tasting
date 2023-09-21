import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_SETTINGS, Settings } from 'src/app/core/models/settings.model';
import { State } from 'src/app/core/models/state.model';
import { User } from 'src/app/core/models/user.model';
import { SettingsResource, StateResource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  stateResource: StateResource;
  state$: Observable<State>;
  settingsResource: SettingsResource;
  settings$

  currentUser: User | undefined;

  constructor(
    resourceProvider: ResourceProviderService,
  ) {
    this.stateResource = resourceProvider.getResource(StateResource);
    this.state$ = this.stateResource.asObservable();
    this.settingsResource = resourceProvider.getResource(SettingsResource);
    this.settings$ = this.settingsResource.asObservable();
    if (!this.settingsResource.get()) this.settingsResource.set(DEFAULT_SETTINGS);

    // DELETE THIS:
    this.onUserRegistered({ gender: 'm', generation: 'Boomer', id: '123' } as User);
  }

  onStart() {
    this.stateResource.set("Scanning");
  }

  onUserRegistered(user: User) {
    console.log(user);
    this.currentUser = user;
    this.stateResource.set("Recording");
  }

}
