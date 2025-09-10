import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../../explore-container/explore-container.component';

import { addIcons } from 'ionicons';
import { people } from 'ionicons/icons';

import { Auth } from 'src/app/services/auth.service'; // ✅ pakai Auth

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonCardContent,
    IonCard,
    IonItem,
    IonLabel,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    ExploreContainerComponent,
  ],
})
export class DashboardPage implements OnInit {
  user: any = null;

  constructor(private navCtrl: NavController, private auth: Auth) {
    addIcons({ people });
  }

  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  ngOnInit() {}

  listData() {
    this.navCtrl.navigateForward('/karyawan-list');
  }
}
