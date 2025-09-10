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
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { addIcons } from 'ionicons';
import { chevronBackOutline, person, trash, create } from 'ionicons/icons';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-karyawan-detail',
  templateUrl: './karyawan-detail.page.html',
  styleUrls: ['./karyawan-detail.page.scss'],
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
  ],
})
export class KaryawanDetailPage implements OnInit {
  karyawan: any = null;
  user: any = null;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private auth: Auth
  ) {
    addIcons({ chevronBackOutline, person, trash, create });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const data = localStorage.getItem('karyawan');
      const list = data ? JSON.parse(data) : [];
      this.karyawan = list.find((k: any) => k.id == id);
    }
  }

  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/karyawan-list');
  }

  // 🔹 Fungsi delete karyawan
  goDelete() {
    if (!this.karyawan) return;

    const data = localStorage.getItem('karyawan');
    let list = data ? JSON.parse(data) : [];

    // filter untuk buang karyawan dengan id ini
    list = list.filter((k: any) => k.id !== this.karyawan.id);

    // simpan kembali
    localStorage.setItem('karyawan', JSON.stringify(list));

    console.log(`Karyawan dengan id ${this.karyawan.id} dihapus`);

    // kembali ke list setelah delete
    this.navCtrl.navigateBack('/karyawan-list');
  }

  goEdit() {
    if (this.karyawan) {
      this.navCtrl.navigateForward(`/karyawan-form/${this.karyawan.id}`);
    }
  }
}
