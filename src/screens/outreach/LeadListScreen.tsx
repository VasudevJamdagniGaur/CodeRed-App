import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK_LEADS = [
  { id: '1', org: 'IIT Delhi', type: 'School', status: 'contacted', lastContact: '2025-02-18' },
  { id: '2', org: 'ABC Corp', type: 'Corporate', status: 'new', lastContact: '2025-02-15' },
  { id: '3', org: 'XYZ Ltd', type: 'Corporate', status: 'negotiation', lastContact: '2025-02-17' },
];

export default function LeadListScreen() {
  const nav = useNavigation<any>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Leads</Text>
      {MOCK_LEADS.map((l) => (
        <TouchableOpacity
          key={l.id}
          style={styles.card}
          onPress={() => nav.navigate('LeadDetail', { leadId: l.id })}
        >
          <Text style={styles.org}>{l.org}</Text>
          <Text style={styles.meta}>{l.type} • Last contact: {l.lastContact}</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>{l.status}</Text></View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 16 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 12 },
  org: { color: '#fff', fontSize: 18, fontWeight: '600' },
  meta: { color: '#888', fontSize: 14, marginTop: 4 },
  badge: { alignSelf: 'flex-start', marginTop: 8, backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: '#fff', fontSize: 12 },
});
