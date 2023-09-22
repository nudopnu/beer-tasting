import { FaceExpressions } from 'face-api.js';
import { Observable, filter } from 'rxjs';

export class FaceExpressionsRecorder {

    isRecording = false;
    faceExpressions = [] as FaceExpressions[];
    recordedExpressions$: Observable<FaceExpressions>;

    constructor(source$: Observable<FaceExpressions>) {
        this.recordedExpressions$ = source$.pipe(
            filter(() => this.isRecording)
        );
        this.recordedExpressions$.subscribe(detection => this.addExpression(detection));
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