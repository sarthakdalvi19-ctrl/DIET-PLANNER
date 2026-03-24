import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: 'male' | 'female';
  bmi?: number;
}

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatRadioModule],
  template: `
    <mat-card class="profile-form-card">
      <mat-card-header>
        <mat-card-title>Complete Your Profile</mat-card-title>
        <mat-card-subtitle>Help us personalize your diet plans</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Full Name</mat-label>
            <input matInput formControlName="name">
            <mat-error *ngIf="profileForm.get('name')?.hasError('required')">Name is required</mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Age</mat-label>
            <input matInput type="number" formControlName="age" min="1" max="120">
            <mat-error *ngIf="profileForm.get('age')?.hasError('required')">Age is required</mat-error>
            <mat-error *ngIf="profileForm.get('age')?.hasError('min')">Age must be at least 1</mat-error>
          </mat-form-field>
          <div class="gender-group">
            <h3>Gender</h3>
            <mat-radio-group formControlName="gender">
              <mat-radio-button value="male">Male</mat-radio-button>
              <mat-radio-button value="female">Female</mat-radio-button>
            </mat-radio-group>
            <mat-error *ngIf="profileForm.get('gender')?.hasError('required')">Gender is required</mat-error>
          </div>
          <button mat-raised-button color="primary" fullWidth type="submit" [disabled]="profileForm.invalid">
            Save Profile & Continue
          </button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .profile-form-card {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
    }
    mat-form-field {
      margin-bottom: 1.5rem;
    }
    .gender-group {
      margin: 1.5rem 0;
    }
    .gender-group h3 {
      margin-bottom: 1rem;
      color: var(--gray-800);
    }
    mat-radio-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    @media (max-width: 480px) {
      .profile-form-card {
        margin: 1rem;
        padding: 1.5rem;
      }
    }
  `]
})
export class ProfileFormComponent implements OnInit {
  profileForm!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const currentUser = this.authService.user() as User | null;
    this.profileForm = this.fb.group({
      name: [currentUser?.name || '', Validators.required],
      age: [currentUser?.age || '', [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: [currentUser?.gender || '', Validators.required]
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const currentUser = this.authService.user()!;
      const updatedUser = {
        ...currentUser,
        name: this.profileForm.value.name,
        age: Number(this.profileForm.value.age),
        gender: this.profileForm.value.gender
      };
      this.authService.setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      this.router.navigate(['/dashboard']);
    }
  }
}
