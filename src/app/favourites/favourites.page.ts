import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './favourites.page.html',
})
export class FavouritesPage {

  favourites: any[] = [];
  private storage!: Storage;

  constructor(private storageCtrl: Storage) {}

  async ionViewWillEnter() {
    this.storage = await this.storageCtrl.create();

    const keys = await this.storage.keys();
    this.favourites = [];

    for (let key of keys) {
      const item = await this.storage.get(key);
      this.favourites.push(item);
    }
  }
}