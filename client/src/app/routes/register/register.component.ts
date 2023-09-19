import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as QRCode from 'qrcode';
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

  @ViewChild('svg') svgElementRef: ElementRef | undefined;
  generations = GenerationNames;
  genderTypes = GenderTypes;
  selectedGeneration: Generation | undefined;
  selectedGender: Gender | undefined;
  userName = "UsernameXYZ";
  currentUser: User | undefined;

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
    const content = JSON.stringify(this.currentUser);
    this.setQrCode(content);
  }

  back() {
    this.currentUser = undefined;
  }

  private async setQrCode(content: string) {
    try {
      const svg = await QRCode.toString(content, {
        type: 'svg',
        color: {
          dark: '#231F20',
          light: '#fff'
        }
      });
      (this.svgElementRef?.nativeElement as HTMLElement).innerHTML = svg;
    } catch (err: any) {
      this.eventDispatcher.dispatch(new ErrorEvent(err))
    }
  }
}
