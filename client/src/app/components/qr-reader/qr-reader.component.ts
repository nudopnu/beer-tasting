import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { Html5Qrcode } from "html5-qrcode";
import { ErrorEvent } from 'src/app/core/events/events';
import { User } from 'src/app/core/models/user.model';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-qr-reader',
  templateUrl: './qr-reader.component.html',
  styleUrls: ['./qr-reader.component.scss']
})
export class QrReaderComponent implements AfterViewInit, OnChanges, OnDestroy {

  @Input() deviceId: string | undefined;
  @Output() onUserRegistered = new EventEmitter<User>();
  html5QrCode: Html5Qrcode | undefined;
  readerConfiguration = {
    fps: 10,
    qrbox: { width: 250, height: 250 }
  };

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) { }

  async init(deviceId: string) {
    await this.html5QrCode!.start(
      deviceId,
      this.readerConfiguration,
      (decodedText, _decodedResult) => {
        const user = JSON.parse(decodedText) as User;
        this.onUserRegistered.next(user);
      },
      () => { })
      .catch((err) => {
        this.eventDispatcher.dispatch(new ErrorEvent(err));
      });
  }

  async ngAfterViewInit() {
    this.html5QrCode = new Html5Qrcode("reader");
    await this.init(this.deviceId!);
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes["deviceId"].isFirstChange()) return;
    if (this.html5QrCode?.isScanning) {
      await this.html5QrCode.stop();
    }
    await this.init(this.deviceId!);
  }

  ngOnDestroy(): void {
    this.html5QrCode!.stop();
  }
}
