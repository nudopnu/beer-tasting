import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/core/models/option.model';

@Component({
  selector: 'beer-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent<T> {
  @Input() options: Array<Option<T>> = [];
  @Output() optionChange = new EventEmitter<T>();

  select(name: string) {
    this.optionChange.emit(this.options.find(option => option.name === name)?.reference);
  }
}
