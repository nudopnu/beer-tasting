import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ModalRegisterComponent } from 'src/app/components/modal/modal-register/modal-register.component';
import { Settings } from 'src/app/core/models/settings.model';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'beer-user-scanning',
  templateUrl: './user-scanning.component.html',
  styleUrls: ['./user-scanning.component.scss']
})
export class UserScanningComponent {
  @Input() settings!: Settings;
  @Output() onUserRegistered = new EventEmitter<User>();

  constructor(private modal: NzModalService) { }

  registerManually() {
    this.modal.create({
      nzTitle: 'Registrieren',
      nzContent: ModalRegisterComponent,
      nzOnOk: (result) => this.onUserRegistered.emit(result.currentUser),
    });
  }
}
