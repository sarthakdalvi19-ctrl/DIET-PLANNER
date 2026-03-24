import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { DietPlan } from '../models/diet-plan.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  items = this.cartItems.asReadonly();

  totalItems = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));

  totalPrice = computed(() => {
    return this.cartItems().reduce((sum, item) => sum + (item.plan.dailyCalories * 0.1 * item.quantity), 0); // Mock price 0.1$/cal
  });

  addToCart(plan: DietPlan) {
    const existing = this.cartItems().find(item => item.plan.id === plan.id);
    if (existing) {
      const updated = [...this.cartItems()];
      const index = updated.findIndex(item => item.plan.id === plan.id);
      updated[index].quantity += 1;
      this.cartItems.set(updated);
    } else {
      this.cartItems.update(items => [...items, { plan, quantity: 1 }]);
    }
  }

  removeFromCart(planId: string) {
    this.cartItems.update(items => items.filter(item => item.plan.id !== planId));
  }

  updateQuantity(planId: string, quantity: number) {
    this.cartItems.update(items => {
      const updated = [...items];
      const index = updated.findIndex(item => item.plan.id === planId);
      if (index !== -1) {
        updated[index].quantity = quantity;
      }
      return updated.filter(item => item.quantity > 0);
    });
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
