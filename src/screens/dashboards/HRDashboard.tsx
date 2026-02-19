import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HRDashboard() {
  const nav = useNavigation<any>();

  const widgets = [
    { label: 'Total volunteers', value: '156' },
    { label: 'Participation rate', value: '78%' },
    { label: 'Camps per manager', value: '4.2' },
    { label: 'Locked vs unlocked schedules', value: '12 / 144' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>HR Dashboard</Text>
      <Text style={styles.subtitle}>Volunteer management</Text>

      <View style={styles.grid}>
        {widgets.map((w, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardValue}>{w.value}</Text>
            <Text style={styles.cardLabel}>{w.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => nav.navigate('VolunteerDirectory')}>
        <Text style={styles.primaryBtnText}>Manage schedules</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => nav.navigate('HRAnalytics')}>
        <Text style={styles.secondaryBtnText}>View analytics</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  card: { width: '50%', padding: 12 },
  cardValue: { fontSize: 28, fontWeight: '700', color: '#C41E3A' },
  cardLabel: { fontSize: 12, color: '#888', marginTop: 4 },
  primaryBtn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 24 },
  primaryBtnText: { color: '#fff', fontWeight: '600' },
  secondaryBtn: { borderWidth: 1, borderColor: '#333', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 12 },
  secondaryBtnText: { color: '#fff' },
});
