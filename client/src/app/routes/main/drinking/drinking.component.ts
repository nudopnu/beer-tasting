import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from "lodash";
import { Subscription } from 'rxjs';
import { FaceExpressionsRecording } from 'src/app/core/FaceExpressionsRecording';
import { FaceDetections, FaceExpressionDetector } from 'src/app/core/face-detection/face-expression-detector';
import { LazyBuffer } from 'src/app/core/face-detection/lazy-buffer';
import { BeerRaction } from 'src/app/core/models/beer-reaction.model';
import { DrinkingState } from 'src/app/core/models/drinking-state.model';
import { User } from 'src/app/core/models/user.model';
import { DrinkingStateResource, SettingsResource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';

@Component({
  selector: 'beer-drinking',
  templateUrl: './drinking.component.html',
  styleUrls: ['./drinking.component.scss']
})
export class DrinkingComponent implements AfterContentInit {

  @Input() user: User | undefined;
  @Output() onBeerReactionCompleted = new EventEmitter<BeerRaction>();
  @Output() onUserCompleted = new EventEmitter();
  numberOfSamples: number;
  beers: number[];
  selectedBeer: number | undefined;
  videoDeviceId: string;
  secondsPerSample: number;
  drinkingStateResource;
  drinkingState$;
  RatingTooltips = ['ekelhaft!', 'geht so', 'okay', 'gut', 'köstlich!'];
  userRating = 0;
  recording: FaceExpressionsRecording | undefined;
  faceDetector: FaceExpressionDetector;
  expressionBuffer: LazyBuffer;
  subscription: Subscription | undefined;

  constructor(resourceProvider: ResourceProviderService) {
    const settings = resourceProvider.getResource(SettingsResource).get();
    this.numberOfSamples = settings.numberOfSamples;
    this.videoDeviceId = settings.videoInputDevice!.deviceId;
    this.secondsPerSample = settings.secondsPerSample;
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), this.numberOfSamples);
    this.drinkingStateResource = resourceProvider.getResource(DrinkingStateResource);
    this.drinkingState$ = this.drinkingStateResource.asObservable();
    this.drinkingStateResource.set("Choosing");
    const faceDetectorCallback = this.onFaceDetection.bind(this);
    this.faceDetector = new FaceExpressionDetector(faceDetectorCallback);
    this.expressionBuffer = new LazyBuffer();
  }

  ngAfterContentInit(): void {
    this.recording = new FaceExpressionsRecording(this.user!);
  }

  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), this.numberOfSamples);
  }

  getInstruction(state: DrinkingState) {
    switch (state) {
      case 'Choosing': return `Nach Auswahl ihres Getränks haben Sie ca. ${this.secondsPerSample} Sekunden Zeit für die Verkostung:`;
      case 'Preparing': return 'Bereiten Sie sich vor...';
      case 'Drinking': return 'Prost!';
      case 'Rating': return 'Bitte bewerten Sie ihr Getränk:';
    }
  }

  onBeerSelect(selectedBeer: number) {
    this.drinkingStateResource.set("Preparing");
    this.selectedBeer = selectedBeer;
  }

  onStartDrinking() {
    this.drinkingStateResource.set("Drinking");
    this.subscription = this.expressionBuffer.value$.subscribe(value => {
      this.recording?.addExpression(value);
    });
  }

  onBeerCompleted() {
    this.userRating = 0;
    this.drinkingStateResource.set("Rating");
    if (this.selectedBeer) {
      this.beers = this.beers.filter(beer => beer !== this.selectedBeer);
    }
    this.subscription?.unsubscribe();
  }

  onNextBeer() {
    this.onBeerReactionCompleted.emit({
      beer: this.selectedBeer!,
      rating: this.userRating,
      recording: this.recording!,
    });
    this.recording = new FaceExpressionsRecording(this.user!);
    this.drinkingStateResource.set("Choosing");
    if (this.beers.length === 0) {
      this.onUserCompleted.emit();
    }
  }

  async onStreamInit(videoElement: HTMLVideoElement) {
    await this.faceDetector.startDetection(videoElement);
  }

  private onFaceDetection(detections: FaceDetections) {
    if (this.drinkingStateResource.get() === "Drinking" && detections.length > 0) {
      const { expressions } = detections[0];
      this.expressionBuffer.addExpression(expressions);
    }
  }
}
