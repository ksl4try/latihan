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
  karyawanList: any[] = [];
  user: any = null;

  constructor(private navCtrl: NavController, private auth: Auth) {
    addIcons({ chevronBackOutline, person, addOutline });
  }

  ngOnInit() {
    this.loadData();
  }

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

  loadData() {
    const data = localStorage.getItem('karyawan');
    this.karyawanList = data ? JSON.parse(data) : [];
  }

  goBack() {
    this.navCtrl.navigateForward('/tabs/dashboard');
  }

  goDetail(id: number) {
    this.navCtrl.navigateForward(`/karyawan-detail/${id}`);
  }

  addKaryawan() {
    this.navCtrl.navigateForward('/karyawan-form');
  }
}
