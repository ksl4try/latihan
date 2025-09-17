import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonCardContent,
  IonCard,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline, person, addOutline } from 'ionicons/icons';
import { Auth } from 'src/app/services/auth.service'; // ✅ pakai Auth

// Halaman daftar karyawan (standalone component):
// - Menampilkan seluruh entri dari localStorage key 'karyawan'.
// - Proteksi halaman: cek login via Auth.isAuthenticated(); jika tidak valid, redirect ke '/login'.
// - Koneksi navigasi:
//   - Back -> '/tabs/dashboard'
//   - Klik item -> '/karyawan-detail/:id'
//   - FAB plus -> '/karyawan-form' (tambah)
@Component({
  selector: 'app-karyawan-list',
  templateUrl: './karyawan-list.page.html',
  styleUrls: ['./karyawan-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    CommonModule,
    FormsModule,
    IonCardContent,
    IonCard,
    IonFab,
    IonFabButton,
    
  ],
})
export class KaryawanListPage implements OnInit {
  // State/UI:
  // - karyawanList: data yang ditampilkan (array dari localStorage)
  // - user: info user login (opsional untuk tampilan)
  karyawanList: any[] = [];
  user: any = null;

  constructor(private navCtrl: NavController, private auth: Auth) {
    // Registrasi ikon yang dipakai di template (back, avatar, add)
    addIcons({ chevronBackOutline, person, addOutline });
  }

  // Lifecycle Angular: initial load data.
  ngOnInit() {
    this.loadData();
  }

  // Lifecycle Ionic: refresh data setiap masuk halaman + guard login.
  ionViewWillEnter() {
    // Supaya selalu update tiap kali halaman dibuka
    this.loadData();
    
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  // Ambil data karyawan dari localStorage dan set ke state.
  loadData() {
    const data = localStorage.getItem('karyawan');
    this.karyawanList = data ? JSON.parse(data) : [];
  }

  // Kembali ke dashboard (tabs utama).
  goBack() {
    this.navCtrl.navigateForward('/tabs/dashboard');
  }

  // Buka halaman detail karyawan berdasarkan id.
  goDetail(id: number) {
    this.navCtrl.navigateForward(`/karyawan-detail/${id}`);
  }

  // Arahkan ke halaman form untuk menambah karyawan baru.
  addKaryawan() {
    this.navCtrl.navigateForward('/karyawan-form');
  }
}
