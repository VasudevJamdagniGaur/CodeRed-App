import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function VolunteerDashboard() {
  const nav = useNavigation<any>();

  const widgets = [
    { label: 'Assigned helplines', value: '2' },
    { label: 'Calls pending remarks', value: '1' },
    { label: 'Reimbursement status', value: 'Pending' },
    { label: "Today's tasks", value: '3' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Volunteer Dashboard</Text>
      <Text style={styles.subtitle}>Your actions</Text>

      <View style={styles.grid}>
        {widgets.map((w, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.cardValue}>{w.value}</Text>
            <Text style={styles.cardLabel}>{w.label}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => nav.navigate('LiveHelplinePool')}>
        <Text style={styles.primaryBtnText}>View Live Helplines</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={() => nav.navigate('AssignedHelpline')}>
        <Text style={styles.secondaryBtnText}>My assigned helplines</Text>
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
