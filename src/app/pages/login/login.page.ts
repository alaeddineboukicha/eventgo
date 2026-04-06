import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonText,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    FormsModule,
    NgIf
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } else {
      this.message = 'Email ou mot de passe incorrect';
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
