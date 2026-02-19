import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { DASHBOARD_ROUTES } from '../constants/roles';
import { UserRole } from '../types';

type Props = {
  onRoleResolved: (route: string) => void;
};

export default function RoleRouter({ onRoleResolved }: Props) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const route = DASHBOARD_ROUTES[user.role as UserRole];
    if (route) onRoleResolved(route);
  }, [user, onRoleResolved]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#C41E3A" />
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
});
