export const FaceExpressions = [
    "neutral",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
] as const;

export type FaceExpression = typeof FaceExpressions[number];