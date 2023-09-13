import { ComponentRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @ViewChild('dialogContent', { read: ViewContainerRef }) entry!: ViewContainerRef;

  dialogQueue = [];
  currentComponent: ComponentRef<any> | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private eventDispatcher: EventDispatcherService,
  ) {
    eventDispatcher.listen("OpenDialogEvent").subscribe(event => {
      const { component } = event.payload;
      this.currentComponent = this.entry.createComponent(component);
    })
  }

  destroy() {
    this.currentComponent?.destroy();
    this.currentComponent = undefined;
  }
}
