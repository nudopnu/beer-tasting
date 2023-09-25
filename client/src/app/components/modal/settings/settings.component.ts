import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/core/models/settings.model';
import { SettingsResource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  settingsResource: SettingsResource;
  settings$: Observable<Settings>;
  videoDeviceInfos: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;

  constructor(
    resourceProvider: ResourceProviderService,
    private modal: NzModalRef,
  ) {
    (async () => {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();
      this.videoDeviceInfos = inputDevices.filter(device => device.kind === "videoinput");
      this.selectedDevice = this.videoDeviceInfos[0];
    })();
    this.settingsResource = resourceProvider.getResource(SettingsResource);
    this.settings$ = this.settingsResource.asObservable();
  }

  onVideoInputChange(selectedDevice: MediaDeviceInfo) {
    this.settingsResource.set({
      ...this.settingsResource.get(),
      videoInputDevice: selectedDevice
    });
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  accept(newSettings: Settings): void {
    this.settingsResource.set(newSettings);
    this.modal.destroy();
  }

  remove(settings: Settings, beer: number) {
    this.settingsResource.set({
      ...settings,
      beers: [
        ...settings.beers.filter((item, idex) => beer !== idex)
      ]
    });
  }
}
