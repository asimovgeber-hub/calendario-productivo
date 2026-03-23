import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import type { HabitStatus, DaySummary } from '@/types';
import { HABIT_ICONS, HABIT_LABELS, PERCENTAGE_COLORS } from '@/types';
import { Moon, Info, TrendingUp } from 'lucide-react';

interface HabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
  existingSummary: DaySummary | undefined;
  onSave: (date: string, habits: HabitStatus) => void;
  canEdit: boolean;
  formatDate: (dateStr: string) => { full: string; short: string; dayOfWeek: number; dayName: string };
  defaultHabits: HabitStatus;
}

export function HabitModal({
  isOpen,
  onClose,
  selectedDate,
  existingSummary,
  onSave,
  canEdit,
  formatDate,
  defaultHabits
}: HabitModalProps) {
  const [habits, setHabits] = useState<HabitStatus>(defaultHabits);

  useEffect(() => {
    if (existingSummary) {
      setHabits(existingSummary.habits);
    } else {
      setHabits(defaultHabits);
    }
  }, [existingSummary, isOpen, defaultHabits]);

  const handleToggle = (habit: keyof HabitStatus) => {
    if (!canEdit) return;
    setHabits(prev => ({ ...prev, [habit]: !prev[habit] }));
  };

  const handleSave = () => {
    if (selectedDate) {
      onSave(selectedDate, habits);
    }
    onClose();
  };

  const completedCount = Object.values(habits).filter(Boolean).length;
  const totalCount = Object.keys(habits).length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const currentColor = PERCENTAGE_COLORS.find(p => percentage >= p.threshold)?.color || '#000000';

  if (!selectedDate) return null;

  const dateInfo = formatDate(selectedDate);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Resumen del Día
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-medium">{dateInfo.full}</p>
            <p className="text-sm text-gray-500">
              {canEdit 
                ? 'Marca los hábitos que completaste este día' 
                : 'Este día aún no ha terminado. Podrás registrar los hábitos después de las 12 de la noche.'
              }
            </p>
          </div>

          {!canEdit && (
            <div className="p-3 bg-amber-100 text-amber-800 rounded-lg flex items-center gap-2 text-sm">
              <Info className="w-4 h-4" />
              Espera a que termine el día para registrar los hábitos.
            </div>
          )}

          {existingSummary && (
            <div 
              className="p-4 rounded-lg text-white text-center"
              style={{ backgroundColor: existingSummary.color }}
            >
              <div className="text-3xl font-bold">{existingSummary.percentage}%</div>
              <div className="text-sm opacity-90">Completado</div>
            </div>
          )}

          <div className="space-y-3">
            {(Object.keys(habits) as Array<keyof HabitStatus>).map(habit => (
              <div 
                key={habit}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                  canEdit 
                    ? 'cursor-pointer hover:bg-gray-50' 
                    : 'opacity-60 cursor-not-allowed'
                } ${habits[habit] ? 'border-green-400 bg-green-50' : 'border-gray-200'}`}
                onClick={() => handleToggle(habit)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{HABIT_ICONS[habit]}</span>
                  <Label className="cursor-pointer font-medium">
                    {HABIT_LABELS[habit]}
                  </Label>
                </div>
                <Checkbox 
                  checked={habits[habit]}
                  disabled={!canEdit}
                  onCheckedChange={() => handleToggle(habit)}
                />
              </div>
            ))}
          </div>

          {canEdit && (
            <>
              <div 
                className="p-4 rounded-lg text-white text-center transition-all"
                style={{ backgroundColor: currentColor }}
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Progreso actual</span>
                </div>
                <div className="text-3xl font-bold">{percentage}%</div>
                <div className="text-sm opacity-90">
                  {completedCount} de {totalCount} hábitos
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                {PERCENTAGE_COLORS.map(({ threshold, color }) => (
                  <div key={threshold} className="space-y-1">
                    <div 
                      className="w-6 h-6 rounded mx-auto"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-gray-500">{threshold}%</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={handleSave}
                className="w-full"
                style={{ backgroundColor: currentColor }}
              >
                Guardar Resumen
              </Button>
            </>
          )}

          {!canEdit && existingSummary && (
            <div 
              className="p-4 rounded-lg text-white text-center"
              style={{ backgroundColor: existingSummary.color }}
            >
              <div className="text-2xl font-bold">{existingSummary.percentage}%</div>
              <div className="text-sm">Registrado</div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
