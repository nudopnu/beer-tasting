import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/core/models/settings.model';


import { State } from 'src/app/core/models/state.model';
import { User } from 'src/app/core/models/user.model';
import { SettingsResource, StateResource } from 'src/app/core/resources/resources';
import { DatabaseService } from 'src/app/services/database.service';

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
    databaseService: DatabaseService,
  ) {
    this.stateResource = new StateResource(databaseService.database);
    this.state$ = this.stateResource.asObservable();
    this.stateResource.set("Default");
    this.settingsResource = new SettingsResource(databaseService.database);
    this.settings$ = this.settingsResource.asObservable();
    if (!this.settingsResource.get()) this.settingsResource.set({ videoInputDevice: undefined } as Settings);
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
