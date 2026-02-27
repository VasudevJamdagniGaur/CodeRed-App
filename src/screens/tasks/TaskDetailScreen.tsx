import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const MOCK: Record<string, { title: string; dueDate: string; overdue: boolean; priority: string; description: string; relatedCamp?: string }> = {
  '1': { title: 'Contact POC - IIT Delhi camp', dueDate: 'Today', overdue: false, priority: 'high', description: 'Reach out to the point of contact for the IIT Delhi blood donation camp to confirm venue and timings.', relatedCamp: 'IIT Delhi camp' },
  '2': { title: 'Update donation count - ABC Corp', dueDate: 'Yesterday', overdue: true, priority: 'high', description: 'Update the final donor count and units collected for the ABC Corp drive.', relatedCamp: 'ABC Corp' },
  '3': { title: 'Post-camp follow-up - School drive', dueDate: 'Tomorrow', overdue: false, priority: 'medium', description: 'Send acknowledgement letter and update donor database.', relatedCamp: 'School drive' },
  '4': { title: 'Add call remark - B+ helpline', dueDate: 'Today', overdue: false, priority: 'high', description: 'Log the outcome of the donor call for the B+ helpline.' },
};

export default function TaskDetailScreen() {
  const nav = useNavigation<any>();
  const route = useRoute();
  const taskId = (route.params as { taskId?: string })?.taskId ?? '1';
  const task = MOCK[taskId] ?? MOCK['1'];
  const [completed, setCompleted] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.priorityBar, task.overdue && styles.priorityBarOverdue]}>
        <Text style={styles.priorityLabel}>Priority: {task.priority}</Text>
      </View>
      <Text style={styles.title}>{task.title}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>Due: {task.dueDate}</Text>
        {task.relatedCamp ? <Text style={styles.meta}>Camp: {task.relatedCamp}</Text> : null}
      </View>
      <Text style={styles.sectionLabel}>Description</Text>
      <Text style={styles.description}>{task.description}</Text>
      <TouchableOpacity style={[styles.completeBtn, completed && styles.completeBtnDone]} onPress={() => setCompleted(!completed)}>
        <Ionicons name={completed ? 'checkmark-circle' : 'checkmark-circle-outline'} size={24} color={completed ? '#0d5c0d' : '#fff'} />
        <Text style={styles.completeBtnText}>{completed ? 'Marked complete' : 'Mark as complete'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backBtn} onPress={() => nav.goBack()}>
        <Text style={styles.backBtnText}>Back to tasks</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 48 },
  priorityBar: { backgroundColor: '#1a1a1a', padding: 10, borderRadius: 8, marginBottom: 16 },
  priorityBarOverdue: { borderLeftWidth: 4, borderLeftColor: '#C41E3A' },
  priorityLabel: { color: '#C41E3A', fontWeight: '600', textTransform: 'capitalize' },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 12 },
  metaRow: { marginBottom: 20 },
  meta: { color: '#888', fontSize: 14, marginTop: 4 },
  sectionLabel: { color: '#888', fontSize: 12, marginBottom: 8 },
  description: { color: '#ccc', fontSize: 15, lineHeight: 22, marginBottom: 24 },
  completeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16 },
  completeBtnDone: { backgroundColor: '#0d5c0d22' },
  completeBtnText: { color: '#fff', fontWeight: '600', fontSize: 16, marginLeft: 10 },
  backBtn: { marginTop: 20, paddingVertical: 12 },
  backBtnText: { color: '#C41E3A', fontSize: 15 },
});
