import { AfterContentInit, Component, Input } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
import { FaceExpressionUtils } from 'src/app/core/face-detection/face-expression-utils';
import { BeerRaction } from 'src/app/core/models/beer-reaction.model';

@Component({
  selector: 'beer-reaction',
  templateUrl: './reaction.component.html',
  styleUrls: ['./reaction.component.scss']
})
export class ReactionComponent implements AfterContentInit {
  
  avgExpressions: FaceExpressions | undefined;
  @Input() reaction!: BeerRaction;

  ngAfterContentInit(): void {
    const expressions = this.reaction.recording;
    this.avgExpressions = FaceExpressionUtils.normalize(FaceExpressionUtils.avg(expressions));
  }

}
