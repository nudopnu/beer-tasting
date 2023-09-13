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

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) {
    const rer = this;
    (async () => {
      const inputDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = inputDevices.filter(device => device.kind === "videoinput");
      this.videoInputOptions = videoDevices.map(device => new Option<MediaDeviceInfo>(device.label, device));
    })();
  }

  onVideoInputChange(newVideoInput: MediaDeviceInfo) {
    const { deviceId } = newVideoInput
    this.eventDispatcher.dispatch(new ChangeVideoSourceEvent({ deviceId }));
  }
  
}
