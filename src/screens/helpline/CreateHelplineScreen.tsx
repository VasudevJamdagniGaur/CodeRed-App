import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateHelplineScreen() {
  const nav = useNavigation<any>();
  const [patientName, setPatientName] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [units, setUnits] = useState('');
  const [component, setComponent] = useState('');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high' | 'critical'>('high');
  const [hospital, setHospital] = useState('');
  const [city, setCity] = useState('');
  const [requiredTill, setRequiredTill] = useState('');

  const handleMakeLive = () => nav.navigate('LiveHelplinePool');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Patient name</Text>
      <TextInput style={styles.input} value={patientName} onChangeText={setPatientName} placeholder="Name" placeholderTextColor="#666" />
      <Text style={styles.label}>Blood group</Text>
      <TextInput style={styles.input} value={bloodGroup} onChangeText={setBloodGroup} placeholder="e.g. B+" placeholderTextColor="#666" />
      <Text style={styles.label}>Units</Text>
      <TextInput style={styles.input} value={units} onChangeText={setUnits} placeholder="Units" keyboardType="number-pad" placeholderTextColor="#666" />
      <Text style={styles.label}>Component</Text>
      <TextInput style={styles.input} value={component} onChangeText={setComponent} placeholder="Component" placeholderTextColor="#666" />
      <Text style={styles.label}>Urgency</Text>
      <View style={styles.row}>
        {(['low', 'medium', 'high', 'critical'] as const).map((u) => (
          <TouchableOpacity
            key={u}
            style={[styles.urgencyBtn, urgency === u && styles.urgencyBtnActive]}
            onPress={() => setUrgency(u)}
          >
            <Text style={[styles.urgencyText, urgency === u && styles.urgencyTextActive]}>{u}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Hospital</Text>
      <TextInput style={styles.input} value={hospital} onChangeText={setHospital} placeholder="Hospital" placeholderTextColor="#666" />
      <Text style={styles.label}>City</Text>
      <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="City" placeholderTextColor="#666" />
      <Text style={styles.label}>Required till date</Text>
      <TextInput style={styles.input} value={requiredTill} onChangeText={setRequiredTill} placeholder="YYYY-MM-DD" placeholderTextColor="#666" />
      <TouchableOpacity style={styles.btn} onPress={handleMakeLive}>
        <Text style={styles.btnText}>Make Helpline Live</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  input: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, color: '#fff', marginBottom: 16 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  urgencyBtn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#1a1a1a' },
  urgencyBtnActive: { backgroundColor: '#C41E3A' },
  urgencyText: { color: '#888', fontSize: 12 },
  urgencyTextActive: { color: '#fff' },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
