import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type Priority = 'high' | 'medium' | 'low';
type TaskType = 'call' | 'camp' | 'followup' | 'other';

interface Task {
  id: string;
  title: string;
  dueDate: string;
  overdue: boolean;
  completed: boolean;
  priority: Priority;
  type: TaskType;
  description?: string;
  relatedCamp?: string;
}

const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Contact POC - IIT Delhi camp', dueDate: 'Today', overdue: false, completed: false, priority: 'high', type: 'call', relatedCamp: 'IIT Delhi camp' },
  { id: '2', title: 'Update donation count - ABC Corp', dueDate: 'Yesterday', overdue: true, completed: false, priority: 'high', type: 'camp', relatedCamp: 'ABC Corp' },
  { id: '3', title: 'Post-camp follow-up - School drive', dueDate: 'Tomorrow', overdue: false, completed: false, priority: 'medium', type: 'followup', relatedCamp: 'School drive' },
  { id: '4', title: 'Add call remark - B+ helpline', dueDate: 'Today', overdue: false, completed: true, priority: 'high', type: 'call' },
];

type Filter = 'all' | 'due_today' | 'overdue' | 'completed';

const PRIORITY_COLOR: Record<Priority, string> = { high: '#C41E3A', medium: '#f59e0b', low: '#666' };
const TYPE_ICON: Record<TaskType, string> = { call: 'call-outline', camp: 'medkit-outline', followup: 'document-text-outline', other: 'ellipse-outline' };

export default function TaskListScreen() {
  const nav = useNavigation<any>();
  const [filter, setFilter] = useState<Filter>('all');
  const [search, setSearch] = useState('');
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set(MOCK_TASKS.filter((t) => t.completed).map((t) => t.id)));

  const tasksWithCompletion = useMemo(() => {
    return MOCK_TASKS.map((t) => ({ ...t, completed: completedIds.has(t.id) }));
  }, [completedIds]);

  const filtered = useMemo(() => {
    let list = tasksWithCompletion;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q) || (t.relatedCamp && t.relatedCamp.toLowerCase().includes(q)));
    }
    switch (filter) {
      case 'due_today':
        return list.filter((t) => !t.completed && t.dueDate === 'Today' && !t.overdue);
      case 'overdue':
        return list.filter((t) => !t.completed && t.overdue);
      case 'completed':
        return list.filter((t) => t.completed);
      default:
        return list.filter((t) => !t.completed);
    }
  }, [tasksWithCompletion, filter, search]);

  const searchLower = search.trim().toLowerCase();
  const matchesSearch = (t: Task) => !searchLower || t.title.toLowerCase().includes(searchLower) || (t.relatedCamp && t.relatedCamp.toLowerCase().includes(searchLower));
  const dueToday = tasksWithCompletion.filter((t) => !t.completed && t.dueDate === 'Today' && !t.overdue && matchesSearch(t));
  const overdue = tasksWithCompletion.filter((t) => !t.completed && t.overdue && matchesSearch(t));
  const completed = tasksWithCompletion.filter((t) => t.completed && matchesSearch(t));

  const toggleComplete = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderTaskCard = (t: Task, showCheckbox = true) => (
    <TouchableOpacity
      key={t.id}
      style={[styles.card, t.overdue && styles.cardOverdue, t.completed && styles.cardCompleted]}
      onPress={() => nav.navigate('TaskDetail', { taskId: t.id })}
      activeOpacity={0.8}
    >
      <View style={styles.cardRow}>
        {showCheckbox && (
          <TouchableOpacity
            style={styles.checkbox}
            onPress={(e) => { e.stopPropagation(); toggleComplete(t.id); }}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            {t.completed ? <Ionicons name="checkbox" size={24} color="#C41E3A" /> : <Ionicons name="square-outline" size={24} color="#666" />}
          </TouchableOpacity>
        )}
        <View style={styles.cardBody}>
          <View style={styles.cardTitleRow}>
            <Ionicons name={TYPE_ICON[t.type] as any} size={18} color="#888" style={styles.cardIcon} />
            <Text style={[styles.cardTitle, t.completed && styles.cardTitleCompleted]} numberOfLines={2}>{t.title}</Text>
          </View>
          <View style={styles.cardMeta}>
            <Text style={[styles.due, t.overdue && styles.dueOverdue]}>{t.dueDate}</Text>
            <View style={[styles.priorityBadge, { backgroundColor: PRIORITY_COLOR[t.priority] + '22', marginLeft: 8 }]}>
              <Text style={[styles.priorityText, { color: PRIORITY_COLOR[t.priority] }]}>{t.priority}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const emptyMessage = filter === 'completed' ? 'No completed tasks yet.' : filter === 'due_today' ? 'No tasks due today.' : filter === 'overdue' ? 'No overdue tasks.' : 'No pending tasks.';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Tasks</Text>
      <Text style={styles.subtitle}>Pending steps • Due today • Overdue</Text>

      <TextInput
        style={styles.search}
        placeholder="Search tasks..."
        placeholderTextColor="#666"
        value={search}
        onChangeText={setSearch}
      />

      <View style={styles.filterRow}>
        {(['all', 'due_today', 'overdue', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>{f === 'all' ? 'All' : f === 'due_today' ? 'Due today' : f === 'overdue' ? 'Overdue' : 'Completed'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filter === 'all' && (
        <>
          <Text style={styles.section}>Due today</Text>
          {dueToday.length === 0 ? <Text style={styles.emptyText}>No tasks due today.</Text> : dueToday.map((t) => renderTaskCard(t))}

          <Text style={styles.section}>Overdue</Text>
          {overdue.length === 0 ? <Text style={styles.emptyText}>No overdue tasks.</Text> : overdue.map((t) => renderTaskCard(t))}

          {completed.length > 0 && (
            <>
              <Text style={styles.section}>Completed</Text>
              {completed.map((t) => renderTaskCard(t))}
            </>
          )}
        </>
      )}

      {filter !== 'all' && (
        <>
          {filtered.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>{emptyMessage}</Text>
            </View>
          ) : (
            filtered.map((t) => renderTaskCard(t))
          )}
        </>
      )}

      <TouchableOpacity style={styles.addBtn} onPress={() => nav.navigate('CreateTask')} activeOpacity={0.8}>
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addBtnText}>Add task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 48 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 16 },
  search: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 15,
    marginBottom: 16,
  },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16, marginHorizontal: -4 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: '#1a1a1a', margin: 4 },
  filterChipActive: { backgroundColor: '#C41E3A' },
  filterChipText: { color: '#888', fontSize: 13 },
  filterChipTextActive: { color: '#fff', fontWeight: '600' },
  section: { fontSize: 14, color: '#C41E3A', marginTop: 16, marginBottom: 8, fontWeight: '600' },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  cardOverdue: { borderLeftWidth: 4, borderLeftColor: '#C41E3A' },
  cardCompleted: { opacity: 0.75 },
  cardRow: { flexDirection: 'row', alignItems: 'flex-start' },
  checkbox: { marginRight: 12, marginTop: 2 },
  cardBody: { flex: 1 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center' },
  cardIcon: { marginRight: 8 },
  cardTitle: { color: '#fff', fontSize: 16, flex: 1 },
  cardTitleCompleted: { textDecorationLine: 'line-through', color: '#888' },
  cardMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  due: { color: '#888', fontSize: 12 },
  dueOverdue: { color: '#C41E3A' },
  priorityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  priorityText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  emptyText: { color: '#666', fontSize: 14, marginBottom: 8 },
  emptyState: { padding: 32, alignItems: 'center' },
  emptyStateText: { color: '#888', fontSize: 15 },
  addBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#C41E3A', borderRadius: 14, padding: 16, marginTop: 24, gap: 8 },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
