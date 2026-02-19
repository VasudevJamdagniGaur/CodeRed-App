import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

import AdminDashboard from '../screens/dashboards/AdminDashboard';
import ManagerDashboard from '../screens/dashboards/ManagerDashboard';
import HRDashboard from '../screens/dashboards/HRDashboard';
import OutreachDashboard from '../screens/dashboards/OutreachDashboard';
import VolunteerDashboard from '../screens/dashboards/VolunteerDashboard';
import TaskListScreen from '../screens/tasks/TaskListScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const { user } = useAuth();
  const role = (user?.role || 'volunteer') as UserRole;

  const DashboardComponent = {
    admin: AdminDashboard,
    camp_manager: ManagerDashboard,
    hr: HRDashboard,
    outreach: OutreachDashboard,
    volunteer: VolunteerDashboard,
  }[role];

  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0a0a0a' },
        headerTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#222' },
        tabBarActiveTintColor: '#C41E3A',
        tabBarInactiveTintColor: '#666',
        lazy: true,
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardComponent}
        options={{ tabBarLabel: 'Dashboard', title: 'Dashboard' }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{ tabBarLabel: 'Tasks', title: 'Tasks' }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: 'Notifications', title: 'Notifications' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile', title: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
