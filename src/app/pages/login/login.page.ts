import { Component } from '@angular/core';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  // IonInput,
  IonButton,
  IonImg,
  IonIcon,
  NavController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { Auth } from 'src/app/services/auth.service';

// Halaman Login (standalone component):
// - Input email dan password, validasi sederhana format email.
// - Menggunakan Auth.login() untuk autentikasi lokal (localStorage).
// - Navigasi sukses ke '/tabs/dashboard'.
// - Ikon input menggunakan ionicons (mail, lock).
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    // IonInput,
    IonButton,
    IonImg,
    IonIcon,
    // IonText,
    FormsModule,
  ],
})
export class LoginPage {
  // State form: di-bind via [(ngModel)] pada template.
  email = '';
  password = '';
  // isPasswordVisible mengendalikan tipe input (password/text) agar mata bisa toggle.
  isPasswordVisible = false;

  constructor(private navCtrl: NavController, private auth: Auth) {
    // Registrasi ikon form login (mail, lock, serta mata untuk toggle password)
    addIcons({ mailOutline, lockClosedOutline, eyeOutline, eyeOffOutline });
  }

  // Validasi sederhana format email (untuk enable/disable tombol Login).
  isValidEmail(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  // togglePasswordVisibility membalik boolean agar icon mata dapat menampilkan/menyembunyikan password.
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Aksi login:
  // - Validasi input
  // - Panggil Auth.login(email, password)
  // - Jika sukses: navigateRoot ke '/tabs/dashboard'
  // - Jika gagal: tampilkan pesan ke console (bisa diganti toast/alert)
  login() {
    if (!this.isValidEmail() || !this.password) {
      console.log('Format email salah atau password kosong');
      return;
    }

    const result = this.auth.login(this.email, this.password);

    if (result.success) {
      console.log(result.message);
      this.navCtrl.navigateRoot('/tabs/dashboard');
    } else {
      console.log(result.message);
    }
  }
}
