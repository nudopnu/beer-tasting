import { Input, AfterViewInit, Component } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import * as Plotly from 'plotly.js-dist-min';
import { Subscription } from 'src/app/core/events/event-listener';
import { OpenDialogEvent } from 'src/app/core/events/events';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';
import { SettingsComponent } from '../modal/settings/settings.component';

@Component({
  selector: 'beer-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.scss']
})
export class PlotComponent {

  @Input() data: Plotly.Data[] = [];

  hasRecordedData(): boolean {
    return (this.data[0] as any).x.length > 1;
  }

}
