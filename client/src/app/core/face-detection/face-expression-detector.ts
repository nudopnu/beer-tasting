import * as faceapi from 'face-api.js';
import { FaceExpressions } from 'face-api.js';
import { FaceDetection, FaceLandmarks68, IDimensions, WithFaceExpressions, WithFaceLandmarks } from 'face-api.js';
import { BehaviorSubject, Observable, Subject, filter, map } from 'rxjs';

export type FaceDetections = WithFaceExpressions<WithFaceLandmarks<{
    detection: FaceDetection;
}, FaceLandmarks68>>[];

export class FaceExpressionDetector {

    readonly MODELS_PATH = '../assets/models/'; // '../beer-tasting/assets/models/'; // FOR PRODUCTION

    private videoElementRef: HTMLVideoElement | undefined;
    private canvas: HTMLCanvasElement | undefined;
    private interval: any;
    private faceDetectionSource: Subject<FaceDetections>;
    faceDetections$: Observable<FaceDetections>;
    faceExpressions$: Observable<FaceExpressions>;

    constructor() {
        this.faceDetectionSource = new Subject<FaceDetections>();
        this.faceDetections$ = this.faceDetectionSource.asObservable();
        this.faceExpressions$ = this.faceDetections$.pipe(
            filter(faceDetection => faceDetection.length > 0),
            map(faceDetection => faceDetection[0].expressions),
        );
    }

    async initialize(videoElement: HTMLVideoElement) {
        this.videoElementRef = videoElement;
        await this.loadModels();
        const { width, height } = this.videoElementRef.getBoundingClientRect();
        this.canvas = await this.initCanvas(videoElement, { width, height });
    }

    startDetection(): void {
        const { width, height } = this.videoElementRef!.getBoundingClientRect();
        this.interval = this.startDetectionLoop(this.videoElementRef!, { width, height });
    }

    stopDetection(): void {
        clearInterval(this.interval);
    }

    private startDetectionLoop(videoElement: HTMLVideoElement, dimensions: IDimensions) {
        if (this.interval) clearInterval(this.interval);
        return setInterval(this.detectAndDraw(videoElement, dimensions), 100);
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
            this.faceDetectionSource.next(detections);
            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            this.canvas!.getContext("2d")?.clearRect(0, 0, displaySize.width, displaySize.height);
            faceapi.draw.drawFaceLandmarks(this.canvas!, resizedDetections);
            faceapi.draw.drawFaceExpressions(this.canvas!, resizedDetections);
        };
    }
}