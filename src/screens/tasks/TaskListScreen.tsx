import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const MOCK_TASKS = [
  { id: '1', title: 'Contact POC - IIT Delhi camp', dueDate: 'Today', overdue: false },
  { id: '2', title: 'Update donation count - ABC Corp', dueDate: 'Yesterday', overdue: true },
  { id: '3', title: 'Post-camp follow-up - School drive', dueDate: 'Tomorrow', overdue: false },
];

export default function TaskListScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Tasks</Text>
      <Text style={styles.subtitle}>Pending steps • Due today • Overdue</Text>

      <Text style={styles.section}>Due today</Text>
      {MOCK_TASKS.filter((t) => !t.overdue && t.dueDate === 'Today').map((t) => (
        <TouchableOpacity key={t.id} style={styles.card}>
          <Text style={styles.cardTitle}>{t.title}</Text>
          <Text style={styles.due}>{t.dueDate}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.section}>Overdue</Text>
      {MOCK_TASKS.filter((t) => t.overdue).map((t) => (
        <TouchableOpacity key={t.id} style={[styles.card, styles.cardOverdue]}>
          <Text style={styles.cardTitle}>{t.title}</Text>
          <Text style={styles.dueOverdue}>{t.dueDate}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  section: { fontSize: 14, color: '#C41E3A', marginTop: 16, marginBottom: 8 },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  cardOverdue: { borderLeftWidth: 4, borderLeftColor: '#C41E3A' },
  cardTitle: { color: '#fff', fontSize: 16 },
  due: { color: '#888', fontSize: 12, marginTop: 4 },
  dueOverdue: { color: '#C41E3A', fontSize: 12, marginTop: 4 },
});
