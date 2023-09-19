import { Component, Input } from '@angular/core';
import { FaceExpressions } from 'face-api.js';

@Component({
  selector: 'beer-face-expression-stats',
  templateUrl: './face-expression-stats.component.html',
  styleUrls: ['./face-expression-stats.component.scss']
})
export class FaceExpressionStatsComponent {
  @Input() faceExpression: FaceExpressions | undefined;
  precision = 4;
}
