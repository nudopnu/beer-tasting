import { AfterViewInit, Component } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import * as Plotly from 'plotly.js-dist-min';
import { Subscription } from 'src/app/core/events/event-listener';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements AfterViewInit {

  expressions = [
    "neutral",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
  ];

  subscription?: Subscription;
  data: Plotly.Data[] = this.expressions.map(
    expression => ({
      x: [1],
      y: [0],
      type: 'scatter',
      name: expression,
    })
  );
  isRecording = false;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) { }

  ngAfterViewInit(): void {
    Plotly.newPlot('plot', this.data, { autosize: true });
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

  toggleRecording() {
    this.isRecording = !this.isRecording;
    if (this.isRecording) {
      this.start();
    } else {
      this.stop();
    }
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

}
