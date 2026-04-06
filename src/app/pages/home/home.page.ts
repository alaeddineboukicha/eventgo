import { Component, OnInit } from '@angular/core';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonModal,
  IonInput
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { heart, heartOutline, starOutline, timeOutline, calendarOutline, locationOutline, informationCircleOutline } from 'ionicons/icons';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../../services/auth';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonModal,
    IonInput,
    CommonModule,
    FormsModule,
    BottomNavComponent
  ],
})
export class HomePage implements OnInit {
  events: any[] = [];
  isCalendarModalOpen = false;
  selectedEvent: any = null;
  selectedDate: string = '';

  isDetailsModalOpen = false;
  detailEvent: any = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) {
    addIcons({
      heart,
      heartOutline,
      starOutline,
      timeOutline,
      calendarOutline,
      locationOutline,
      informationCircleOutline
    });
  }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('assets/data/events.json').subscribe((data) => {
      this.events = data;
      localStorage.setItem('events', JSON.stringify(data));
    });
  }

  getCurrentUserId() {
    const user = this.authService.getCurrentUser();
    return user ? user.id : 'guest';
  }

  registerEvent(event: any) {
    const user = this.authService.getCurrentUser();

    if (!user) {
      window.location.href = '/login';
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
    this.selectedEvent = event;
    this.selectedDate = `${event.date}T${event.time || '18:00'}`;
    this.isCalendarModalOpen = true;
  }

  closeCalendarModal() {
    this.isCalendarModalOpen = false;
    this.selectedEvent = null;
  }

  saveToCalendar() {
    const userId = this.getCurrentUserId();
    let calendar = JSON.parse(localStorage.getItem('calendar') || '[]');

    const existingIndex = calendar.findIndex(
      (c: any) => c.userId === userId && c.eventId === this.selectedEvent.id
    );

    if (existingIndex !== -1) {
      const confirmChange = window.confirm(
        'Cet événement existe déjà dans votre calendrier. Voulez-vous changer la date choisie ?'
      );

      if (!confirmChange) {
        return;
      }

      calendar[existingIndex] = {
        userId,
        eventId: this.selectedEvent.id,
        eventName: this.selectedEvent.name,
        eventCategory: this.selectedEvent.category,
        chosenDate: this.selectedDate
      };
    } else {
      calendar.push({
        userId,
        eventId: this.selectedEvent.id,
        eventName: this.selectedEvent.name,
        eventCategory: this.selectedEvent.category,
        chosenDate: this.selectedDate
      });
    }

    localStorage.setItem('calendar', JSON.stringify(calendar));
    alert('Événement ajouté au calendrier');
    this.closeCalendarModal();
  }

  isFavorite(event: any): boolean {
    const userId = this.getCurrentUserId();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some((f: any) => f.userId === userId && f.eventId === event.id);
  }

  toggleFavorite(event: any) {
    const userId = this.getCurrentUserId();
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    const existingIndex = favorites.findIndex(
      (f: any) => f.userId === userId && f.eventId === event.id
    );

    if (existingIndex !== -1) {
      favorites.splice(existingIndex, 1);
    } else {
      favorites.push({
        userId,
        eventId: event.id,
        event
      });
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  openDetails(event: any) {
    this.detailEvent = event;
    this.isDetailsModalOpen = true;
  }

  closeDetailsModal() {
    this.isDetailsModalOpen = false;
    this.detailEvent = null;
  }

  async goToFavorites() {
    await this.menuCtrl.close();
    window.location.href = '/favorites';
  }

  async goToProfile() {
    await this.menuCtrl.close();
    window.location.href = '/profile';
  }
}
