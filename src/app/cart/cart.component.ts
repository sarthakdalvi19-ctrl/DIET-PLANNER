import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CartService } from './cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  template: `
    <div class="cart container">
      <h1>My Cart</h1>
      <div class="cart-items" *ngIf="cartService.items().length > 0">
        <mat-list>
          <mat-list-item *ngFor="let item of cartService.items()">
            <img [src]="item.plan.image" matListAvatar style="width:60px;height:60px;object-fit:cover;">
            <div matLine>{{item.plan.title}}</div>
            <div matLine>{{ item.quantity }} x $ {{ (item.plan.dailyCalories * 0.1).toFixed(2) }}</div>
            <div matLine><strong>Total: $ {{ (item.plan.dailyCalories * 0.1 * item.quantity).toFixed(2) }}</strong></div>
            <button mat-icon-button (click)="cartService.removeFromCart(item.plan.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-list-item>
        </mat-list>
        <div class="summary">
          <h3>Total Items: {{cartService.totalItems()}}</h3>
          <h2>Total: $ {{cartService.totalPrice().toFixed(2)}}</h2>
          <button mat-raised-button color="primary" routerLink="/checkout" class="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
      <p *ngIf="cartService.items().length === 0" class="empty">Your cart is empty. <a routerLink="/diet-plans">Shop now</a></p>
    </div>
  `,
  styles: [`
    .cart { padding: 2rem 0; }
    .cart-items { margin-bottom: 2rem; }
    .summary { 
      background: white; 
      padding: 2rem; 
      border-radius: 12px; 
      box-shadow: var(--shadow-gym); 
      text-align: center;
      margin-top: 2rem;
    }
    .checkout-btn { width: 100%; }
    .empty { text-align: center; font-size: 1.2rem; margin-top: 4rem; color: var(--gray-700); }
  `]
})
export class CartComponent {
  cartService = inject(CartService);
}
