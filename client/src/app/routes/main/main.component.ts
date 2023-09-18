import { AfterViewInit, Component } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

import { FaceExpressions } from 'face-api.js';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SettingsComponent } from 'src/app/components/modal/settings/settings.component';
import { Subscription } from 'src/app/core/events/event-listener';
import { OpenDialogEvent } from 'src/app/core/events/events';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

import * as _ from "lodash";

@Component({
  selector: 'beer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  EXPRESSIONS = [
    "neutral",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
  ];
  beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);

  faceExpression$: Observable<FaceExpressions>;
  precision = 4;
  isRecording = false;
  subscription?: Subscription;
  data: Plotly.Data[];

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) {
    const faceExpressionSource = new Subject<FaceExpressions>();
    eventDispatcher.listen("FaceExpressionEvent").subscribe(event => {
      faceExpressionSource.next(event.payload);
    });
    this.faceExpression$ = faceExpressionSource.asObservable();
    this.data = this.initialData();
  }

  ngAfterViewInit(): void {
    Plotly.newPlot('plot', this.data, { autosize: true });
  }

  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  }

  addExpression(expression: FaceExpressions): void {
    const new_data = (trace: any) => {
      const result = trace;
      expression.asSortedArray().forEach(({ expression, probability }) => {
        if (trace.name === expression) {
          const newX = result.x.length + 1;
          const newY = probability;
          result.x = [...result.x, newX];
          result.y = [...result.y, newY];
        }
      });
      return result;
    };
    this.data = this.data.map(new_data);
  }


  private initialData(): Plotly.Data[] {
    return this.EXPRESSIONS.map(
      expression => ({
        x: [1],
        y: [0],
        type: 'scatter',
        name: expression,
      })
    );
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
        this.addExpression(event.payload);
        Plotly.react('plot', this.data, { autosize: true });
      });
  }

  stop() {
    if (this.subscription) {
      this.subscription.remove();
    }
  }

  reset() {
    this.data = this.initialData();
  }

}
