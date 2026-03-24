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
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, RouterLink],
  template: `
    <mat-card class="login-card">
      <mat-card-header>
        <mat-card-title>Login to Diet Planner</mat-card-title>
        <mat-card-subtitle>Clean, modern diet tracking</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" type="email">
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
          </mat-form-field>
          <mat-form-field appearance="outline" fullWidth>
            <mat-label>Password</mat-label>
            <input matInput formControlName="password" type="password">
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" fullWidth type="submit" [disabled]="loginForm.invalid">
            Login
          </button>
        </form>
        <div class="demo">
          <p>Demo: test@example.com / password</p>
        </div>
        <div class="signup-link">
          <a mat-button color="accent" routerLink="/signup">Create Account</a>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .login-card {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
    }
    mat-form-field {
      margin-bottom: 1rem;
    }
    .demo {
      text-align: center;
      margin: 1rem 0;
      font-size: 0.875rem;
      color: var(--gray-700);
    }
    .signup-link {
      text-align: center;
      margin-top: 1rem;
    }
    @media (max-width: 480px) {
      .login-card {
        margin: 1rem;
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.authService.init();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
    }
  }
}
