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
  IonInput,
  IonFab,
  IonFabButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { add, heart, heartOutline, starOutline, timeOutline, calendarOutline, locationOutline, informationCircleOutline } from 'ionicons/icons';
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
    IonFab,
    IonFabButton,
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
  selectedCalendarDate: string = '';
  selectedCalendarTime: string = '';

  isDetailsModalOpen = false;
  detailEvent: any = null;
  isAddEventModalOpen = false;
  newEvent = this.createEmptyEvent();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private menuCtrl: MenuController
  ) {
    addIcons({
      heart,
      heartOutline,
      add,
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
    const storedEvents = localStorage.getItem('events');

    if (storedEvents) {
      this.events = JSON.parse(storedEvents);
      return;
    }

    this.http.get<any[]>('assets/data/events.json').subscribe((data) => {
      this.events = data;
      localStorage.setItem('events', JSON.stringify(data));
    });
  }

  createEmptyEvent() {
    return {
      name: '',
      date: '',
      time: '',
      duration: '',
      category: '',
      location: '',
      description: ''
    };
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
    this.selectedCalendarDate = event.date || '';
    this.selectedCalendarTime = event.time || '18:00';
    this.isCalendarModalOpen = true;
  }

  closeCalendarModal() {
    this.isCalendarModalOpen = false;
    this.selectedEvent = null;
    this.selectedDate = '';
    this.selectedCalendarDate = '';
    this.selectedCalendarTime = '';
  }

  saveToCalendar() {
    if (!this.selectedEvent) {
      return;
    }

    if (!this.selectedCalendarDate || !this.selectedCalendarTime) {
      alert('Merci de choisir une date et une heure.');
      return;
    }

    this.selectedDate = `${this.selectedCalendarDate}T${this.selectedCalendarTime}`;

    const userId = this.getCurrentUserId();
    let calendar = JSON.parse(localStorage.getItem('calendar') || '[]');

    const updatedEvent = {
      ...this.selectedEvent,
      date: this.selectedCalendarDate,
      time: this.selectedCalendarTime
    };

    this.events = this.events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    this.selectedEvent = updatedEvent;

    if (this.detailEvent?.id === updatedEvent.id) {
      this.detailEvent = updatedEvent;
    }

    localStorage.setItem('events', JSON.stringify(this.events));

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
        eventId: updatedEvent.id,
        eventName: updatedEvent.name,
        eventCategory: updatedEvent.category,
        chosenDate: this.selectedDate
      };
    } else {
      calendar.push({
        userId,
        eventId: updatedEvent.id,
        eventName: updatedEvent.name,
        eventCategory: updatedEvent.category,
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

  deleteEvent(eventToDelete: any) {
    if (!eventToDelete) {
      return;
    }

    const confirmDelete = window.confirm(
      `Voulez-vous vraiment supprimer l'evenement "${eventToDelete.name}" ?`
    );

    if (!confirmDelete) {
      return;
    }

    this.events = this.events.filter((event) => event.id !== eventToDelete.id);
    localStorage.setItem('events', JSON.stringify(this.events));

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]').filter(
      (favorite: any) => favorite.eventId !== eventToDelete.id
    );
    localStorage.setItem('favorites', JSON.stringify(favorites));

    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]').filter(
      (registration: any) => registration.eventId !== eventToDelete.id
    );
    localStorage.setItem('registrations', JSON.stringify(registrations));

    const calendar = JSON.parse(localStorage.getItem('calendar') || '[]').filter(
      (entry: any) => entry.eventId !== eventToDelete.id
    );
    localStorage.setItem('calendar', JSON.stringify(calendar));

    if (this.selectedEvent?.id === eventToDelete.id) {
      this.closeCalendarModal();
    }

    if (this.detailEvent?.id === eventToDelete.id) {
      this.closeDetailsModal();
    }

    alert('Evenement supprime avec succes');
  }

  openAddEventModal() {
    this.newEvent = this.createEmptyEvent();
    this.isAddEventModalOpen = true;
  }

  closeAddEventModal() {
    this.isAddEventModalOpen = false;
    this.newEvent = this.createEmptyEvent();
  }

  saveNewEvent() {
    if (
      !this.newEvent.name ||
      !this.newEvent.date ||
      !this.newEvent.time ||
      !this.newEvent.category ||
      !this.newEvent.location
    ) {
      alert('Merci de remplir les champs obligatoires.');
      return;
    }

    const nextId =
      this.events.length > 0
        ? Math.max(...this.events.map((event) => Number(event.id) || 0)) + 1
        : 1;

    const eventToAdd = {
      id: nextId,
      name: this.newEvent.name,
      date: this.newEvent.date,
      time: this.newEvent.time,
      duration: this.newEvent.duration || '60 minutes',
      category: this.newEvent.category,
      location: this.newEvent.location,
      description: this.newEvent.description || 'Nouvel evenement ajoute depuis l application.',
      lat: 36.8065,
      lng: 10.1815
    };

    this.events = [eventToAdd, ...this.events];
    localStorage.setItem('events', JSON.stringify(this.events));
    alert('Evenement ajoute avec succes');
    this.closeAddEventModal();
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
