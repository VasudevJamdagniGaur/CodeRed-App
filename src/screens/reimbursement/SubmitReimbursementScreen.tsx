import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SubmitReimbursementScreen() {
  const nav = useNavigation<any>();
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit reimbursement</Text>
      <Text style={styles.label}>Upload receipt (placeholder)</Text>
      <TouchableOpacity style={styles.uploadPlaceholder}>
        <Text style={styles.uploadText}>+ Upload</Text>
      </TouchableOpacity>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Amount"
        keyboardType="decimal-pad"
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
      <TouchableOpacity style={styles.btn} onPress={() => nav.goBack()}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 20 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  uploadPlaceholder: { height: 80, backgroundColor: '#1a1a1a', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  uploadText: { color: '#666' },
  input: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, color: '#fff', marginBottom: 16 },
  textArea: { minHeight: 80 },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
