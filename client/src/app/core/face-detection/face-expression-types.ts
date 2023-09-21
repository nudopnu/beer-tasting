export const FaceExpressionTypes = [
    // "neutral",
    "happy",
    "sad",
    "angry",
    // "fearful",
    "disgusted",
    "surprised",
] as const;

export type FaceExpressionType = typeof FaceExpressionTypes[number];

export function toGerman(faceExpressionType: FaceExpressionType): string {
    const mapping: {[K in FaceExpressionType]: string} = {
        // neutral: "neutral",
        happy: "fröhlich",
        sad: "traurig",
        angry: "wütend",
        // fearful: "ängstlich",
        disgusted: "angewidert",
        surprised: "überrascht"
    };
    return mapping[faceExpressionType];
}