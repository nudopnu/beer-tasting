import { Injectable } from '@angular/core';
import { UserData } from '../core/models/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  userData: UserData[] = [];

  constructor() { }

  addUserData(data: UserData) {
    this.userData.push(data);
  }

  export() {
    const objectUrl = URL.createObjectURL(new Blob([JSON.stringify(this.userData)], {
      type: "application/json",
    }));
    const tmpLink = document.createElement('a');
    tmpLink.href = objectUrl;
    tmpLink.setAttribute("download", "recordings.json");
    tmpLink.click();
  }
}
