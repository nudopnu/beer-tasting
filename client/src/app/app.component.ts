import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { EventDispatcherService } from './services/event-dispatcher.service';
import { OpenDialogEvent } from './core/events/events';
import { SettingsComponent } from './components/modal/settings/settings.component';
import { Router } from '@angular/router';
import { ExportService } from './services/export.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
    private exportService: ExportService,
    private modalService: NzModalService,
  ) { }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  openSettings(element: HTMLElement) {
    // this.eventDispatcher.dispatch(new OpenDialogEvent({ component: SettingsComponent, onClose: () => this.deFocus(element, 0) }));
    this.modalService.create({
      nzTitle: 'Einstellungen',
      nzContent: SettingsComponent,
    });
  }

  isSelected(route: string): boolean {
    return route === this.router.url;
  }

  export(element: HTMLElement) {
    this.exportService.export();
    this.deFocus(element);
  }

  private deFocus(element: HTMLElement, delay = 300) {
    setTimeout(() => {
      element.classList.remove("ant-menu-item-selected");
    }, delay);
  }

}
