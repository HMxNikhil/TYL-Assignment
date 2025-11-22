import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Expense } from '../types';
import { formatCurrency, formatDate } from '../utils/currency';
import { CATEGORY_INFO } from '../data/sampleData';

interface ExpenseCardProps {
  expense: Expense;
  onPress?: () => void;
  onDelete?: () => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onPress, onDelete }) => {
  const categoryInfo = CATEGORY_INFO[expense.category];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: categoryInfo.color }]}>
          <MaterialCommunityIcons name={categoryInfo.icon as any} size={24} color="#333" />
        </View>

        <View style={styles.details}>
          <View>
            <Text style={styles.category}>{expense.category}</Text>
            {expense.payee && <Text style={styles.payee}>{expense.payee}</Text>}
          </View>
          <Text style={styles.note}>{expense.notes || 'No description'}</Text>
        </View>

        <View style={styles.rightContent}>
          <Text style={styles.amount}>{formatCurrency(expense.amount)}</Text>
          <Text style={styles.time}>{formatDate(expense.date)}</Text>
        </View>
      </View>

      {/* Badges */}
      {(expense.recurring !== 'none' || expense.isDiscounted) && (
        <View style={styles.badges}>
          {expense.recurring && expense.recurring !== 'none' && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{expense.recurring}</Text>
            </View>
          )}
          {expense.isDiscounted && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Student Discount</Text>
            </View>
          )}
        </View>
      )}

      {onDelete && (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <MaterialCommunityIcons name="trash-can-outline" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD9B3',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  payee: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  note: {
    fontSize: 11,
    color: '#999',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },
  time: {
    fontSize: 11,
    color: '#999',
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 6,
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    color: '#2E7D32',
    fontWeight: '500',
  },
  deleteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
});
