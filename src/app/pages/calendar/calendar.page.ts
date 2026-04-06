import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonDatetime,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonDatetime,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    CommonModule,
    FormsModule
  ],
})
export class CalendarPage implements OnInit {
  event: any = null;
  selectedDate: string = new Date().toISOString();

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    const events = JSON.parse(localStorage.getItem('events') || '[]');
    this.event = events.find((e: any) => e.id === eventId);
  }

  saveToCalendar() {
    let calendar = JSON.parse(localStorage.getItem('calendar') || '[]');

    calendar.push({
      eventId: this.event.id,
      eventName: this.event.name,
      eventCategory: this.event.category,
      chosenDate: this.selectedDate
    });

    localStorage.setItem('calendar', JSON.stringify(calendar));
    alert('Événement ajouté au calendrier');
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
