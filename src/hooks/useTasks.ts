import { useState, useEffect, useCallback } from 'react';
import type { Task } from '@/types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('calendar_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('calendar_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  const completeTask = useCallback((id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, status: 'completada' } : task
    ));
  }, []);

  const getTasksForDate = useCallback((date: string) => {
    return tasks.filter(task => 
      task.fechaLimite === date && task.status === 'pendiente'
    );
  }, [tasks]);

  const getDaysRemaining = useCallback((fechaLimite: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const limit = new Date(fechaLimite);
    limit.setHours(0, 0, 0, 0);
    const diff = limit.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, []);

  const getPendingTasks = useCallback(() => {
    return tasks.filter(task => task.status === 'pendiente');
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    completeTask,
    getTasksForDate,
    getDaysRemaining,
    getPendingTasks
  };
}
