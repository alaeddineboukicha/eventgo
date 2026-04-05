import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private storageKey = 'users';

  constructor() {}


initDatabase() {
  if (!localStorage.getItem('users')) {

    const users = [
      {
        id: 1,
        name: 'Ala',
        email: 'ala@gmail.com',
        password: '123'
      }
    ];

    localStorage.setItem('users', JSON.stringify(users));
  }
}


  register(user: any): boolean {
    const users = this.getUsers();

    const existingUser = users.find((u: any) => u.email === user.email);
    if (existingUser) {
      return false;
    }

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }
}
