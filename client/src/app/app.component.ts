import { Component, NgZone } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { EventDispatcherService } from './services/event-dispatcher.service';
import { OpenDialogEvent } from './core/events/events';
import { SettingsComponent } from './components/modal/settings/settings.component';
import { Router } from '@angular/router';
import { ExportService } from './services/export.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Observer } from 'rxjs';
import { UserDataResource } from './core/resources/resources';
import { ResourceProviderComponent } from './components/resource-provider/resource-provider.component';
import { ResourceProviderService } from './services/resource-provider.service';
import { UserDataFlat } from './core/models/user-data-flat.model';

@Component({
  selector: 'beer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = true;
  uploadingUserData = false;

  constructor(
    private eventDispatcher: EventDispatcherService,
    private router: Router,
    private exportService: ExportService,
    private modalService: NzModalService,
    private modal: NzModalService,
    private msg: NzMessageService,
    private resourceProvider: ResourceProviderService,
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
    this.unfocus(element);
  }

  update(element: HTMLElement) {
    this.modal.warning({
      nzTitle: 'Warnung!',
      nzContent: 'Das Zurücksetzen führt zur Löschung aller zwischengespeicherten Daten! Dies kann jedoch zur Fehlerbehebung notwendig sein.',
      nzOnOk: () => {
        localStorage.clear();
        window.location.reload();
      },
      nzOnCancel: () => {
        this.unfocus(element);
      }
    });
  }

  onUpload = (file: NzUploadFile): boolean => {
    const isJSON = file.type === 'application/json';
    if (!isJSON) {
      this.msg.error('You can only upload JSON files');
      return false;
    }
    this.uploadingUserData = true;
    const reader = new FileReader();
    reader.onload = () => {
      const newUserDataFlat = JSON.parse(reader.result as any) as UserDataFlat[];
      this.resourceProvider
        .getResource(UserDataResource)
        .addItems(newUserDataFlat.map(entry => ({
          user: { gender: entry.userGender, generation: entry.userGeneration, id: entry.userId },
          beerReactions: [{
            beer: { assignedNumber: entry.beerId, name: entry.beerName, isAvailable: true },
            rating: entry.rating,
            recordedTime: new Date(entry.recordedTime),
            recording: [{
              angry: entry.avgNormAngry,
              disgusted: entry.avgNormDisgusted,
              fearful: 0,
              happy: entry.avgNormHappy,
              neutral: 0,
              sad: entry.avgNormSad,
              surprised: entry.avgNormSurprised,
            } as any],
          }]
        })));
      this.uploadingUserData = false;
      this.msg.success("Restored data");
    };
    reader.readAsText(file as any);
    return false;
  }

  private unfocus(element: HTMLElement, delay = 300) {
    setTimeout(() => {
      element.classList.remove("ant-menu-item-selected");
    }, delay);
  }

}
