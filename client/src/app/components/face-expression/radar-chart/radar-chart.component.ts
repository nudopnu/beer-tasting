import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import * as Plotly from 'plotly.js-dist-min';
import { FaceExpressionTypes, toGerman } from 'src/app/core/face-detection/face-expression-types';


const FRACTION = 360 / 6;

@Component({
  selector: 'beer-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnChanges {

  @Input() faceExpression: FaceExpressions | undefined;
  data = [] as any[];
  layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1],
        autotick: false,
      },
      angularaxis: {
        tickvals: [...Array(6)].map((_, i) => i * FRACTION),
        ticktext: FaceExpressionTypes.map(toGerman),
      },
    },
    showlegend: false,
    responsive: false,
  };
  isInitialized = false;

  async createOrUpdate() {
    if (this.isInitialized) {
      await Plotly.react('plot', this.data, this.layout);
    } else {
      await Plotly.newPlot("plot", this.data, this.layout);
      this.isInitialized = true;
    }
  }

  async ngOnChanges(changes: SimpleChanges) {
    const newData = [] as any[];

    FaceExpressionTypes.forEach((faceExpressionType, index) => {

      if (!this.faceExpression) return;
      const value = this.faceExpression[faceExpressionType];
      const label = toGerman(faceExpressionType);

      const values = [0, value, value, 0] as number[];
      const thetas = [0, index * FRACTION - 10, index * FRACTION + 10, 0] as number[];

      newData.push({
        type: 'scatterpolar',
        mode: "lines",
        fill: 'toself',
        r: values,
        theta: thetas,
      });
    })

    this.data = newData;
    this.createOrUpdate();
  }

}
