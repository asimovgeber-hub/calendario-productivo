// Tipos para el calendario productivo

export type TaskPriority = 'bajo' | 'medio' | 'alto';
export type TaskStatus = 'pendiente' | 'completada';

export interface Task {
  id: string;
  materia: string;
  actividad: string;
  fechaLimite: string;
  prioridad: TaskPriority;
  status: TaskStatus;
  createdAt: string;
}

export type Hierarchy = '♠' | '♣' | '♥';

export interface StudySubject {
  id: string;
  nombre: string;
  jerarquia: Hierarchy;
}

export interface StudySession {
  subjectId: string;
  horario: string;
  duracion: number;
}

export interface DayStudy {
  date: string;
  sessions: StudySession[];
}

export type HabitType = 'sueno' | 'estudio' | 'anki' | 'lectura' | 'cuidado' | 'guitarra';

export interface HabitStatus {
  sueno: boolean;
  estudio: boolean;
  anki: boolean;
  lectura: boolean;
  cuidado: boolean;
  guitarra: boolean;
}

export interface DaySummary {
  date: string;
  habits: HabitStatus;
  percentage: number;
  color: string;
}

export interface CalendarData {
  tasks: Task[];
  studySubjects: StudySubject[];
  daySummaries: DaySummary[];
  currentMonth: number;
  currentYear: number;
}

export const HABIT_ICONS: Record<HabitType, string> = {
  sueno: '🛏️',
  estudio: '📖',
  anki: '🪶',
  lectura: '📚',
  cuidado: '🧴',
  guitarra: '🎸'
};

export const HABIT_LABELS: Record<HabitType, string> = {
  sueno: 'Salud de sueño',
  estudio: 'Estudio',
  anki: 'Anki',
  lectura: 'Lectura',
  cuidado: 'Cuidado personal',
  guitarra: 'Guitarra'
};

export const PERCENTAGE_COLORS = [
  { threshold: 100, color: '#8B5CF6', label: 'Morado' }, // 100%
  { threshold: 85, color: '#3B82F6', label: 'Azul' },   // 85%
  { threshold: 67, color: '#06B6D4', label: 'Cian' },   // 67%
  { threshold: 50, color: '#22C55E', label: 'Verde' },  // 50%
  { threshold: 33, color: '#F97316', label: 'Naranja' }, // 33%
  { threshold: 17, color: '#EF4444', label: 'Rojo' },   // 17%
  { threshold: 0, color: '#000000', label: 'Negro' }    // 0%
];

// Colores para las jerarquías de estudio
export const HIERARCHY_COLORS: Record<Hierarchy, string> = {
  '♠': '#000000',  // Picas - Negro
  '♣': '#2563EB',  // Tréboles - Azul
  '♥': '#DC2626'   // Corazones - Rojo
};

// Bloques de tiempo disponibles para estudio
export const STUDY_BLOCKS = {
  diario: [{ inicio: '07:00', fin: '10:00', duracion: 3 }],
  martes: [{ inicio: '11:00', fin: '14:00', duracion: 3 }],
  viernes: [
    { inicio: '11:00', fin: '14:00', duracion: 3 },
    { inicio: '16:00', fin: '19:00', duracion: 3 }
  ],
  sabado: [
    { inicio: '11:00', fin: '14:00', duracion: 3 },
    { inicio: '16:00', fin: '19:00', duracion: 3 }
  ]
};

// Tipos para Recordatorios
export interface Reminder {
  id: string;
  date: string;
  text: string;
  createdAt: string;
}

// Tipos para Flujogramas
export interface FlowchartNode {
  id: string;
  text: string;
  x: number;
  y: number;
}

export interface FlowchartConnection {
  from: string;
  to: string;
}

export interface Flowchart {
  id: string;
  date: string;
  nodes: FlowchartNode[];
  connections: FlowchartConnection[];
  createdAt: string;
}
