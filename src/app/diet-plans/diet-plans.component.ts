import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { DietService } from '../diet/diet.service';
import { CartService } from '../cart/cart.service';
import { AgeGroup } from '../models/age-group.enum';

@Component({
  selector: 'app-diet-plans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatGridListModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, RouterLink],
  template: `
    <div class="diet-plans">
      <div class="header">
        <h1>Diet Plans</h1>
        <p>Filter by age group and search</p>
      </div>
      <div class="filters">
        <mat-form-field appearance="outline">
          <mat-label>Age Group</mat-label>
          <mat-select [formControl]="ageControl">
            <mat-option value="All">All</mat-option>
            <mat-option *ngFor="let age of ageGroups" [value]="age">{{ age }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Search</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Search plans...">
        </mat-form-field>
      </div>
      <mat-grid-list cols="3" rowHeight="1:1" gutterSize="1rem" class="grid">
        <mat-grid-tile *ngFor="let plan of dietService.filteredPlans()">
          <mat-card class="plan-card">
<img mat-card-image [src]="plan.image" [alt]="plan.title" loading="lazy" onerror="this.src='/assets/images/fallback-food.svg'">
            <mat-card-header>
              <mat-card-title>{{ plan.title }}</mat-card-title>
              <mat-card-subtitle>{{ plan.ageGroup }} | {{ plan.dailyCalories }} cal</mat-card-subtitle>
            </mat-card-header>
            <mat-card-actions>
              <button mat-button routerLink="/diet-plans/{{ plan.id }}">View Plan</button>
              <button mat-stroked-button color="accent" (click)="cartService.addToCart(plan)">
                <mat-icon>add_shopping_cart</mat-icon> Add to Cart
              </button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [`
    .diet-plans {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }
    .grid {
      margin-top: 1rem;
    }
    .plan-card {
      height: 100%;
      transition: all 0.3s ease;
      box-shadow: var(--shadow-gym);
    }
    .plan-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      animation: gymPulse 0.5s ease-in-out;
    }
    .plan-card img {
      height: 200px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    .plan-card:hover img {
      transform: scale(1.05);
    }
    @media (max-width: 768px) {
      .filters {
        flex-direction: column;
      }
      mat-grid-list {
        cols: 1;
      }
    }
  `]
})
export class DietPlansComponent {
  dietService = inject(DietService);
  cartService = inject(CartService);
  ageGroups = Object.values(AgeGroup);

  ageControl = new FormControl('All');
  searchControl = new FormControl('');

  constructor() {
this.searchControl.valueChanges.subscribe(search => this.dietService.search.set(search || ''));
    this.ageControl.valueChanges.subscribe(age => this.dietService.selectedAge.set(age as AgeGroup | 'All'));
  }
}
