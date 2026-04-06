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
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterPage {
  name: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const success = this.authService.register({
      name: this.name,
      email: this.email,
      password: this.password
    });

    if (success) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.message = 'Cet email existe déjà';
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
