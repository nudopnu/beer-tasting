import { AfterContentChecked, AfterContentInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
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
import { Beer } from 'src/app/core/models/beer.model';
import { Settings } from 'c:/Data/work/code/beer/client/src/app/core/models/settings.model';

@Component({
  selector: 'beer-drinking',
  templateUrl: './drinking.component.html',
  styleUrls: ['./drinking.component.scss']
})
export class DrinkingComponent implements OnDestroy {

  @Input() user: User | undefined;
  @Output() onBeerReactionCompleted = new EventEmitter<BeerRaction>();
  @Output() onUserCompleted = new EventEmitter();
  numberOfSamples: number;
  beerSelection: Beer[];
  selectedBeer: Beer | undefined;
  videoDeviceId: string;
  secondsPerSample: number;
  drinkingStateResource;
  drinkingState$;
  dataProvider: FaceExpressionsPlotDataProvider | undefined;
  faceDetector: FaceExpressionDetector;
  expressionBuffer: LazyBuffer;
  recorder: FaceExpressionsRecorder;
  subscription: Subscription;
  settings: Settings;
  allBeers: Beer[];

  constructor(resourceProvider: ResourceProviderService) {
    this.settings = resourceProvider.getResource(SettingsResource).get();
    this.numberOfSamples = this.settings.numberOfSamples;
    this.videoDeviceId = this.settings.videoInputDevice!.deviceId;
    this.secondsPerSample = this.settings.secondsPerSample;
    this.allBeers = this.settings.beers;
    this.beerSelection = _.sampleSize(this.allBeers.filter(beer => beer.isAvailable), this.numberOfSamples);
    this.drinkingStateResource = resourceProvider.getResource(DrinkingStateResource);
    this.drinkingState$ = this.drinkingStateResource.asObservable();
    this.drinkingStateResource.set("Choosing");
    this.faceDetector = new FaceExpressionDetector();

    this.expressionBuffer = new LazyBuffer();
    const expressions$ = this.expressionBuffer.wrapObservable(this.faceDetector.faceExpressions$);
    this.recorder = new FaceExpressionsRecorder(expressions$);
    this.dataProvider = new FaceExpressionsPlotDataProvider();
    this.subscription = this.recorder.recordedExpressions$.subscribe(expression => this.dataProvider?.addExpression(expression));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onStreamInit(videoElement: HTMLVideoElement) {
    await this.faceDetector.initialize(videoElement);
    await this.faceDetector.startDetection();
  }

  getRandomBeers(): void {
    this.beerSelection = _.sampleSize(this.allBeers.filter(beer => beer.isAvailable), this.numberOfSamples);
  }

  getInstruction(state: DrinkingState) {
    switch (state) {
      case 'Choosing': return `Nach Auswahl ihres Getränks haben Sie ca. ${this.secondsPerSample} Sekunden Zeit für die Verkostung:`;
      case 'Preparing': return 'Bereiten Sie sich vor...';
      case 'Drinking': return 'Prost!';
      case 'Rating': return 'Bitte bewerten Sie ihr Getränk:';
    }
  }

  onBeerSelect(beer: Beer) {
    this.drinkingStateResource.set("Preparing");
    this.selectedBeer = beer;
  }

  onStartDrinking() {
    this.drinkingStateResource.set("Drinking");
    this.recorder.start();
  }

  onBeerCompleted() {
    this.drinkingStateResource.set("Rating");
    if (this.selectedBeer) {
      this.beerSelection = this.beerSelection.filter(beer => beer !== this.selectedBeer);
    }
    this.recorder.stop();
  }

  onNextBeer(previousRating: number) {
    this.onBeerReactionCompleted.emit({
      beer: this.selectedBeer!,
      rating: previousRating,
      recording: this.recorder.faceExpressions,
      recordedTime: new Date(Date.now()),
    });
    this.drinkingStateResource.set("Choosing");
    this.recorder.reset();
    this.dataProvider?.reset();
    if (this.beerSelection.length === 0) {
      this.onUserCompleted.emit();
    }
  }

}
