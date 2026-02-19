import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const TIMELINE = ['Lead Added', 'Contacted', 'Negotiation', 'Successful / Cancelled'];

export default function LeadDetailScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Lead detail</Text>
      <View style={styles.header}>
        <Text style={styles.org}>IIT Delhi</Text>
        <Text style={styles.meta}>School • Contacted</Text>
      </View>
      <Text style={styles.sectionTitle}>Timeline</Text>
      {TIMELINE.map((t, i) => (
        <View key={i} style={styles.timelineRow}>
          <View style={[styles.timelineDot, i < 2 && styles.timelineDotDone]} />
          <Text style={styles.timelineLabel}>{t}</Text>
        </View>
      ))}
      <Text style={styles.sectionTitle}>Communication notes</Text>
      <Text style={styles.notes}>Initial call done. Follow-up scheduled for next week.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 16 },
  header: { marginBottom: 24 },
  org: { fontSize: 20, fontWeight: '600', color: '#fff' },
  meta: { color: '#888', marginTop: 4 },
  sectionTitle: { color: '#C41E3A', fontSize: 14, marginTop: 20, marginBottom: 8 },
  timelineRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  timelineDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#333', marginRight: 12 },
  timelineDotDone: { backgroundColor: '#C41E3A' },
  timelineLabel: { color: '#fff', fontSize: 14 },
  notes: { color: '#888', fontSize: 14, marginTop: 8 },
});
