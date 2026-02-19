import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK = [
  { id: '1', name: 'Alice', role: 'Volunteer', participation: 12, status: 'active' },
  { id: '2', name: 'Bob', role: 'Volunteer', participation: 8, status: 'inactive' },
  { id: '3', name: 'Carol', role: 'Volunteer', participation: 15, status: 'active' },
];

export default function VolunteerDirectoryScreen() {
  const nav = useNavigation<any>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Volunteer directory</Text>
      {MOCK.map((v) => (
        <TouchableOpacity
          key={v.id}
          style={styles.card}
          onPress={() => nav.navigate('VolunteerProfile', { volunteerId: v.id })}
        >
          <Text style={styles.name}>{v.name}</Text>
          <Text style={styles.meta}>{v.role} • {v.participation} camps</Text>
          <View style={[styles.badge, v.status === 'active' ? styles.badgeActive : styles.badgeInactive]}>
            <Text style={styles.badgeText}>{v.status}</Text>
          </View>
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
  name: { color: '#fff', fontSize: 18, fontWeight: '600' },
  meta: { color: '#888', fontSize: 14, marginTop: 4 },
  badge: { alignSelf: 'flex-start', marginTop: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeActive: { backgroundColor: '#0d5c0d' },
  badgeInactive: { backgroundColor: '#333' },
  badgeText: { color: '#fff', fontSize: 12 },
});
