import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Switch,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExpenses } from '../../src/hooks/useExpenses';
import { Category } from '../../src/types';
import { CATEGORY_INFO } from '../../src/data/sampleData';
import uuid from 'react-native-uuid';

const CATEGORIES: Category[] = ['Cafeteria', 'Hostel', 'Groceries', 'Transport', 'Books', 'Events', 'Misc', 'Bills'];

export default function AddManualScreen() {
  const router = useRouter();
  const { addExpense } = useExpenses();

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Cafeteria');
  const [payee, setPayee] = useState('');
  const [notes, setNotes] = useState('');
  const [recurring, setRecurring] = useState<'none' | 'weekly' | 'monthly'>('none');
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [loading, setLoading] = useState(false);

  const quickAmounts = [10, 50, 100, 500];

  const handleAddExpense = async () => {
    if (!amount || parseFloat(amount) === 0) {
      alert('Please enter an amount');
      return;
    }

    try {
      setLoading(true);
      const expense = {
        id: uuid.v4() as string,
        amount: parseFloat(amount),
        category,
        payee,
        notes,
        date: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        recurring,
        isDiscounted,
      };

      await addExpense(expense);
      router.back();
    } catch (error) {
      alert('Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialCommunityIcons name="chevron-left" size={28} color="#333" />
            </TouchableOpacity>
            <Text style={styles.title}>Add Expense</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Amount Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor="#CCC"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>

            {/* Quick Amount Buttons */}
            <View style={styles.quickButtons}>
              {quickAmounts.map(amt => (
                <TouchableOpacity
                  key={amt}
                  style={styles.quickButton}
                  onPress={() => setAmount(String(parseFloat(amount || '0') + amt))}
                >
                  <Text style={styles.quickButtonText}>+₹{amt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {CATEGORIES.map(cat => {
                const catInfo = CATEGORY_INFO[cat as Category];
                const isSelected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryButton, isSelected && styles.categoryButtonActive]}
                    onPress={() => setCategory(cat as Category)}
                  >
                    <View
                      style={[
                        styles.categoryIcon,
                        { backgroundColor: catInfo.color },
                        isSelected && styles.categoryIconActive,
                      ]}
                    >
                      <MaterialCommunityIcons name={catInfo.icon as any} size={18} color="#333" />
                    </View>
                    <Text style={[styles.categoryButtonText, isSelected && styles.categoryButtonTextActive]}>
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Payee */}
          <View style={styles.section}>
            <Text style={styles.label}>Payee / Shop</Text>
            <TextInput
              style={styles.input}
              placeholder="Where did you spend?"
              placeholderTextColor="#CCC"
              value={payee}
              onChangeText={setPayee}
            />
          </View>

          {/* Notes */}
          <View style={styles.section}>
            <Text style={styles.label}>Notes</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Add notes..."
              placeholderTextColor="#CCC"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          {/* Toggles */}
          <View style={styles.section}>
            <View style={styles.toggleRow}>
              <Text style={styles.label}>Student Discount</Text>
              <Switch value={isDiscounted} onValueChange={setIsDiscounted} />
            </View>
          </View>

          {/* Recurring */}
          <View style={styles.section}>
            <Text style={styles.label}>Recurring</Text>
            <View style={styles.recurringButtons}>
              {(['none', 'weekly', 'monthly'] as const).map(rec => (
                <TouchableOpacity
                  key={rec}
                  style={[styles.recurringButton, recurring === rec && styles.recurringButtonActive]}
                  onPress={() => setRecurring(rec)}
                >
                  <Text style={[styles.recurringButtonText, recurring === rec && styles.recurringButtonTextActive]}>
                    {rec === 'none' ? 'Once' : rec.charAt(0).toUpperCase() + rec.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Add Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.addButton, loading && styles.addButtonDisabled]}
            onPress={handleAddExpense}
            disabled={loading}
          >
            <Text style={styles.addButtonText}>{loading ? 'Adding...' : 'Add Expense'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  placeholder: {
    width: 28,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  amountInput: {
    flex: 1,
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    paddingVertical: 12,
    marginLeft: 4,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#FFE4C4',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  quickButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  categoryScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  categoryButton: {
    alignItems: 'center',
    marginRight: 12,
    paddingBottom: 8,
  },
  categoryButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryIconActive: {
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  multilineInput: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recurringButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  recurringButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  recurringButtonActive: {
    backgroundColor: '#007AFF',
  },
  recurringButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  recurringButtonTextActive: {
    color: '#FFF',
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
