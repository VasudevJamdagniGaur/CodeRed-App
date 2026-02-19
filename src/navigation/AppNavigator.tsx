import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, token, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!token || !user) {
    return (
      <NavigationContainer theme={navTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a0a' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#0a0a0a' },
        }}
      >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
