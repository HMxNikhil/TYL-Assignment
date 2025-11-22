// Type definitions for Expense Tracker app

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  payee?: string;
  notes?: string;
  date: string; // ISO string
  createdAt: string;
  recurring?: 'none' | 'weekly' | 'monthly';
  isDiscounted?: boolean;
  receiptImage?: string; // base64 or URI
  splitWith?: SplitExpense[];
}

export type Category = 'Cafeteria' | 'Hostel' | 'Groceries' | 'Transport' | 'Books' | 'Events' | 'Misc' | 'Bills';

export interface Budget {
  id: string;
  name: string;
  totalAmount: number;
  spent: number;
  startDate: string;
  endDate: string;
  account: 'Personal' | 'Roommate Pool';
}

export interface SplitExpense {
  id: string;
  expenseId: string;
  roommates: Roommate[];
  totalAmount: number;
  settlements: Settlement[];
}

export interface Roommate {
  id: string;
  name: string;
  share: number; // percentage or amount
}

export interface Settlement {
  id: string;
  fromRoommate: string;
  toRoommate: string;
  amount: number;
  settled: boolean;
  settledDate?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate: string;
  completed: boolean;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  college?: string;
  rollNo?: string;
}

export interface CategoryStats {
  category: Category;
  total: number;
  percentage: number;
  count: number;
}
