import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function SplashScreen() {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    // Auth check is done in AuthContext; we just show loading until ready
  }, []);

  if (!isLoading) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BloodConnect</Text>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Appathon • TRYST'26</Text>
      </View>
      <ActivityIndicator size="large" color="#C41E3A" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 1,
  },
  badge: {
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#C41E3A',
    borderRadius: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  loader: {
    marginTop: 48,
  },
});
