import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'users';

  constructor() {}

  initDatabase() {
    if (!localStorage.getItem(this.storageKey)) {
      const users = [
        {
          id: 1,
          name: 'Ala',
          email: 'ala@gmail.com',
          password: '123'
        }
      ];

      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
  }

  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  register(user: any): boolean {
    const users = this.getUsers();

    const existingUser = users.find((u: any) => u.email === user.email);
    if (existingUser) {
      return false;
    }

    user.id = Date.now();
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

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }
}
