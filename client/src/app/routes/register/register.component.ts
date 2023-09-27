import { Component } from '@angular/core';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'beer-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  currentUser: User | undefined;
  qrCode: string | undefined;

  generateQrCode() {
    this.qrCode = JSON.stringify(this.currentUser);
  }

  back() {
    this.currentUser = undefined;
    this.qrCode = undefined;
  }

}
