import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { locateOutline } from 'ionicons/icons';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

declare var google: any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFab,
    IonFabButton,
    IonIcon,
    CommonModule,
    BottomNavComponent
  ],
})
export class MapsPage {
  map: any;
  events: any[] = [];

  constructor(private http: HttpClient) {
    addIcons({ locateOutline });
  }

  ionViewDidEnter() {
    this.http.get<any[]>('assets/data/events.json').subscribe((data) => {
      this.events = data;
      setTimeout(() => this.loadMap(), 300);
    });
  }

  loadMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    this.map = new google.maps.Map(mapElement, {
      center: { lat: 36.8065, lng: 10.1815 },
      zoom: 7,
      mapTypeId: 'roadmap',
      gestureHandling: 'greedy',
      zoomControl: true,
      draggable: true,
      scrollwheel: true
    });

    this.events.forEach((event) => {
      const marker = new google.maps.Marker({
        position: { lat: event.lat, lng: event.lng },
        map: this.map,
        title: event.name
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `<strong>${event.name}</strong><br>${event.category}`
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });
  }

  centerOnMe() {
    if (!navigator.geolocation) {
      alert('La géolocalisation n’est pas supportée.');
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.map.setCenter(userLocation);
      this.map.setZoom(13);

      new google.maps.Marker({
        position: userLocation,
        map: this.map,
        title: 'Ma position'
      });
    });
  }
}
