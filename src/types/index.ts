export type UserRole = 'admin' | 'camp_manager' | 'hr' | 'outreach' | 'volunteer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface Camp {
  id: string;
  organizationName: string;
  date: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  location: string;
  managerName: string;
  expectedVolunteers: number;
  assignedVolunteers: number;
  steps: CampStep[];
}

export type CampStepId =
  | 'lead_received'
  | 'contacted_poc'
  | 'blood_bank_booked'
  | 'volunteers_assigned'
  | 'camp_conducted'
  | 'donation_count_updated'
  | 'post_camp_followup';

export interface CampStep {
  id: CampStepId;
  label: string;
  status: 'pending' | 'done';
  timestamp?: string;
  notes?: string;
}

export interface Volunteer {
  id: string;
  name: string;
  role: string;
  participationCount: number;
  status: 'active' | 'inactive';
  lastActivity?: string;
  workload?: number;
}

export interface Lead {
  id: string;
  organizationName: string;
  type: 'school' | 'corporate';
  status: 'new' | 'contacted' | 'negotiation' | 'successful' | 'cancelled';
  lastContactDate: string;
  pocName?: string;
  pocPhone?: string;
}

export interface Helpline {
  id: string;
  patientName: string;
  bloodGroup: string;
  units: number;
  component: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  hospital: string;
  city: string;
  requiredTill: string;
  status: 'live' | 'assigned' | 'closed';
  assignedTo?: string;
}

export interface Reimbursement {
  id: string;
  campId: string;
  status: 'pending' | 'approved' | 'rejected';
  amount?: number;
  receiptUri?: string;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  dueDate: string;
  type: string;
  relatedId?: string;
  overdue: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}
