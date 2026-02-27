import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

// Mock data – replace with real API
const MOCK_ASSIGNED_HELPLINES = [
  { id: '1', bloodGroup: 'B+', hospital: 'Apollo Hospital', city: 'Delhi', urgency: 'High' as const, requiredTill: '2025-02-25' },
  { id: '2', bloodGroup: 'O-', hospital: 'Max Healthcare', city: 'Noida', urgency: 'Medium' as const, requiredTill: '2025-02-26' },
];
const MOCK_EMPTY_HELPLINES = false; // set true to see empty state

const MOCK_STATS = {
  callsToday: 4,
  helplinesHandled: 12,
  campsParticipated: 5,
  remarksPending: 1,
};

const MOCK_REIMBURSEMENT = { pending: 1, approved: 3 };

const MOCK_ALERTS = [
  { id: '1', text: 'New helpline assigned – B+ in Delhi', critical: true },
  { id: '2', text: 'Reimbursement approved for Camp IIT Delhi', critical: false },
];

export default function VolunteerDashboard() {
  const nav = useNavigation<any>();
  const { user } = useAuth();
  const assignedHelplines = MOCK_EMPTY_HELPLINES ? [] : MOCK_ASSIGNED_HELPLINES;
  const hasRemarksPending = MOCK_STATS.remarksPending > 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* 1. HEADER – context only */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi, {user?.name ?? 'Volunteer'}</Text>
        <Text style={styles.location}>Delhi / North Chapter</Text>
      </View>

      {/* 2. ACTIVE / ASSIGNED HELPLINES – top priority */}
      <Text style={styles.sectionTitle}>Active helplines</Text>
      {assignedHelplines.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No active helplines assigned right now</Text>
        </View>
      ) : (
        assignedHelplines.map((h) => (
          <View key={h.id} style={styles.helplineCard}>
            <View style={styles.helplineRow}>
              <Text style={styles.bloodGroup}>{h.bloodGroup}</Text>
              <View style={[styles.urgencyBadge, h.urgency === 'High' && styles.urgencyHigh]}>
                <Text style={styles.urgencyText}>{h.urgency}</Text>
              </View>
            </View>
            <Text style={styles.helplineMeta}>Hospital: {h.hospital}</Text>
            <Text style={styles.helplineMeta}>City: {h.city}</Text>
            <Text style={styles.helplineMeta}>Required till: {h.requiredTill}</Text>
            <TouchableOpacity
              style={styles.openHelplineBtn}
              onPress={() => nav.navigate('AssignedHelpline', { helplineId: h.id })}
              activeOpacity={0.8}
            >
              <Text style={styles.openHelplineBtnText}>Open helpline</Text>
            </TouchableOpacity>
          </View>
        ))
      )}

      {/* 3. QUICK ACTIVITY SNAPSHOT – awareness only */}
      <Text style={styles.sectionTitle}>Quick snapshot</Text>
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_STATS.callsToday}</Text>
          <Text style={styles.statLabel}>Calls today</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_STATS.helplinesHandled}</Text>
          <Text style={styles.statLabel}>Helplines handled</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{MOCK_STATS.campsParticipated}</Text>
          <Text style={styles.statLabel}>Camps</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, MOCK_STATS.remarksPending > 0 && styles.statValueAlert]}>{MOCK_STATS.remarksPending}</Text>
          <Text style={styles.statLabel}>Remarks pending</Text>
        </View>
      </View>

      {/* 4. CALL STATUS ALERT – blocking when remarks pending */}
      {hasRemarksPending && (
        <View style={styles.alertBanner}>
          <Text style={styles.alertBannerText}>You have pending call remarks. Please update before proceeding.</Text>
        </View>
      )}

      {/* 5. REIMBURSEMENT SNAPSHOT – status only */}
      <Text style={styles.sectionTitle}>Reimbursements</Text>
      <View style={styles.reimbRow}>
        <Text style={styles.reimbText}>Pending: {MOCK_REIMBURSEMENT.pending}</Text>
        <Text style={styles.reimbDivider}>|</Text>
        <Text style={styles.reimbText}>Approved: {MOCK_REIMBURSEMENT.approved}</Text>
      </View>
      <TouchableOpacity style={styles.linkBtn} onPress={() => nav.navigate('ReimbursementStatus')} activeOpacity={0.8}>
        <Text style={styles.linkBtnText}>View reimbursements</Text>
      </TouchableOpacity>

      {/* 6. IMPORTANT SYSTEM ALERTS – top 2–3 only */}
      <Text style={styles.sectionTitle}>Important alerts</Text>
      {MOCK_ALERTS.slice(0, 3).map((a) => (
        <View key={a.id} style={[styles.alertCard, a.critical && styles.alertCardCritical]}>
          <Text style={styles.alertCardText}>{a.text}</Text>
        </View>
      ))}

      {/* 7. QUICK ACTION BUTTONS – max 2–3, thumb-friendly */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.primaryAction} onPress={() => nav.navigate('AssignedHelpline')} activeOpacity={0.8}>
          <Text style={styles.primaryActionText}>View assigned helplines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryAction} onPress={() => nav.navigate('LiveHelplinePool')} activeOpacity={0.8}>
          <Text style={styles.secondaryActionText}>Open donor list / Live helplines</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 48 },
  header: { marginBottom: 24 },
  greeting: { fontSize: 22, fontWeight: '700', color: '#fff' },
  location: { fontSize: 14, color: '#888', marginTop: 4 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 12, marginTop: 8 },
  emptyState: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 24, alignItems: 'center', marginBottom: 8 },
  emptyStateText: { color: '#888', fontSize: 15 },
  helplineCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C41E3A',
  },
  helplineRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  bloodGroup: { fontSize: 24, fontWeight: '700', color: '#C41E3A' },
  urgencyBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: '#333' },
  urgencyHigh: { backgroundColor: '#8B0000' },
  urgencyText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  helplineMeta: { color: '#ccc', fontSize: 14, marginTop: 4 },
  openHelplineBtn: { marginTop: 14, backgroundColor: '#C41E3A', borderRadius: 10, padding: 14, alignItems: 'center' },
  openHelplineBtnText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  statsRow: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6, marginBottom: 8 },
  statCard: { width: '50%', padding: 6 },
  statValue: { fontSize: 26, fontWeight: '700', color: '#C41E3A' },
  statValueAlert: { color: '#ff6b6b' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  alertBanner: { backgroundColor: '#8B0000', borderRadius: 10, padding: 14, marginVertical: 12 },
  alertBannerText: { color: '#fff', fontSize: 14, fontWeight: '600', textAlign: 'center' },
  reimbRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reimbText: { color: '#fff', fontSize: 15 },
  reimbDivider: { color: '#666', marginHorizontal: 8 },
  linkBtn: { alignSelf: 'flex-start', paddingVertical: 8 },
  linkBtnText: { color: '#C41E3A', fontSize: 14, fontWeight: '600' },
  alertCard: { backgroundColor: '#1a1a1a', borderRadius: 10, padding: 12, marginBottom: 8 },
  alertCardCritical: { borderLeftWidth: 4, borderLeftColor: '#C41E3A' },
  alertCardText: { color: '#fff', fontSize: 14 },
  quickActions: { marginTop: 24 },
  primaryAction: { backgroundColor: '#C41E3A', borderRadius: 14, padding: 18, alignItems: 'center' },
  primaryActionText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  secondaryAction: { borderWidth: 2, borderColor: '#C41E3A', borderRadius: 14, padding: 18, alignItems: 'center', marginTop: 12 },
  secondaryActionText: { color: '#C41E3A', fontWeight: '600', fontSize: 16 },
});
