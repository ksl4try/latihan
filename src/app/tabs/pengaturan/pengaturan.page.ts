import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

import { Auth } from 'src/app/services/auth.service'; // Pakai Auth
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pengaturan',
  templateUrl: 'pengaturan.page.html',
  styleUrls: ['pengaturan.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
})

export class PengaturanPage {

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