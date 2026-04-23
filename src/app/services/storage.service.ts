import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private storage!: Storage;

  constructor(private storageCtrl: Storage) {}

  async init() {
    this.storage = await this.storageCtrl.create();
  }

  async getStorage(): Promise<Storage> {
    if (!this.storage) {
      await this.init();
    }
    return this.storage;
  }
}