import { useState, useCallback } from 'react';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getDaysInMonth = useCallback((y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const goToToday = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const selectDate = useCallback((day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    return dateStr;
  }, [year, month]);

  const formatDate = useCallback((dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return {
      full: date.toLocaleDateString('es-ES', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      short: date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short' 
      }),
      dayOfWeek: date.getDay(),
      dayName: date.toLocaleDateString('es-ES', { weekday: 'long' })
    };
  }, []);

  const isToday = useCallback((day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  }, [month, year]);

  const generateCalendarDays = useCallback(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Días vacíos antes del primer día
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [year, month, getDaysInMonth, getFirstDayOfMonth]);

  return {
    currentDate,
    year,
    month,
    monthName: monthNames[month],
    dayNames,
    selectedDate,
    setSelectedDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    formatDate,
    isToday,
    generateCalendarDays,
    getDaysInMonth,
    getFirstDayOfMonth
  };
}
