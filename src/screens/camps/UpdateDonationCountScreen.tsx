import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UpdateDonationCountScreen() {
  const nav = useNavigation<any>();
  const [donors, setDonors] = useState('');
  const [units, setUnits] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSave = () => nav.goBack();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Donors count</Text>
      <TextInput
        style={styles.input}
        value={donors}
        onChangeText={setDonors}
        placeholder="Number of donors"
        keyboardType="number-pad"
        placeholderTextColor="#666"
      />
      <Text style={styles.label}>Units collected</Text>
      <TextInput
        style={styles.input}
        value={units}
        onChangeText={setUnits}
        placeholder="Units"
        keyboardType="number-pad"
        placeholderTextColor="#666"
      />
      <Text style={styles.label}>Remarks</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={remarks}
        onChangeText={setRemarks}
        placeholder="Optional notes"
        placeholderTextColor="#666"
        multiline={true}
      />
      <TouchableOpacity style={styles.btn} onPress={handleSave}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  input: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, color: '#fff', marginBottom: 16 },
  textArea: { minHeight: 80 },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
