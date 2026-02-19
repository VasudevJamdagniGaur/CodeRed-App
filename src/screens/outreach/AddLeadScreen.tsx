import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddLeadScreen() {
  const nav = useNavigation<any>();
  const [org, setOrg] = useState('');
  const [poc, setPoc] = useState('');
  const [phone, setPhone] = useState('');
  const [purpose, setPurpose] = useState('');
  const [type, setType] = useState<'school' | 'corporate'>('corporate');
  const [notes, setNotes] = useState('');

  const handleAdd = () => nav.goBack();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Organization name</Text>
      <TextInput style={styles.input} value={org} onChangeText={setOrg} placeholder="Org name" placeholderTextColor="#666" />
      <Text style={styles.label}>POC name</Text>
      <TextInput style={styles.input} value={poc} onChangeText={setPoc} placeholder="Point of contact" placeholderTextColor="#666" />
      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" placeholderTextColor="#666" />
      <Text style={styles.label}>Purpose / Type</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.typeBtn, type === 'school' && styles.typeBtnActive]} onPress={() => setType('school')}>
          <Text style={[styles.typeText, type === 'school' && styles.typeTextActive]}>School</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type === 'corporate' && styles.typeBtnActive]} onPress={() => setType('corporate')}>
          <Text style={[styles.typeText, type === 'corporate' && styles.typeTextActive]}>Corporate</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.label}>Purpose</Text>
      <TextInput style={styles.input} value={purpose} onChangeText={setPurpose} placeholder="Purpose" placeholderTextColor="#666" />
      <Text style={styles.label}>Notes</Text>
      <TextInput style={[styles.input, styles.textArea]} value={notes} onChangeText={setNotes} placeholder="Notes" placeholderTextColor="#666" multiline={true} />
      <TouchableOpacity style={styles.btn} onPress={handleAdd}>
        <Text style={styles.btnText}>Add Lead</Text>
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
  row: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  typeBtn: { flex: 1, padding: 12, borderRadius: 8, backgroundColor: '#1a1a1a', alignItems: 'center' },
  typeBtnActive: { backgroundColor: '#C41E3A' },
  typeText: { color: '#888' },
  typeTextActive: { color: '#fff' },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
