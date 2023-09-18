import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit {

  @ViewChild('video') videoElementRef: ElementRef | undefined;
  @Output() onStreamInit = new EventEmitter<HTMLVideoElement>();

  constructor(eventDispatcher: EventDispatcherService) {
    eventDispatcher.listen("ChangeVideoSourceEvent")
      .subscribe(async event => {
        const { deviceId } = event.payload;
        const mediaStream = await this.getVideoInputStream(deviceId);
        this.setStream(mediaStream);
      });
  }

  async ngAfterViewInit(): Promise<void> {
    const mediaStream = await this.getVideoInputStream();
    this.setStream(mediaStream);
  }

  private async getVideoInputStream(videoSource?: string) {
    const constraints = {
      video: true as any
    };
    if (videoSource) {
      constraints.video = { deviceId: { exact: videoSource } };
    }
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    return mediaStream;
  }

  async setStream(stream: MediaStream): Promise<void> {
    if (this.videoElementRef !== undefined) {
      const videoElement = this.videoElementRef.nativeElement as HTMLVideoElement;
      videoElement.srcObject = stream;
      await videoElement.play();
      this.onStreamInit.next(videoElement);
    }
  }

}
