import { Component } from '@angular/core';

import { SettingsComponent } from 'src/app/components/modal/settings/settings.component';
import { FaceExpressionEvent, OpenDialogEvent } from 'src/app/core/events/events';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

import * as _ from "lodash";
import { FaceDetections, FaceExpressionDetector as FaceDetector } from 'src/app/core/face-api/face-api';
import { FaceExpressionsRecording } from 'src/app/core/FaceExpressionsRecording';
import { User } from 'src/app/core/models/user.model';
import { QrcodeDetector } from 'src/app/core/QrcodeDetectpr';
import { DatabaseService } from 'src/app/services/database.service';
import { SettingsResource } from 'src/app/core/resources/resources';
import { Observable } from 'rxjs';
import { Settings } from 'src/app/core/models/settings.model';

@Component({
  selector: 'beer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  settingsResource: SettingsResource;
  settings$: Observable<Settings>;

  currentUser: User | undefined;
  beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  faceDetector: FaceDetector;
  qrcodeDetector: QrcodeDetector;

  isRecording = false;
  recording: FaceExpressionsRecording | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
    private databaseService: DatabaseService,
  ) {
    const faceDetectorCallback = this.onFaceDetection.bind(this);
    this.faceDetector = new FaceDetector(faceDetectorCallback);
    this.qrcodeDetector = new QrcodeDetector();
    this.settingsResource = new SettingsResource(databaseService.database);
    this.settings$ = this.settingsResource.toObservable();
    this.settings$.subscribe(d => console.log(d))
    if (!this.settingsResource.get()) this.settingsResource.set({ videoInputDevice: undefined} as Settings);
  }

  private onFaceDetection(detections: FaceDetections) {
    if (detections.length > 0) {
      const { expressions } = detections[0];
      this.eventDispatcher.dispatch(new FaceExpressionEvent(expressions, true));
    }
  }

  async onStreamInit(videoElement: HTMLVideoElement) {
    await this.faceDetector.startDetection(videoElement);
  }

  setUser() {
    this.currentUser = { generation: "Boomer", id: "abc123" } as User;
    this.recording = new FaceExpressionsRecording(this.currentUser);
  }

  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  }

  openSettings() {
    this.eventDispatcher.dispatch(new OpenDialogEvent({ component: SettingsComponent }));
  }

}
