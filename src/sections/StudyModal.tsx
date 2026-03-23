import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { StudySubject, Hierarchy } from '@/types';
import { HIERARCHY_COLORS } from '@/types';
import { Plus, Edit, Trash2, BookOpen, Info } from 'lucide-react';

interface StudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: StudySubject[];
  onAddSubject: (nombre: string, jerarquia: Hierarchy) => { success: boolean; error?: string };
  onUpdateSubject: (id: string, updates: Partial<StudySubject>) => { success: boolean; error?: string };
  onDeleteSubject: (id: string) => void;
  onGenerateSchedule: () => void;
  getHierarchyCount: (hierarchy: Hierarchy) => number;
  canAddHierarchy: (hierarchy: Hierarchy) => boolean;
}

const HIERARCHY_INFO: Record<Hierarchy, { name: string; desc: string; max: number; bgColor: string; textColor: string; borderColor: string }> = {
  '♠': { 
    name: 'Picas', 
    desc: 'Materias más importantes - Repaso diario (7-10 AM)', 
    max: 2,
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-400',
    textColor: 'text-black'
  },
  '♣': { 
    name: 'Tréboles', 
    desc: 'Materias de grado medio - Estudio casi día de por medio', 
    max: 2,
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-400',
    textColor: 'text-blue-700'
  },
  '♥': { 
    name: 'Corazones', 
    desc: 'Materias de nivel bajo - Una vez por semana', 
    max: 3,
    bgColor: 'bg-red-100',
    borderColor: 'border-red-400',
    textColor: 'text-red-700'
  }
};

export function StudyModal({
  isOpen,
  onClose,
  subjects,
  onAddSubject,
  onUpdateSubject,
  onDeleteSubject,
  onGenerateSchedule,
  getHierarchyCount,
  canAddHierarchy
}: StudyModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingSubject, setEditingSubject] = useState<StudySubject | null>(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    jerarquia: '♥' as Hierarchy
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (editingSubject) {
      const result = onUpdateSubject(editingSubject.id, formData);
      if (result.success) {
        setEditingSubject(null);
        setFormData({ nombre: '', jerarquia: '♥' });
        setIsAdding(false);
      } else {
        setError(result.error || 'Error al actualizar');
      }
    } else {
      const result = onAddSubject(formData.nombre, formData.jerarquia);
      if (result.success) {
        setFormData({ nombre: '', jerarquia: '♥' });
        setIsAdding(false);
      } else {
        setError(result.error || 'Error al agregar');
      }
    }
  };

  const startEdit = (subject: StudySubject) => {
    setEditingSubject(subject);
    setFormData({
      nombre: subject.nombre,
      jerarquia: subject.jerarquia
    });
    setIsAdding(true);
    setError('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2" style={{ color: '#F54927' }}>
            <div className="w-4 h-4 rounded" style={{ backgroundColor: '#F54927' }}></div>
            Configuración de Estudio
          </DialogTitle>
        </DialogHeader>

        {!isAdding ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Info className="w-4 h-4" />
                <span className="font-medium">Distribución de horarios disponibles:</span>
              </div>
              <ul className="text-xs text-gray-500 ml-6 space-y-1">
                <li>• Todos los días: 7:00 - 10:00 AM (3h)</li>
                <li>• Martes: 11:00 AM - 2:00 PM (3h)</li>
                <li>• Viernes: 11:00 AM - 2:00 PM y 4:00 - 7:00 PM (6h)</li>
                <li>• Sábados: 11:00 AM - 2:00 PM y 4:00 - 7:00 PM (6h)</li>
              </ul>
            </div>

            <Button 
              onClick={() => setIsAdding(true)}
              className="w-full"
              style={{ backgroundColor: '#F54927' }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Materia
            </Button>

            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              {(['♠', '♣', '♥'] as Hierarchy[]).map(h => (
                <div key={h} className={`p-2 rounded-lg border-2 ${HIERARCHY_INFO[h].bgColor} ${HIERARCHY_INFO[h].borderColor}`}>
                  <div className="text-2xl" style={{ color: HIERARCHY_COLORS[h] }}>{h}</div>
                  <div className="font-medium" style={{ color: HIERARCHY_COLORS[h] }}>{HIERARCHY_INFO[h].name}</div>
                  <div className="text-xs text-gray-600">
                    {getHierarchyCount(h)}/{HIERARCHY_INFO[h].max}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-700">
                Materias Configuradas ({subjects.length}/7)
              </h3>
              {subjects.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No hay materias configuradas. Agrega hasta 7 materias.
                </p>
              ) : (
                <div className="space-y-2">
                  {subjects.map(subject => (
                    <div 
                      key={subject.id} 
                      className={`p-3 rounded-lg border-2 ${HIERARCHY_INFO[subject.jerarquia].bgColor} ${HIERARCHY_INFO[subject.jerarquia].borderColor}`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl" style={{ color: HIERARCHY_COLORS[subject.jerarquia] }}>{subject.jerarquia}</span>
                          <span className="font-semibold" style={{ color: HIERARCHY_COLORS[subject.jerarquia] }}>{subject.nombre}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => startEdit(subject)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => onDeleteSubject(subject.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs mt-1 text-gray-600">
                        {HIERARCHY_INFO[subject.jerarquia].desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {subjects.length > 0 && (
              <Button 
                onClick={onGenerateSchedule}
                variant="outline"
                className="w-full"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Generar Horario de Estudio
              </Button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}
            <div>
              <Label htmlFor="nombre">Nombre de la Materia</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                placeholder="Ej: Matemáticas"
                required
              />
            </div>
            <div>
              <Label htmlFor="jerarquia">Jerarquía de Importancia</Label>
              <Select
                value={formData.jerarquia}
                onValueChange={(value: Hierarchy) => 
                  setFormData({ ...formData, jerarquia: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['♠', '♣', '♥'] as Hierarchy[]).map(h => (
                    <SelectItem 
                      key={h} 
                      value={h}
                      disabled={!canAddHierarchy(h) && formData.jerarquia !== h}
                    >
                      {h} {HIERARCHY_INFO[h].name} 
                      ({getHierarchyCount(h)}/{HIERARCHY_INFO[h].max})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {HIERARCHY_INFO[formData.jerarquia].desc}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setIsAdding(false);
                  setEditingSubject(null);
                  setError('');
                  setFormData({ nombre: '', jerarquia: '♥' });
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                style={{ backgroundColor: '#F54927' }}
              >
                {editingSubject ? 'Actualizar' : 'Guardar'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
