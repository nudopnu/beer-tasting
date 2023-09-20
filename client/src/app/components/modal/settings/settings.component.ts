import { Component } from '@angular/core';
import { SettingsResource } from 'src/app/core/resources/resources';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'beer-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  settingsResource: SettingsResource;
  videoDeviceInfos: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;

  constructor(
    databaseSerive: DatabaseService,
  ) {
    (async () => {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();
      this.videoDeviceInfos = inputDevices.filter(device => device.kind === "videoinput");
      this.selectedDevice = this.videoDeviceInfos[0];
    })();
    this.settingsResource = new SettingsResource(databaseSerive.database);
  }

  onVideoInputChange(selectedDevice: MediaDeviceInfo) {
    this.settingsResource.set({ videoInputDevice: selectedDevice });
  }

}
