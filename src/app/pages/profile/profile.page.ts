import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    NgIf,
    BottomNavComponent
  ],
})
export class ProfilePage {
  user: any = null;

  constructor(private authService: AuthService, private router: Router) {
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
