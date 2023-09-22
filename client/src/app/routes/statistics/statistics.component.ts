import { Component } from '@angular/core';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'beer-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  constructor(
    public exportService: ExportService,
  ) {
    
  }
}
