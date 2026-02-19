import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MOCK = [
  { id: '1', bloodGroup: 'B+', city: 'Delhi', urgency: 'high', status: 'LIVE' },
  { id: '2', bloodGroup: 'O-', city: 'Noida', urgency: 'critical', status: 'LIVE' },
];

export default function LiveHelplinePoolScreen() {
  const nav = useNavigation<any>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Live helpline pool</Text>
      <Text style={styles.subtitle}>Visibility for volunteers</Text>
      {MOCK.map((h) => (
        <TouchableOpacity
          key={h.id}
          style={styles.card}
          onPress={() => nav.navigate('AssignedHelpline', { helplineId: h.id })}
        >
          <Text style={styles.bloodGroup}>{h.bloodGroup}</Text>
          <Text style={styles.meta}>{h.city} • {h.urgency}</Text>
          <View style={styles.liveBadge}><Text style={styles.liveText}>{h.status}</Text></View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#888', marginBottom: 20 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 12 },
  bloodGroup: { fontSize: 24, fontWeight: '700', color: '#C41E3A' },
  meta: { color: '#888', marginTop: 4 },
  liveBadge: { alignSelf: 'flex-start', marginTop: 8, backgroundColor: '#C41E3A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  liveText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});
