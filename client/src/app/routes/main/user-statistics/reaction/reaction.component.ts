import { AfterContentInit, Component, Input } from '@angular/core';
import { FaceExpressions } from 'face-api.js';
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
    this.avgExpressions = this.normalize({
      angry: this.avg(expressions.map(exp => exp.angry)),
      disgusted: this.avg(expressions.map(exp => exp.disgusted)),
      fearful: this.avg(expressions.map(exp => exp.fearful)),
      happy: this.avg(expressions.map(exp => exp.happy)),
      neutral: this.avg(expressions.map(exp => exp.neutral)),
      sad: this.avg(expressions.map(exp => exp.sad)),
      surprised: this.avg(expressions.map(exp => exp.surprised)),
    } as FaceExpressions);
  }

  private avg(numbers: number[]) {
    let sum = 0;
    for (const number of numbers) {
      sum += number;
    }
    return sum / numbers.length;
  }

  normalize(expression: FaceExpressions) {
    let sum = 0;
    sum += expression.angry;
    sum += expression.disgusted;
    sum += expression.fearful;
    sum += expression.happy;
    sum += expression.neutral;
    sum += expression.sad;
    sum += expression.surprised;
    const factor = 1 / sum;
    return {
      angry: expression.angry * factor,
      disgusted: expression.disgusted * factor,
      fearful: expression.fearful * factor,
      happy: expression.happy * factor,
      neutral: expression.neutral * factor,
      sad: expression.sad * factor,
      surprised: expression.surprised * factor,
    } as FaceExpressions
  }

}
