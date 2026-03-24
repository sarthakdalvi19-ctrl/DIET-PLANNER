import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from './cart.service';
import { Order, PaymentMethod } from '../models/order.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private snackBar = inject(MatSnackBar);
  private cartService = inject(CartService);
  private authService = inject(AuthService);

  placeOrder(paymentMethod: PaymentMethod) {
    const items = this.cartService.items();
    if (items.length === 0) return;

    const order: Order = {
      id: 'ORD' + Date.now(),
      items: [...items],
      total: this.cartService.totalPrice(),
      paymentMethod,
      status: 'confirmed',
      orderDate: new Date()
    };

    // Mock processing
    this.snackBar.open('Order placed successfully! #' + order.id, 'OK', { duration: 5000 });
    this.cartService.clearCart();
  }
}
