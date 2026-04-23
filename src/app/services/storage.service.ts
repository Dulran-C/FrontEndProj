import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {

  private storage!: Storage;

  constructor(private storageCtrl: Storage) {}

  async init() {
    if (!this.storage) {
      this.storage = await this.storageCtrl.create();
    }
  }

  async set(key: string, value: any) {
    await this.init();
    return this.storage.set(key, value);
  }

  async get(key: string) {
    await this.init();
    return this.storage.get(key);
  }
}