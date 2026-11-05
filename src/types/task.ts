export type TaskStatus = 'pending' | 'completed';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt: string;
}

export type TaskFilterStatus = 'all' | 'pending' | 'completed';

export type TaskFilterPriority = 'all' | 'low' | 'medium' | 'high';

export interface TaskFormData {
  title: string;
  description: string;
  priority: TaskPriority;
}
