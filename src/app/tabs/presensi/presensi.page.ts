import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
// PERBAIKI INI: Path harus naik satu level ke direktori 'app'
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

import { Auth } from 'src/app/services/auth.service'; // Pakai Auth
import { NavController } from '@ionic/angular';

// Tab Presensi: hasil rename dari tab2 agar lebih relevan dengan fitur.
@Component({
  selector: 'app-presensi',
  templateUrl: 'presensi.page.html',
  styleUrls: ['presensi.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class PresensiPage {

  user: any = null;
  constructor(private navCtrl: NavController, private auth: Auth) {}

  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }
}






