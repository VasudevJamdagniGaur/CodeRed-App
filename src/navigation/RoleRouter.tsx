import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ROLE_LABELS } from '../constants/roles';

// Maps internal UserRole enum to conceptual dashboard names.
// The actual dashboard UI is chosen inside MainTabs based on user.role,
// but this centralizes the role->dashboard mapping.
const ROLE_TO_DASHBOARD_ROUTE: Record<UserRole, string> = {
  admin: 'AdminDashboard',
  camp_manager: 'ManagerDashboard',
  hr: 'HRDashboard',
  outreach: 'HelplineDashboard',
  volunteer: 'VolunteerDashboard',
};

export default function RoleRouter() {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      // If there is no user in auth state, force back to auth flow.
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      return;
    }

    const dashboardRoute = ROLE_TO_DASHBOARD_ROUTE[user.role as UserRole];

    // For now we always navigate into MainTabs -> Dashboard.
    // MainTabs reads user.role and renders the correct dashboard for that role.
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs', params: { screen: 'Dashboard', role: user.role, dashboardRoute } }],
    });
  }, [user, navigation]);

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C41E3A" />
        <Text style={styles.text}>Redirecting to login…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#C41E3A" />
      <Text style={styles.text}>
        Loading {ROLE_LABELS[user.role as UserRole]} dashboard…
      </Text>
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
  text: {
    marginTop: 12,
    color: '#fff',
    fontSize: 14,
  },
});

