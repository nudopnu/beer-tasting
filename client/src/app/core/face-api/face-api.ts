import * as faceapi from 'face-api.js';
import { FaceDetection, FaceLandmarks68, IDimensions, WithFaceExpressions, WithFaceLandmarks } from 'face-api.js';

export type FaceDetections = WithFaceExpressions<WithFaceLandmarks<{
    detection: FaceDetection;
}, FaceLandmarks68>>[];

export class FaceExpressionDetector {

    MODELS_PATH = '../assets/models/'; // '../beer-tasting/assets/models/'; // FOR PRODUCTION

    canvas: HTMLCanvasElement | undefined;
    interval: any;

    constructor(
        private onDetect: (detections: FaceDetections) => void,
    ) { }

    async startDetection(videoElement: HTMLVideoElement) {
        const { width, height } = videoElement.getBoundingClientRect();
        await this.loadModels();
        this.canvas = await this.initCanvas(videoElement, { width, height });
        this.startDetectionLoop(videoElement, { width, height });
    }
    
    stopDetection(): void {
        clearInterval(this.interval);
    }

    private startDetectionLoop(videoElement: HTMLVideoElement, dimensions: IDimensions) {
        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(this.detectAndDraw(videoElement, dimensions), 100);
    }

    private async loadModels() {
        await Promise.all([
            faceapi.nets.faceExpressionNet.loadFromUri(this.MODELS_PATH),
            faceapi.nets.faceLandmark68Net.loadFromUri(this.MODELS_PATH),
            faceapi.nets.tinyFaceDetector.loadFromUri(this.MODELS_PATH),
        ]);
    }

    private async initCanvas(videoElement: HTMLVideoElement, dimensions: IDimensions) {
        if (this.canvas) this.canvas.parentElement?.removeChild(this.canvas);
        const newCanvas = await faceapi.createCanvasFromMedia(videoElement);
        newCanvas.style.position = 'absolute';
        videoElement.parentElement?.appendChild(newCanvas);
        faceapi.matchDimensions(newCanvas, dimensions);
        return newCanvas;
    }


    private detectAndDraw(videoElement: HTMLVideoElement, displaySize: { width: number; height: number; }): () => void {
        return async () => {
            const faceDetections = faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions({}));
            const detections = await faceDetections
                .withFaceLandmarks()
                .withFaceExpressions();
            this.onDetect(detections);

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            this.canvas!.getContext("2d")?.clearRect(0, 0, displaySize.width, displaySize.height);
            faceapi.draw.drawFaceLandmarks(this.canvas!, resizedDetections);
            faceapi.draw.drawFaceExpressions(this.canvas!, resizedDetections);
        };
    }
}