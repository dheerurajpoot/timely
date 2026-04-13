export type TimeSlot = {
  id: string;
  title: string;
  description?: string;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  color: string;
  category?: string;
  completed?: boolean;
};

export type DailyTimetable = {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
  createdAt: number;
  updatedAt: number;
};

export type WeeklyTimetable = {
  id: string;
  userId: string;
  weekStart: string; // YYYY-MM-DD (Monday)
  name: string;
  slots: Record<string, TimeSlot[]>; // day of week -> slots
  createdAt: number;
  updatedAt: number;
};

export type MonthlyTimetable = {
  id: string;
  userId: string;
  month: string; // YYYY-MM
  name: string;
  events: Record<string, TimeSlot[]>; // date -> slots
  createdAt: number;
  updatedAt: number;
};

export type SharedTimetable = {
  id: string;
  timetableId: string;
  timetableType: 'daily' | 'weekly' | 'monthly';
  ownerId: string;
  targetEmail: string; // Enables simplified querying for 'Shared With Me'
  sharedWith: SharedAccess[];
  createdAt: number;
  updatedAt: number;
};

export type SharedAccess = {
  userId: string;
  email: string;
  role: 'viewer' | 'editor' | 'owner';
  addedAt: number;
};

export type UserProfile = {
  id: string;
  email: string;
  displayName: string;
  avatar?: string;
  role: 'user' | 'admin'; // Added role field
  status: 'active' | 'banned' | 'suspended';
  createdAt: number;
  updatedAt: number;
  lastLogin?: number;
};

export type ViewMode = 'daily' | 'weekly' | 'monthly' | 'agenda';

export type Presence = {
  userId: string;
  displayName: string;
  lastSeen: number;
  isActive: boolean;
};

// Admin Types
export type Announcement = {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'error';
  visible: boolean;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
  expiresAt?: number;
};

export type ContentPage = {
  id: string;
  slug: string; // about, contact, terms, privacy, disclaimer
  title: string;
  content: string;
  metaDescription?: string;
  createdBy: string;
  createdAt: number;
  updatedAt: number;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'resolved';
  response?: string;
  respondedBy?: string;
  createdAt: number;
  updatedAt: number;
};

export type SupportTicket = {
  id: string;
  userId: string;
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  responses: TicketResponse[];
  createdAt: number;
  updatedAt: number;
};

export type TicketResponse = {
  id: string;
  responderId: string;
  responderName: string;
  message: string;
  createdAt: number;
};

export type SystemSettings = {
  id: string;
  maintenanceMode: boolean;
  maintenanceMessage?: string;
  emailNotifications: boolean;
  analyticsEnabled: boolean;
  updatedBy: string;
  updatedAt: number;
};

export type AdminStats = {
  totalUsers: number;
  activeUsers: number;
  totalTimetables: number;
  totalTickets: number;
  openTickets: number;
  contactSubmissions: number;
  unreadContactSubmissions: number;
};
