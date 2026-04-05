import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule,
    BottomNavComponent
  ],
})
export class SearchPage {
  keyword: string = '';
  allEvents: any[] = [];
  filteredEvents: any[] = [];

  constructor(private http: HttpClient) {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get<any[]>('assets/data/events.json').subscribe((data) => {
      this.allEvents = data;
      this.filteredEvents = data;
    });
  }

  searchEvents() {
    const key = this.keyword.toLowerCase().trim();

    if (!key) {
      this.filteredEvents = this.allEvents;
      return;
    }

    this.filteredEvents = this.allEvents.filter((event) =>
      event.name.toLowerCase().includes(key) ||
      event.category.toLowerCase().includes(key)
    );
  }
}
