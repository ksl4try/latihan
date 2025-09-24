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
import { people, listOutline } from 'ionicons/icons';

import { Auth } from 'src/app/services/auth.service'; // ✅ pakai Auth

// Halaman Dashboard (standalone component):
// - Menampilkan kartu navigasi ke daftar karyawan & log presensi.
// - Proteksi halaman: cek login via Auth.isAuthenticated(); jika tidak valid, redirect ke '/login'.
// - Koneksi navigasi:
//   - Klik kartu "Daftar Karyawan" -> '/karyawan-list'
//   - Klik kartu "Log Presensi" -> '/log-presensi'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonCardContent,
    IonCard,
    // IonItem,
    // IonLabel,
    IonToolbar,
    IonTitle,
    IonContent,
    // IonButton,
    IonIcon,
    // ExploreContainerComponent,
  ],
})
export class DashboardPage implements OnInit {
  user: any = null;

  constructor(private navCtrl: NavController, private auth: Auth) {
    // Registrasi ikon yang dipakai di template (ikon people + log presensi)
    addIcons({ people, listOutline });
  }

  // Lifecycle Ionic: guard login + set info user jika valid.
  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  ngOnInit() {}

  // Navigasi ke halaman daftar karyawan.
  listData() {
    this.navCtrl.navigateForward('/karyawan-list');
  }

  logPresensi() {
    this.navCtrl.navigateForward('/log-presensi');
  }
}



