import { Component } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { BeerRaction } from 'src/app/core/models/beer-reaction.model';
import { Settings } from 'src/app/core/models/settings.model';
import { State } from 'src/app/core/models/state.model';
import { UserData } from 'src/app/core/models/user-data.model';
import { User } from 'src/app/core/models/user.model';
import { SettingsResource, StateResource, UserDataResource, UserResource } from 'src/app/core/resources/resources';
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
  settings$: Observable<Settings>;

  currentUser: User | undefined;
  currentUserData: UserData | undefined;
  userResource: UserResource;
  userDataResource: UserDataResource;

  constructor(
    resourceProvider: ResourceProviderService,
  ) {
    this.stateResource = resourceProvider.getResource(StateResource);
    this.settingsResource = resourceProvider.getResource(SettingsResource);
    this.userResource = resourceProvider.getResource(UserResource);
    this.userDataResource = resourceProvider.getResource(UserDataResource);

    this.state$ = this.stateResource.asObservable();
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
    // this.onUserRegistered({ gender: 'm', generation: 'Boomer', id: '123' } as User);

    // this.currentUser = { gender: 'm', generation: 'Boomer', id: '123' } as User;
    // this.onUserCompleted();
  }

  onStart() {
    this.stateResource.set("Scanning");
  }

  onUserRegistered(user: User) {
    const withIdUser = this.userResource.addItem(user);
    this.currentUser = {
      ...user,
      id: withIdUser.id,
    };
    this.currentUserData = {
      user: this.currentUser,
      beerReactions: [],
    };
    this.stateResource.set("Recording");
  }

  onBeerReaction(reaction: BeerRaction) {
    this.currentUserData?.beerReactions.push(reaction);
  }

  onUserCompleted() {
    console.log(this.currentUserData);
    this.userDataResource.addItem(this.currentUserData!);
    this.stateResource.set("Results");
  }

  onRestart() {
    this.stateResource.set("Default");
  }

}
