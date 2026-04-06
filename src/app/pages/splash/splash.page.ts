import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton],
})
export class SplashPage {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
