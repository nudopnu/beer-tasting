import { AfterViewInit, Component } from '@angular/core';
import * as QRCode from 'qrcode'
import { User } from 'src/app/core/models/user.model';
import { GenerationNames } from "../../core/models/generation";

@Component({
  selector: 'beer-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {
  generations = GenerationNames;

  constructor() {

  }
  ngAfterViewInit(): void {
    const generateQR = async (text: string) => {
      try {
        console.log(await QRCode.toDataURL(document.getElementById("canvas")! as HTMLCanvasElement, text, () => { }))
      } catch (err) {
        console.error(err)
      }
    }
    generateQR(JSON.stringify({ id: 'CustomUser123123123', generation: 'Gen X' } as User));
  }
}
