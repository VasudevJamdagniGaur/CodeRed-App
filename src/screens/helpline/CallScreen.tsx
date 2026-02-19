import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CallScreen() {
  const nav = useNavigation<any>();
  const [remark, setRemark] = useState('');

  const handleSave = () => {
    if (!remark.trim()) return;
    nav.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call log</Text>
      <Text style={styles.subtitle}>Date and time auto-logged when you save.</Text>
      <Text style={styles.label}>Remark (required)</Text>
      <TextInput
        style={styles.input}
        value={remark}
        onChangeText={setRemark}
        placeholder="Enter call remark"
        placeholderTextColor="#666"
        multiline={true}
      />
      <TouchableOpacity
        style={[styles.btn, !remark.trim() && styles.btnDisabled]}
        onPress={handleSave}
        disabled={remark.trim() === ''}
      >
        <Text style={styles.btnText}>Save and close</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 12, color: '#888', marginBottom: 20 },
  label: { color: '#888', fontSize: 12, marginBottom: 6 },
  input: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 14, color: '#fff', minHeight: 100 },
  btn: { marginTop: 24, backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#fff', fontWeight: '600' },
});
