import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Budget } from '../types';
import { formatCurrency, formatDateFull } from '../utils/currency';

interface BudgetCardProps {
  budget: Budget | null;
  progress: number;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, progress }) => {
  if (!budget) {
    return (
      <View style={styles.card}>
        <Text style={styles.emptyText}>No active budget</Text>
      </View>
    );
  }

  const remaining = Math.max(0, budget.totalAmount - budget.spent);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{budget.name}</Text>
        <Text style={styles.date}>{formatDateFull(budget.startDate)}</Text>
      </View>

      <View style={styles.amounts}>
        <View style={styles.amountItem}>
          <Text style={styles.label}>Total</Text>
          <Text style={styles.amount}>{formatCurrency(budget.totalAmount)}</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.label}>Spent</Text>
          <Text style={[styles.amount, { color: '#FF6B6B' }]}>{formatCurrency(budget.spent)}</Text>
        </View>
        <View style={styles.amountItem}>
          <Text style={styles.label}>Remaining</Text>
          <Text style={[styles.amount, { color: '#51CF66' }]}>{formatCurrency(remaining)}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.progressText}>{Math.round(progress)}% spent</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFD9B3',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  amounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  amountItem: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
    fontWeight: '500',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#51CF66',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
});
