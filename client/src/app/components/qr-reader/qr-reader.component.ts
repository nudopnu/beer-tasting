import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Html5Qrcode } from "html5-qrcode";
import { Observable } from 'rxjs';
import { Settings } from 'src/app/core/models/settings.model';
import { User } from 'src/app/core/models/user.model';
import { SettingsResource } from 'src/app/core/resources/resources';
import { DatabaseService } from 'src/app/services/database.service';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrcodeComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() deviceId: string | undefined;
  @Output() onUserRegistered = new EventEmitter<User>();
  html5QrCode: Html5Qrcode | undefined;

  init(cameraId: string) {
    this.html5QrCode!.start(
      cameraId,
      {
        fps: 10,    // Optional, frame per seconds for qr code scanning
        qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
      },
      (decodedText, decodedResult) => {
        console.log(decodedText, decodedResult);
        const user = JSON.parse(decodedText) as User;
        this.onUserRegistered.next(user);
      },
      (errorMessage) => {
        // parse error, ignore it.
      })
      .catch((err) => {
        // Start failed, handle it.
      });
  }

  async ngAfterViewInit() {
    this.html5QrCode = new Html5Qrcode("reader");
    // this.deviceId = (await window.navigator.mediaDevices.enumerateDevices())
    //   .filter(info => info.kind === "videoinput")
    //   .map(info => info.deviceId)[0];
    this.init(this.deviceId!);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.init(this.deviceId!);
  }

  ngOnDestroy(): void {
    this.html5QrCode!.stop();
  }
}
