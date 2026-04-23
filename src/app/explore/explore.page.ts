import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ for ngFor
import { IonicModule } from '@ionic/angular';   // ✅ for Ionic components
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-explore',
  standalone: true, // ✅ MUST be here
  imports: [CommonModule, IonicModule], // ✅ THIS FIXES YOUR ERROR
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage {

  data: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((res: any) => {
        this.data = res;
      });
  }

}