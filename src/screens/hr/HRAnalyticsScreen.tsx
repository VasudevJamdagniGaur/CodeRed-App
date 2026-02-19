import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function HRAnalyticsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>HR Analytics</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Activities per volunteer</Text>
        <View style={styles.barPlaceholder}><Text style={styles.placeholderText}>Chart placeholder</Text></View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Camps per manager</Text>
        <View style={styles.barPlaceholder}><Text style={styles.placeholderText}>Chart placeholder</Text></View>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly participation trend</Text>
        <View style={styles.barPlaceholder}><Text style={styles.placeholderText}>Chart placeholder</Text></View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0a' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 20 },
  card: { backgroundColor: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 16 },
  cardTitle: { color: '#fff', fontSize: 16, marginBottom: 12 },
  barPlaceholder: { height: 120, backgroundColor: '#222', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  placeholderText: { color: '#666', fontSize: 12 },
});
