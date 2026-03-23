import { useState, useEffect } from 'react';
import type { Reminder } from '@/types';

export function useReminders() {
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('calendar_reminders');
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (date: string, text: string) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      date,
      text,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => [...prev, newReminder]);
  };

  const updateReminder = (id: string, text: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, text } : r
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  const getReminderForDate = (date: string) => {
    return reminders.find(r => r.date === date);
  };

  return {
    reminders,
    addReminder,
    updateReminder,
    deleteReminder,
    getReminderForDate
  };
}
