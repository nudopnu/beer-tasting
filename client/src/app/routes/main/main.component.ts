import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BeerRaction } from 'src/app/core/models/beer-reaction.model';
import { DEFAULT_SETTINGS, Settings } from 'src/app/core/models/settings.model';
import { State } from 'src/app/core/models/state.model';
import { UserData } from 'src/app/core/models/user-data.model';
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
  currentUserData: UserData | undefined;

  constructor(
    resourceProvider: ResourceProviderService,
  ) {
    this.stateResource = resourceProvider.getResource(StateResource);
    this.state$ = this.stateResource.asObservable();
    this.settingsResource = resourceProvider.getResource(SettingsResource);
    this.settings$ = this.settingsResource.asObservable();

    // TODO: handle default state
    const x = this;
    (async () => {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDeviceInfos = inputDevices.filter(device => device.kind === "videoinput");
      const defaultDevice = videoDeviceInfos[0];
      x.settingsResource.set({
        ...x.settingsResource.get(),
        videoInputDevice: defaultDevice,
      });
    })();

    this.stateResource.set("Default");

    // FOR TESTING ONLY:
    this.onUserRegistered({ gender: 'm', generation: 'Boomer', id: '123' } as User);
  }

  onStart() {
    this.stateResource.set("Scanning");
  }

  onUserRegistered(user: User) {
    this.currentUser = user;
    this.currentUserData = {
      user,
      beerReactions: [],
    };
    this.stateResource.set("Recording");
  }

  onBeerReaction(reaction: BeerRaction) {
    this.currentUserData?.beerReactions.push(reaction);
    console.log(this.currentUserData);
  }

  onUserCompleted() {
    this.stateResource.set("Default");
  }

}
