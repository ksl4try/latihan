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
  IonInput,
  IonItem,
  IonLabel,
  IonFooter,
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router'; // ✅ perlu ini
import { addIcons } from 'ionicons';
import { chevronBackOutline, person } from 'ionicons/icons';
import { Auth } from 'src/app/services/auth.service';

@Component({
  selector: 'app-karyawan-form',
  templateUrl: './karyawan-form.page.html',
  styleUrls: ['./karyawan-form.page.scss'],
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
    IonInput,
    IonItem,
    IonLabel,
    IonFooter,
  ],
})
export class KaryawanFormPage implements OnInit {
  title: string = 'Tambah Karyawan';
  user: any = null;
  id: number | null = null; // ✅ id kalau mode edit
  nama: string = '';
  email: string = '';

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private auth: Auth
  ) {
    addIcons({ chevronBackOutline, person });
  }

  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      const data = localStorage.getItem('karyawan');
      const karyawanList = data ? JSON.parse(data) : [];
      const existing = karyawanList.find((k: any) => k.id === this.id);

      if (existing) {
        this.nama = existing.nama;
        this.email = existing.email;
        this.title = 'Edit Karyawan'; // ✅ ubah judul kalau edit
      }
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/karyawan-list');
  }

  simpanKaryawan() {
    if (!this.nama || !this.email) {
      alert('Nama dan Email harus diisi!');
      return;
    }

    const data = localStorage.getItem('karyawan');
    let karyawanList = data ? JSON.parse(data) : [];

    if (this.id) {
      // ✅ UPDATE MODE
      karyawanList = karyawanList.map((k: any) =>
        k.id === this.id ? { ...k, nama: this.nama, email: this.email } : k
      );
      console.log('Karyawan berhasil diupdate:', {
        id: this.id,
        nama: this.nama,
        email: this.email,
      });
    } else {
      // ✅ ADD MODE
      const newId =
        karyawanList.length > 0
          ? karyawanList[karyawanList.length - 1].id + 1
          : 1;

      const newKaryawan = {
        id: newId,
        nama: this.nama,
        email: this.email,
      };
      karyawanList.push(newKaryawan);
      console.log('Karyawan berhasil ditambahkan:', newKaryawan);
    }

    // Simpan kembali ke localStorage
    localStorage.setItem('karyawan', JSON.stringify(karyawanList));

    // Kembali ke list
    this.navCtrl.navigateBack('/karyawan-list');
  }
}
