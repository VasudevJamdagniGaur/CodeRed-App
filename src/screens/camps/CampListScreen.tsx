import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK_CAMPS = [
  { id: '1', org: 'IIT Delhi', date: '2025-03-01', status: 'scheduled', location: 'New Delhi' },
  { id: '2', org: 'ABC Corp', date: '2025-02-25', status: 'in_progress', location: 'Gurgaon' },
  { id: '3', org: 'XYZ School', date: '2025-02-20', status: 'completed', location: 'Noida' },
];

export default function CampListScreen() {
  const nav = useNavigation<any>();
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'in_progress' | 'completed'>('all');

  const filtered = filter === 'all' ? MOCK_CAMPS : MOCK_CAMPS.filter((c) => c.status === filter);

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {(['all', 'scheduled', 'in_progress', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f.replace('_', ' ')}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {filtered.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={styles.card}
            onPress={() => nav.navigate('CampDetail', { campId: c.id })}
          >
            <Text style={styles.org}>{c.org}</Text>
            <Text style={styles.meta}>{c.date} • {c.location}</Text>
            <View style={[styles.badge, c.status === 'scheduled' && styles.badgeSched, c.status === 'in_progress' && styles.badgeProgress, c.status === 'completed' && styles.badgeDone]}>
              <Text style={styles.badgeText}>{c.status.replace('_', ' ')}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  filters: { flexDirection: 'row', padding: 16, gap: 8 },
  filterBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#1a1a1a' },
  filterBtnActive: { backgroundColor: '#C41E3A' },
  filterText: { color: '#888', fontSize: 12 },
  filterTextActive: { color: '#fff' },
  content: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  org: { color: '#fff', fontSize: 18, fontWeight: '600' },
  meta: { color: '#888', fontSize: 14, marginTop: 4 },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeSched: { backgroundColor: '#333' },
  badgeProgress: { backgroundColor: '#C41E3A' },
  badgeDone: { backgroundColor: '#0d5c0d' },
  badgeText: { color: '#fff', fontSize: 12 },
});
