import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Html5Qrcode } from "html5-qrcode";
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'beer-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrReaderComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() deviceId: string | undefined;
  @Output() onUserRegistered = new EventEmitter<User>();
  html5QrCode: Html5Qrcode | undefined;
  config = {
    fps: 10,
    qrbox: { width: 250, height: 250 }
  };

  init(cameraId: string) {
    this.html5QrCode!.start(
      cameraId,
      this.config,
      (decodedText, _decodedResult) => {
        const user = JSON.parse(decodedText) as User;
        this.onUserRegistered.next(user);
      },
      () => { })
      .catch((err) => {
        // Start failed, handle it.
      });
  }

  async ngAfterViewInit() {
    this.html5QrCode = new Html5Qrcode("reader");
    this.init(this.deviceId!);
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.init(this.deviceId!);
  }

  ngOnDestroy(): void {
    this.html5QrCode!.stop();
  }
}
