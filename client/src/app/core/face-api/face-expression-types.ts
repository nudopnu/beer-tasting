export const FaceExpressionTypes = [
    "neutral",
    "happy",
    "sad",
    "angry",
    "fearful",
    "disgusted",
    "surprised",
] as const;

export type FaceExpressionType = typeof FaceExpressionTypes[number];