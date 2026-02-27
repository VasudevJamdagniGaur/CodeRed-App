import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  value: string | number;
  badgeText?: string;
  tone?: 'default' | 'warning' | 'danger';
};

export function StatCard({ title, value, badgeText, tone = 'default' }: Props) {
  const badgeStyle =
    tone === 'danger'
      ? styles.badgeDanger
      : tone === 'warning'
      ? styles.badgeWarning
      : styles.badgeDefault;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Text style={styles.value}>{value}</Text>
        {badgeText ? (
          <View style={[styles.badge, badgeStyle]}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    margin: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  title: {
    color: '#888',
    fontSize: 12,
  },
  value: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    marginLeft: 8,
  },
  badgeDefault: {
    backgroundColor: '#222',
  },
  badgeWarning: {
    backgroundColor: '#f59e0b33',
  },
  badgeDanger: {
    backgroundColor: '#C41E3A33',
  },
  badgeText: {
    fontSize: 11,
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
});

