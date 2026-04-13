import { 
  collection, 
  doc, 
  setDoc, 
  getDoc,
  getDocs,
  query, 
  where, 
  updateDoc,
  deleteDoc,
  Timestamp,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from './firebase';
import { DailyTimetable, WeeklyTimetable, MonthlyTimetable, UserProfile, SharedTimetable } from './types';

// User Profile Operations
export async function createUserProfile(userId: string, email: string, displayName: string) {
  try {
    const userProfile: UserProfile = {
      id: userId,
      email,
      displayName,
      role: 'user',
      status: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await setDoc(doc(db, 'users', userId), userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    return docSnap.exists() ? (docSnap.data() as UserProfile) : null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
}

// Daily Timetable Operations
export async function createDailyTimetable(userId: string, date: string): Promise<DailyTimetable> {
  try {
    const id = `daily_${userId}_${date}`;
    const timetable: DailyTimetable = {
      id,
      userId,
      date,
      slots: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await setDoc(doc(db, 'daily_timetables', id), timetable);
    return timetable;
  } catch (error) {
    console.error('Error creating daily timetable:', error);
    throw error;
  }
}

export async function getDailyTimetable(userId: string, date: string): Promise<DailyTimetable | null> {
  try {
    const id = `daily_${userId}_${date}`;
    const docSnap = await getDoc(doc(db, 'daily_timetables', id));
    return docSnap.exists() ? (docSnap.data() as DailyTimetable) : null;
  } catch (error) {
    console.error('Error getting daily timetable:', error);
    throw error;
  }
}

export async function updateDailyTimetable(timetable: DailyTimetable): Promise<void> {
  try {
    const updateData = {
      ...timetable,
      updatedAt: Date.now(),
    };
    await updateDoc(doc(db, 'daily_timetables', timetable.id), updateData);
  } catch (error) {
    console.error('Error updating daily timetable:', error);
    throw error;
  }
}

export function subscribeToDailyTimetable(
  userId: string,
  date: string,
  callback: (timetable: DailyTimetable | null) => void
) {
  const id = `daily_${userId}_${date}`;
  return onSnapshot(doc(db, 'daily_timetables', id), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as DailyTimetable);
    } else {
      callback(null);
    }
  });
}

// Weekly Timetable Operations
export async function createWeeklyTimetable(userId: string, weekStart: string, name: string): Promise<WeeklyTimetable> {
  try {
    const id = `weekly_${userId}_${weekStart}`;
    const timetable: WeeklyTimetable = {
      id,
      userId,
      weekStart,
      name,
      slots: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await setDoc(doc(db, 'weekly_timetables', id), timetable);
    return timetable;
  } catch (error) {
    console.error('Error creating weekly timetable:', error);
    throw error;
  }
}

export async function getWeeklyTimetable(userId: string, weekStart: string): Promise<WeeklyTimetable | null> {
  try {
    const id = `weekly_${userId}_${weekStart}`;
    const docSnap = await getDoc(doc(db, 'weekly_timetables', id));
    return docSnap.exists() ? (docSnap.data() as WeeklyTimetable) : null;
  } catch (error) {
    console.error('Error getting weekly timetable:', error);
    throw error;
  }
}

export async function updateWeeklyTimetable(timetable: WeeklyTimetable): Promise<void> {
  try {
    const updateData = {
      ...timetable,
      updatedAt: Date.now(),
    };
    await updateDoc(doc(db, 'weekly_timetables', timetable.id), updateData);
  } catch (error) {
    console.error('Error updating weekly timetable:', error);
    throw error;
  }
}

export function subscribeToWeeklyTimetable(
  userId: string,
  weekStart: string,
  callback: (timetable: WeeklyTimetable | null) => void
) {
  const id = `weekly_${userId}_${weekStart}`;
  return onSnapshot(doc(db, 'weekly_timetables', id), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as WeeklyTimetable);
    } else {
      callback(null);
    }
  });
}

// Monthly Timetable Operations
export async function createMonthlyTimetable(userId: string, month: string, name: string): Promise<MonthlyTimetable> {
  try {
    const id = `monthly_${userId}_${month}`;
    const timetable: MonthlyTimetable = {
      id,
      userId,
      month,
      name,
      events: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await setDoc(doc(db, 'monthly_timetables', id), timetable);
    return timetable;
  } catch (error) {
    console.error('Error creating monthly timetable:', error);
    throw error;
  }
}

export async function getMonthlyTimetable(userId: string, month: string): Promise<MonthlyTimetable | null> {
  try {
    const id = `monthly_${userId}_${month}`;
    const docSnap = await getDoc(doc(db, 'monthly_timetables', id));
    return docSnap.exists() ? (docSnap.data() as MonthlyTimetable) : null;
  } catch (error) {
    console.error('Error getting monthly timetable:', error);
    throw error;
  }
}

export async function updateMonthlyTimetable(timetable: MonthlyTimetable): Promise<void> {
  try {
    const updateData = {
      ...timetable,
      updatedAt: Date.now(),
    };
    await updateDoc(doc(db, 'monthly_timetables', timetable.id), updateData);
  } catch (error) {
    console.error('Error updating monthly timetable:', error);
    throw error;
  }
}

export function subscribeToMonthlyTimetable(
  userId: string,
  month: string,
  callback: (timetable: MonthlyTimetable | null) => void
) {
  const id = `monthly_${userId}_${month}`;
  return onSnapshot(doc(db, 'monthly_timetables', id), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as MonthlyTimetable);
    } else {
      callback(null);
    }
  });
}

// Shared Timetable Operations
export async function shareTimetable(
  timetableId: string,
  timetableType: 'daily' | 'weekly' | 'monthly',
  ownerId: string,
  email: string
): Promise<SharedTimetable> {
  try {
    const id = `share_${timetableId}_${email}`;
    const sharedTimetable: SharedTimetable = {
      id,
      timetableId,
      timetableType,
      ownerId,
      sharedWith: [
        {
          userId: email,
          email,
          role: 'editor',
          addedAt: Date.now(),
        },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    await setDoc(doc(db, 'shared_timetables', id), sharedTimetable);
    return sharedTimetable;
  } catch (error) {
    console.error('Error sharing timetable:', error);
    throw error;
  }
}

export async function getSharedTimetables(userId: string): Promise<SharedTimetable[]> {
  try {
    const q = query(collection(db, 'shared_timetables'), where('ownerId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data() as SharedTimetable);
  } catch (error) {
    console.error('Error getting shared timetables:', error);
    throw error;
  }
}
