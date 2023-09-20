import { FaceExpressions } from "face-api.js";
import { Subject } from "rxjs";

export class LazyBuffer {

    private emitter = new Subject<FaceExpressions>();
    private buffer = [] as FaceExpressions[];

    value$ = this.emitter.asObservable();

    constructor(
        private bufferSize = 3,
    ) { }

    addExpression(expression: FaceExpressions) {
        this.buffer.push(expression);
        if (this.buffer.length >= this.bufferSize) {
            const avgExpressions = {
                angry: this.avg(this.buffer.map(exp => exp.angry)),
                disgusted: this.avg(this.buffer.map(exp => exp.disgusted)),
                fearful: this.avg(this.buffer.map(exp => exp.fearful)),
                happy: this.avg(this.buffer.map(exp => exp.happy)),
                neutral: this.avg(this.buffer.map(exp => exp.neutral)),
                sad: this.avg(this.buffer.map(exp => exp.sad)),
                surprised: this.avg(this.buffer.map(exp => exp.surprised)),
            } as FaceExpressions;
            this.emitter.next(avgExpressions);
            this.buffer = this.buffer.slice(1);
        }
    }

    private avg(numbers: number[]) {
        let sum = 0;
        for (const number of numbers) {
            sum += number;
        }
        return sum / numbers.length;
    }
}