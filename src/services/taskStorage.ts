import { Task } from '../types/task';

const STORAGE_KEY = 'enterprise_task_manager_tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Initialize repository structure',
    description: 'Establish enterprise-grade React TypeScript Vite repository layout.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Implement CI/CD pipeline',
    description: 'Configure GitHub Actions workflow for linting, typing, testing, and building.',
    status: 'completed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Conduct architecture and security review',
    description: 'Ensure no secret leakage, verify CODEOWNERS, and validate branch policies.',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const taskStorage = {
  getTasks(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.saveTasks(INITIAL_TASKS);
        return INITIAL_TASKS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  },

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to persist tasks to localStorage', e);
    }
  },

  clearTasks(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear tasks from localStorage', e);
    }
  },
};

