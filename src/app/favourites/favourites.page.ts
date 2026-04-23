import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './favourites.page.html',
})
export class FavouritesPage {

  favourites: any[] = [];

  constructor(private storageService: StorageService) {}

  async ionViewWillEnter() {
  const storage = await this.storageService.getStorage(); 
  const keys = await storage.keys(); 
  this.favourites = [];

  for (let key of keys) {
    const item = await storage.get(key);
    this.favourites.push(item);
  }
}
}