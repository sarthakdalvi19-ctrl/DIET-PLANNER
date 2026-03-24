import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartService } from './cart.service';
import { OrderService } from './order.service';
import { Order, PaymentMethod } from '../models/order.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, MatCardModule, MatButtonModule, MatRadioModule, MatFormFieldModule],
  template: `
    <div class="checkout container">
      <h1>Checkout</h1>
      <mat-card class="checkout-card">
        <mat-card-header>
          <mat-card-title>Order Summary</mat-card-title>
          <mat-card-subtitle>Total: $ {{ cartService.totalPrice().toFixed(2) }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="payment-methods">
            <h3>Select Payment Method</h3>
            <mat-radio-group [formControl]="paymentControl">
              <mat-radio-button *ngFor="let method of paymentMethods" [value]="method">
                {{ method.name }}
              </mat-radio-button>
            </mat-radio-group>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/cart">Back to Cart</button>
          <button mat-raised-button color="primary" (click)="placeOrder()" [disabled]="paymentControl.invalid">
            Place Order
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .checkout { padding: 2rem 0; }
    .checkout-card { max-width: 600px; margin: 0 auto; }
    .payment-methods { margin: 2rem 0; }
    mat-radio-group { display: flex; flex-direction: column; gap: 1rem; }
    mat-card-actions { justify-content: space-between; }
  `]
})
export class CheckoutComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  paymentControl = new FormControl<PaymentMethod | null>(null);

  readonly paymentMethods: PaymentMethod[] = [
    { name: 'Cash on Delivery', code: 'COD' },
    { name: 'Credit Card', code: 'CC' },
    { name: 'UPI', code: 'UPI' },
    { name: 'Net Banking', code: 'NB' }
  ];

  placeOrder() {
    const method = this.paymentControl.value;
    if (method) {
      this.orderService.placeOrder(method);
    }
  }
}
