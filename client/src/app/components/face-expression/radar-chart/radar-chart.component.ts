import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import * as Plotly from 'plotly.js-dist-min';
import { FaceExpressionTypes, toGerman } from 'src/app/core/face-detection/face-expression-types';


const FRACTION = 360 / FaceExpressionTypes.length;
let id = 1;
let getId = () => ++id;

@Component({
  selector: 'beer-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.scss']
})
export class RadarChartComponent implements OnChanges, AfterViewInit {
  @ViewChild('plot') plotElementRef!: ElementRef;
  plotID = "plot_" + getId();
  @Input() faceExpression: FaceExpressions | undefined;
  @Input() dimensions = { width: 400, height: 400 };
  data = [] as any[];

  isInitialized = false;

  async createOrUpdate() {
    const layout = {
      polar: {
        radialaxis: {
          visible: true,
          range: [0, 1],
          autotick: false,
        },
        angularaxis: {
          tickvals: [...Array(FaceExpressionTypes.length)].map((_, i) => i * FRACTION),
          ticktext: FaceExpressionTypes.map(toGerman),
        },
      },
      showlegend: false,
      responsive: false,
      width: this.dimensions.width,
      height: this.dimensions.height,
    };
    if (this.isInitialized) {
      await Plotly.react(this.plotElementRef.nativeElement, this.data, layout);
    } else {
      await Plotly.newPlot(this.plotElementRef.nativeElement, this.data, layout);
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
    if (!changes['faceExpression'].isFirstChange()) {
      this.createOrUpdate();
    }
  }

  ngAfterViewInit(): void {
    this.createOrUpdate();
  }

}
