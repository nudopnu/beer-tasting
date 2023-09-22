import { FaceExpressions } from "face-api.js";
import { Observable, Subject, tap } from "rxjs";

export class LazyBuffer {

    private emitter = new Subject<FaceExpressions>();
    private buffer = [] as FaceExpressions[];

    value$ = this.emitter.asObservable();

    constructor(
        private bufferSize = 3,
    ) { }

    wrapObservable(expressionsEmitter: Observable<FaceExpressions>): Observable<FaceExpressions> {
        expressionsEmitter.subscribe(this.addExpression.bind(this));
        return this.value$;
    }

    addExpression(expression: FaceExpressions) {
        this.buffer.push(this.normalize(this.cheatAttributes(expression)));
        // this.buffer.push(expression);
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

    cheatAttributes(expression: FaceExpressions) {
        const angryFactor = 0.01;
        const disgustedFactor = 0.9;
        const fearfulFactor = 0;
        const happyFactor = 0.001;
        const neutralFactor = 0;
        const sadFactor = 0.01;
        const surprisedFactor = 0.1;

        const cheatedExpressions = {
            angry: expression.angry * angryFactor,
            disgusted: expression.disgusted * disgustedFactor,
            fearful: expression.fearful * fearfulFactor,
            happy: expression.happy * happyFactor,
            neutral: expression.neutral * neutralFactor,
            sad: expression.sad * sadFactor,
            surprised: expression.surprised * surprisedFactor,
        } as FaceExpressions;
        return cheatedExpressions;
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

    private avg(numbers: number[]) {
        let sum = 0;
        for (const number of numbers) {
            sum += number;
        }
        return sum / numbers.length;
    }
}