import { AfterViewInit, Component } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

import { FaceExpressions } from 'face-api.js';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SettingsComponent } from 'src/app/components/modal/settings/settings.component';
import { Subscription } from 'src/app/core/events/event-listener';
import { FaceExpressionEvent, OpenDialogEvent } from 'src/app/core/events/events';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

import * as _ from "lodash";
import { FaceExpressionDetector as FaceDetector } from 'src/app/core/FaceApi';
import { FaceExpressionsRecording } from 'src/app/core/FaceExpressionsRecording';
import { User } from 'src/app/core/models/user.model';
import { QrcodeDetector } from 'src/app/core/QrcodeDetectpr';

@Component({
  selector: 'beer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  currentUser: User | undefined;
  beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  faceDetector: FaceDetector;
  qrcodeDetector: QrcodeDetector;

  faceExpression$: Observable<FaceExpressions>;
  isRecording = false;
  subscription?: Subscription;
  recording: FaceExpressionsRecording | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) {
    const faceExpressionSource = new Subject<FaceExpressions>();
    eventDispatcher.listen("FaceExpressionEvent").subscribe(event => {
      faceExpressionSource.next(event.payload);
    });
    this.faceExpression$ = faceExpressionSource.asObservable();
    this.faceDetector = new FaceDetector(detections => {
      if (detections.length > 0) {
        const { expressions } = detections[0];
        eventDispatcher.dispatch(new FaceExpressionEvent(expressions, true));
      }
    });
    this.qrcodeDetector = new QrcodeDetector();
  }

  async onStreamInit(videoElement: HTMLVideoElement) {
    await this.faceDetector.startDetection(videoElement);
  }

  setUser() {
    this.currentUser = { generation: "Boomers I", id: "abc123" } as User;
    this.recording = new FaceExpressionsRecording(this.currentUser);
  }

  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  }

  openSettings() {
    this.eventDispatcher.dispatch(new OpenDialogEvent({ component: SettingsComponent }));
  }

  toggleRecording() {
    this.isRecording = !this.isRecording;
    this.isRecording ? this.start() : this.stop();
  }

  start() {
    this.subscription = this.eventDispatcher.listen("FaceExpressionEvent")
      .subscribe(event => {
        this.recording?.addExpression(event.payload);
      });
  }

  stop() {
    if (this.subscription) {
      this.subscription.stop();
    }
  }

}
