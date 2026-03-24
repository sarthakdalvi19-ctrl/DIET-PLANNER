import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../cart/cart.service';
import { DietPlan, Meal } from '../models/diet-plan.model';
import { DietService } from '../diet/diet.service';

@Component({
  selector: 'app-diet-plan-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatListModule, MatChipsModule, MatButtonModule, MatIconModule],
  template: `
    <div *ngIf="plan" class="detail-page">
      <div class="hero-section">
<img [src]="plan.image" class="hero" [alt]="plan.title" loading="lazy" onerror="this.src='/assets/images/fallback-food.svg'">
        <div class="hero-overlay">
          <h1>{{ plan.title }}</h1>
          <p>{{ plan.ageGroup }} • {{ plan.dailyCalories }} cal/day</p>
          <div class="description">{{ plan.description }}</div>
          <button mat-raised-button color="accent" (click)="cartService.addToCart(plan)">
            <mat-icon>add_shopping_cart</mat-icon> Add to Cart
          </button>
        </div>
      </div>
      <div class="content container">
        <div class="video-section">
          <iframe class="video" [src]="'https://www.youtube.com/embed/' + plan.videoId" frameborder="0" allowfullscreen loading="lazy"></iframe>
        </div>
        <mat-card class="meals-card">
          <mat-card-header>
            <mat-card-title>Daily Meals</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item *ngFor="let meal of plan.meals">
<img [src]="meal.image" matListAvatar [alt]="meal.name" loading="lazy" onerror="this.src='/assets/images/fallback-food.svg'">
                <div matLine>
                  <strong>{{ meal.name }}</strong> - {{ meal.calories }} cal
                </div>
                <div matLine>{{ meal.nutrition }}</div>
                <div matLine><small>Prep: 15 min | Ingredients: Oats, fruits, nuts</small></div>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>
        <mat-card class="tips-card">
          <mat-card-header>
            <mat-card-title>Success Tips</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-chip-grid>
              <mat-chip *ngFor="let tip of plan.tips" color="primary">{{ tip }}</mat-chip>
            </mat-chip-grid>
            <p class="extra-tips">Additional: Track progress weekly, stay hydrated, combine with workouts for best results. Aim for 10k steps daily, sleep 8hrs.</p>
          </mat-card-content>
        </mat-card>
      </div>
      <mat-card-actions align="end">
        <button mat-button routerLink="/diet-plans">Back to List</button>
      </mat-card-actions>
    </div>
  `,
  styles: [`
    .detail-page {
      background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920');
      background-size: cover;
      background-attachment: fixed;
      min-height: 100vh;
    }
    .hero-section {
      position: relative;
      height: 60vh;
      display: flex;
      align-items: center;
    }
    .hero {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .hero-overlay {
      position: relative;
      z-index: 2;
      color: white;
      text-align: center;
      max-width: 900px;
      margin: 0 auto;
      padding: 2rem;
    }
    .description {
      background: rgba(0,0,0,0.7);
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1rem 0;
      line-height: 1.6;
      font-size: 1.1rem;
    }
    .content {
      padding: 2rem 0;
    }
    .video-section {
      margin: 2rem 0;
      text-align: center;
    }
    .video {
      width: 100%;
      height: 315px;
      max-width: 560px;
      border-radius: 12px;
      box-shadow: var(--shadow-gym);
    }
    .meals-card, .tips-card {
      margin: 2rem 0;
    }
    .extra-tips {
      margin-top: 1rem;
      font-style: italic;
      color: var(--gray-700);
    }
    mat-card-actions {
      justify-content: center;
    }
  `]
})
export class DietPlanDetailComponent {
  plan: DietPlan | undefined;
  cartService = inject(CartService);
  constructor(private route: ActivatedRoute, private dietService: DietService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.plan = this.dietService.getPlanById(id || '');
  }
}
