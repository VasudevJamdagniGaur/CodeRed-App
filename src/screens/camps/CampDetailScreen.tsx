import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const STEPS = [
  'Lead Received',
  'Contacted POC',
  'Blood Bank Booked',
  'Volunteers Assigned',
  'Camp Conducted',
  'Donation Count Updated',
  'Post-Camp Follow-up',
];

export default function CampDetailScreen() {
  const nav = useNavigation<any>();
  const route = useRoute();
  const campId = (route.params as { campId?: string } | undefined)?.campId;
  const doneCount = 3;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.org}>IIT Delhi</Text>
        <Text style={styles.date}>2025-03-01</Text>
        <View style={styles.statusBadge}><Text style={styles.statusText}>scheduled</Text></View>
        <Text style={styles.manager}>Manager: John Doe</Text>
      </View>

      <Text style={styles.stepperTitle}>Workflow</Text>
      {STEPS.map((label, i) => (
        <View key={i} style={styles.step}>
          <View style={[styles.stepDot, i < doneCount && styles.stepDotDone]} />
          <Text style={[styles.stepLabel, i < doneCount && styles.stepLabelDone]}>{label}</Text>
          {i < doneCount && <Text style={styles.stepStatus}>Done</Text>}
        </View>
      ))}

      <TouchableOpacity style={styles.link} onPress={() => nav.navigate('VolunteerAssignment', { campId })}>
        <Text style={styles.linkText}>Assign volunteers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => nav.navigate('UpdateDonationCount', { campId })}>
        <Text style={styles.linkText}>Update donation count</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => nav.navigate('PostCampFollowup', { campId })}>
        <Text style={styles.linkText}>Post-camp follow-up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  header: { marginBottom: 24 },
  org: { fontSize: 22, fontWeight: '700', color: '#fff' },
  date: { fontSize: 14, color: '#888', marginTop: 4 },
  statusBadge: { alignSelf: 'flex-start', backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginTop: 8 },
  statusText: { color: '#fff', fontSize: 12 },
  manager: { fontSize: 12, color: '#888', marginTop: 8 },
  stepperTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 12 },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stepDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#333', marginRight: 12 },
  stepDotDone: { backgroundColor: '#C41E3A' },
  stepLabel: { flex: 1, color: '#888', fontSize: 14 },
  stepLabelDone: { color: '#fff' },
  stepStatus: { color: '#0d5c0d', fontSize: 12 },
  link: { marginTop: 16, paddingVertical: 12 },
  linkText: { color: '#C41E3A', fontSize: 14 },
});
