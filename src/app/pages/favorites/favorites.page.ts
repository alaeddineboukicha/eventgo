import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
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
    CommonModule,
    BottomNavComponent
  ],
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadFavorites();
  }

  ionViewWillEnter() {
    this.loadFavorites();
  }

  loadFavorites() {
    const user = this.authService.getCurrentUser();
    const userId = user ? user.id : 'guest';

    const allFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    this.favorites = allFavorites
      .filter((f: any) => f.userId === userId)
      .map((f: any) => f.event);
  }
}
