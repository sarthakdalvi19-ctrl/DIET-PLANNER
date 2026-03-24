export interface User {
  id: string;
  email: string;
  name?: string;
  age?: number;
  gender?: 'male' | 'female';
  bmi?: number;
}

