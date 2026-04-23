import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './explore.page.html',
})
export class ExplorePage {

  data: any[] = [];
  savedIds: Set<number> = new Set();
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    const storage = await this.storageService.getStorage();

    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res: any) => {
        this.data = res;
      });

    const keys = await storage.keys();
    keys.forEach((k: string) => this.savedIds.add(Number(k)));
  }

  async saveFavourite(item: any) {
    console.log("BUTTON CLICKED", item);

    const storage = await this.storageService.getStorage();
    await storage.set(item.id.toString(), item);

    this.savedIds.add(item.id);
}

testClick() {
  console.log("CLICK WORKS");
  alert("CLICK WORKS");
}
}