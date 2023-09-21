import { Injectable } from '@angular/core';
import { Database } from '../core/database/database';
import { LocalStorageDatabase } from '../core/database/local-storage.database';
import { Resource } from '../core/resources/resources';

@Injectable({
  providedIn: 'root'
})
export class ResourceProviderService {

  private database: Database;

  constructor() {
    this.database = new LocalStorageDatabase();
  }

  getResource<T extends Resource>(ResourceClass: new (database: Database) => T): T {
    return new ResourceClass(this.database);
  }

}
