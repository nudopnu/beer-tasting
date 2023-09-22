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
  currentOnCloseCallback: (() => void) | undefined;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private eventDispatcher: EventDispatcherService,
  ) {
    eventDispatcher.listen("OpenDialogEvent").subscribe(event => {
      const { component, onClose } = event.payload;
      this.currentComponent = this.entry.createComponent(component);
      this.currentOnCloseCallback = onClose;
    })
  }

  destroy() {
    this.currentComponent?.destroy();
    this.currentOnCloseCallback?.();
    this.currentComponent = undefined;
  }
}
