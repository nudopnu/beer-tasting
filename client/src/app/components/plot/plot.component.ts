import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';

@Component({
  selector: 'beer-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent implements OnChanges {

  @Input() data: Plotly.Data[] = [];
  plot: any;

  hasRecordedData(): boolean {
    return this.data.length > 1;
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (!this.plot)
      this.plot = this.initPlot();
    else
      this.plot = await Plotly.react('plot', this.data, { autosize: true });
  }

  private async initPlot() {
    return await Plotly.newPlot('plot', this.data, { autosize: true });
  }
}
