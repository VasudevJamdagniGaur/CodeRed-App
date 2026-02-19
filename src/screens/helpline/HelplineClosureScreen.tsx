import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HelplineClosureScreen() {
  const nav = useNavigation<any>();
  const [outcome, setOutcome] = useState('');
  const [notes, setNotes] = useState('');

  const handleClose = () => nav.goBack();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Close helpline</Text>
      <Text style={styles.label}>Outcome</Text>
      <TextInput
        style={styles.input}
        value={outcome}
        onChangeText={setOutcome}
        placeholder="e.g. Donor found, arranged"
        placeholderTextColor="#666"
      />
      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Notes"
        placeholderTextColor="#666"
        multiline={true}
      />
      <TouchableOpacity style={styles.btn} onPress={handleClose}>
        <Text style={styles.btnText}>Close helpline</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 20 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  input: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, color: '#fff', marginBottom: 16 },
  textArea: { minHeight: 80 },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
