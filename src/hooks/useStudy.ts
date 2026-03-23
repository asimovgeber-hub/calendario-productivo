import { useState, useEffect, useCallback } from 'react';
import type { StudySubject, Hierarchy, DayStudy } from '@/types';

export function useStudy() {
  const [subjects, setSubjects] = useState<StudySubject[]>(() => {
    const saved = localStorage.getItem('calendar_study_subjects');
    return saved ? JSON.parse(saved) : [];
  });

  const [studySchedule, setStudySchedule] = useState<DayStudy[]>(() => {
    const saved = localStorage.getItem('calendar_study_schedule');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('calendar_study_subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('calendar_study_schedule', JSON.stringify(studySchedule));
  }, [studySchedule]);

  const addSubject = useCallback((nombre: string, jerarquia: Hierarchy) => {
    // Verificar límites de jerarquía
    const count = subjects.filter(s => s.jerarquia === jerarquia).length;
    const maxCount = jerarquia === '♠' ? 2 : jerarquia === '♣' ? 2 : 3;
    
    if (count >= maxCount) {
      return { success: false, error: `Solo puedes tener ${maxCount} materias con ${jerarquia}` };
    }

    const newSubject: StudySubject = {
      id: crypto.randomUUID(),
      nombre,
      jerarquia
    };
    setSubjects(prev => [...prev, newSubject]);
    return { success: true };
  }, [subjects]);

  const updateSubject = useCallback((id: string, updates: Partial<StudySubject>) => {
    if (updates.jerarquia) {
      const count = subjects.filter(s => s.jerarquia === updates.jerarquia && s.id !== id).length;
      const maxCount = updates.jerarquia === '♠' ? 2 : updates.jerarquia === '♣' ? 2 : 3;
      
      if (count >= maxCount) {
        return { success: false, error: `Solo puedes tener ${maxCount} materias con ${updates.jerarquia}` };
      }
    }
    
    setSubjects(prev => prev.map(subject => 
      subject.id === id ? { ...subject, ...updates } : subject
    ));
    return { success: true };
  }, [subjects]);

  const deleteSubject = useCallback((id: string) => {
    setSubjects(prev => prev.filter(subject => subject.id !== id));
  }, []);

  // Calcular distribución de horas según jerarquía
  const calculateStudyDistribution = useCallback(() => {
    const spades = subjects.filter(s => s.jerarquia === '♠');
    const clubs = subjects.filter(s => s.jerarquia === '♣');
    const hearts = subjects.filter(s => s.jerarquia === '♥');

    // Horas totales disponibles por semana
    const totalHours = {
      diario: 3 * 7, // 3 horas x 7 días
      martes: 3,
      viernes: 6,
      sabado: 6
    };
    const weeklyTotal = totalHours.diario + totalHours.martes + totalHours.viernes + totalHours.sabado;

    return { spades, clubs, hearts, weeklyTotal };
  }, [subjects]);

  // Generar horario de estudio para un mes específico
  const generateSchedule = useCallback((year: number, month: number) => {
    const { spades, clubs, hearts } = calculateStudyDistribution();
    const schedule: DayStudy[] = [];
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay(); // 0 = domingo, 1 = lunes, ..., 6 = sábado
      const dayName = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'][dayOfWeek];
      
      const sessions: { subjectId: string; horario: string; duracion: number }[] = [];
      
      // ♠ Materias importantes - todos los días 7-10 AM
      spades.forEach(subject => {
        sessions.push({
          subjectId: subject.id,
          horario: '07:00 - 10:00',
          duracion: 3
        });
      });
      
      // ♣ Materias medias - casi día de por medio
      if (clubs.length > 0 && day % 2 === 0) {
        clubs.forEach((subject, index) => {
          if (dayName === 'martes' && index === 0) {
            sessions.push({ subjectId: subject.id, horario: '11:00 - 14:00', duracion: 3 });
          } else if (dayName === 'viernes' && index === 1) {
            sessions.push({ subjectId: subject.id, horario: '11:00 - 14:00', duracion: 3 });
          } else if (dayName === 'sabado' && index === 0) {
            sessions.push({ subjectId: subject.id, horario: '11:00 - 14:00', duracion: 3 });
          }
        });
      }
      
      // ♥ Materias bajas - una vez por semana
      if (hearts.length > 0) {
        hearts.forEach((subject, index) => {
          const targetDay = (index * 2 + 1) % 7; // Distribuir en diferentes días
          if (dayOfWeek === targetDay) {
            if (dayName === 'viernes') {
              sessions.push({ subjectId: subject.id, horario: '16:00 - 19:00', duracion: 3 });
            } else if (dayName === 'sabado') {
              sessions.push({ subjectId: subject.id, horario: '16:00 - 19:00', duracion: 3 });
            }
          }
        });
      }
      
      if (sessions.length > 0) {
        schedule.push({ date: dateStr, sessions });
      }
    }
    
    setStudySchedule(schedule);
    return schedule;
  }, [calculateStudyDistribution]);

  const getStudyForDate = useCallback((date: string) => {
    return studySchedule.find(day => day.date === date);
  }, [studySchedule]);

  const getSubjectById = useCallback((id: string) => {
    return subjects.find(s => s.id === id);
  }, [subjects]);

  const getHierarchyCount = useCallback((hierarchy: Hierarchy) => {
    return subjects.filter(s => s.jerarquia === hierarchy).length;
  }, [subjects]);

  const canAddHierarchy = useCallback((hierarchy: Hierarchy) => {
    const count = subjects.filter(s => s.jerarquia === hierarchy).length;
    const maxCount = hierarchy === '♠' ? 2 : hierarchy === '♣' ? 2 : 3;
    return count < maxCount;
  }, [subjects]);

  return {
    subjects,
    studySchedule,
    addSubject,
    updateSubject,
    deleteSubject,
    generateSchedule,
    getStudyForDate,
    getSubjectById,
    calculateStudyDistribution,
    getHierarchyCount,
    canAddHierarchy
  };
}
