import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function AddScanScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scan Receipt</Text>
      <View style={styles.content}>
        <Text style={styles.placeholder}>📷 Receipt scanner coming soon</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
});
