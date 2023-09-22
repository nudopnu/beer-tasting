import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import * as _ from "lodash";
import { Subscription, map } from 'rxjs';
import { FaceExpressionsPlotDataProvider as FaceExpressionsPlotDataProvider } from 'src/app/core/face-expressions-plot-data-provider';
import { FaceDetections, FaceExpressionDetector } from 'src/app/core/face-detection/face-expression-detector';
import { LazyBuffer } from 'src/app/core/face-detection/lazy-buffer';
import { BeerRaction } from 'src/app/core/models/beer-reaction.model';
import { DrinkingState } from 'src/app/core/models/drinking-state.model';
import { User } from 'src/app/core/models/user.model';
import { DrinkingStateResource, SettingsResource } from 'src/app/core/resources/resources';
import { ResourceProviderService } from 'src/app/services/resource-provider.service';
import { FaceExpressionsRecorder } from 'src/app/core/face-expressions-recorder';

@Component({
  selector: 'beer-drinking',
  templateUrl: './drinking.component.html',
  styleUrls: ['./drinking.component.scss']
})
export class DrinkingComponent {

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
  dataProvider: FaceExpressionsPlotDataProvider | undefined;
  faceDetector: FaceExpressionDetector;
  expressionBuffer: LazyBuffer;
  recorder: FaceExpressionsRecorder;

  constructor(resourceProvider: ResourceProviderService) {
    const settings = resourceProvider.getResource(SettingsResource).get();
    this.numberOfSamples = settings.numberOfSamples;
    this.videoDeviceId = settings.videoInputDevice!.deviceId;
    this.secondsPerSample = settings.secondsPerSample;
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), this.numberOfSamples);
    this.drinkingStateResource = resourceProvider.getResource(DrinkingStateResource);
    this.drinkingState$ = this.drinkingStateResource.asObservable();
    this.drinkingStateResource.set("Choosing");
    this.faceDetector = new FaceExpressionDetector();

    this.expressionBuffer = new LazyBuffer();
    const expressions$ = this.expressionBuffer.wrapObservable(this.faceDetector.faceExpressions$);
    this.recorder = new FaceExpressionsRecorder(expressions$);
    this.dataProvider = new FaceExpressionsPlotDataProvider();
    this.recorder.recordedExpressions$.subscribe(expression => this.dataProvider?.addExpression(expression));
  }

  async onStreamInit(videoElement: HTMLVideoElement) {
    await this.faceDetector.initialize(videoElement);
    await this.faceDetector.startDetection();
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
    this.recorder.start();
  }

  onBeerCompleted() {
    this.drinkingStateResource.set("Rating");
    if (this.selectedBeer) {
      this.beers = this.beers.filter(beer => beer !== this.selectedBeer);
    }
    this.recorder.stop();
  }

  onNextBeer(previousRating: number) {
    this.onBeerReactionCompleted.emit({
      beer: this.selectedBeer!,
      rating: previousRating,
      recording: this.recorder.faceExpressions,
    });
    this.drinkingStateResource.set("Choosing");
    this.recorder.reset();
    this.dataProvider?.reset();
    if (this.beers.length === 0) {
      this.onUserCompleted.emit();
    }
  }

}
