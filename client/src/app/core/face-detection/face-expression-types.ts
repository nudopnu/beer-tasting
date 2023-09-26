export const FaceExpressionTypes = [
    // "neutral",
    "sad",
    "surprised",
    "happy",
    "angry",
    "disgusted",
    // "fearful",
] as const;

export type FaceExpressionType = typeof FaceExpressionTypes[number];

export function toGerman(faceExpressionType: FaceExpressionType): string {
    const mapping: {[K in FaceExpressionType]: string} = {
        // neutral: "neutral",
        happy: "fröhlich",
        sad: "traurig",
        angry: "wütend",
        // fearful: "ängstlich",
        disgusted: "irritiert",
        surprised: "überrascht"
    };
    return mapping[faceExpressionType];
}