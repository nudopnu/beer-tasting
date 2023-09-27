import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'beer-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnChanges, OnDestroy {

  @ViewChild('video') videoElementRef: ElementRef | undefined;
  @Output() onStreamInit = new EventEmitter<HTMLVideoElement>();
  @Input() deviceId: string | undefined;
  mediaStream: MediaStream | undefined;

  async ngOnChanges(_changes: SimpleChanges) {
    this.mediaStream = await this.getVideoInputStream(this.deviceId);
    await this.setStream(this.mediaStream);
  }

  ngOnDestroy(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  private async getVideoInputStream(videoSource?: string) {
    const constraints = {
      video: { facingMode: "user" } as MediaTrackConstraints,
    };
    if (videoSource) {
      constraints.video = { deviceId: { exact: videoSource } };
    }
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    return mediaStream;
  }

  private async setStream(stream: MediaStream): Promise<void> {
    if (this.videoElementRef !== undefined) {
      const videoElement = this.videoElementRef.nativeElement as HTMLVideoElement;
      videoElement.srcObject = stream;
      if (!this.isPlaying(videoElement) && !stream.getTracks()[0].enabled) {
      }
      await videoElement.play();
      this.onStreamInit.next(videoElement);
    }
  }

  private isPlaying(videoElement: HTMLVideoElement) {
    return videoElement.currentTime > 0
      && !videoElement.paused
      && !videoElement.ended
      && videoElement.readyState > videoElement.HAVE_CURRENT_DATA;
  }

}
