import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './explore.page.html',
})
export class ExplorePage {

  data: any[] = [];
  savedIds: Set<number> = new Set();
  private storage!: Storage;

  constructor(private http: HttpClient, private storageCtrl: Storage) {}

  async ngOnInit() {
    this.storage = await this.storageCtrl.create();

    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res: any) => {
        this.data = res;
      });

    const keys = await this.storage.keys();
    keys.forEach(k => this.savedIds.add(Number(k)));
  }

  async saveFavourite(item: any) {
    await this.storage.set(item.id.toString(), item);
    this.savedIds.add(item.id);
  }
}