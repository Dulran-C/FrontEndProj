import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './explore.page.html',
})
export class ExplorePage {

  data: any[] = [];
  savedIds: Set<number> = new Set();
  newHabit: string = '';

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    await this.storageService.init();

    // default habits
    this.data = [
      { id: 1, title: "Drink Water", done: false },
      { id: 2, title: "Study Coding", done: false },
      { id: 3, title: "Go for a Walk", done: false },
      { id: 4, title: "Workout", done: false }
    ];

    const keys = await this.storageService.getAllKeys();
    keys.forEach((k: string) => this.savedIds.add(Number(k)));
  }

  get completedCount() {
    return this.savedIds.size;
  }

  async addHabit() {
    if (!this.newHabit.trim()) return;

    const newItem = {
      id: Date.now(),
      title: this.newHabit,
      done: false
    };

    this.data.unshift(newItem);
    this.newHabit = '';
  }

  async toggleHabit(item: any) {
    const key = item.id.toString();

    if (this.savedIds.has(item.id)) {
      await this.storageService.remove(key);
      this.savedIds.delete(item.id);
      item.done = false;
      return;
    }

    await this.storageService.set(key, item);
    this.savedIds.add(item.id);
    item.done = true;
  }

  deleteHabit(id: number) {
    this.data = this.data.filter(h => h.id !== id);
    this.savedIds.delete(id);
    this.storageService.remove(id.toString());
  }
}