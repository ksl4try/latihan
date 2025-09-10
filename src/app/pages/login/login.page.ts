import { Component } from '@angular/core';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonImg,
  IonIcon,
  IonText,
  NavController,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import { Auth } from 'src/app/services/auth.service';

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
    IonInput,
    IonButton,
    IonImg,
    IonIcon,
    IonText,
    FormsModule,
  ],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private navCtrl: NavController, private auth: Auth) {
    addIcons({ mailOutline, lockClosedOutline });
  }

  isValidEmail(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

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
