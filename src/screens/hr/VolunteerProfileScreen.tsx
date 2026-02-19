import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export default function VolunteerProfileScreen() {
  const [scheduleLocked, setScheduleLocked] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Volunteer profile</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal info</Text>
        <Text style={styles.text}>Name: Alice</Text>
        <Text style={styles.text}>Email: alice@example.com</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule availability</Text>
        <Text style={styles.text}>Editable: {scheduleLocked ? 'No' : 'Yes'}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setScheduleLocked(!scheduleLocked)}
        >
          <Text style={styles.btnText}>{scheduleLocked ? 'Enable editing' : 'Disable editing'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Camps participated</Text>
        <Text style={styles.text}>12 camps</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Helplines handled</Text>
        <Text style={styles.text}>8 helplines</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#C41E3A', fontSize: 14, marginBottom: 8 },
  text: { color: '#fff', fontSize: 14, marginBottom: 4 },
  btn: { marginTop: 8, padding: 12, borderRadius: 8, backgroundColor: '#333', alignSelf: 'flex-start' },
  btnText: { color: '#fff', fontSize: 14 },
});
