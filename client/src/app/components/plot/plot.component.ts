import { AfterViewInit, Component } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

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

  interval: any;
  data: any[] = this.expressions.map(
    expression => ({
      x: [1],
      y: [0],
      type: 'scatter',
      name: expression,
    })
  );
  isRecording = false;

  ngAfterViewInit(): void {
    Plotly.newPlot('plot', this.data, { autosize: true });
  }

  addData(): void {
    const new_data = (trace: any) => {
      const result = trace;
      this.expressions.forEach(expression => {
        if (trace.name === expression) {
          const newX = result.x.length + 1;
          const newY = Math.random();
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
    this.interval = setInterval(() => {
      this.addData();
      Plotly.react('plot', this.data, { autosize: true });
    }, 100);
  }

  stop() {
    clearInterval(this.interval);
  }

}
