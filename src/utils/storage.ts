import AsyncStorage from '@react-native-async-storage/async-storage';
import { Expense, Budget, Challenge, User } from '../types';

const STORAGE_KEYS = {
  EXPENSES: 'expenses_list',
  BUDGETS: 'budgets_list',
  CHALLENGES: 'challenges_list',
  USER: 'user_data',
  AUTH_TOKEN: 'auth_token',
};

// Expenses
export const saveExpenses = async (expenses: Expense[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.EXPENSES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting expenses:', error);
    return [];
  }
};

export const addExpense = async (expense: Expense): Promise<void> => {
  const expenses = await getExpenses();
  expenses.push(expense);
  await saveExpenses(expenses);
};

export const deleteExpense = async (id: string): Promise<void> => {
  const expenses = await getExpenses();
  const filtered = expenses.filter(e => e.id !== id);
  await saveExpenses(filtered);
};

export const updateExpense = async (id: string, updates: Partial<Expense>): Promise<void> => {
  const expenses = await getExpenses();
  const index = expenses.findIndex(e => e.id === id);
  if (index >= 0) {
    expenses[index] = { ...expenses[index], ...updates };
    await saveExpenses(expenses);
  }
};

// Budgets
export const saveBudgets = async (budgets: Budget[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  } catch (error) {
    console.error('Error saving budgets:', error);
  }
};

export const getBudgets = async (): Promise<Budget[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BUDGETS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting budgets:', error);
    return [];
  }
};

export const addBudget = async (budget: Budget): Promise<void> => {
  const budgets = await getBudgets();
  budgets.push(budget);
  await saveBudgets(budgets);
};

// Challenges
export const saveChallenges = async (challenges: Challenge[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.CHALLENGES, JSON.stringify(challenges));
  } catch (error) {
    console.error('Error saving challenges:', error);
  }
};

export const getChallenges = async (): Promise<Challenge[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.CHALLENGES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting challenges:', error);
    return [];
  }
};

// User
export const saveUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

export const getUser = async (): Promise<User | null> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

// Auth
export const saveAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

export const clearAuth = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error clearing auth:', error);
  }
};

// Clear all data (for development)
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};
