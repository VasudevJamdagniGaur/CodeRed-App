import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PostCampFollowupScreen() {
  const nav = useNavigation<any>();
  const [ackSent, setAckSent] = useState(false);
  const [dbUpdated, setDbUpdated] = useState(false);
  const [notes, setNotes] = useState('');

  const handleClose = () => nav.goBack();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Post-camp follow-up</Text>
      <Text style={styles.subtitle}>Closure checklist</Text>

      <TouchableOpacity style={styles.checkRow} onPress={() => setAckSent(!ackSent)}>
        <View style={[styles.checkbox, ackSent && styles.checkboxDone]} />
        <Text style={styles.checkLabel}>Acknowledgement letter sent</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkRow} onPress={() => setDbUpdated(!dbUpdated)}>
        <View style={[styles.checkbox, dbUpdated && styles.checkboxDone]} />
        <Text style={styles.checkLabel}>Donor database updated</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Optional notes"
        placeholderTextColor="#666"
        multiline={true}
      />

      <TouchableOpacity style={styles.btn} onPress={handleClose}>
        <Text style={styles.btnText}>Mark complete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 20, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 12, color: '#888', marginBottom: 20 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: '#333', marginRight: 12 },
  checkboxDone: { backgroundColor: '#C41E3A', borderColor: '#C41E3A' },
  checkLabel: { color: '#fff', fontSize: 16 },
  label: { color: '#888', fontSize: 12, marginTop: 16, marginBottom: 6 },
  input: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, color: '#fff', marginBottom: 16 },
  textArea: { minHeight: 80 },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
