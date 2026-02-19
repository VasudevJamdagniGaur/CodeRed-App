import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

const navTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C41E3A',
    background: '#0a0a0a',
    card: '#0a0a0a',
    text: '#ffffff',
    border: '#222',
    notification: '#C41E3A',
  },
};

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import MainTabs from './MainTabs';

import CampListScreen from '../screens/camps/CampListScreen';
import CreateCampScreen from '../screens/camps/CreateCampScreen';
import CampDetailScreen from '../screens/camps/CampDetailScreen';
import VolunteerAssignmentScreen from '../screens/camps/VolunteerAssignmentScreen';
import UpdateDonationCountScreen from '../screens/camps/UpdateDonationCountScreen';
import PostCampFollowupScreen from '../screens/camps/PostCampFollowupScreen';

import VolunteerDirectoryScreen from '../screens/hr/VolunteerDirectoryScreen';
import VolunteerProfileScreen from '../screens/hr/VolunteerProfileScreen';
import HRAnalyticsScreen from '../screens/hr/HRAnalyticsScreen';

import LeadListScreen from '../screens/outreach/LeadListScreen';
import AddLeadScreen from '../screens/outreach/AddLeadScreen';
import LeadDetailScreen from '../screens/outreach/LeadDetailScreen';

import CreateHelplineScreen from '../screens/helpline/CreateHelplineScreen';
import LiveHelplinePoolScreen from '../screens/helpline/LiveHelplinePoolScreen';
import AssignedHelplineScreen from '../screens/helpline/AssignedHelplineScreen';
import CallScreen from '../screens/helpline/CallScreen';
import HelplineClosureScreen from '../screens/helpline/HelplineClosureScreen';

import CreateReimbursementScreen from '../screens/reimbursement/CreateReimbursementScreen';
import SubmitReimbursementScreen from '../screens/reimbursement/SubmitReimbursementScreen';
import ReimbursementStatusScreen from '../screens/reimbursement/ReimbursementStatusScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';

const Stack = createNativeStackNavigator();

// Explicit primitive booleans for native stack to avoid String/Boolean cast on Android
const mainScreenOptions = {
  headerShown: false,
  gestureEnabled: true,
  fullScreenGestureEnabled: false,
  headerStyle: { backgroundColor: '#0a0a0a' },
  headerTintColor: '#fff',
  contentStyle: { backgroundColor: '#0a0a0a' },
};

export default function AppNavigator() {
  const { user, token, isLoading } = useAuth();
  const [readyToShowMain, setReadyToShowMain] = useState(false);

  useEffect(() => {
    if (token && user && !readyToShowMain) {
      const t = setTimeout(() => setReadyToShowMain(true), 100);
      return () => clearTimeout(t);
    }
    if (!token || !user) setReadyToShowMain(false);
  }, [token, user, readyToShowMain]);

  if (isLoading) {
    return <SplashScreen />;
  }

  // Auth screens without native stack to avoid String/Boolean cast crash on Android
  if (!token || !user) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0a0a' }}>
        <LoginScreen />
      </View>
    );
  }

  // Delay mounting native stack to avoid Android String/Boolean cast on first frame
  if (!readyToShowMain) {
    return (
      <View style={{ flex: 1, backgroundColor: '#0a0a0a', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={mainScreenOptions}>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />

        <Stack.Screen name="CampList" component={CampListScreen} options={{ title: 'Camps' }} />
        <Stack.Screen name="CreateCamp" component={CreateCampScreen} options={{ title: 'Create Camp' }} />
        <Stack.Screen name="CampDetail" component={CampDetailScreen} options={{ title: 'Camp Detail' }} />
        <Stack.Screen name="VolunteerAssignment" component={VolunteerAssignmentScreen} options={{ title: 'Assign Volunteers' }} />
        <Stack.Screen name="UpdateDonationCount" component={UpdateDonationCountScreen} options={{ title: 'Update Donation Count' }} />
        <Stack.Screen name="PostCampFollowup" component={PostCampFollowupScreen} options={{ title: 'Post-Camp Follow-up' }} />

        <Stack.Screen name="VolunteerDirectory" component={VolunteerDirectoryScreen} options={{ title: 'Volunteers' }} />
        <Stack.Screen name="VolunteerProfile" component={VolunteerProfileScreen} options={{ title: 'Volunteer Profile' }} />
        <Stack.Screen name="HRAnalytics" component={HRAnalyticsScreen} options={{ title: 'HR Analytics' }} />

        <Stack.Screen name="LeadList" component={LeadListScreen} options={{ title: 'Leads' }} />
        <Stack.Screen name="AddLead" component={AddLeadScreen} options={{ title: 'Add Lead' }} />
        <Stack.Screen name="LeadDetail" component={LeadDetailScreen} options={{ title: 'Lead Detail' }} />

        <Stack.Screen name="CreateHelpline" component={CreateHelplineScreen} options={{ title: 'Create Helpline' }} />
        <Stack.Screen name="LiveHelplinePool" component={LiveHelplinePoolScreen} options={{ title: 'Live Helplines' }} />
        <Stack.Screen name="AssignedHelpline" component={AssignedHelplineScreen} options={{ title: 'My Helpline' }} />
        <Stack.Screen name="CallScreen" component={CallScreen} options={{ title: 'Call' }} />
        <Stack.Screen name="HelplineClosure" component={HelplineClosureScreen} options={{ title: 'Close Helpline' }} />

        <Stack.Screen name="CreateReimbursement" component={CreateReimbursementScreen} options={{ title: 'Create Reimbursement' }} />
        <Stack.Screen name="SubmitReimbursement" component={SubmitReimbursementScreen} options={{ title: 'Submit Reimbursement' }} />
        <Stack.Screen name="ReimbursementStatus" component={ReimbursementStatusScreen} options={{ title: 'Reimbursement Status' }} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ title: 'Notifications' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
