import { FaceExpressions } from "face-api.js";
import { Data } from "plotly.js";
import { BehaviorSubject, Observable } from "rxjs";
import { FaceExpressionTypes as AllFaceExpressions, toGerman } from "./face-detection/face-expression-types";

export class FaceExpressionsPlotDataProvider {

    private readonly initialPlotData = () => AllFaceExpressions.map(
        faceExpression => ({
            x: [],
            y: [],
            type: 'scatter',
            name: toGerman(faceExpression),
        } as Data)
    );
    plotDataSource: BehaviorSubject<Data[]>;
    plotData$: Observable<Data[]>;

    constructor() {
        this.plotDataSource = new BehaviorSubject<Data[]>(this.initialPlotData());
        this.plotData$ = this.plotDataSource.asObservable();
    }

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
        this.plotDataSource.next(this.plotDataSource.value.map(mapping));
    }

    reset() {
        this.plotDataSource.next(this.initialPlotData());
    }
}