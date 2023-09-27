import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'beer-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent {
  currentUser: User | undefined;

  constructor(
    private modal: NzModalRef,
  ) { }

  destroyModal(): void {
    this.modal.destroy();
  }

  accept() {
    this.modal.triggerOk();
    this.modal.close(this.currentUser);
  }

}
