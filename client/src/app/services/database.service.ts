import { Injectable } from '@angular/core';
import { LocalStorageDatabase } from '../core/database/local-storage.database';
import { Database } from '../core/database/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  database: Database;

  constructor() {
    this.database = new LocalStorageDatabase();
  }
  
}
