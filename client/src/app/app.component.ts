import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { EventDispatcherService } from './services/event-dispatcher.service';
import { OpenDialogEvent } from './core/events/events';
import { SettingsComponent } from './components/modal/settings/settings.component';
import { Router } from '@angular/router';

@Component({
  selector: 'beer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = true;

  constructor(
    private eventDispatcher: EventDispatcherService,
    private router: Router,
  ) { }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  openSettings() {
    this.eventDispatcher.dispatch(new OpenDialogEvent({ component: SettingsComponent }));
  }

  isSelected(route: string): boolean {
    return route === this.router.url;
  }
}
