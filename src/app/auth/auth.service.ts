import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = signal<User | null>(null);
  user = this._user.asReadonly();

  isLoggedIn = computed(() => !!this._user());

  setUser(user: User) {
    this._user.set(user);
  }

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  login(email: string, password: string) {
    // Accept any non-empty credentials
    if (email && email.includes('@') && password && password.length >= 6) {
      const u: User = {id: Date.now().toString(), email, name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1), age: 30};
      localStorage.setItem('user', JSON.stringify(u));
      this._user.set(u);
      this.snackBar.open(`Welcome ${u.name}! Login Successful`, 'OK', { duration: 3000 });
      this.router.navigate(['/dashboard']);
    } else {
      this.snackBar.open('Enter valid email/password (6+ chars)', 'OK');
    }
  }

  signup(email: string, password: string, name: string, age: number) {
    const u: User = {id: Date.now().toString(), email, name, age};
    localStorage.setItem('user', JSON.stringify(u));
    this._user.set(u);
    this.snackBar.open('Signup Successful!', 'OK', { duration: 3000 });
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('user');
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  init() {
    const str = localStorage.getItem('user');
    if (str) this._user.set(JSON.parse(str));
  }
}
