import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
// PERBAIKI INI: Path harus naik satu level ke direktori 'app'
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

import { Auth } from 'src/app/services/auth.service'; // ✅ pakai Auth
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent]
})
export class Tab2Page {

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