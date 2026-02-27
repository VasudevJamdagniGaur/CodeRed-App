import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateTaskScreen() {
  const nav = useNavigation<any>();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    nav.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Task title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Contact POC - IIT camp" placeholderTextColor="#666" />
      <Text style={styles.label}>Due date</Text>
      <TextInput style={styles.input} value={dueDate} onChangeText={setDueDate} placeholder="e.g. Today / 2025-02-25" placeholderTextColor="#666" />
      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {(['high', 'medium', 'low'] as const).map((p) => (
          <TouchableOpacity key={p} style={[styles.priorityBtn, priority === p && styles.priorityBtnActive]} onPress={() => setPriority(p)}>
            <Text style={[styles.priorityBtnText, priority === p && styles.priorityBtnTextActive]}>{p}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Description (optional)</Text>
      <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} placeholder="Add notes..." placeholderTextColor="#666" multiline />
      <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
        <Text style={styles.createBtnText}>Create task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 48 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  input: { backgroundColor: '#1a1a1a', borderRadius: 10, padding: 14, color: '#fff', marginBottom: 16 },
  textArea: { minHeight: 80 },
  priorityRow: { flexDirection: 'row', marginBottom: 16 },
  priorityBtn: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#1a1a1a', alignItems: 'center', marginHorizontal: 4 },
  priorityBtnActive: { backgroundColor: '#C41E3A' },
  priorityBtnText: { color: '#888', textTransform: 'capitalize' },
  priorityBtnTextActive: { color: '#fff', fontWeight: '600' },
  createBtn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  createBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
