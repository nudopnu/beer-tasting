import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';
import * as QRCode from 'qrcode';
import { ErrorEvent } from 'src/app/core/events/events';

@Component({
  selector: 'beer-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnChanges {
  @ViewChild('svg') svgElementRef: ElementRef | undefined;
  @Input() content!: string;
  @Input() caption: string | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) { }

  async ngOnChanges(changes: SimpleChanges) {
    try {
      const svg = await QRCode.toString(this.content, {
        type: 'svg',
        color: {
          dark: '#231F20',
          light: '#fff'
        }
      });
      (this.svgElementRef?.nativeElement as HTMLElement).innerHTML = svg;
    } catch (err: any) {
      this.eventDispatcher.dispatch(new ErrorEvent(err))
    }
  }
}
