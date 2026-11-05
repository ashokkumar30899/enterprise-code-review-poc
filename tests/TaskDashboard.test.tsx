import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TaskDashboard } from '../src/components/TaskDashboard';
import { Task } from '../src/types/task';

describe('TaskDashboard Component', () => {
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Desc 1',
      status: 'completed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Desc 2',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Desc 3',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  it('renders total, pending, completed counts and completion percentage', () => {
    render(<TaskDashboard tasks={mockTasks} />);

    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('3');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('2');
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('1');
    expect(screen.getByTestId('completion-rate')).toHaveTextContent('33%');
  });

  it('handles empty task list correctly', () => {
    render(<TaskDashboard tasks={[]} />);

    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('0');
    expect(screen.getByTestId('pending-tasks-count')).toHaveTextContent('0');
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('0');
    expect(screen.getByTestId('completion-rate')).toHaveTextContent('0%');
  });
});

