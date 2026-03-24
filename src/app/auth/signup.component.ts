import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, RouterLink],
  template: `
    <mat-card class="signup-card">
      <mat-card-header>
        <mat-card-title>Join Diet Planner</mat-card-title>
        <mat-card-subtitle>Start your health journey</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name">
            <mat-error *ngIf="signupForm.get('name')?.hasError('required')">Name is required</mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email">
            <mat-error *ngIf="signupForm.get('email')?.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="signupForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Age</mat-label>
            <input matInput formControlName="age" type="number">
            <mat-error *ngIf="signupForm.get('age')?.hasError('required')">Age is required</mat-error>
            <mat-error *ngIf="signupForm.get('age')?.hasError('min')">Age must be at least 1</mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password">
            <mat-error *ngIf="signupForm.get('password')?.hasError('required')">Password is required</mat-error>
            <mat-error *ngIf="signupForm.get('password')?.hasError('minLength')">Password must be 6+ characters</mat-error>
          </mat-form-field>
          <button mat-raised-button color="accent" fullWidth type="submit" [disabled]="signupForm.invalid">
            Sign Up
          </button>
        </form>
        <div class="login-link">
          <a mat-button routerLink="/login">Already have account? Login</a>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .signup-card {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
    }
    mat-form-field {
      margin-bottom: 1rem;
    }
    .login-link {
      text-align: center;
      margin-top: 1rem;
    }
    @media (max-width: 480px) {
      .signup-card {
        margin: 1rem;
        padding: 1.5rem;
      }
    }
  `]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(1)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.authService.init();
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(
        this.signupForm.value.email,
        this.signupForm.value.password,
        this.signupForm.value.name,
        this.signupForm.value.age
      );
    }
  }
}
