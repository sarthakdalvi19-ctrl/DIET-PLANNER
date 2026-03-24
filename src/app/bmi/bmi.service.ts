import { Injectable } from '@angular/core';

import { AuthService } from '../auth/auth.service';

export interface BmiResult {
  bmi: string;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class BmiService {
  constructor(private authService: AuthService) {}

  calculate(height: number, weight: number): BmiResult {
    const bmi = weight / ((height / 100) ** 2);
    let category: BmiResult['category'];
    let color: string;
    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'green';
    } else if (bmi < 25) {
      category = 'Normal';
      color = 'blue';
    } else if (bmi < 30) {
      category = 'Overweight';
      color = 'orange';
    } else {
      category = 'Obese';
      color = 'red';
    }
    return { bmi: bmi.toFixed(1), category, color };
  }

  saveBmi(bmi: number) {
    const user = this.authService.user();
    if (user) {
      const updated = {...user, bmi: Number(bmi)};
      localStorage.setItem('user', JSON.stringify(updated));
      this.authService.setUser(updated);
    }
  }
}
