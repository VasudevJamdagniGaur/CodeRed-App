import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AssignedHelplineScreen() {
  const nav = useNavigation<any>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Assigned helpline</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Patient</Text>
        <Text style={styles.value}>John Doe</Text>
        <Text style={styles.label}>Blood group</Text>
        <Text style={styles.value}>B+</Text>
        <Text style={styles.label}>Hospital & city</Text>
        <Text style={styles.value}>Apollo, Delhi</Text>
        <Text style={styles.label}>Units / Urgency</Text>
        <Text style={styles.value}>2 units • High</Text>
      </View>
      <Text style={styles.section}>Filtered donor list</Text>
      <View style={styles.placeholder}><Text style={styles.placeholderText}>Donor list placeholder</Text></View>
      <TouchableOpacity style={styles.btn} onPress={() => nav.navigate('CallScreen', { helplineId: '1' })}>
        <Text style={styles.btnText}>Call</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 16 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 16 },
  label: { color: '#888', fontSize: 12, marginTop: 8 },
  value: { color: '#fff', fontSize: 16 },
  section: { color: '#fff', fontSize: 16, marginBottom: 8 },
  placeholder: { height: 100, backgroundColor: '#1a1a1a', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  placeholderText: { color: '#666' },
  btn: { backgroundColor: '#C41E3A', borderRadius: 12, padding: 16, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '600' },
});
