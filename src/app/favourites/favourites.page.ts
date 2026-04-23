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

  completed: any[] = [];

  constructor(private storageService: StorageService) {}

  async ionViewWillEnter() {
    await this.storageService.init();

    const habits = await this.storageService.get('habits');

    if (habits && Array.isArray(habits)) {
      this.completed = habits.filter((h: any) => h.done);
    } else {
      this.completed = [];
    }
  }
}