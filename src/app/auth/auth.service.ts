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
      const tempUser: User = {
        id: Date.now().toString(),
        email
      };
      localStorage.setItem('user', JSON.stringify(tempUser));
      this._user.set(tempUser);
      this.snackBar.open(`Welcome back! Login Successful`, 'OK', { duration: 3000 });
      
      // Check profile completion
      const savedUser = JSON.parse(localStorage.getItem('user') || 'null') as User | null;
      if (savedUser && (!savedUser.name || !savedUser.gender || !savedUser.age)) {
        this.router.navigate(['/profile-form']);
      } else {
        this.router.navigate(['/dashboard']);
      }
    } else {
      this.snackBar.open('Enter valid email/password (6+ chars)', 'OK');
    }
  }

  signup(email: string, password: string, name: string, age: number) {
    const u: User = {
      id: Date.now().toString(),
      email,
      name,
      age
    };
    localStorage.setItem('user', JSON.stringify(u));
    this._user.set(u);
    this.snackBar.open('Signup Successful!', 'OK', { duration: 3000 });
    
    // Check profile completion
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null') as User | null;
    if (savedUser && (!savedUser.name || !savedUser.gender || !savedUser.age)) {
      this.router.navigate(['/profile-form']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  init() {
    const str = localStorage.getItem('user');
    if (str) {
      const userData = JSON.parse(str) as User;
      this._user.set(userData);
    }
  }
}

