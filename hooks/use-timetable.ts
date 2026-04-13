'use client';

import { useEffect, useState, useCallback } from 'react';
import { DailyTimetable, TimeSlot, WeeklyTimetable, MonthlyTimetable } from '@/lib/types';
import {
  getDailyTimetable,
  createDailyTimetable,
  updateDailyTimetable,
  subscribeToDailyTimetable,
  getWeeklyTimetable,
  createWeeklyTimetable,
  updateWeeklyTimetable,
  subscribeToWeeklyTimetable,
  getMonthlyTimetable,
  createMonthlyTimetable,
  updateMonthlyTimetable,
  subscribeToMonthlyTimetable,
  getDailyTimetableById,
  subscribeToDailyTimetableById,
  getWeeklyTimetableById,
  subscribeToWeeklyTimetableById,
  getMonthlyTimetableById,
  subscribeToMonthlyTimetableById,
} from '@/lib/firestore-utils';

export function useDailyTimetable(userId: string | undefined, date: string) {
  const [timetable, setTimetable] = useState<DailyTimetable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const loadTimetable = async () => {
      try {
        let tt = await getDailyTimetable(userId, date);
        if (!tt) {
          tt = await createDailyTimetable(userId, date);
        }
        setTimetable(tt);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();

    // Subscribe to real-time updates
    const unsubscribe = subscribeToDailyTimetable(userId, date, (updated) => {
      if (updated) setTimetable(updated);
    });

    return unsubscribe;
  }, [userId, date]);

  const addSlot = useCallback(
    async (slot: TimeSlot) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: [...timetable.slots, slot],
      };
      setTimetable(updated);
      await updateDailyTimetable(updated);
    },
    [timetable]
  );

  const updateSlot = useCallback(
    async (slotId: string, updates: Partial<TimeSlot>) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: timetable.slots.map((slot) =>
          slot.id === slotId ? { ...slot, ...updates } : slot
        ),
      };
      setTimetable(updated);
      await updateDailyTimetable(updated);
    },
    [timetable]
  );

  const removeSlot = useCallback(
    async (slotId: string) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: timetable.slots.filter((slot) => slot.id !== slotId),
      };
      setTimetable(updated);
      await updateDailyTimetable(updated);
    },
    [timetable]
  );

  return {
    timetable,
    loading,
    error,
    addSlot,
    updateSlot,
    removeSlot,
  };
}

export function useWeeklyTimetable(userId: string | undefined, weekStart: string) {
  const [timetable, setTimetable] = useState<WeeklyTimetable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const loadTimetable = async () => {
      try {
        let tt = await getWeeklyTimetable(userId, weekStart);
        if (!tt) {
          tt = await createWeeklyTimetable(userId, weekStart, `Week of ${weekStart}`);
        }
        setTimetable(tt);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();

    const unsubscribe = subscribeToWeeklyTimetable(userId, weekStart, (updated) => {
      if (updated) setTimetable(updated);
    });

    return unsubscribe;
  }, [userId, weekStart]);

  const addSlot = useCallback(
    async (day: string, slot: TimeSlot) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: {
          ...timetable.slots,
          [day]: [...(timetable.slots[day] || []), slot],
        },
      };
      setTimetable(updated);
      await updateWeeklyTimetable(updated);
    },
    [timetable]
  );

  const updateSlot = useCallback(
    async (day: string, slotId: string, updates: Partial<TimeSlot>) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: {
          ...timetable.slots,
          [day]: (timetable.slots[day] || []).map((slot) =>
            slot.id === slotId ? { ...slot, ...updates } : slot
          ),
        },
      };
      setTimetable(updated);
      await updateWeeklyTimetable(updated);
    },
    [timetable]
  );

  const removeSlot = useCallback(
    async (day: string, slotId: string) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: {
          ...timetable.slots,
          [day]: (timetable.slots[day] || []).filter((slot) => slot.id !== slotId),
        },
      };
      setTimetable(updated);
      await updateWeeklyTimetable(updated);
    },
    [timetable]
  );

  return {
    timetable,
    loading,
    error,
    addSlot,
    updateSlot,
    removeSlot,
  };
}

export function useMonthlyTimetable(userId: string | undefined, month: string) {
  const [timetable, setTimetable] = useState<MonthlyTimetable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    setLoading(true);
    const loadTimetable = async () => {
      try {
        let tt = await getMonthlyTimetable(userId, month);
        if (!tt) {
          tt = await createMonthlyTimetable(userId, month, `Month of ${month}`);
        }
        setTimetable(tt);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();

    const unsubscribe = subscribeToMonthlyTimetable(userId, month, (updated) => {
      if (updated) setTimetable(updated);
    });

    return unsubscribe;
  }, [userId, month]);

  const addSlot = useCallback(
    async (date: string, slot: TimeSlot) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        events: {
          ...timetable.events,
          [date]: [...(timetable.events[date] || []), slot],
        },
      };
      setTimetable(updated);
      await updateMonthlyTimetable(updated);
    },
    [timetable]
  );

  const updateSlot = useCallback(
    async (date: string, slotId: string, updates: Partial<TimeSlot>) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        events: {
          ...timetable.events,
          [date]: (timetable.events[date] || []).map((slot) =>
            slot.id === slotId ? { ...slot, ...updates } : slot
          ),
        },
      };
      setTimetable(updated);
      await updateMonthlyTimetable(updated);
    },
    [timetable]
  );

  const removeSlot = useCallback(
    async (date: string, slotId: string) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        events: {
          ...timetable.events,
          [date]: (timetable.events[date] || []).filter((slot) => slot.id !== slotId),
        },
      };
      setTimetable(updated);
      await updateMonthlyTimetable(updated);
    },
    [timetable]
  );

  return {
    timetable,
    loading,
    error,
    addSlot,
    updateSlot,
    removeSlot,
  };
}

export function useSharedDailyTimetable(id: string) {
  const [timetable, setTimetable] = useState<DailyTimetable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const loadTimetable = async () => {
      try {
        const tt = await getDailyTimetableById(id);
        setTimetable(tt);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTimetable();
    const unsubscribe = subscribeToDailyTimetableById(id, (updated) => {
      if (updated) setTimetable(updated);
    });
    return unsubscribe;
  }, [id]);

  const addSlot = useCallback(
    async (slot: TimeSlot) => {
      if (!timetable) return;
      const updated = { ...timetable, slots: [...timetable.slots, slot] };
      setTimetable(updated);
      await updateDailyTimetable(updated);
    },
    [timetable]
  );
  const updateSlot = useCallback(
    async (slotId: string, updates: Partial<TimeSlot>) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: timetable.slots.map((slot) => slot.id === slotId ? { ...slot, ...updates } : slot),
      };
      setTimetable(updated);
      await updateDailyTimetable(updated);
    },
    [timetable]
  );
  const removeSlot = useCallback(
    async (slotId: string) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: timetable.slots.filter((slot) => slot.id !== slotId),
      };
      setTimetable(updated);
      await updateDailyTimetable(updated);
    },
    [timetable]
  );

  return { timetable, loading, error, addSlot, updateSlot, removeSlot };
}

export function useSharedWeeklyTimetable(id: string) {
  const [timetable, setTimetable] = useState<WeeklyTimetable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const loadTimetable = async () => {
      try {
        const tt = await getWeeklyTimetableById(id);
        setTimetable(tt);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTimetable();
    const unsubscribe = subscribeToWeeklyTimetableById(id, (updated) => {
      if (updated) setTimetable(updated);
    });
    return unsubscribe;
  }, [id]);

  const addSlot = useCallback(
    async (day: string, slot: TimeSlot) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: { ...timetable.slots, [day]: [...(timetable.slots[day] || []), slot] },
      };
      setTimetable(updated);
      await updateWeeklyTimetable(updated);
    },
    [timetable]
  );
  const updateSlot = useCallback(
    async (day: string, slotId: string, updates: Partial<TimeSlot>) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: {
          ...timetable.slots,
          [day]: (timetable.slots[day] || []).map((slot) => slot.id === slotId ? { ...slot, ...updates } : slot),
        },
      };
      setTimetable(updated);
      await updateWeeklyTimetable(updated);
    },
    [timetable]
  );
  const removeSlot = useCallback(
    async (day: string, slotId: string) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        slots: {
          ...timetable.slots,
          [day]: (timetable.slots[day] || []).filter((slot) => slot.id !== slotId),
        },
      };
      setTimetable(updated);
      await updateWeeklyTimetable(updated);
    },
    [timetable]
  );

  return { timetable, loading, error, addSlot, updateSlot, removeSlot };
}

export function useSharedMonthlyTimetable(id: string) {
  const [timetable, setTimetable] = useState<MonthlyTimetable | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const loadTimetable = async () => {
      try {
        const tt = await getMonthlyTimetableById(id);
        setTimetable(tt);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadTimetable();
    const unsubscribe = subscribeToMonthlyTimetableById(id, (updated) => {
      if (updated) setTimetable(updated);
    });
    return unsubscribe;
  }, [id]);

  const addSlot = useCallback(
    async (date: string, slot: TimeSlot) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        events: { ...timetable.events, [date]: [...(timetable.events[date] || []), slot] },
      };
      setTimetable(updated);
      await updateMonthlyTimetable(updated);
    },
    [timetable]
  );
  const updateSlot = useCallback(
    async (date: string, slotId: string, updates: Partial<TimeSlot>) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        events: {
          ...timetable.events,
          [date]: (timetable.events[date] || []).map((slot) => slot.id === slotId ? { ...slot, ...updates } : slot),
        },
      };
      setTimetable(updated);
      await updateMonthlyTimetable(updated);
    },
    [timetable]
  );
  const removeSlot = useCallback(
    async (date: string, slotId: string) => {
      if (!timetable) return;
      const updated = {
        ...timetable,
        events: {
          ...timetable.events,
          [date]: (timetable.events[date] || []).filter((slot) => slot.id !== slotId),
        },
      };
      setTimetable(updated);
      await updateMonthlyTimetable(updated);
    },
    [timetable]
  );

  return { timetable, loading, error, addSlot, updateSlot, removeSlot };
}
