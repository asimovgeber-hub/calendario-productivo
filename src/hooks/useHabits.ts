import { useState, useEffect, useCallback } from 'react';
import type { HabitStatus, DaySummary } from '@/types';
import { PERCENTAGE_COLORS } from '@/types';

const defaultHabits: HabitStatus = {
  sueno: false,
  estudio: false,
  anki: false,
  lectura: false,
  cuidado: false,
  guitarra: false
};

export function useHabits() {
  const [summaries, setSummaries] = useState<DaySummary[]>(() => {
    const saved = localStorage.getItem('calendar_day_summaries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('calendar_day_summaries', JSON.stringify(summaries));
  }, [summaries]);

  // Auto-marcar días pasados como negro si no se registraron
  useEffect(() => {
    const checkPastDays = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Revisar los últimos 60 días
      for (let i = 1; i <= 60; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(checkDate.getDate() - i);
        
        const dateStr = checkDate.toISOString().split('T')[0];
        const existing = summaries.find(s => s.date === dateStr);
        
        if (!existing) {
          // Si el día ya pasó y no tiene resumen, marcarlo como negro (0%)
          setSummaries(prev => [...prev, {
            date: dateStr,
            habits: defaultHabits,
            percentage: 0,
            color: '#000000'
          }]);
        }
      }
    };

    // Ejecutar al cargar y luego cada hora
    checkPastDays();
    const interval = setInterval(checkPastDays, 3600000); // Cada hora
    
    return () => clearInterval(interval);
  }, [summaries]);

  const calculatePercentage = useCallback((habits: HabitStatus) => {
    const total = Object.keys(habits).length;
    const completed = Object.values(habits).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  }, []);

  const getColorForPercentage = useCallback((percentage: number) => {
    for (const { threshold, color } of PERCENTAGE_COLORS) {
      if (percentage >= threshold) {
        return color;
      }
    }
    return '#000000';
  }, []);

  const addOrUpdateSummary = useCallback((date: string, habits: HabitStatus) => {
    const percentage = calculatePercentage(habits);
    const color = getColorForPercentage(percentage);
    
    setSummaries(prev => {
      const existing = prev.find(s => s.date === date);
      if (existing) {
        return prev.map(s => 
          s.date === date ? { ...s, habits, percentage, color } : s
        );
      }
      return [...prev, { date, habits, percentage, color }];
    });
  }, [calculatePercentage, getColorForPercentage]);

  const getSummaryForDate = useCallback((date: string) => {
    return summaries.find(s => s.date === date);
  }, [summaries]);

  const canEditSummary = useCallback((date: string) => {
    const summaryDate = new Date(date);
    summaryDate.setHours(0, 0, 0, 0);
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    // Solo se puede editar si la fecha es anterior a hoy
    return summaryDate < today;
  }, []);

  const isPastDate = useCallback((date: string) => {
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return checkDate < today;
  }, []);

  const getHabitStats = useCallback(() => {
    const totalDays = summaries.length;
    if (totalDays === 0) return null;

    const avgPercentage = Math.round(
      summaries.reduce((sum, s) => sum + s.percentage, 0) / totalDays
    );

    const habitCounts = {
      sueno: 0,
      estudio: 0,
      anki: 0,
      lectura: 0,
      cuidado: 0,
      guitarra: 0
    };

    summaries.forEach(summary => {
      Object.entries(summary.habits).forEach(([habit, completed]) => {
        if (completed) {
          habitCounts[habit as keyof HabitStatus]++;
        }
      });
    });

    return {
      totalDays,
      avgPercentage,
      habitCounts,
      bestDay: summaries.reduce((best, current) => 
        current.percentage > best.percentage ? current : best, 
        summaries[0]
      )
    };
  }, [summaries]);

  return {
    summaries,
    addOrUpdateSummary,
    getSummaryForDate,
    canEditSummary,
    isPastDate,
    getColorForPercentage,
    calculatePercentage,
    getHabitStats,
    defaultHabits
  };
}
