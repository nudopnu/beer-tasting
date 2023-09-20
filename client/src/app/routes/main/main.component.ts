import { Component } from '@angular/core';


import * as _ from "lodash";
import { FaceExpressionsRecording } from 'src/app/core/FaceExpressionsRecording';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'beer-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {


  currentUser: User | undefined;
  beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  // qrcodeDetector: QrcodeDetector;

  isRecording = false;
  recording: FaceExpressionsRecording | undefined;


  setUser() {
    this.currentUser = { generation: "Boomer", id: "abc123" } as User;
    this.recording = new FaceExpressionsRecording(this.currentUser);
  }

  getRandomBeers(): void {
    this.beers = _.sampleSize([...Array(10)].map((_, i) => i + 1), 3);
  }

}
