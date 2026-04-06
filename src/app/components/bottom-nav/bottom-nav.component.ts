import { Component, Input } from '@angular/core';
import {
  IonFooter,
  IonToolbar,
  IonIcon,
  IonLabel
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  imports: [IonFooter, IonToolbar, IonIcon, IonLabel, CommonModule]
})
export class BottomNavComponent {
  @Input() active: string = '';

  constructor(private router: Router) {
    addIcons({ homeOutline, searchOutline, mapOutline, personOutline });
  }

  goTo(path: string) {
    this.router.navigateByUrl(path, { replaceUrl: true });
  }
}
