'use client';

import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import {
  UserProfile,
  Announcement,
  ContentPage,
  ContactSubmission,
  SupportTicket,
  AdminStats,
} from './types';

// User Management
export const getAllUsers = async (): Promise<UserProfile[]> => {
  const q = query(
    collection(db, 'users'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile));
};

export const getUserById = async (userId: string): Promise<UserProfile | null> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as UserProfile) : null;
};

export const updateUserStatus = async (
  userId: string,
  status: 'active' | 'banned' | 'suspended'
): Promise<void> => {
  await updateDoc(doc(db, 'users', userId), {
    status,
    updatedAt: Timestamp.now().toMillis(),
  });
};

export const searchUsers = async (searchTerm: string): Promise<UserProfile[]> => {
  const q = query(
    collection(db, 'users'),
    where('email', '>=', searchTerm),
    where('email', '<=', searchTerm + '\uf8ff'),
    limit(50)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserProfile));
};

// Announcement Management
export const createAnnouncement = async (
  announcement: Omit<Announcement, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  const docRef = doc(collection(db, 'announcements'));
  await setDoc(docRef, {
    ...announcement,
    createdAt: Timestamp.now().toMillis(),
    updatedAt: Timestamp.now().toMillis(),
  });
  return docRef.id;
};

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const q = query(
    collection(db, 'announcements'),
    where('visible', '==', true),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
};

export const getAllAnnouncements = async (): Promise<Announcement[]> => {
  const q = query(
    collection(db, 'announcements'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
};

export const updateAnnouncement = async (
  id: string,
  updates: Partial<Announcement>
): Promise<void> => {
  await updateDoc(doc(db, 'announcements', id), {
    ...updates,
    updatedAt: Timestamp.now().toMillis(),
  });
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'announcements', id));
};

// Content Page Management
export const getContentPage = async (slug: string): Promise<ContentPage | null> => {
  const q = query(
    collection(db, 'contentPages'),
    where('slug', '==', slug)
  );
  const snapshot = await getDocs(q);
  return snapshot.empty
    ? null
    : ({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as ContentPage);
};

export const getAllContentPages = async (): Promise<ContentPage[]> => {
  const snapshot = await getDocs(collection(db, 'contentPages'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContentPage));
};

export const updateContentPage = async (
  slug: string,
  updates: Partial<ContentPage>
): Promise<void> => {
  const q = query(
    collection(db, 'contentPages'),
    where('slug', '==', slug)
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    await updateDoc(doc(db, 'contentPages', snapshot.docs[0].id), {
      ...updates,
      updatedAt: Timestamp.now().toMillis(),
    });
  }
};

// Contact Submissions
export const createContactSubmission = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<string> => {
  const docRef = doc(collection(db, 'contactSubmissions'));
  await setDoc(docRef, {
    name,
    email,
    subject,
    message,
    status: 'new',
    createdAt: Timestamp.now().toMillis(),
    updatedAt: Timestamp.now().toMillis(),
  });
  return docRef.id;
};

export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  const q = query(
    collection(db, 'contactSubmissions'),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactSubmission));
};

export const updateContactSubmission = async (
  id: string,
  updates: Partial<ContactSubmission>
): Promise<void> => {
  await updateDoc(doc(db, 'contactSubmissions', id), {
    ...updates,
    updatedAt: Timestamp.now().toMillis(),
  });
};

// Support Tickets
export const createSupportTicket = async (
  userId: string,
  subject: string,
  description: string,
  priority: 'low' | 'medium' | 'high'
): Promise<string> => {
  const docRef = doc(collection(db, 'supportTickets'));
  await setDoc(docRef, {
    userId,
    subject,
    description,
    priority,
    status: 'open',
    responses: [],
    createdAt: Timestamp.now().toMillis(),
    updatedAt: Timestamp.now().toMillis(),
  });
  return docRef.id;
};

export const getSupportTickets = async (
  status?: 'open' | 'in-progress' | 'closed'
): Promise<SupportTicket[]> => {
  const baseQuery = status
    ? query(
        collection(db, 'supportTickets'),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      )
    : query(
        collection(db, 'supportTickets'),
        orderBy('createdAt', 'desc')
      );
  const snapshot = await getDocs(baseQuery);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SupportTicket));
};

export const updateSupportTicket = async (
  id: string,
  updates: Partial<SupportTicket>
): Promise<void> => {
  await updateDoc(doc(db, 'supportTickets', id), {
    ...updates,
    updatedAt: Timestamp.now().toMillis(),
  });
};

// Admin Stats
export const getAdminStats = async (): Promise<AdminStats> => {
  const usersSnapshot = await getDocs(collection(db, 'users'));
  const activeUsersSnapshot = await getDocs(
    query(collection(db, 'users'), where('status', '==', 'active'))
  );
  const timetablesSnapshot = await getDocs(collection(db, 'dailyTimetables'));
  const ticketsSnapshot = await getDocs(collection(db, 'supportTickets'));
  const openTicketsSnapshot = await getDocs(
    query(collection(db, 'supportTickets'), where('status', '==', 'open'))
  );
  const contactSubmissionsSnapshot = await getDocs(
    collection(db, 'contactSubmissions')
  );
  const unreadContactSubmissionsSnapshot = await getDocs(
    query(collection(db, 'contactSubmissions'), where('status', '==', 'new'))
  );

  return {
    totalUsers: usersSnapshot.size,
    activeUsers: activeUsersSnapshot.size,
    totalTimetables: timetablesSnapshot.size,
    totalTickets: ticketsSnapshot.size,
    openTickets: openTicketsSnapshot.size,
    contactSubmissions: contactSubmissionsSnapshot.size,
    unreadContactSubmissions: unreadContactSubmissionsSnapshot.size,
  };
};
