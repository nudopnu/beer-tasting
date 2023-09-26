import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { Observable, map } from 'rxjs';
import { FaceExpressionEvent } from 'src/app/core/events/events';
import { FaceDetections, FaceExpressionDetector } from 'src/app/core/face-detection/face-expression-detector';
import { LazyBuffer } from 'src/app/core/face-detection/lazy-buffer';
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
  lazyFaceExpressions$: Observable<FaceExpressions>;

  constructor(
    private resourceProvider: ResourceProviderService,
  ) {
    this.faceDetector = new FaceExpressionDetector();
    const lazyBuffer = new LazyBuffer();
    const expressions$ = this.faceDetector.faceExpressions$;
    this.lazyFaceExpressions$ = lazyBuffer.wrapObservable(expressions$);
  }

  async onStreamInit(videoElement: HTMLVideoElement) {
    await this.faceDetector.initialize(videoElement);
    await this.faceDetector.startDetection();
  }

  ngOnDestroy(): void {
    this.faceDetector.stopDetection();
  }
}
