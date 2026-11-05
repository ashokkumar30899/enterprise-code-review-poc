import { describe, it, expect, beforeEach } from 'vitest';
import { taskStorage } from '../src/services/taskStorage';
import { Task } from '../src/types/task';

describe('taskStorage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial seed tasks with priorities when localStorage is empty', () => {
    const tasks = taskStorage.getTasks();
    expect(tasks).toHaveLength(4);
    expect(tasks[0].title).toBe('Initialize repository structure');
    expect(tasks[0].priority).toBe('high');
  });

  it('saves and retrieves tasks accurately including priority', () => {
    const customTasks: Task[] = [
      {
        id: 'test-1',
        title: 'Perform load testing',
        description: 'Verify 1000 RPS handling',
        status: 'pending',
        priority: 'high',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ];

    taskStorage.saveTasks(customTasks);
    const loaded = taskStorage.getTasks();
    expect(loaded).toEqual(customTasks);
    expect(loaded[0].priority).toBe('high');
  });

  it('provides fallback priority "medium" for legacy tasks lacking priority field', () => {
    const legacyTasksWithoutPriority = [
      {
        id: 'legacy-1',
        title: 'Legacy task',
        description: 'Legacy description',
        status: 'pending',
        createdAt: '2026-01-01T00:00:00.000Z',
        updatedAt: '2026-01-01T00:00:00.000Z',
      },
    ];
    localStorage.setItem(
      'enterprise_task_manager_tasks',
      JSON.stringify(legacyTasksWithoutPriority)
    );

    const tasks = taskStorage.getTasks();
    expect(tasks[0].priority).toBe('medium');
  });

  it('handles corrupted localStorage payload gracefully', () => {
    localStorage.setItem('enterprise_task_manager_tasks', 'INVALID_JSON{{{');
    const tasks = taskStorage.getTasks();
    expect(tasks).toHaveLength(4);
  });

  it('clears tasks from storage', () => {
    taskStorage.clearTasks();
    expect(localStorage.getItem('enterprise_task_manager_tasks')).toBeNull();
  });
});
