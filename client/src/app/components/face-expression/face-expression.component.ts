import { Component, Input } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { FaceExpression } from 'src/app/core/face-api/FaceExpression';

@Component({
  selector: 'beer-face-expression',
  templateUrl: './face-expression.component.html',
  styleUrls: ['./face-expression.component.scss']
})
export class FaceExpressionComponent {
  @Input() faceExpression: FaceExpressions | undefined;
  precision = 4;
}
