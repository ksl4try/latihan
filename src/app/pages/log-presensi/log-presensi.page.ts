import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';
import { Auth } from 'src/app/services/auth.service';

// Halaman log presensi (standalone component):
// - Menyediakan daftar riwayat presensi (placeholder untuk saat ini).
// - Tombol kembali mengarahkan pengguna ke dashboard utama.
// - Proteksi halaman: jika token tidak valid, redirect ke login.
@Component({
  selector: 'app-log-presensi',
  templateUrl: './log-presensi.page.html',
  styleUrls: ['./log-presensi.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonButton,
    IonIcon,
  ],
})
export class LogPresensiPage implements OnInit {
  user: any = null;

  constructor(private navCtrl: NavController, private auth: Auth) {
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  // Kembali ke dashboard tabs.
  goBack() {
    this.navCtrl.navigateForward('/tabs/dashboard');
  }
}
