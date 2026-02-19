import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CreateCampScreen() {
  const nav = useNavigation<any>();
  const [org, setOrg] = useState('');
  const [poc, setPoc] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bloodBank, setBloodBank] = useState('');
  const [date, setDate] = useState('');
  const [expectedVol, setExpectedVol] = useState('');

  const handleCreate = () => {
    nav.goBack();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Organization name</Text>
      <TextInput style={styles.input} value={org} onChangeText={setOrg} placeholder="e.g. IIT Delhi" placeholderTextColor="#666" />
      <Text style={styles.label}>POC name</Text>
      <TextInput style={styles.input} value={poc} onChangeText={setPoc} placeholder="Point of contact" placeholderTextColor="#666" />
      <Text style={styles.label}>Phone</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" keyboardType="phone-pad" placeholderTextColor="#666" />
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" placeholderTextColor="#666" />
      <Text style={styles.label}>Location</Text>
      <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Venue / City" placeholderTextColor="#666" />
      <Text style={styles.label}>Blood bank</Text>
      <TextInput style={styles.input} value={bloodBank} onChangeText={setBloodBank} placeholder="Blood bank name" placeholderTextColor="#666" />
      <Text style={styles.label}>Date</Text>
      <TextInput style={styles.input} value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor="#666" />
      <Text style={styles.label}>Expected volunteers</Text>
      <TextInput style={styles.input} value={expectedVol} onChangeText={setExpectedVol} placeholder="Number" keyboardType="number-pad" placeholderTextColor="#666" />

      <TouchableOpacity style={styles.btn} onPress={handleCreate}>
        <Text style={styles.btnText}>Create Camp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 14,
    color: '#fff',
    marginBottom: 16,
  },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center', marginTop: 16 },
  btnText: { color: '#fff', fontWeight: '600' },
});
