import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import * as Plotly from 'plotly.js-dist-min';
import { FaceExpressionTypes } from 'src/app/core/face-api/face-expression-types';

@Component({
  selector: 'beer-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements AfterViewInit, OnChanges {

  @Input() faceExpression: FaceExpressions | undefined;
  data = [] as any[];
  layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1],
        autotick: false,
        // autorange: false,
        // tickmode: "linear" as "linear",
        // nticks: 20,
        // tickwidth: 0.1,
        // tick0: 0.5,
        // dtick: 0.75,
      }
    },
    showlegend: false
  };

  ngAfterViewInit(): void {
    Plotly.newPlot("plot", this.data, this.layout);
  }

  async ngOnChanges(changes: SimpleChanges) {
    const values = [] as number[];
    const labels = [] as string[];
    const widths = [] as number[];

    FaceExpressionTypes.forEach(faceExpressionType => {
      if (!this.faceExpression) return;
      values.push(this.faceExpression[faceExpressionType]);
      labels.push(faceExpressionType);
      widths.push(1);
    })

    this.data = [{
      type: 'scatterpolar',
      mode: "lines",
      fill: 'toself',
      r: values,
      width: widths,
      theta: labels,
    }];
    await Plotly.react('plot', this.data, this.layout);
  }

}
