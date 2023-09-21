import { Data } from "plotly.js";
import { BehaviorSubject } from "rxjs";
import { FaceExpressionTypes as AllFaceExpressions, toGerman } from "./face-detection/face-expression-types";
import { User } from "./models/user.model";
import { FaceExpressions } from "face-api.js";

export class FaceExpressionsRecording {

    private readonly initialPlotData = AllFaceExpressions.map(
        faceExpression => ({
            x: [],
            y: [],
            type: 'scatter',
            name: toGerman(faceExpression),
        } as Data)
    );

    private tracesSource = new BehaviorSubject<Data[]>(this.initialPlotData);
    traces$ = this.tracesSource.asObservable();

    constructor(
        public user: User,
    ) { }

    addExpression(expressions: FaceExpressions): void {
        const mapping = (trace: any) => {
            const result = trace;
            Object.keys(expressions).forEach((expression) => {
                if (trace.name === toGerman(expression as any)) {
                    const newX = result.x.length + 1;
                    const newY = expressions[expression as keyof FaceExpressions];
                    result.x = [...result.x, newX];
                    result.y = [...result.y, newY];
                }
            });
            return result;
        };
        this.tracesSource.next(this.tracesSource.value.map(mapping));
    }
}