import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
// Impor ExploreContainerComponent dengan path yang benar
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

@Component({
  selector: 'app-dashboard', // Ganti selector agar lebih sesuai
  // PERBAIKI INI: Arahkan ke file HTML yang benar
  templateUrl: 'dashboard.page.html', 
  // PERBAIKI INI: Hapus referensi ke file SCSS yang tidak ada
  // styleUrls: ['dashboard.page.scss'], 
  standalone: true, // Pastikan komponen ini standalone
  // Tambahkan ExploreContainerComponent ke dalam imports
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})
export class Tab1Page {
  constructor() {}
}