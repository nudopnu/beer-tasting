import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { ErrorEvent, InfoEvent } from 'src/app/core/events/events';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit {

  @ViewChild('video') videoElementRef: ElementRef | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) { }

  async ngAfterViewInit(): Promise<void> {
    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.setStream(mediaStream);
  }

  async setStream(stream: MediaStream): Promise<void> {
    if (this.videoElementRef !== undefined) {
      const videoElement = this.videoElementRef.nativeElement as HTMLVideoElement;
      videoElement.srcObject = stream;
      await videoElement.play();
    }
  }

}
