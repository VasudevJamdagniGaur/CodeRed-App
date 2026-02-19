import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Helpline assigned', body: 'You have been assigned a B+ helpline in Delhi.', read: false },
  { id: '2', title: 'Camp pending step', body: 'Blood bank booking pending for IIT camp.', read: true },
  { id: '3', title: 'Schedule locked', body: 'Your schedule has been locked for this week.', read: false },
  { id: '4', title: 'Follow-up due', body: 'Post-camp follow-up due for ABC Corp drive.', read: true },
];

export default function NotificationsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Alerts & reminders</Text>

      {MOCK_NOTIFICATIONS.map((n) => (
        <TouchableOpacity
          key={n.id}
          style={[styles.card, n.read && styles.cardRead]}
        >
          <Text style={styles.cardTitle}>{n.title}</Text>
          <Text style={styles.cardBody}>{n.body}</Text>
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
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  cardRead: { opacity: 0.7 },
  cardTitle: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cardBody: { color: '#888', fontSize: 14, marginTop: 4 },
});
