import { Expense, Budget, Challenge, Category } from '../types';

// Sample expenses for demo
export const SAMPLE_EXPENSES: Expense[] = [
  {
    id: '1',
    amount: 150,
    category: 'Cafeteria',
    payee: 'Main Cafe',
    notes: 'Lunch with friends',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    recurring: 'none',
  },
  {
    id: '2',
    amount: 500,
    category: 'Books',
    payee: 'Campus Store',
    notes: 'Textbook for DSA',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    recurring: 'none',
  },
  {
    id: '3',
    amount: 200,
    category: 'Transport',
    payee: 'Uber',
    notes: 'To railway station',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    recurring: 'none',
  },
  {
    id: '4',
    amount: 120,
    category: 'Groceries',
    payee: 'Local Mart',
    notes: 'Snacks and water',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    recurring: 'none',
  },
  {
    id: '5',
    amount: 800,
    category: 'Hostel',
    payee: 'Hostel Office',
    notes: 'Monthly room rent',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
    recurring: 'monthly',
  },
];

// Sample budgets
export const SAMPLE_BUDGETS: Budget[] = [
  {
    id: '1',
    name: 'Monthly Budget',
    totalAmount: 5000,
    spent: 1770,
    startDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    account: 'Personal',
  },
];

// Sample challenges
export const SAMPLE_CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'No Coffee Week',
    description: 'Skip coffee for 7 days and save ₹300',
    targetAmount: 300,
    currentAmount: 150,
    startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
  },
  {
    id: '2',
    title: 'Save ₹1000 This Month',
    description: 'Set aside ₹1000 for savings',
    targetAmount: 1000,
    currentAmount: 750,
    startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
  },
];

// Category icons and info
export const CATEGORY_INFO: Record<Category, { icon: string; color: string }> = {
  Cafeteria: { icon: 'utensils', color: '#FFD9B3' }, // peach
  Hostel: { icon: 'building', color: '#B3E5D9' }, // mint
  Groceries: { icon: 'shopping-cart', color: '#FFE4C4' }, // lighter peach
  Transport: { icon: 'car', color: '#C4D9FF' }, // light blue
  Books: { icon: 'book', color: '#D9FFD9' }, // light green
  Events: { icon: 'star', color: '#FFD9FF' }, // light pink
  Bills: { icon: 'receipt', color: '#FFFFC4' }, // light yellow
  Misc: { icon: 'circle', color: '#E8D9FF' }, // light purple
};

// Top categories for dashboard
export const TOP_CATEGORIES = ['Cafeteria', 'Books', 'Transport', 'Hostel', 'Events', 'Misc'];
