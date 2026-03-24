import { DietPlan } from './diet-plan.model';

export interface CartItem {
  plan: DietPlan;
  quantity: number;
}
