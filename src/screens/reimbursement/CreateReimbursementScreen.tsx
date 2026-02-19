import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateReimbursementScreen() {
  const nav = useNavigation<any>();
  const [selectedCamp, setSelectedCamp] = useState('');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Create reimbursement</Text>
      <Text style={styles.subtitle}>Select camp and define expense heads</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Select camp</Text>
        <TouchableOpacity style={styles.select} onPress={() => setSelectedCamp('1')}>
          <Text style={styles.selectText}>{selectedCamp ? 'IIT Delhi - 2025-03-01' : 'Choose camp'}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Expense heads</Text>
        <Text style={styles.hint}>Add expense heads (e.g. Travel, Materials)</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => nav.goBack()}>
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 20 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  select: { padding: 14, backgroundColor: '#0a0a0a', borderRadius: 8, marginBottom: 16 },
  selectText: { color: '#fff' },
  hint: { color: '#666', fontSize: 12 },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
