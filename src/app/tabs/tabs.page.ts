import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
// 1. Impor ikon 'home-outline' di sini
import { triangle, ellipse, square, homeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true, // Pastikan komponen ini standalone
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    // 2. Tambahkan ikon 'homeOutline' ke dalam objek ini
    addIcons({ triangle, ellipse, square, homeOutline });
  }
}