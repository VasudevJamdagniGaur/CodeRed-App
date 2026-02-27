import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

import AdminDashboard from '../screens/dashboards/AdminDashboard';
import ManagerDashboard from '../screens/dashboards/ManagerDashboard';
import HRDashboard from '../screens/dashboards/HRDashboard';
import OutreachDashboard from '../screens/dashboards/OutreachDashboard';
import VolunteerDashboard from '../screens/dashboards/VolunteerDashboard';
import TaskListScreen from '../screens/tasks/TaskListScreen';
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
        headerRight: ({ navigation }) => (
          <View style={styles.headerRightRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Profile')}
              style={styles.headerIconBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="person-circle-outline" size={22} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              style={styles.headerIconBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        ),
        tabBarStyle: { backgroundColor: '#0a0a0a', borderTopColor: '#222' },
        tabBarActiveTintColor: '#C41E3A',
        tabBarInactiveTintColor: '#666',
        tabBarShowLabel: false,
        lazy: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardComponent}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'grid' : 'grid-outline'} size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TaskListScreen}
        options={{
          title: 'Tasks',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'checkbox' : 'checkbox-outline'} size={size ?? 24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size ?? 24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  headerIconBtn: {
    padding: 6,
    marginLeft: 4,
  },
});
