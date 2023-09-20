import { Component, EventEmitter, Input, Output } from '@angular/core';
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
}
