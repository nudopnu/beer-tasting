import { FaceExpressions } from "face-api.js";
import { MathUtils } from "../math-utils";

export class FaceExpressionUtils {

    static avg(expressions: Array<FaceExpressions>): FaceExpressions {
        return {
            angry: MathUtils.avg(expressions.map(exp => exp.angry)),
            disgusted: MathUtils.avg(expressions.map(exp => exp.disgusted)),
            fearful: MathUtils.avg(expressions.map(exp => exp.fearful)),
            happy: MathUtils.avg(expressions.map(exp => exp.happy)),
            neutral: MathUtils.avg(expressions.map(exp => exp.neutral)),
            sad: MathUtils.avg(expressions.map(exp => exp.sad)),
            surprised: MathUtils.avg(expressions.map(exp => exp.surprised)),
        } as FaceExpressions;
    }

    static normalize(expression: FaceExpressions): FaceExpressions {
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
        } as FaceExpressions;
    }

}