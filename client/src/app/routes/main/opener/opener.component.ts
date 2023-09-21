import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FaceExpressionEvent } from 'src/app/core/events/events';
import { FaceDetections, FaceExpressionDetector } from 'src/app/core/face-detection/face-expression-detector';
import { Settings } from 'src/app/core/models/settings.model';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.scss']
})
export class OpenerComponent implements OnDestroy {

  @Output() onStart = new EventEmitter();
  @Input() settings!: Settings;

  faceDetector: FaceExpressionDetector;

  constructor(
    private eventDispatcher: EventDispatcherService,
    private resourceProvider: ResourceProviderService,
  ) {
    const faceDetectorCallback = this.onFaceDetection.bind(this);
    this.faceDetector = new FaceExpressionDetector(faceDetectorCallback);
  }

  async onStreamInit(videoElement: HTMLVideoElement) {
    await this.faceDetector.startDetection(videoElement);
  }

  private onFaceDetection(detections: FaceDetections) {
    if (detections.length > 0) {
      const { expressions } = detections[0];
      this.eventDispatcher.dispatch(new FaceExpressionEvent(expressions, true));
    }
  }

  ngOnDestroy(): void {
    this.faceDetector.stopDetection();
  }
}
