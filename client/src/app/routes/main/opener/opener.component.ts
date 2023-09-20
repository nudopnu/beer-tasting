import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { FaceExpressionEvent } from 'src/app/core/events/events';
import { FaceDetections, FaceExpressionDetector } from 'src/app/core/face-detection/face-expression-detector';
import { Settings } from 'src/app/core/models/settings.model';
import { SettingsResource } from 'src/app/core/resources/resources';
import { DatabaseService } from 'src/app/services/database.service';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.scss']
})
export class OpenerComponent implements OnDestroy {

  settingsResource: SettingsResource;
  settings$: Observable<Settings>;
  faceDetector: FaceExpressionDetector;

  constructor(
    private eventDispatcher: EventDispatcherService,
    private databaseService: DatabaseService,
  ) {
    const faceDetectorCallback = this.onFaceDetection.bind(this);
    this.faceDetector = new FaceExpressionDetector(faceDetectorCallback);
    // this.qrcodeDetector = new QrcodeDetector();
    this.settingsResource = new SettingsResource(databaseService.database);
    this.settings$ = this.settingsResource.toObservable();
    this.settings$.subscribe(d => console.log(d))
    if (!this.settingsResource.get()) this.settingsResource.set({ videoInputDevice: undefined } as Settings);
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
