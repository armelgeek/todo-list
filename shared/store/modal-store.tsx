import { Task } from '@/features/task/config/task.type';
import { create } from 'zustand';

interface TaskStore {
  task: Task | null;
  setTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  task: null,
  setTask: (newTask: Task) => set({ task: newTask }),
}));
