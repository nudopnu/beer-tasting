import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'beer-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent {

  @Output() onRatingCompleted = new EventEmitter<number>();

  userRating = 0;
  RatingTooltips = ['nicht meins', 'geht so', 'okay', 'gut', 'köstlich!'];

}
