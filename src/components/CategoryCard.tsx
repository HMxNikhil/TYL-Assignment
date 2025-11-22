import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Category } from '../types';
import { formatCurrency } from '../utils/currency';
import { CATEGORY_INFO } from '../data/sampleData';

interface CategoryCardProps {
  category: Category;
  total: number;
  percentage: number;
  count: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, total, percentage, count }) => {
  const categoryInfo = CATEGORY_INFO[category];

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: categoryInfo.color }]}>
        <MaterialCommunityIcons name={categoryInfo.icon as any} size={20} color="#333" />
      </View>

      <View style={styles.content}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.amount}>{formatCurrency(total)}</Text>
      </View>

      <View style={styles.stats}>
        <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
        <Text style={styles.count}>{count} items</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  stats: {
    alignItems: 'flex-end',
  },
  percentage: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 2,
  },
  count: {
    fontSize: 10,
    color: '#999',
  },
});
