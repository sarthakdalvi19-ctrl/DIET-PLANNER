import { Injectable, signal, computed } from '@angular/core';

import { AgeGroup } from '../models/age-group.enum';
import { DietPlan, Meal } from '../models/diet-plan.model';

@Injectable({
  providedIn: 'root'
})
export class DietService {
  plans = signal<DietPlan[]>([
    // Existing 5 plans
    {
      id: '1',
      title: 'Balanced Kids Plan (5-12 years)',
      ageGroup: AgeGroup.Kids,
      dailyCalories: 1800,
      description: 'Designed for children 5-12 years. Balanced nutrition for brain/bone growth, play energy. 6 meals/snacks every 2-3hrs. Vitamins/minerals/fiber rich. Low sugar/processed. Hand portions. 6-8gl water. 60min play. Track growth. Pediatrician consult.',
      meals: [
        { name: '7AM: Oatmeal Fruits Nuts', calories: 400, nutrition: 'Fiber/vitamins A/C/sustained energy', image: 'https://source.unsplash.com/400x300/?oatmeal,fruits,kids' },
        { name: '10AM: Yogurt Berries', calories: 150, nutrition: 'Probiotics/antioxidants/immunity', image: 'https://source.unsplash.com/400x300/?yogurt,berries' },
        { name: '1PM: Veggie Hummus Wrap', calories: 500, nutrition: 'Protein/veggies/fats/growth', image: 'https://source.unsplash.com/400x300/?hummus,wrap,veggies' },
        { name: '4PM: Apple Cheese', calories: 200, nutrition: 'Calcium/sugars/bones teeth', image: 'https://source.unsplash.com/400x300/?apple,cheese' },
        { name: '7PM: Chicken Rice', calories: 600, nutrition: 'Lean protein/carbs/repair', image: 'https://source.unsplash.com/400x300/?chicken,rice,kids' },
        { name: '9PM: Warm Milk', calories: 150, nutrition: 'Calcium/tryptophan/growth sleep', image: 'https://source.unsplash.com/400x300/?milk,warm' }
      ],
      tips: ['Rainbow veggies daily', '6-8gl water no juice', 'Play after meals', 'No screens eating', 'Hand portions', 'Chew 20x/bite', '9PM bed', 'Veggie variety wkly'],
      image: 'https://source.unsplash.com/600x400/?healthy,kids,diet',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '2',
      title: 'Teens High Protein Plan (13-18 years)',
      ageGroup: AgeGroup.Teens,
      dailyCalories: 2500,
      description: 'Active teens growth spurts/sports. 1.6g/kg protein. 6 meals muscle/hormones/brain. Pre/post workout. Omega3 inflammation. Complex carbs. 3L+ water. 8-10hr sleep. Strength 3x/wk. Track body. Nutritionist consult.',
      meals: [
        { name: '6AM: Eggs Toast PreWO', calories: 500, nutrition: 'Protein/Bvits/endurance', image: 'https://source.unsplash.com/400x300/?eggs,toast,protein' },
        { name: '9AM: PostWO Shake', calories: 250, nutrition: 'Fast protein/carbs', image: 'https://source.unsplash.com/400x300/?protein,shake,post-workout' },
        { name: '12PM: Chicken Salad', calories: 600, nutrition: 'Macros recovery', image: 'https://source.unsplash.com/400x300/?chicken,salad' },
        { name: '3PM: Yogurt Nuts', calories: 300, nutrition: 'Protein/fats/energy', image: 'https://source.unsplash.com/400x300/?yogurt,nuts' },
        { name: '6PM: Salmon Quinoa', calories: 800, nutrition: 'Omega3/protein repair', image: 'https://source.unsplash.com/400x300/?salmon,quinoa' },
        { name: '9PM: Cottage Cheese', calories: 150, nutrition: 'Slow overnight synthesis', image: 'https://source.unsplash.com/400x300/?cottage,cheese' }
      ],
      tips: ['Protein 3hr intervals', '3L+electrolytes', 'PreWO carbs/pro', 'PostWO 30g pro', '8-10hr sleep', 'Weights 3-4x/wk', 'Macro tracking', 'Stress meditation'],
      image: 'https://source.unsplash.com/600x400/?protein,teen,diet',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '3',
      title: 'Adult Weight Loss Plan (18-50 years)',
      ageGroup: AgeGroup.Adults,
      dailyCalories: 2000,
      description: '500cal deficit. Volume foods satiety. 6 small meals boost metabolism. 14hr IF opt. Strength 3x/cardio 150min/wk. 1.6g/kg pro muscle. 30g fiber. 7-8hr sleep cortisol. Weekly track. Prof guidance. Habit focus.',
      meals: [
        { name: '8AM: Yogurt Parfait', calories: 300, nutrition: 'Protein/fiber fill', image: 'https://source.unsplash.com/400x300/?yogurt,parfait' },
        { name: '11AM: Veggie Guac', calories: 100, nutrition: 'Volume no cals', image: 'https://source.unsplash.com/400x300/?avocado,veggies' },
        { name: '1PM: Lentil Soup Salad', calories: 400, nutrition: 'Fiber satiety pro', image: 'https://source.unsplash.com/400x300/?lentil,soup' },
        { name: '4PM: Apple Almond', calories: 200, nutrition: 'Sugar stable', image: 'https://source.unsplash.com/400x300/?apple,almond' },
        { name: '7PM: Turkey Stirfry', calories: 500, nutrition: 'Lean pro volume', image: 'https://source.unsplash.com/400x300/?turkey,stirfry' },
        { name: '9PM: Tea', calories: 0, nutrition: 'Wind down', image: 'https://source.unsplash.com/400x300/?herbal,tea' }
      ],
      tips: ['16/8 IF opt', '10k steps', 'Pro priority', '30g fiber', '7-8hr sleep', 'Weights 3x', 'Weekly photos', '80/20 rule', 'Stress journal', '3L water'],
      image: 'https://source.unsplash.com/600x400/?weightloss,adult,diet',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '4',
      title: 'Seniors Heart Healthy (60+ years)',
      ageGroup: AgeGroup.Seniors,
      dailyCalories: 1900,
      description: 'Low Na <2000mg. Omega3 rich. Soft foods. Anti-inflam spices. Frequent meals digest. K+ BP. Fiber reg. Ca/vitD bones. Light activity. Med timing. BP wkly.',
      meals: [
        { name: '7AM: Oat Porridge Berries', calories: 350, nutrition: 'Fiber chol lower', image: 'https://source.unsplash.com/400x300/?oatmeal,porridge,senior' },
        { name: '10AM: Pear Cheese', calories: 200, nutrition: 'K+/Mg++ BP ctrl', image: 'https://source.unsplash.com/400x300/?pear,cheese' },
        { name: '12PM: Salmon Spinach', calories: 450, nutrition: 'Omega3 arteries', image: 'https://source.unsplash.com/400x300/?salmon,spinach' },
        { name: '3PM: Almonds Unsalt', calories: 150, nutrition: 'VitE antiox', image: 'https://source.unsplash.com/400x300/?almonds' },
        { name: '6PM: Veggie Soup Grain', calories: 500, nutrition: 'Digest K+ rich', image: 'https://source.unsplash.com/400x300/?veggie,soup' },
        { name: '8PM: Herbal Tea', calories: 0, nutrition: 'Relax digest', image: 'https://source.unsplash.com/400x300/?herbal,tea,senior' }
      ],
      tips: ['Low Na cook', 'K+ foods BP', 'Omega3 fish 2-3x', '30min walk', '8hr sleep', 'Ca/vitD', 'Portion ctrl', 'Turmeric/ginger', 'Hydrate med time', 'Wkly BP'],
      image: 'https://source.unsplash.com/600x400/?heart,healthy,senior',
      videoId: 'dQw4w9WgXcQ'
    },
    {
      id: '5',
      title: 'Kids Energy Boost (5-12 Active)',
      ageGroup: AgeGroup.Kids,
      dailyCalories: 2000,
      description: 'Active kids sports/school. Peak timing. Carbs glycogen. Pro repair. Fats brain. Electrolytes. Frequent crash avoid. Fun eat. Iron fatigue. Zinc immune. Outdoor vitD. Family sustain.',
      meals: [
        { name: '6:30AM: Banana Pancakes', calories: 450, nutrition: 'Carbs/K+/focus', image: 'https://source.unsplash.com/400x300/?banana,pancakes,kids' },
        { name: '10AM: Cheese Fruit', calories: 250, nutrition: 'Pro/Ca++/play', image: 'https://source.unsplash.com/400x300/?cheese,fruit' },
        { name: '1PM: Turkey Veggie Sand', calories: 550, nutrition: 'Afternoon learning', image: 'https://source.unsplash.com/400x300/?turkey,sandwich' },
        { name: '4PM: Smoothie Recovery', calories: 300, nutrition: 'Vits/antiox', image: 'https://source.unsplash.com/400x300/?smoothie,kids' },
        { name: '7PM: Pasta Meatballs', calories: 650, nutrition: 'Carb reload pro', image: 'https://source.unsplash.com/400x300/?pasta,meatballs' },
        { name: '8:30PM: Yogurt Wind-down', calories: 150, nutrition: 'Probiotics sleep', image: 'https://source.unsplash.com/400x300/?yogurt,kids' }
      ],
      tips: ['School/sports sync', 'Hydrate early', 'Colorful fun', 'Pro/carb rec', 'Iron/zinc fatigue', '60min+ play', 'Family eat', 'No sugar drinks', '10-12hr sleep', 'No screen bed'],
      image: 'https://source.unsplash.com/600x400/?energy,kids,diet',
      videoId: 'dQw4w9WgXcQ'
    },
    // New plans
    {
      id: '6',
      title: 'Vegan Plant Power (All Ages)',
      ageGroup: AgeGroup.Adults,
      dailyCalories: 2200,
      description: '100% plant-based. Complete proteins quinoa/lentils/tofu. B12 fortified. Omega3 flax/chia. Iron spinach. Calcium kale/almond. 30g fiber. Balanced macros.',
      meals: [
        { name: 'Breakfast: Chia Pudding', calories: 400, nutrition: 'Omega3/protein/fiber', image: 'https://source.unsplash.com/400x300/?chia,pudding,vegan' },
        { name: 'Snack: Nut Butter Apple', calories: 250, nutrition: 'Healthy fats', image: 'https://source.unsplash.com/400x300/?nut,butter,apple' },
        { name: 'Lunch: Buddha Bowl', calories: 600, nutrition: 'Rainbow nutrients', image: 'https://source.unsplash.com/400x300/?buddha,bowl' },
        { name: 'Snack: Hummus Veggies', calories: 200, nutrition: 'Protein/crunch', image: 'https://source.unsplash.com/400x300/?hummus,veggies' },
        { name: 'Dinner: Tofu Stirfry', calories: 650, nutrition: 'Complete protein', image: 'https://source.unsplash.com/400x300/?tofu,stirfry' },
        { name: 'Evening: Herbal Tea', calories: 100, nutrition: 'Antioxidants', image: 'https://source.unsplash.com/400x300/?herbal,tea,vegan' }
      ],
      tips: ['B12 suppliment', 'Protein combine', 'Iron+VitC', 'Omega3 seeds', 'Variety colors', 'Legumes daily'],
      image: 'https://source.unsplash.com/600x400/?vegan,diet',
      videoId: 'vegan-video-id'
    },
    {
      id: '7',
      title: 'Keto Low Carb (Adults)',
      ageGroup: AgeGroup.Adults,
      dailyCalories: 2000,
      description: 'High fat moderate protein <50g carb. Ketosis fat burn. MCT quick energy. Electrolytes. Avocado/nuts/fish. Intermittent fasting.',
      meals: [
        { name: 'Bulletproof Coffee', calories: 400, nutrition: 'MCT/ketones', image: 'https://source.unsplash.com/400x300/?bulletproof,coffee,keto' },
        { name: 'Avocado Egg Salad', calories: 500, nutrition: 'Healthy fats', image: 'https://source.unsplash.com/400x300/?avocado,egg' },
        { name: 'Salmon Asparagus', calories: 700, nutrition: 'Omega3', image: 'https://source.unsplash.com/400x300/?salmon,asparagus' },
        { name: 'Cheese Sticks', calories: 300, nutrition: 'Zero carb snack', image: 'https://source.unsplash.com/400x300/?cheese,sticks' },
        { name: 'Steak Broccoli', calories: 800, nutrition: 'Protein/fiber', image: 'https://source.unsplash.com/400x300/?steak,broccoli' },
        { name: 'Keto Fat Bomb', calories: 200, nutrition: 'Dessert', image: 'https://source.unsplash.com/400x300/?keto,dessert' }
      ],
      tips: ['Electrolytes daily', '<20g net carb', 'MCT oil', 'Fat 70%', 'Test ketones', '16/8 IF'],
      image: 'https://source.unsplash.com/600x400/?keto,diet',
      videoId: 'keto-video-id'
    },
    {
      id: '8',
      title: 'Muscle Gain Bulk (Teens/Adults)',
      ageGroup: AgeGroup.Teens,
      dailyCalories: 3200,
      description: 'Surplus 500cal. 2g/kg protein. 6 meals. Creatine/time carbs. Progressive overload. Sleep 8hrs.',
      meals: [
        { name: 'Mass Gainer Shake', calories: 800, nutrition: 'Quick cals', image: 'https://source.unsplash.com/400x300/?protein,shake,gain' },
        { name: 'Oats PB Banana', calories: 600, nutrition: 'Carb reload', image: 'https://source.unsplash.com/400x300/?oats,peanut,butter' },
        { name: 'Chicken Rice Broccoli', calories: 800, nutrition: 'Clean bulk', image: 'https://source.unsplash.com/400x300/?chicken,rice' },
        { name: 'Greek Yogurt Honey', calories: 400, nutrition: 'Pro/carb', image: 'https://source.unsplash.com/400x300/?greek,yogurt' },
        { name: 'Salmon Sweet Potato', calories: 900, nutrition: 'PostWO', image: 'https://source.unsplash.com/400x300/?salmon,sweet,potato' },
        { name: 'Casein Pudding', calories: 400, nutrition: 'Overnight', image: 'https://source.unsplash.com/400x300/?casein,pudding' }
      ],
      tips: ['Progressive overload', 'Sleep 8hrs', 'Creatine 5g', 'Carb time', 'Track progress', 'Cal surplus'],
      image: 'https://source.unsplash.com/600x400/?muscle,gain,diet',
      videoId: 'bulk-video-id'
    },
    {
      id: '9',
      title: 'Mediterranean (Adults/Seniors)',
      ageGroup: AgeGroup.Adults,
      dailyCalories: 2100,
      description: 'Olive oil fish veggies. Anti-inflam. Heart brain health. Portion plate method. Wine moderate. Walk daily.',
      meals: [
        { name: 'Greek Yogurt Honey', calories: 350, nutrition: 'Probiotics', image: 'https://source.unsplash.com/400x300/?greek,yogurt,honey' },
        { name: 'Hummus Veggie Sticks', calories: 250, nutrition: 'Fiber', image: 'https://source.unsplash.com/400x300/?hummus,veggies' },
        { name: 'Grilled Fish Quinoa', calories: 600, nutrition: 'Omega3', image: 'https://source.unsplash.com/400x400/?fish,quinoa,mediterranean' },
        { name: 'Almonds Olives', calories: 300, nutrition: 'Healthy fats', image: 'https://source.unsplash.com/400x300/?almonds,olives' },
        { name: 'Chicken Souvlaki Salad', calories: 650, nutrition: 'Protein veggies', image: 'https://source.unsplash.com/400x300/?chicken,salad,greek' },
        { name: 'Dark Chocolate', calories: 150, nutrition: 'Antioxidants', image: 'https://source.unsplash.com/400x300/?dark,chocolate' }
      ],
      tips: ['Olive oil daily', 'Fish 3x/wk', 'Plate method', 'Herbs spices', '30min walk', 'Nuts handful'],
      image: 'https://source.unsplash.com/600x400/?mediterranean,diet',
      videoId: 'mediterranean-video-id'
    },
    {
      id: '10',
      title: 'Athlete Performance (Teens/Adults)',
      ageGroup: AgeGroup.Teens,
      dailyCalories: 2800,
      description: 'Carb periodization. Protein timing. BCAA intra. Electrolytes. Carb load race day. Recovery meals.',
      meals: [
        { name: 'Pre-training Oats', calories: 600, nutrition: 'Glycogen load', image: 'https://source.unsplash.com/400x300/?oats,pre-workout' },
        { name: 'Intra BCAA Water', calories: 50, nutrition: 'Anti-catabolic', image: 'https://source.unsplash.com/400x300/?sports,drink' },
        { name: 'PostWO Protein Carb', calories: 800, nutrition: 'Recovery window', image: 'https://source.unsplash.com/400x300/?protein,carb,recovery' },
        { name: 'Trail Mix', calories: 400, nutrition: 'Endurance', image: 'https://source.unsplash.com/400x300/?trail,mix' },
        { name: 'Steak Baked Potato', calories: 900, nutrition: 'Rebuild', image: 'https://source.unsplash.com/400x300/?steak,potato' },
        { name: 'Casein Shake', calories: 350, nutrition: 'Overnight repair', image: 'https://source.unsplash.com/400x300/?casein,shake' }
      ],
      tips: ['Carb periodize', 'Protein timing', 'Electrolytes sweat', 'BCAA endurance', 'Sleep recovery', 'Mobility daily'],
      image: 'https://source.unsplash.com/600x400/?athlete,diet',
      videoId: 'athlete-video-id'
    }
  ]);

  search = signal('');

  selectedAge = signal<AgeGroup | 'All'>('All');
  sortOrder = signal<'none' | 'price-asc' | 'price-desc' | 'popularity'>('none');

  filteredPlans = computed(() => {
    let p = this.plans();
    if (this.selectedAge() !== 'All') {
      p = p.filter((plan: DietPlan) => plan.ageGroup === this.selectedAge());
    }
    if (this.search()) {
      p = p.filter((plan: DietPlan) => plan.title.toLowerCase().includes(this.search().toLowerCase()) || plan.meals.some((m: Meal) => m.name.toLowerCase().includes(this.search().toLowerCase())));
    }
    
    // Apply sorting
    let sorted = [...p];
    const order = this.sortOrder();
    if (order === 'price-asc') {
      sorted.sort((a, b) => a.dailyCalories - b.dailyCalories);
    } else if (order === 'price-desc') {
      sorted.sort((a, b) => b.dailyCalories - a.dailyCalories);
    } else if (order === 'popularity') {
      sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }
    return sorted;
  });

  getPlanById(id: string): DietPlan | undefined {
    return this.plans().find(plan => plan.id === id);
  }
}

