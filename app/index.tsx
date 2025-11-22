import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExpenses } from '../src/hooks/useExpenses';
import { BudgetCard } from '../src/components/BudgetCard';
import { ExpenseCard } from '../src/components/ExpenseCard';
import { FloatingAddButton } from '../src/components/FloatingAddButton';
import { formatCurrency } from '../src/utils/currency';

export default function DashboardScreen() {
  const router = useRouter();
  const {
    expenses,
    budgets,
    getTodayExpenses,
    getTodaySpent,
    getWeeklyAverage,
    getRemainingBudget,
    getBudgetProgress,
    getCurrentBudget,
    deleteExpense,
  } = useExpenses();

  const currentBudget = useMemo(() => getCurrentBudget(), [budgets]);
  const budgetProgress = useMemo(() => getBudgetProgress(), [budgets]);
  const todayExpenses = useMemo(() => getTodayExpenses(), [expenses]);
  const todaySpent = useMemo(() => getTodaySpent(), [expenses]);
  const weeklyAvg = useMemo(() => getWeeklyAverage(), [expenses]);
  const remainingBudget = useMemo(() => getRemainingBudget(), [budgets]);

  const handleAddExpense = () => {
    router.push('/add/manual');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hey, Student! 👋</Text>
          <Text style={styles.subGreeting}> Here&apos;s your expense summary</Text>
        </View>

        {/* Budget Card */}
        <BudgetCard budget={currentBudget} progress={budgetProgress} />

        {/* Quick Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}> Today's Spend </Text>
            <Text style={styles.statAmount}>{formatCurrency(todaySpent)}</Text>
            <Text style={styles.statCount}>{todayExpenses.length} transactions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Weekly Avg</Text>
            <Text style={styles.statAmount}>{formatCurrency(weeklyAvg)}</Text>
            <Text style={styles.statCount}>Per week</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Remaining</Text>
            <Text style={[styles.statAmount, { color: '#51CF66' }]}>{formatCurrency(remainingBudget)}</Text>
            <Text style={styles.statCount}>This month</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/split/create')}>
              <MaterialCommunityIcons name="account-multiple" size={22} color="#007AFF" />
              <Text style={styles.actionText}>Split Bill</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/add/scan')}>
              <MaterialCommunityIcons name="barcode" size={22} color="#007AFF" />
              <Text style={styles.actionText}>Scan Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/challenges')}>
              <MaterialCommunityIcons name="target" size={22} color="#007AFF" />
              <Text style={styles.actionText}>Challenges</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity onPress={() => router.push('/categories')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {expenses.length > 0 ? (
            <FlatList
              data={expenses.slice(0, 5)}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <ExpenseCard
                  expense={item}
                  onPress={() => router.push(`/transactions/${item.id}`)}
                  onDelete={() => deleteExpense(item.id)}
                />
              )}
            />
          ) : (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="inbox-outline" size={48} color="#DDD" />
              <Text style={styles.emptyText}>No expenses yet</Text>
              <Text style={styles.emptySubtext}>Grab a chai and add your first expense</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <FloatingAddButton onPress={handleAddExpense} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#B3E5D9',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
    fontWeight: '500',
  },
  statAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  statCount: {
    fontSize: 10,
    color: '#999',
  },
  actionsSection: {
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  actionText: {
    fontSize: 11,
    color: '#333',
    fontWeight: '600',
    marginTop: 6,
  },
  transactionsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  seeAll: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#CCC',
    marginTop: 4,
  },
});
