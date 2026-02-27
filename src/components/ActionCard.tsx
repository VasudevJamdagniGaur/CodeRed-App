import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export function ActionCard({ icon, label, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, disabled && styles.cardDisabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={20} color="#fff" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    marginVertical: 4,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#C41E3A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

