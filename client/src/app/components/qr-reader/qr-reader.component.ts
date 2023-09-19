import { AfterViewInit, Component } from '@angular/core';
import { Html5Qrcode } from "html5-qrcode";
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrcodeComponent implements AfterViewInit {

  html5QrCode: Html5Qrcode | undefined;
  deviceId: string | undefined;

  constructor(eventDispatcher: EventDispatcherService,) {
    eventDispatcher.listen("ChangeVideoSourceEvent").subscribe(event => this.init(event.payload.deviceId));
  }

  init(cameraId: string) {
    this.html5QrCode!.start(
      cameraId,
      {
        fps: 10,    // Optional, frame per seconds for qr code scanning
        qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
      },
      (decodedText, decodedResult) => {
        console.log(decodedText, decodedResult);
        // do something when code is read
      },
      (errorMessage) => {
        // parse error, ignore it.
      })
      .catch((err) => {
        // Start failed, handle it.
      });
  }

  async ngAfterViewInit() {
    this.html5QrCode = new Html5Qrcode(/* element id */ "reader");
    this.deviceId = (await window.navigator.mediaDevices.enumerateDevices())
      .filter(info => info.kind === "videoinput")
      .map(info => info.deviceId)[0];
    console.log(this.deviceId);
    this.init(this.deviceId);
  }

}
