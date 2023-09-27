import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gender, GenderTypes } from 'src/app/core/models/gender.model';
import { Generation, GenerationNames, toRange } from 'src/app/core/models/generation';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'beer-user-data-form',
  templateUrl: './user-data-form.component.html',
  styleUrls: ['./user-data-form.component.scss']
})
export class UserDataFormComponent {

  generations = GenerationNames;
  genderTypes = GenderTypes;
  selectedGeneration: Generation | undefined;
  selectedGender: Gender | undefined;
  userName = "- Automatisch generiert -";

  @Input() validUser: User | undefined = undefined;
  @Output() validUserChange = new EventEmitter<User | undefined>();

  onValueChange() {
    if (!this.selectedGender || !this.selectedGeneration) {
      this.validUserChange.emit(undefined);
      return;
    };
    this.validUserChange.emit({
      gender: this.selectedGender,
      generation: this.selectedGeneration,
      id: this.userName,
    });
  }
}
