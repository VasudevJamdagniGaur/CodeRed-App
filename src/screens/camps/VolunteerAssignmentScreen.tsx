import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const MOCK_VOLUNTEERS = [
  { id: '1', name: 'Alice', lastActivity: '2 days ago', workload: 2, assigned: true },
  { id: '2', name: 'Bob', lastActivity: '1 week ago', workload: 1, assigned: false },
  { id: '3', name: 'Carol', lastActivity: '3 days ago', workload: 3, assigned: false },
];

export default function VolunteerAssignmentScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Volunteer assignment</Text>
      <Text style={styles.subtitle}>Prevent overload • Show availability</Text>

      {MOCK_VOLUNTEERS.map((v) => (
        <View key={v.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.name}>{v.name}</Text>
            <Text style={styles.workload}>Workload: {v.workload}</Text>
          </View>
          <Text style={styles.meta}>Last activity: {v.lastActivity}</Text>
          <TouchableOpacity style={[styles.btn, v.assigned && styles.btnRemove]}>
            <Text style={styles.btnText}>{v.assigned ? 'Remove' : 'Assign'}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 12, color: '#888', marginBottom: 20 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { color: '#fff', fontSize: 16, fontWeight: '600' },
  workload: { color: '#888', fontSize: 12 },
  meta: { color: '#666', fontSize: 12, marginTop: 4 },
  btn: { marginTop: 12, padding: 10, borderRadius: 8, backgroundColor: '#C41E3A', alignItems: 'center' },
  btnRemove: { backgroundColor: '#333' },
  btnText: { color: '#fff', fontSize: 14 },
});
