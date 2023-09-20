import { Component, Input, OnDestroy } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { Subscription } from 'src/app/core/events/event-listener';
import { LazyBuffer } from 'src/app/core/face-detection/lazy-buffer';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-face-expression',
  templateUrl: './face-expression.component.html',
  styleUrls: ['./face-expression.component.scss']
})
export class FaceExpressionComponent implements OnDestroy {
  @Input() faceExpression: FaceExpressions | undefined
  subscriptions: Subscription[] = [];

  buffer: LazyBuffer;

  constructor(
    eventDispatcher: EventDispatcherService,
  ) {
    this.buffer = new LazyBuffer(5);
    const subscription = eventDispatcher.listen("FaceExpressionEvent")
      .subscribe(event => this.buffer.addExpression(event.payload));
    this.subscriptions.push(subscription);
    this.buffer.value$
      .subscribe(value => this.faceExpression = value);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.stop());
  }
}
