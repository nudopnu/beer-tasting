import { Component } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  faceExpression$: Observable<FaceExpressions>;

  constructor(
    eventDispatcher: EventDispatcherService,
  ) {
    const faceExpressionSource = new Subject<FaceExpressions>();
    eventDispatcher.listen("FaceExpressionEvent").subscribe(event => {
      faceExpressionSource.next(event.payload);
    });
    this.faceExpression$ = faceExpressionSource.asObservable();
  }
}
