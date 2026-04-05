import { Component, Input } from '@angular/core';
import {
  IonFooter,
  IonToolbar,
  IonButton,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  searchOutline,
  mapOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  standalone: true,
  imports: [
    IonFooter,
    IonToolbar,
    IonButton,
    IonIcon,
    IonLabel,
    RouterLink,
    CommonModule
  ]
})
export class BottomNavComponent {
  @Input() active: string = '';

  constructor() {
    addIcons({ homeOutline, searchOutline, mapOutline, personOutline });
  }
}
