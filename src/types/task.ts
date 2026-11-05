export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export type TaskFilterStatus = 'all' | 'pending' | 'completed';

export interface TaskFormData {
  title: string;
  description: string;
}

