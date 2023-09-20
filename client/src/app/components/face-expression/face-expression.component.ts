import { Component, Input, OnDestroy } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { Subscription } from 'src/app/core/events/event-listener';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-face-expression',
  templateUrl: './face-expression.component.html',
  styleUrls: ['./face-expression.component.scss']
})
export class FaceExpressionComponent implements OnDestroy {
  @Input() faceExpression: FaceExpressions | undefined
  subscription: Subscription;

  constructor(
    eventDispatcher: EventDispatcherService,
  ) {
    this.subscription = eventDispatcher.listen("FaceExpressionEvent")
      .subscribe(event => this.faceExpression = event.payload);
  }
  
  ngOnDestroy(): void {
    this.subscription.stop();
  }
}
