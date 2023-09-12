import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { ErrorEvent, InfoEvent } from 'src/app/core/events/events';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit {

  @ViewChild('video') videoElement: ElementRef | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) { 
    eventDispatcher.dispatch(new ErrorEvent(new Error()));
    eventDispatcher.dispatch(new InfoEvent("INFOOOO"));
  }

  ngAfterViewInit(): void {
    this.videoElement
    // navigator.getUserMedia({ video: {} }, stream => this.setStream(stream), (err: MediaStreamError) => console.error(err));
  }

  setStream(stream: MediaStream): void {
    if (this.videoElement !== undefined) {
      this.videoElement.nativeElement.srcObject = stream;
    }
  }

}
