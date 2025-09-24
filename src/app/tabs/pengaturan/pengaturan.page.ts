import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';

// Halaman Pengaturan (standalone component):
// - Menyediakan wadah konten pengaturan aplikasi.
// - Menampilkan kartu aksi "Edit Profile" sebagai entry point untuk pengaturan akun.
@Component({
  selector: 'app-pengaturan',
  templateUrl: 'pengaturan.page.html',
  styleUrls: ['pengaturan.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonIcon,
  ],
})
export class PengaturanPage {
  constructor(private navCtrl: NavController) {
    addIcons({ personCircleOutline });
  }

  // Navigasi ke halaman edit profil pengguna.
  editProfile() {
    this.navCtrl.navigateForward('/edit-profile');
  }
}
