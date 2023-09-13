import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';
import * as faceapi from 'face-api.js';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs";
import { FaceExpressionEvent } from 'src/app/core/events/events';

@Component({
  selector: 'beer-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements AfterViewInit {

  @ViewChild('video') videoElementRef: ElementRef | undefined;

  interval: any;
  canvas: HTMLCanvasElement | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) {
    eventDispatcher.listen("ChangeVideoSourceEvent").subscribe(async event => {
      const { deviceId } = event.payload;
      const mediaStream = await this.getVideoInputStream(deviceId);
      this.setStream(mediaStream);
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const mediaStream = await this.getVideoInputStream();
    this.setStream(mediaStream);
  }

  private async getVideoInputStream(videoSource?: string) {
    const constraints = {
      video: videoSource ? { deviceId: { exact: videoSource } } : true
    };
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    return mediaStream;
  }

  async setStream(stream: MediaStream): Promise<void> {
    if (this.videoElementRef !== undefined) {
      const videoElement = this.videoElementRef.nativeElement as HTMLVideoElement;
      videoElement.srcObject = stream;
      await videoElement.play();

      if (this.videoElementRef) {
        const videoElement = this.videoElementRef.nativeElement as HTMLVideoElement;
        if (this.canvas) this.canvas.parentElement?.removeChild(this.canvas);
        this.canvas = await faceapi.createCanvasFromMedia(videoElement);
        this.canvas.style.position = 'absolute';
        videoElement.parentElement?.appendChild(this.canvas);

        const { width, height } = videoElement.getBoundingClientRect()
        faceapi.matchDimensions(this.canvas, { width, height });

        const modelsPath = '../beer-tasting/assets/models/';
        await Promise.all([
          faceapi.nets.faceExpressionNet.loadFromUri(modelsPath),
          faceapi.nets.faceLandmark68Net.loadFromUri(modelsPath),
          faceapi.nets.tinyFaceDetector.loadFromUri(modelsPath),
        ]);

        if (this.interval) clearInterval(this.interval);
        this.interval = setInterval(this.detectAndDraw(videoElement, { width, height }, this.canvas), 100);
      }
    }
  }


  private detectAndDraw(videoElement: HTMLVideoElement, displaySize: { width: number; height: number; }, canvas: HTMLCanvasElement): () => void {
    return async () => {
      const faceDetections = faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions({}));
      const detections = await faceDetections
        .withFaceLandmarks()
        .withFaceExpressions();
      if (detections.length > 0) {
        this.eventDispatcher.dispatch(new FaceExpressionEvent(detections[0].expressions, true));
      }
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d")?.clearRect(0, 0, displaySize.width, displaySize.height);
      // faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    };
  }
}
