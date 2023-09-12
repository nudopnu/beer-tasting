import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'beer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    logger: LoggerService,
  ) { }
}
