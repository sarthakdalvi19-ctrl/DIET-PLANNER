import { Injectable, signal, computed } from '@angular/core';

import { AgeGroup } from '../models/age-group.enum';
import { DietPlan, Meal } from '../models/diet-plan.model';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  plans = signal<DietPlan[]>([
    {
      id: '1',
      title: 'Balanced Kids Plan (5-12 years)',
      ageGroup: AgeGroup.Kids,
      dailyCalories: 1800,
      description: 'Designed for children 5-12 years. Balanced nutrition for brain/bone growth, play energy. 6 meals/snacks every 2-3hrs. Vitamins/minerals/fiber rich. Low sugar/processed. Hand portions. 6-8gl water. 60min play. Track growth. Pediatrician consult.',
      meals: [
        { name: '7AM: Oatmeal Fruits Nuts', calories: 400, nutrition: 'Fiber/vitamins A/C/sustained energy', image: 'https://images.unsplash.com/photo-1529047366890-50e7a8a90655?w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop' },
        { name: '10AM: Yogurt Berries', calories: 150, nutrition: 'Probiotics/antioxidants/immunity', image: 'https://images.unsplash.com/photo-1562440496-364ffe2bed1e?w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop' },
        { name: '1PM: Veggie Hummus Wrap', calories: 500, nutrition: 'Protein/veggies/fats/growth', image: 'https://images.unsplash.com/photo-1501442504653-6bd5246d4f01?w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop' },
        { name: '4PM: Apple Cheese', calories: 200, nutrition: 'Calcium/sugars/bones teeth', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop' },
        { name: '7PM: Chicken Rice', calories: 600, nutrition: 'Lean protein/carbs/repair', image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop' },
        { name: '9PM: Warm Milk', calories: 150, nutrition: 'Calcium/tryptophan/growth sleep', image: 'https://images.unsplash.com/photo-1577700057047-2c0a5f1ae343?w=400&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop' }
      ],
      tips: ['Rainbow veggies daily', '6-8gl water no juice', 'Play after meals', 'No screens eating', 'Hand portions', 'Chew 20x/bite', '9PM bed', 'Veggie variety wkly'],
      image: 'https://images.unsplash.com/photo-1610987386864-469278b7d0a4?w=800&ixlib=rb-4.0.3&auto=format&fit=crop',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '2',
      title: 'Teens High Protein Plan (13-18 years)',
      ageGroup: AgeGroup.Teens,
      dailyCalories: 2500,
      description: 'Active teens growth spurts/sports. 1.6g/kg protein. 6 meals muscle/hormones/brain. Pre/post workout. Omega3 inflammation. Complex carbs. 3L+ water. 8-10hr sleep. Strength 3x/wk. Track body. Nutritionist consult.',
      meals: [
        { name: '6AM: Eggs Toast PreWO', calories: 500, nutrition: 'Protein/Bvits/endurance', image: 'https://images.unsplash.com/photo-1635931634246-dca388f3d8b7?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '9AM: PostWO Shake', calories: 250, nutrition: 'Fast protein/carbs', image: 'https://images.unsplash.com/photo-1622298057181-1569aedf8d34?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '12PM: Chicken Salad', calories: 600, nutrition: 'Macros recovery', image: 'https://images.unsplash.com/photo-1512568400610-3f3f73beb4e4?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '3PM: Yogurt Nuts', calories: 300, nutrition: 'Protein/fats/energy', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '6PM: Salmon Quinoa', calories: 800, nutrition: 'Omega3/protein repair', image: 'https://images.unsplash.com/photo-1579586140626-509fe7db3b81?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '9PM: Cottage Cheese', calories: 150, nutrition: 'Slow overnight synthesis', image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' }
      ],
      tips: ['Protein 3hr intervals', '3L+electrolytes', 'PreWO carbs/pro', 'PostWO 30g pro', '8-10hr sleep', 'Weights 3-4x/wk', 'Macro tracking', 'Stress meditation'],
      image: 'https://images.unsplash.com/photo-1578320670144-d4e9a782a3bd?w=800&ixlib=rb-4.0.3&auto=format&fit=crop',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Adult Weight Loss Plan (18-50 years)',
      ageGroup: AgeGroup.Adults,
      dailyCalories: 2000,
      description: '500cal deficit. Volume foods satiety. 6 small meals boost metabolism. 14hr IF opt. Strength 3x/cardio 150min/wk. 1.6g/kg pro muscle. 30g fiber. 7-8hr sleep cortisol. Weekly track. Prof guidance. Habit focus.',
      meals: [
        { name: '8AM: Yogurt Parfait', calories: 300, nutrition: 'Protein/fiber fill', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920217?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '11AM: Veggie Guac', calories: 100, nutrition: 'Volume no cals', image: 'https://images.unsplash.com/photo-1614721973238-9b4fb8e1ab2c?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '1PM: Lentil Soup Salad', calories: 400, nutrition: 'Fiber satiety pro', image: 'https://images.unsplash.com/photo-1544033076012-3f0a0adefc10?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '4PM: Apple Almond', calories: 200, nutrition: 'Sugar stable', image: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '7PM: Turkey Stirfry', calories: 500, nutrition: 'Lean pro volume', image: 'https://images.unsplash.com/photo-1511699656952-34342bb7c2f2?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '9PM: Tea', calories: 0, nutrition: 'Wind down', image: 'https://images.unsplash.com/photo-1571933569248-06ee5f03600e?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' }
      ],
      tips: ['16/8 IF opt', '10k steps', 'Pro priority', '30g fiber', '7-8hr sleep', 'Weights 3x', 'Weekly photos', '80/20 rule', 'Stress journal', '3L water'],
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3133?w=800&ixlib=rb-4.0.3&auto=format&fit=crop',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '4',
      title: 'Seniors Heart Healthy (60+ years)',
      ageGroup: AgeGroup.Seniors,
      dailyCalories: 1900,
      description: 'Low Na <2000mg. Omega3 rich. Soft foods. Anti-inflam spices. Frequent meals digest. K+ BP. Fiber reg. Ca/vitD bones. Light activity. Med timing. BP wkly.',
      meals: [
        { name: '7AM: Oat Porridge Berries', calories: 350, nutrition: 'Fiber chol lower', image: 'https://images.unsplash.com/photo-1546833999-107f453f15d4?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '10AM: Pear Cheese', calories: 200, nutrition: 'K+/Mg++ BP ctrl', image: 'https://images.unsplash.com/photo-1546961329-78bef0414d6c?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '12PM: Salmon Spinach', calories: 450, nutrition: 'Omega3 arteries', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '3PM: Almonds Unsalt', calories: 150, nutrition: 'VitE antiox', image: 'https://images.unsplash.com/photo-1582244822295-4175885d7aa4?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '6PM: Veggie Soup Grain', calories: 500, nutrition: 'Digest K+ rich', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '8PM: Herbal Tea', calories: 0, nutrition: 'Relax digest', image: 'https://images.unsplash.com/photo-1571933561353-ce3d83b73ccf?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' }
      ],
      tips: ['Low Na cook', 'K+ foods BP', 'Omega3 fish 2-3x', '30min walk', '8hr sleep', 'Ca/vitD', 'Portion ctrl', 'Turmeric/ginger', 'Hydrate med time', 'Wkly BP'],
      image: 'https://images.unsplash.com/photo-1576091160399-1d65e460342e?w=800&ixlib=rb-4.0.3&auto=format&fit=crop',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '5',
      title: 'Kids Energy Boost (5-12 Active)',
      ageGroup: AgeGroup.Kids,
      dailyCalories: 2000,
      description: 'Active kids sports/school. Peak timing. Carbs glycogen. Pro repair. Fats brain. Electrolytes. Frequent crash avoid. Fun eat. Iron fatigue. Zinc immune. Outdoor vitD. Family sustain.',
      meals: [
        { name: '6:30AM: Banana Pancakes', calories: 450, nutrition: 'Carbs/K+/focus', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '10AM: Cheese Fruit', calories: 250, nutrition: 'Pro/Ca++/play', image: 'https://images.unsplash.com/photo-1541599468178-1c9d787748e8?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '1PM: Turkey Veggie Sand', calories: 550, nutrition: 'Afternoon learning', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55c?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '4PM: Smoothie Recovery', calories: 300, nutrition: 'Vits/antiox', image: 'https://images.unsplash.com/photo-1542793921-269afafa274f?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '7PM: Pasta Meatballs', calories: 650, nutrition: 'Carb reload pro', image: 'https://images.unsplash.com/photo-1631044684038-d4d9a60e1b64?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' },
        { name: '8:30PM: Yogurt Wind-down', calories: 150, nutrition: 'Probiotics sleep', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&ixlib=rb-4.0.3&auto=format&fit=crop' }
      ],
      tips: ['School/sports sync', 'Hydrate early', 'Colorful fun', 'Pro/carb rec', 'Iron/zinc fatigue', '60min+ play', 'Family eat', 'No sugar drinks', '10-12hr sleep', 'No screen bed'],
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&ixlib=rb-4.0.3&auto=format&fit=crop',
      videoId: 'dQw4w9WgXcQ'
    }
  ]);

  search = signal('');

  selectedAge = signal<AgeGroup | 'All'>('All');

  filteredPlans = computed(() => {
    let p = this.plans();
    if (this.selectedAge() !== 'All') {
      p = p.filter((plan: DietPlan) => plan.ageGroup === this.selectedAge());
    }
    if (this.search()) {
      p = p.filter((plan: DietPlan) => plan.title.toLowerCase().includes(this.search().toLowerCase()) || plan.meals.some((m: Meal) => m.name.toLowerCase().includes(this.search().toLowerCase())));
    }
    return p;
  });

  getPlanById(id: string): DietPlan | undefined {
    return this.plans().find(plan => plan.id === id);
  }
}

