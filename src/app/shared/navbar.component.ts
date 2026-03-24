import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar color="primary">
<img src="/assets/images/logo.svg" class="gym-logo" alt="Diet Logo" width="40" height="40">
      <span class="brand">Gym Diet Planner</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a mat-button routerLink="/bmi" routerLinkActive="active">BMI</a>
      <a mat-button routerLink="/diet-plans" routerLinkActive="active">Diet Plans</a>
      <a mat-button routerLink="/profile" routerLinkActive="active">Profile</a>
      <a mat-button routerLink="/cart" routerLinkActive="active" class="cart-link">
        <mat-icon>shopping_cart</mat-icon>
        Cart ({{ cartService.totalItems() }})
      </a>
      <span class="user" *ngIf="user()">
        {{ user()?.name }}
      </span>
      <button mat-stroked-button (click)="logout()">
        Logout
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .brand {
      font-size: 1.5rem;
      font-weight: 600;
      margin-left: 0.5rem;
      color: white;
    }
    .gym-logo {
      font-size: 2rem;
      animation: gymLift 2s infinite;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .user {
      margin: 0 1rem;
      font-weight: 500;
      color: white;
    }
    .cart-link {
      position: relative;
    }
    .cart-link mat-icon {
      animation: gymPulse 1.5s infinite;
    }
    ::ng-deep .mat-mdc-toolbar .mdc-toolbar__row {
      padding: 0 1rem;
    }
    a.active {
      font-weight: bold;
      background-color: rgba(255,255,255,0.2);
      border-radius: 4px;
    }
  `]
})
export class NavbarComponent {
  private authService = inject(AuthService);
  cartService = inject(CartService);
  user = this.authService.user;

  logout() {
    this.authService.logout();
  }
}
