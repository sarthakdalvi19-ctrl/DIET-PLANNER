import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
template: `
    <div class="dashboard container animate-slide-in">
      <!-- Hero Section -->
      <section class="gym-hero">
        <div>
          <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=500&fit=crop" alt="Healthy lifestyle" class="hero-image">
          <h1 style="font-size: 3.5rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Transform Your Body</h1>
          <p style="font-size: 1.5rem; margin-bottom: 2rem;">Gym + Diet = Your Best Self</p>
          <span mat-icon style="font-size: 4rem;" class="workout-icon">fitness_center</span>
        </div>
      </section>

      <!-- Stats -->
      <section class="gym-stats">
        <mat-card class="gym-card stats-card">
          <mat-card-header>
            <mat-card-title>BMI: {{ user()?.bmi || 'Calculate' }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Track your fitness level</p>
            <button mat-raised-button color="primary" routerLink="/bmi">Update BMI</button>
          </mat-card-content>
        </mat-card>
        <mat-card class="gym-card">
          <mat-card-header>
            <mat-card-title>Age: {{ user()?.age || '?' }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Personalized plans</p>
          </mat-card-content>
        </mat-card>
        <mat-card class="gym-card">
          <mat-card-header>
            <mat-card-title>Daily Calories</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>2000-2500 recommended</p>
            <button mat-button color="accent" routerLink="/diet-plans">View Plans</button>
          </mat-card-content>
        </mat-card>
      </section>

      <!-- Workout Previews -->
      <section class="workouts-preview">
        <h2 style="text-align: center; color: var(--gym-dark);">Quick Workouts</h2>
        <mat-card class="gym-card">
          <mat-card-header>
<img src="/assets/images/workout-cardio.svg" mat-card-avatar alt="Cardio">
            <mat-card-title>Cardio Burn</mat-card-title>
            <mat-card-subtitle>30 min</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Run or cycle to boost metabolism</p>
          </mat-card-content>
        </mat-card>
        <mat-card class="gym-card">
          <mat-card-header>
<img src="/assets/images/workout-strength.svg" mat-card-avatar alt="Strength">
            <mat-card-title>Strength Build</mat-card-title>
            <mat-card-subtitle>45 min</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Weights for muscle gain</p>
          </mat-card-content>
        </mat-card>
        <mat-card class="gym-card">
          <mat-card-header>
<img src="/assets/images/workout-yoga.svg" mat-card-avatar alt="Yoga">
            <mat-card-title>Yoga Flow</mat-card-title>
            <mat-card-subtitle>20 min</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>Flexibility & recovery</p>
          </mat-card-content>
        </mat-card>
      </section>

      <!-- CTA -->
      <section class="cta-grid">
        <button mat-fab color="accent" routerLink="/bmi"><mat-icon>bmi</mat-icon></button>
        <button mat-fab color="primary" routerLink="/diet-plans"><mat-icon>restaurant</mat-icon></button>
        <button mat-fab color="warn" routerLink="/profile"><mat-icon>person</mat-icon></button>
      </section>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 1rem 0;
    }
    mat-card {
      color: var(--gym-dark);
      background: white;
    }
    .gym-hero h1 {
      z-index: 2;
      position: relative;
    }
    .gym-hero p {
      z-index: 2;
      position: relative;
    }
    .hero-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
  `]
})
export class DashboardComponent {
  private authService = inject(AuthService);
  user = this.authService.user;
}
