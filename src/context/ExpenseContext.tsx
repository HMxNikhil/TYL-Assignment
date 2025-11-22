import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Expense, Budget, Challenge, User, CategoryStats } from '../types';
import * as StorageService from '../utils/storage';
import { SAMPLE_EXPENSES, SAMPLE_BUDGETS, SAMPLE_CHALLENGES } from '../data/sampleData';
import { isThisMonth } from '../utils/currency';

export interface ExpenseContextType {
  // Expenses
  expenses: Expense[];
  addExpense: (expense: Expense) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  updateExpense: (id: string, updates: Partial<Expense>) => Promise<void>;
  getExpensesByCategory: (category: string) => Expense[];
  getTodayExpenses: () => Expense[];
  getThisMonthExpenses: () => Expense[];
  getTotalSpent: () => number;
  getTodaySpent: () => number;

  // Budgets
  budgets: Budget[];
  addBudget: (budget: Budget) => Promise<void>;
  getCurrentBudget: () => Budget | null;
  getBudgetProgress: () => number;

  // Challenges
  challenges: Challenge[];
  addChallenge: (challenge: Challenge) => Promise<void>;
  updateChallenge: (id: string, updates: Partial<Challenge>) => Promise<void>;

  // Stats
  getCategoryStats: () => CategoryStats[];
  getWeeklyAverage: () => number;
  getRemainingBudget: () => number;

  // User
  user: User | null;
  setUser: (user: User) => Promise<void>;

  // Loading
  loading: boolean;
  error: string | null;

  // Logout
  logout: () => Promise<void>;
}

export const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

interface ExpenseProviderProps {
  children: ReactNode;
}

export const ExpenseProvider: React.FC<ExpenseProviderProps> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        const [storedExpenses, storedBudgets, storedChallenges, storedUser] = await Promise.all([
          StorageService.getExpenses(),
          StorageService.getBudgets(),
          StorageService.getChallenges(),
          StorageService.getUser(),
        ]);

        // Use sample data if empty (first launch)
        setExpenses(storedExpenses.length > 0 ? storedExpenses : SAMPLE_EXPENSES);
        setBudgets(storedBudgets.length > 0 ? storedBudgets : SAMPLE_BUDGETS);
        setChallenges(storedChallenges.length > 0 ? storedChallenges : SAMPLE_CHALLENGES);
        setUserState(storedUser);
      } catch (err) {
        setError('Failed to load data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Expense operations
  const addExpense = async (expense: Expense) => {
    try {
      const updated = [...expenses, expense];
      setExpenses(updated);
      await StorageService.addExpense(expense);

      // Update budget spent amount
      const currentBudget = budgets[0];
      if (currentBudget) {
        const newBudgets = budgets.map(b =>
          b.id === currentBudget.id ? { ...b, spent: b.spent + expense.amount } : b
        );
        setBudgets(newBudgets);
        await StorageService.saveBudgets(newBudgets);
      }
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const expense = expenses.find(e => e.id === id);
      const updated = expenses.filter(e => e.id !== id);
      setExpenses(updated);
      await StorageService.deleteExpense(id);

      // Update budget spent amount
      if (expense) {
        const currentBudget = budgets[0];
        if (currentBudget) {
          const newBudgets = budgets.map(b =>
            b.id === currentBudget.id ? { ...b, spent: Math.max(0, b.spent - expense.amount) } : b
          );
          setBudgets(newBudgets);
          await StorageService.saveBudgets(newBudgets);
        }
      }
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    try {
      const oldExpense = expenses.find(e => e.id === id);
      const updated = expenses.map(e => (e.id === id ? { ...e, ...updates } : e));
      setExpenses(updated);
      await StorageService.updateExpense(id, updates);

      // Update budget if amount changed
      if (oldExpense && updates.amount && oldExpense.amount !== updates.amount) {
        const diff = updates.amount - oldExpense.amount;
        const currentBudget = budgets[0];
        if (currentBudget) {
          const newBudgets = budgets.map(b =>
            b.id === currentBudget.id ? { ...b, spent: Math.max(0, b.spent + diff) } : b
          );
          setBudgets(newBudgets);
          await StorageService.saveBudgets(newBudgets);
        }
      }
    } catch (err) {
      setError('Failed to update expense');
      console.error(err);
    }
  };

  const getExpensesByCategory = (category: string): Expense[] => {
    return expenses.filter(e => e.category === category);
  };

  const getTodayExpenses = (): Expense[] => {
    const today = new Date().toDateString();
    return expenses.filter(e => new Date(e.date).toDateString() === today);
  };

  const getThisMonthExpenses = (): Expense[] => {
    return expenses.filter(e => isThisMonth(e.date));
  };

  const getTotalSpent = (): number => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  };

  const getTodaySpent = (): number => {
    return getTodayExpenses().reduce((sum, e) => sum + e.amount, 0);
  };

  // Budget operations
  const addBudget = async (budget: Budget) => {
    try {
      const updated = [...budgets, budget];
      setBudgets(updated);
      await StorageService.addBudget(budget);
    } catch (err) {
      setError('Failed to add budget');
      console.error(err);
    }
  };

  const getCurrentBudget = (): Budget | null => {
    const now = new Date();
    return budgets.find(b => {
      const start = new Date(b.startDate);
      const end = new Date(b.endDate);
      return start <= now && now <= end;
    }) || budgets[0] || null;
  };

  const getBudgetProgress = (): number => {
    const budget = getCurrentBudget();
    if (!budget || budget.totalAmount === 0) return 0;
    return Math.min((budget.spent / budget.totalAmount) * 100, 100);
  };

  // Challenge operations
  const addChallenge = async (challenge: Challenge) => {
    try {
      const updated = [...challenges, challenge];
      setChallenges(updated);
      await StorageService.saveChallenges(updated);
    } catch (err) {
      setError('Failed to add challenge');
      console.error(err);
    }
  };

  const updateChallenge = async (id: string, updates: Partial<Challenge>) => {
    try {
      const updated = challenges.map(c => (c.id === id ? { ...c, ...updates } : c));
      setChallenges(updated);
      await StorageService.saveChallenges(updated);
    } catch (err) {
      setError('Failed to update challenge');
      console.error(err);
    }
  };

  // Stats
  const getCategoryStats = (): CategoryStats[] => {
    const monthExpenses = getThisMonthExpenses();
    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    const stats: Record<string, { total: number; count: number }> = {};
    monthExpenses.forEach(e => {
      if (!stats[e.category]) {
        stats[e.category] = { total: 0, count: 0 };
      }
      stats[e.category].total += e.amount;
      stats[e.category].count += 1;
    });

    return Object.entries(stats).map(([category, { total: catTotal, count }]) => ({
      category: category as any,
      total: catTotal,
      percentage: total > 0 ? (catTotal / total) * 100 : 0,
      count,
    }));
  };

  const getWeeklyAverage = (): number => {
    const thisMonthExpenses = getThisMonthExpenses();
    if (thisMonthExpenses.length === 0) return 0;
    const weeks = Math.ceil(thisMonthExpenses.length / 7) || 1;
    return Math.round(getTotalSpent() / weeks);
  };

  const getRemainingBudget = (): number => {
    const budget = getCurrentBudget();
    if (!budget) return 0;
    return Math.max(0, budget.totalAmount - budget.spent);
  };

  // User operations
  const setUser = async (userData: User) => {
    try {
      setUserState(userData);
      await StorageService.saveUser(userData);
    } catch (err) {
      setError('Failed to save user');
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await StorageService.clearAuth();
      setUserState(null);
    } catch (err) {
      setError('Failed to logout');
      console.error(err);
    }
  };

  const value: ExpenseContextType = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
    getExpensesByCategory,
    getTodayExpenses,
    getThisMonthExpenses,
    getTotalSpent,
    getTodaySpent,
    budgets,
    addBudget,
    getCurrentBudget,
    getBudgetProgress,
    challenges,
    addChallenge,
    updateChallenge,
    getCategoryStats,
    getWeeklyAverage,
    getRemainingBudget,
    user,
    setUser,
    loading,
    error,
    logout,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
};
