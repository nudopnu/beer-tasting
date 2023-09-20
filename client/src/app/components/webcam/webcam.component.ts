import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements  OnChanges {

  @ViewChild('video') videoElementRef: ElementRef | undefined;
  @Output() onStreamInit = new EventEmitter<HTMLVideoElement>();
  @Input() deviceId: string | undefined;

  async ngOnChanges(_changes: SimpleChanges) {
    const mediaStream = await this.getVideoInputStream(this.deviceId);
    await this.setStream(mediaStream);
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

  private async setStream(stream: MediaStream): Promise<void> {
    if (this.videoElementRef !== undefined) {
      const videoElement = this.videoElementRef.nativeElement as HTMLVideoElement;
      videoElement.srcObject = stream;
      await videoElement.play();
      this.onStreamInit.next(videoElement);
    }
  }

}
