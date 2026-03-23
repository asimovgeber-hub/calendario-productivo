import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Task, TaskPriority } from '@/types';
import { Plus, Edit, Trash2, CheckCircle, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
  getDaysRemaining: (fechaLimite: string) => number;
  selectedDate?: string;
}

export function TaskModal({
  isOpen,
  onClose,
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onCompleteTask,
  getDaysRemaining,
  selectedDate
}: TaskModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    materia: '',
    actividad: '',
    fechaLimite: selectedDate || '',
    prioridad: 'medio' as TaskPriority
  });

  const pendingTasks = tasks.filter(t => t.status === 'pendiente');
  const completedTasks = tasks.filter(t => t.status === 'completada');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      onUpdateTask(editingTask.id, formData);
      setEditingTask(null);
    } else {
      onAddTask(formData);
    }
    setFormData({ materia: '', actividad: '', fechaLimite: selectedDate || '', prioridad: 'medio' });
    setIsAdding(false);
  };

  const startEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      materia: task.materia,
      actividad: task.actividad,
      fechaLimite: task.fechaLimite,
      prioridad: task.prioridad
    });
    setIsAdding(true);
  };

  const getPriorityIcon = (priority: TaskPriority) => {
    switch (priority) {
      case 'alto': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medio': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'bajo': return <Clock className="w-4 h-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'alto': return 'bg-red-100 border-red-300 text-red-800';
      case 'medio': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'bajo': return 'bg-green-100 border-green-300 text-green-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-blue-700 flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            Gestión de Trabajos
          </DialogTitle>
        </DialogHeader>

        {!isAdding ? (
          <div className="space-y-4">
            <Button 
              onClick={() => setIsAdding(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Tarea
            </Button>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">
                Tareas Pendientes ({pendingTasks.length})
              </h3>
              {pendingTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hay tareas pendientes</p>
              ) : (
                <div className="space-y-2">
                  {pendingTasks.map(task => {
                    const daysRemaining = getDaysRemaining(task.fechaLimite);
                    return (
                      <div 
                        key={task.id} 
                        className={`p-3 rounded-lg border-2 ${getPriorityColor(task.prioridad)}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {getPriorityIcon(task.prioridad)}
                              <span className="font-semibold">{task.materia}</span>
                            </div>
                            <p className="text-sm">{task.actividad}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs">
                              <Clock className="w-3 h-3" />
                              <span>
                                {daysRemaining > 0 
                                  ? `${daysRemaining} días restantes` 
                                  : daysRemaining === 0 
                                    ? '¡Vence hoy!' 
                                    : `Venció hace ${Math.abs(daysRemaining)} días`
                                }
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => startEdit(task)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => onDeleteTask(task.id)}
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => onCompleteTask(task.id)}
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {completedTasks.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-500">
                  Tareas Completadas ({completedTasks.length})
                </h3>
                <div className="space-y-2 opacity-60">
                  {completedTasks.slice(0, 3).map(task => (
                    <div 
                      key={task.id} 
                      className="p-3 rounded-lg border border-gray-300 bg-gray-50 line-through"
                    >
                      <span className="font-semibold">{task.materia}</span>: {task.actividad}
                    </div>
                  ))}
                  {completedTasks.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{completedTasks.length - 3} más completadas
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="materia">Materia</Label>
              <Input
                id="materia"
                value={formData.materia}
                onChange={e => setFormData({ ...formData, materia: e.target.value })}
                placeholder="Nombre de la materia"
                required
              />
            </div>
            <div>
              <Label htmlFor="actividad">Actividad</Label>
              <Input
                id="actividad"
                value={formData.actividad}
                onChange={e => setFormData({ ...formData, actividad: e.target.value })}
                placeholder="¿Qué se tiene que hacer?"
                required
              />
            </div>
            <div>
              <Label htmlFor="fechaLimite">Fecha Límite</Label>
              <Input
                id="fechaLimite"
                type="date"
                value={formData.fechaLimite}
                onChange={e => setFormData({ ...formData, fechaLimite: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="prioridad">Grado de Importancia</Label>
              <Select
                value={formData.prioridad}
                onValueChange={(value: TaskPriority) => 
                  setFormData({ ...formData, prioridad: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bajo">Bajo</SelectItem>
                  <SelectItem value="medio">Medio</SelectItem>
                  <SelectItem value="alto">Alto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setEditingTask(null);
                  setFormData({ materia: '', actividad: '', fechaLimite: selectedDate || '', prioridad: 'medio' });
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                {editingTask ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
