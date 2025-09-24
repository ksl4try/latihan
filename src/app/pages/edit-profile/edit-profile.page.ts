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
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
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
  ],
})
export class EditProfilePage implements OnInit {
  constructor(private navCtrl: NavController) {
    addIcons({ chevronBackOutline });
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateForward('/tabs/pengaturan');
  }
}
