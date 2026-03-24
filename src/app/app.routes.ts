import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { BmiComponent } from './bmi/bmi.component';
import { ProfileComponent } from './profile/profile.component';
import { DietPlansComponent } from './diet-plans/diet-plans.component';
import { DietPlanDetailComponent } from './diet-plans/diet-plan-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'bmi', component: BmiComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'diet-plans', component: DietPlansComponent, canActivate: [authGuard] },
  { path: 'diet-plans/:id', component: DietPlanDetailComponent, canActivate: [authGuard] },
  { path: 'cart', loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent), canActivate: [authGuard] },
  { path: 'checkout', loadComponent: () => import('./cart/checkout.component').then(m => m.CheckoutComponent), canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
