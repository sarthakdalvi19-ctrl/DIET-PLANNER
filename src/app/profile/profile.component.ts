import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card class="profile-card">
      <mat-card-header>
        <mat-card-title>Profile</mat-card-title>
      </mat-card-header>

      <mat-card-content>
        <div *ngIf="user()" class="profile-info">\n          <img src="/assets/images/avatar.svg" class="profile-avatar" alt="Profile Avatar">\n          <div>\n            <p><strong>Name:</strong> {{ user()?.name }}</p>\n            <p><strong>Gender:</strong> {{ user()?.gender || 'Not set' }}</p>\n            <p><strong>Age:</strong> {{ user()?.age }}</p>\n            <p><strong>Email:</strong> {{ user()?.email }}</p>\n            <p><strong>BMI:</strong> {{ user()?.bmi || 'Not calculated' }}</p>\n          </div>\n        </div>
        <div *ngIf="!user()">
          <p>Please login to view profile.</p>
        </div>
        <button mat-raised-button color="warn" (click)="logout()">Logout</button>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .profile-card {
      max-width: 400px;
      margin: 2rem auto;
    }
    .profile-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin: 0 auto 1rem auto;
      display: block;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    .profile-info {
      text-align: center;
    }
  `]
})
export class ProfileComponent {
  private authService = inject(AuthService);
  user = this.authService.user;

  logout() {
    this.authService.logout();
  }
}
