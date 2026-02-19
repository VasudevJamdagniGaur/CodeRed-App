import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const MOCK = [
  { id: '1', camp: 'IIT Delhi', status: 'pending', amount: 500 },
  { id: '2', camp: 'ABC Corp', status: 'approved', amount: 1200 },
  { id: '3', camp: 'XYZ School', status: 'rejected', amount: 800 },
];

export default function ReimbursementStatusScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Reimbursement status</Text>
      {MOCK.map((r) => (
        <View key={r.id} style={styles.card}>
          <Text style={styles.camp}>{r.camp}</Text>
          <Text style={styles.amount}>₹{r.amount}</Text>
          <View style={[styles.badge, r.status === 'approved' && styles.badgeApproved, r.status === 'rejected' && styles.badgeRejected]}>
            <Text style={styles.badgeText}>{r.status}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 16 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 12 },
  camp: { color: '#fff', fontSize: 16, fontWeight: '600' },
  amount: { color: '#888', marginTop: 4 },
  badge: { alignSelf: 'flex-start', marginTop: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#333' },
  badgeApproved: { backgroundColor: '#0d5c0d' },
  badgeRejected: { backgroundColor: '#8B0000' },
  badgeText: { color: '#fff', fontSize: 12 },
});
