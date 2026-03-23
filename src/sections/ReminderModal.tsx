import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Trash2 } from 'lucide-react';
import type { Reminder } from '@/types';

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
  existingReminder?: Reminder;
  onSave: (date: string, text: string) => void;
  onDelete?: (id: string) => void;
  formatDate: (date: string) => { full: string; short: string; dayOfWeek: number; dayName: string };
}

export function ReminderModal({
  isOpen,
  onClose,
  selectedDate,
  existingReminder,
  onSave,
  onDelete,
  formatDate
}: ReminderModalProps) {
  const [text, setText] = useState(existingReminder?.text || '');

  const handleSave = () => {
    if (selectedDate && text.trim()) {
      onSave(selectedDate, text.trim());
      setText('');
      onClose();
    }
  };

  const handleDelete = () => {
    if (existingReminder && onDelete) {
      onDelete(existingReminder.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-orange-500" />
            Recordatorio para {selectedDate ? formatDate(selectedDate).full : ''}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Texto del recordatorio
            </label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ej: Reunión importante a las 3pm"
              maxLength={50}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              {text.length}/50 caracteres
            </p>
          </div>

          <div className="flex gap-2 justify-end">
            {existingReminder && onDelete && (
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!text.trim()}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Guardar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
