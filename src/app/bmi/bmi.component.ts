import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { BmiService } from './bmi.service';

@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, BaseChartDirective],
  template: `
    <mat-card class="bmi-container">
      <mat-card-header>
        <mat-card-title>BMI Calculator</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="bmiForm">
          <mat-form-field appearance="outline">
            <mat-label>Height (cm)</mat-label>
            <input matInput type="number" formControlName="height">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Weight (kg)</mat-label>
            <input matInput type="number" formControlName="weight">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="calculateBMI()" [disabled]="bmiForm.invalid">
            Calculate
          </button>
        </form>
        <div *ngIf="result" class="result">
          <h2>{{ result.bmi }}</h2>
<p class="category" [style.color]="result.color">{{ result.category }}</p>
          <img [src]="getBmiImage()" class="bmi-icon" [alt]="result.category" *ngIf="result?.category">
          <canvas baseChart
            [data]="chartData"
            [options]="chartOptions"
            [type]="'doughnut'">
          </canvas>
          <button mat-button color="accent" (click)="saveBMI()">Save BMI</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .bmi-container {
      max-width: 500px;
      margin: 20px auto;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }
    .result {
      text-align: center;
    }
    .result h2 {
      font-size: 48px;
      margin: 16px 0;
    }
    .category {
      font-size: 24px;
      font-weight: bold;
    }
    canvas {
      max-height: 300px;
      margin: 24px auto;
    }
    .bmi-icon {
      width: 120px;
      height: 120px;
      margin: 20px auto;
      display: block;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    }
    @media (max-width: 600px) {
      .bmi-container {
        margin: 16px;
      }
    }
  `]
})
export class BmiComponent {
  bmiForm: FormGroup;
  result: any = null;
  chartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };
  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private bmiService: BmiService
  ) {
    this.bmiForm = this.fb.group({
      height: ['', [Validators.required, Validators.min(50)]],
      weight: ['', [Validators.required, Validators.min(20)]]
    });
  }

  calculateBMI() {
    const height = Number(this.bmiForm.value.height);
    const weight = Number(this.bmiForm.value.weight);
    this.result = this.bmiService.calculate(height, weight);
    
    this.chartData = {
      labels: ['Your BMI'],
      datasets: [{
        data: [Number(this.result.bmi), 40],
        backgroundColor: [this.result.color, 'rgba(0,0,0,0.1)']
      }]
    };
  }

  getBmiImage() {
    const cat = this.result?.category;
    if (cat === 'Underweight') return '/assets/images/bmi-underweight.svg';
    if (cat === 'Normal') return '/assets/images/bmi-normal.svg';
    if (cat === 'Overweight' || cat === 'Obese') return '/assets/images/bmi-overweight.svg';
    return '/assets/images/bmi-normal.svg';
  }

  saveBMI() {
    if (this.result) {
      this.bmiService.saveBmi(Number(this.result.bmi));
    }
  }
}
