import { AgeGroup } from './age-group.enum';

export interface Meal {
  name: string;
  calories: number;
  nutrition: string;
  image: string;
}

export interface DietPlan {
  id: string;
  title: string;
  ageGroup: AgeGroup;
  dailyCalories: number;
  description: string;
  meals: Meal[];
  tips: string[];
  image: string;
  videoId: string;
}
