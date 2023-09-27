import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'beer-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements AfterViewInit, OnDestroy {

  progress = 100;
  label = (progress: number) => {
    if (progress === 0) return "Prost!";
    return Math.ceil(progress / (100 / this.startValue)) + "";
  };
  interval: any;

  @Input() startValue = 3;
  @Output() onCompleted = new EventEmitter();

  startTime: number = -1;

  ngAfterViewInit(): void {
    this.startTime = Date.now();
    this.interval = setInterval(() => {
      const elapsedTime = Date.now() - this.startTime;
      const elapsedSeconds = elapsedTime / 1000;
      this.progress = (1 - (elapsedSeconds / this.startValue)) * 100;
      if (this.progress <= 0) {
        this.onCompleted.emit();
        clearInterval(this.interval);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
