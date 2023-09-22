import { Injectable } from '@angular/core';
import { UserData } from '../core/models/user-data.model';
import { ResourceProviderService } from './resource-provider.service';
import { UserDataResource } from '../core/resources/resources';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  readonly EXPORT_FILENAME = "recordings.json";

  constructor(
    private resourceProvider: ResourceProviderService,
  ) { }

  export() {
    const userData = this.resourceProvider.getResource(UserDataResource).get();
    const objectUrl = URL.createObjectURL(new Blob([JSON.stringify(userData)], {
      type: "application/json",
    }));
    const tmpLink = document.createElement('a');
    tmpLink.href = objectUrl;
    tmpLink.setAttribute("download", this.EXPORT_FILENAME);
    tmpLink.click();
    tmpLink.remove();
  }
}
