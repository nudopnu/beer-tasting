import { FaceExpressions } from 'face-api.js';
import { Observable, filter, tap } from 'rxjs';

export class FaceExpressionsRecorder {

    isRecording = false;
    faceExpressions = [] as FaceExpressions[];
    recordedExpressions$: Observable<FaceExpressions>;

    constructor(source$: Observable<FaceExpressions>) {
        this.recordedExpressions$ = source$.pipe(
            filter(() => this.isRecording),
            tap(detection => this.addExpression(detection)),
        );
    }

    start() {
        this.isRecording = true;
    }

    stop() {
        this.isRecording = false;
    }

    reset() {
        this.faceExpressions = [];
    }

    addExpression(expressions: FaceExpressions) {
        this.faceExpressions.push(expressions);
    }

}