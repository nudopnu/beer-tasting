import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ErrorEvent } from 'src/app/core/events/events';
import { Gender, GenderTypes } from 'src/app/core/models/gender.model';
import { Generation, GenerationNames, toRange } from 'src/app/core/models/generation';
import { User } from 'src/app/core/models/user.model';
import { EventDispatcherService } from 'src/app/services/event-dispatcher.service';

@Component({
  selector: 'beer-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

  generations = GenerationNames;
  genderTypes = GenderTypes;
  selectedGeneration: Generation | undefined;
  selectedGender: Gender | undefined;
  userName = "- Automatisch generiert -";
  currentUser: User | undefined;
  qrCode: string | undefined;

  constructor(
    private eventDispatcher: EventDispatcherService,
  ) { }

  ngAfterViewInit(): void { }

  getLabel(generation: Generation): string {
    return `${generation} (${toRange(generation)})`;
  }

  generateQrCode() {
    this.currentUser = {
      generation: this.selectedGeneration,
      id: this.userName,
      gender: this.selectedGender,
    } as User;
    this.qrCode = JSON.stringify(this.currentUser);
  }

  back() {
    this.currentUser = undefined;
    this.qrCode = undefined;
  }


}
