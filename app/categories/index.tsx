import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useExpenses } from '../../src/hooks/useExpenses';
import { CategoryCard } from '../../src/components/CategoryCard';

export default function CategoriesScreen() {
  const router = useRouter();
  const { getCategoryStats } = useExpenses();

  const stats = useMemo(() => getCategoryStats(), [getCategoryStats]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialCommunityIcons name="chevron-left" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Categories</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={stats}
        keyExtractor={item => item.category}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategoryCard
            category={item.category}
            total={item.total}
            percentage={item.percentage}
            count={item.count}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="inbox-outline" size={48} color="#DDD" />
            <Text style={styles.emptyText}>No categories yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  placeholder: {
    width: 28,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
});
