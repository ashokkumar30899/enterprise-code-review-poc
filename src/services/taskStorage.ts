import { Task } from '../types/task';

const STORAGE_KEY = 'enterprise_task_manager_tasks';

const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Initialize repository structure',
    description: 'Establish enterprise-grade React TypeScript Vite repository layout.',
    status: 'completed',
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'task-2',
    title: 'Implement CI/CD pipeline',
    description: 'Configure GitHub Actions workflow for linting, typing, testing, and building.',
    status: 'completed',
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Conduct architecture and security review',
    description: 'Ensure no secret leakage, verify CODEOWNERS, and validate branch policies.',
    status: 'pending',
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    title: 'Explore theme customization',
    description: 'Evaluate dark mode and branded styling options for future sprints.',
    status: 'pending',
    priority: 'low',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const taskStorage = {
  /** Loads saved tasks, defaulting missing priorities and falling back to the initial tasks. */
  getTasks(): Task[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.saveTasks(INITIAL_TASKS);
        return INITIAL_TASKS;
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // Ensure backward compatibility: populate missing priority field if any
        return parsed.map((item) => ({
          ...item,
          priority: item.priority || 'medium',
        }));
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
