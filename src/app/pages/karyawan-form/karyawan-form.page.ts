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

// Halaman form karyawan (standalone component):
// - Mode Tambah: tanpa param 'id', set judul "Tambah Karyawan".
// - Mode Edit: dengan param 'id', muat data dari localStorage lalu set judul "Edit Karyawan".
// - Sumber data: localStorage key 'karyawan' (array of { id, nama, email, ... }).
// - Proteksi halaman: cek login via Auth.isAuthenticated(); jika tidak valid, redirect ke '/login'.
// - Koneksi navigasi:
//   - Tombol back -> '/karyawan-list'
//   - Tombol simpan -> update/tambah ke localStorage lalu kembali ke '/karyawan-list'
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
    // IonLabel,
    // IonFooter,
  ],
})
export class KaryawanFormPage implements OnInit {
  // State/UI:
  // - title: judul halaman (Tambah/Edit Karyawan)
  // - user: info user login dari Auth (optional untuk tampilan)
  // - id: parameter untuk mode edit (null jika tambah)
  // - nama, email: field form yang di-bind via [(ngModel)]
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
    // Registrasi ikon yang dipakai di template (back, avatar)
    addIcons({ chevronBackOutline, person });
  }

  // Lifecycle Ionic: guard halaman (cek login); redirect ke '/login' jika tidak valid.
  ionViewWillEnter() {
    if (this.auth.isAuthenticated()) {
      this.user = this.auth.getUser();
    } else {
      console.log('Token expired atau belum login, redirect ke login.');
      this.navCtrl.navigateRoot('/login');
    }
  }

  // Lifecycle Angular: deteksi param 'id' untuk mode edit dan muat data dari localStorage.
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

  // Kembali ke daftar karyawan.
  goBack() {
    this.navCtrl.navigateBack('/karyawan-list');
  }

  // Simpan data karyawan:
  // - Validasi field wajib (nama, email)
  // - Mode Edit: update item pada localStorage
  // - Mode Tambah: generate id baru dan push item
  // - Simpan kembali lalu navigasi ke '/karyawan-list'
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
