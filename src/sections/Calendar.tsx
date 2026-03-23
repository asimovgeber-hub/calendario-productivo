import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Briefcase, BookOpen, Moon, RotateCcw, Clock, AlertTriangle, AlertCircle, Bell, Network, Star } from 'lucide-react';
import { useCalendar } from '@/hooks/useCalendar';
import { useTasks } from '@/hooks/useTasks';
import { useStudy } from '@/hooks/useStudy';
import { useHabits } from '@/hooks/useHabits';
import { useReminders } from '@/hooks/useReminders';
import { useFlowcharts } from '@/hooks/useFlowcharts';
import { TaskModal } from './TaskModal';
import { StudyModal } from './StudyModal';
import { HabitModal } from './HabitModal';
import { ReminderModal } from './ReminderModal';
import { FlowchartModal } from './FlowchartModal';
import { HIERARCHY_COLORS } from '@/types';
import type { TaskPriority } from '@/types';

export function Calendar() {
  const {
    year,
    month,
    monthName,
    dayNames,
    selectedDate,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
    formatDate,
    isToday,
    generateCalendarDays
  } = useCalendar();

  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    getTasksForDate,
    getDaysRemaining,
    getPendingTasks
  } = useTasks();

  const {
    subjects,
    addSubject,
    updateSubject,
    deleteSubject,
    generateSchedule,
    getStudyForDate,
    getSubjectById,
    getHierarchyCount,
    canAddHierarchy
  } = useStudy();

  const {
    summaries,
    addOrUpdateSummary,
    getSummaryForDate,
    canEditSummary,
    isPastDate,
    defaultHabits
  } = useHabits();

  const {
    addReminder,
    deleteReminder,
    getReminderForDate
  } = useReminders();

  const {
    createFlowchart,
    updateFlowchart,
    deleteFlowchart,
    getFlowchartForDate
  } = useFlowcharts();

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [habitModalOpen, setHabitModalOpen] = useState(false);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);
  const [flowchartModalOpen, setFlowchartModalOpen] = useState(false);

  // Generar horario cuando cambia el mes
  useEffect(() => {
    if (subjects.length > 0) {
      generateSchedule(year, month);
    }
  }, [year, month, subjects.length]);

  const days = generateCalendarDays();
  const pendingTasks = getPendingTasks();

  const handleDayClick = (day: number, e?: React.MouseEvent) => {
    selectDate(day);
    // Por defecto abre el modal de hábitos
    if (!e?.shiftKey && !e?.ctrlKey && !e?.altKey) {
      setHabitModalOpen(true);
    }
  };

  const handleReminderClick = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    selectDate(day);
    setReminderModalOpen(true);
  };

  const handleFlowchartClick = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    selectDate(day);
    setFlowchartModalOpen(true);
  };

  const getDayTasks = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getTasksForDate(dateStr);
  };

  const getDayStudy = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return getStudyForDate(dateStr);
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case 'alto': return <AlertTriangle className="w-3 h-3 text-red-600" />;
      case 'medio': return <AlertCircle className="w-3 h-3 text-yellow-600" />;
      case 'bajo': return <Clock className="w-3 h-3 text-green-600" />;
    }
  };

  const getPriorityBgColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'alto': return 'bg-red-100 border-red-300';
      case 'medio': return 'bg-yellow-100 border-yellow-300';
      case 'bajo': return 'bg-green-100 border-green-300';
    }
  };

  const getPriorityTextColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'alto': return 'text-red-700';
      case 'medio': return 'text-yellow-700';
      case 'bajo': return 'text-green-700';
    }
  };

  const clearAllData = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('calendar_tasks');
      localStorage.removeItem('calendar_study_subjects');
      localStorage.removeItem('calendar_study_schedule');
      localStorage.removeItem('calendar_day_summaries');
      localStorage.removeItem('calendar_reminders');
      localStorage.removeItem('calendar_flowcharts');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <CalendarIcon className="w-6 h-6" />
              Calendario Productivo
            </h1>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[140px] text-center">
                {monthName} {year}
              </span>
              <Button variant="outline" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Hoy
              </Button>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => setTaskModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Briefcase className="w-4 h-4 mr-2" />
                Trabajos
                {pendingTasks.length > 0 && (
                  <span className="ml-2 bg-white text-blue-600 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {pendingTasks.length}
                  </span>
                )}
              </Button>
              <Button 
                onClick={() => setStudyModalOpen(true)}
                style={{ backgroundColor: '#F54927' }}
                className="hover:opacity-90"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Estudio
              </Button>
              <Button 
                variant="outline"
                onClick={clearAllData}
                className="text-red-500 hover:text-red-700"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Leyenda */}
        <div className="bg-white rounded-xl shadow-lg p-3 mb-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Trabajos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F54927' }}></div>
              <span>Estudio</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-black font-bold text-lg">♠</span>
              <span>Picas (Alta)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg" style={{ color: '#2563EB' }}>♣</span>
              <span>Tréboles (Media)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-lg" style={{ color: '#DC2626' }}>♥</span>
              <span>Corazones (Baja)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-purple-500"></div>
              <span>100%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span>85%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-cyan-500"></div>
              <span>67%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span>50%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span>33%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span>17%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-black"></div>
              <span>0%</span>
            </div>
          </div>
        </div>

        {/* Calendario */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Días de la semana */}
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Cuadrícula de días */}
          <div className="grid grid-cols-7 auto-rows-min">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="min-h-[200px] bg-gray-50 border-b border-r"></div>;
              }

              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayTasks = getDayTasks(day);
              const dayStudy = getDayStudy(day);
              const summary = getSummaryForDate(dateStr);
              const isPast = isPastDate(dateStr);
              const reminder = getReminderForDate(dateStr);
              const flowchart = getFlowchartForDate(dateStr);

              // Determinar el color de fondo del cuadro
              let bgColor = 'bg-white';
              let dayNumberColor = 'text-gray-700';
              
              if (summary) {
                bgColor = '';
                dayNumberColor = 'text-white';
              } else if (isToday(day)) {
                bgColor = 'bg-yellow-50';
                dayNumberColor = 'text-yellow-600';
              }

              return (
                <div 
                  key={day}
                  onClick={() => handleDayClick(day)}
                  className={`border-b border-r p-3 cursor-pointer transition-all hover:opacity-90 ${bgColor} relative`}
                  style={summary ? { backgroundColor: summary.color } : {}}
                >
                  {/* Estrella en esquina superior izquierda si es 100% */}
                  {summary && summary.percentage === 100 && (
                    <div className="absolute top-1 left-1">
                      <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                    </div>
                  )}

                  {/* Número del día y porcentaje */}
                  <div className="flex justify-between items-start mb-2">
                    <span className={`font-bold text-lg ${dayNumberColor} ${summary?.percentage === 100 ? 'ml-5' : ''}`}>
                      {day}
                    </span>
                    {summary && (
                      <span className="text-white font-bold text-lg">
                        {summary.percentage}%
                      </span>
                    )}
                    {!summary && isPast && (
                      <span className="text-gray-400 text-xs">Sin registrar</span>
                    )}
                  </div>

                  {/* Recordatorio - Mostrar texto directamente */}
                  {reminder && (
                    <div 
                      onClick={(e) => handleReminderClick(day, e)}
                      className="mb-2 cursor-pointer"
                    >
                      <div className="flex items-start gap-1 bg-orange-100 border border-orange-300 rounded p-1.5 text-xs">
                        <Bell className="w-3 h-3 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span className="text-orange-800 font-medium line-clamp-2 flex-1">
                          {reminder.text}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Botones de acción flotantes */}
                  <div className="absolute bottom-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleReminderClick(day, e)}
                      className={`p-1 rounded ${reminder ? 'bg-orange-500' : 'bg-gray-300'} hover:bg-orange-600 transition-colors`}
                      title="Recordatorio"
                    >
                      <Bell className={`w-3 h-3 ${reminder ? 'text-white' : 'text-gray-600'}`} />
                    </button>
                    <button
                      onClick={(e) => handleFlowchartClick(day, e)}
                      className={`p-1 rounded ${flowchart ? 'bg-purple-500' : 'bg-gray-300'} hover:bg-purple-600 transition-colors`}
                      title="Flujograma"
                    >
                      <Network className={`w-3 h-3 ${flowchart ? 'text-white' : 'text-gray-600'}`} />
                    </button>
                  </div>

                  {/* Tareas del día - MOSTRAR TODAS */}
                  {dayTasks.length > 0 && (
                    <div className="space-y-2 mb-3">
                      {dayTasks.map(task => {
                        const daysRemaining = getDaysRemaining(task.fechaLimite);
                        return (
                          <div 
                            key={task.id}
                            className={`p-2 rounded border text-xs ${getPriorityBgColor(task.prioridad)}`}
                          >
                            <div className={`font-bold ${getPriorityTextColor(task.prioridad)}`}>
                              {getPriorityIcon(task.prioridad)} {task.materia}
                            </div>
                            <div className={`${summary ? 'text-gray-800' : 'text-gray-700'} mt-1`}>
                              {task.actividad}
                            </div>
                            <div className={`mt-1 font-medium ${daysRemaining <= 1 ? 'text-red-600' : summary ? 'text-gray-800' : 'text-gray-600'}`}>
                              {daysRemaining > 0 
                                ? `${daysRemaining} días restantes` 
                                : daysRemaining === 0 
                                  ? '¡Vence hoy!' 
                                  : `Venció hace ${Math.abs(daysRemaining)} días`
                              }
                            </div>
                            <div className={`mt-1 uppercase text-[10px] font-bold tracking-wide ${getPriorityTextColor(task.prioridad)}`}>
                              Prioridad: {task.prioridad.toUpperCase()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Sesiones de estudio - MOSTRAR TODAS */}
                  {dayStudy && dayStudy.sessions.length > 0 && (
                    <div className="space-y-2">
                      {dayStudy.sessions.map((session, idx) => {
                        const subject = getSubjectById(session.subjectId);
                        if (!subject) return null;
                        const hierarchyColor = HIERARCHY_COLORS[subject.jerarquia];
                        return (
                          <div 
                            key={idx}
                            className="p-2 rounded text-xs text-white"
                            style={{ backgroundColor: hierarchyColor }}
                          >
                            <div className="font-bold flex items-center gap-1">
                              <span className="text-lg">{subject.jerarquia}</span>
                              <span>{subject.nombre}</span>
                            </div>
                            <div className="mt-1 opacity-90">
                              {session.horario}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Mini-flujograma visual integrado */}
                  {flowchart && flowchart.nodes.length > 0 && (
                    <div 
                      className="mt-2 bg-purple-50 border border-purple-200 rounded p-2 cursor-pointer relative"
                      onClick={(e) => handleFlowchartClick(day, e)}
                      style={{ minHeight: '60px' }}
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Network className="w-3 h-3 text-purple-600" />
                        <span className="text-xs font-medium text-purple-700">Flujograma</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {flowchart.nodes.slice(0, 4).map((node, idx) => (
                          <div key={node.id} className="flex items-center">
                            <div className="bg-white border border-purple-300 rounded px-1.5 py-0.5 text-[10px] text-purple-800 truncate max-w-[60px]">
                              {node.text}
                            </div>
                            {idx < Math.min(flowchart.nodes.length - 1, 3) && (
                              <span className="text-purple-400 mx-0.5">→</span>
                            )}
                          </div>
                        ))}
                        {flowchart.nodes.length > 4 && (
                          <span className="text-xs text-purple-600">+{flowchart.nodes.length - 4}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Trabajos Pendientes
            </h3>
            <p className="text-2xl font-bold text-blue-600">{pendingTasks.length}</p>
            <p className="text-sm text-gray-500">
              {pendingTasks.filter(t => getDaysRemaining(t.fechaLimite) <= 1).length} urgentes
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: '#F54927' }} />
              Materias de Estudio
            </h3>
            <p className="text-2xl font-bold" style={{ color: '#F54927' }}>{subjects.length}/7</p>
            <p className="text-sm text-gray-500">
              {getHierarchyCount('♠')}♠ {getHierarchyCount('♣')}♣ {getHierarchyCount('♥')}♥
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Moon className="w-4 h-4 text-purple-600" />
              Días Registrados
            </h3>
            <p className="text-2xl font-bold text-purple-600">{summaries.length}</p>
            <p className="text-sm text-gray-500">
              {summaries.length > 0 
                ? `Promedio: ${Math.round(summaries.reduce((a, b) => a + b.percentage, 0) / summaries.length)}%`
                : 'Sin datos'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Modales */}
      <TaskModal
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        tasks={tasks}
        onAddTask={addTask}
        onUpdateTask={updateTask}
        onDeleteTask={deleteTask}
        onCompleteTask={completeTask}
        getDaysRemaining={getDaysRemaining}
        selectedDate={selectedDate || undefined}
      />

      <StudyModal
        isOpen={studyModalOpen}
        onClose={() => setStudyModalOpen(false)}
        subjects={subjects}
        onAddSubject={addSubject}
        onUpdateSubject={updateSubject}
        onDeleteSubject={deleteSubject}
        onGenerateSchedule={() => generateSchedule(year, month)}
        getHierarchyCount={getHierarchyCount}
        canAddHierarchy={canAddHierarchy}
      />

      <HabitModal
        isOpen={habitModalOpen}
        onClose={() => setHabitModalOpen(false)}
        selectedDate={selectedDate}
        existingSummary={selectedDate ? getSummaryForDate(selectedDate) : undefined}
        onSave={addOrUpdateSummary}
        canEdit={selectedDate ? canEditSummary(selectedDate) : false}
        formatDate={formatDate}
        defaultHabits={defaultHabits}
      />

      <ReminderModal
        isOpen={reminderModalOpen}
        onClose={() => setReminderModalOpen(false)}
        selectedDate={selectedDate}
        existingReminder={selectedDate ? getReminderForDate(selectedDate) : undefined}
        onSave={addReminder}
        onDelete={deleteReminder}
        formatDate={formatDate}
      />

      <FlowchartModal
        isOpen={flowchartModalOpen}
        onClose={() => setFlowchartModalOpen(false)}
        selectedDate={selectedDate}
        flowchart={selectedDate ? getFlowchartForDate(selectedDate) : undefined}
        onSave={updateFlowchart}
        onCreate={createFlowchart}
        onDelete={deleteFlowchart}
        formatDate={formatDate}
      />
    </div>
  );
}
