import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    CommonModule,
    BottomNavComponent
  ],
})
export class HomePage implements OnInit {
  events: any[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('assets/data/events.json').subscribe((data) => {
      this.events = data;
      localStorage.setItem('events', JSON.stringify(data));
    });
  }

  registerEvent(event: any) {
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    let registrations = JSON.parse(localStorage.getItem('registrations') || '[]');

    const exists = registrations.find(
      (r: any) => r.userId === user.id && r.eventId === event.id
    );

    if (exists) {
      alert('Vous êtes déjà inscrit à cet événement');
      return;
    }

    registrations.push({
      userId: user.id,
      eventId: event.id,
      registeredAt: new Date().toISOString()
    });

    localStorage.setItem('registrations', JSON.stringify(registrations));
    alert('Inscription réussie');
  }

  openCalendar(event: any) {
    this.router.navigateByUrl(`/calendar/${event.id}`);
  }
}
