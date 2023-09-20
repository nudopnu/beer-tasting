import { Component } from '@angular/core';
import { ChangeVideoSourceEvent } from 'src/app/core/events/events';
import { Option } from 'src/app/core/models/option.model';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  videoInputOptions: Option<MediaDeviceInfo>[] = [];
  videoDeviceInfos: MediaDeviceInfo[] = [];
  selectedDevice: MediaDeviceInfo | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) {
    const rer = this;
    (async () => {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();
      this.videoDeviceInfos = inputDevices.filter(device => device.kind === "videoinput");
      this.videoInputOptions = this.videoDeviceInfos.map(device => new Option<MediaDeviceInfo>(device.label, device));
    })();
  }

  onVideoInputChange(selectedDevice:any) {
    const { deviceId } = selectedDevice!;
    this.eventDispatcher.dispatch(new ChangeVideoSourceEvent({ deviceId }));
  }

}
