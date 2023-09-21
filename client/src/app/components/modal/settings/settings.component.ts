import { Component } from '@angular/core';
import { SettingsResource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

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
    resourceProvider: ResourceProviderService,
  ) {
    (async () => {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();
      this.videoDeviceInfos = inputDevices.filter(device => device.kind === "videoinput");
      this.selectedDevice = this.videoDeviceInfos[0];
    })();
    this.settingsResource = resourceProvider.getResource(SettingsResource);
  }

  onVideoInputChange(selectedDevice: MediaDeviceInfo) {
    this.settingsResource.set({ videoInputDevice: selectedDevice });
  }

}
