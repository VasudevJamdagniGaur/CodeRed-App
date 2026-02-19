import { UserRole } from '../types';

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  camp_manager: 'Camp Manager',
  hr: 'HR',
  outreach: 'Outreach',
  volunteer: 'Volunteer',
};

export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  admin: 'AdminDashboard',
  camp_manager: 'ManagerDashboard',
  hr: 'HRDashboard',
  outreach: 'OutreachDashboard',
  volunteer: 'VolunteerDashboard',
};

export const TABS_BY_ROLE: Record<UserRole, string[]> = {
  admin: ['Dashboard', 'Tasks', 'Notifications', 'Profile'],
  camp_manager: ['Dashboard', 'Tasks', 'Notifications', 'Profile'],
  hr: ['Dashboard', 'Tasks', 'Notifications', 'Profile'],
  outreach: ['Dashboard', 'Tasks', 'Notifications', 'Profile'],
  volunteer: ['Dashboard', 'Tasks', 'Notifications', 'Profile'],
};
