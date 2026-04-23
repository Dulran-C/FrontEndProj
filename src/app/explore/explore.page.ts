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
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage {

  habits: any[] = [];
  newHabit: string = '';

  constructor(private storageService: StorageService) {}

  
  async ionViewWillEnter() {
    await this.loadHabits();
  }

  async loadHabits() {
    await this.storageService.init();

    const stored = await this.storageService.get('habits');

    if (stored && Array.isArray(stored)) {
      this.habits = stored;
    } else {
      this.habits = [
        { id: 1, title: "Drink Water", done: false },
        { id: 2, title: "Study Coding", done: false },
        { id: 3, title: "Go for a Walk", done: false },
        { id: 4, title: "Workout", done: false }
      ];
      await this.saveHabits();
    }
  }

  async saveHabits() {
    const clean = JSON.parse(JSON.stringify(this.habits));
    await this.storageService.set('habits', clean);
  }

  get completedCount() {
    return this.habits.filter(h => h.done).length;
  }

  async addHabit() {
    if (!this.newHabit.trim()) return;

    this.habits = [
      {
        id: Date.now(),
        title: this.newHabit,
        done: false,
        createdAt: new Date()
      },
      ...this.habits
    ];

    this.newHabit = '';
    await this.saveHabits();
  }

  async toggleHabit(item: any) {
    this.habits = this.habits.map(h => {
      if (h.id === item.id) {
        return { ...h, done: !h.done };
      }
      return h;
    });

    await this.saveHabits();
  }

  async deleteHabit(id: number) {
    this.habits = this.habits.filter(h => h.id !== id);
    await this.saveHabits();
  }
}