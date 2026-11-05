import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TaskFilter } from '../src/components/TaskFilter';

describe('TaskFilter Component', () => {
  it('renders status buttons and priority selector', () => {
    const onStatusChange = vi.fn();
    const onPriorityChange = vi.fn();

    render(
      <TaskFilter
        statusFilter="all"
        priorityFilter="all"
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
      />
    );

    expect(screen.getByTestId('filter-all')).toBeInTheDocument();
    expect(screen.getByTestId('filter-pending')).toBeInTheDocument();
    expect(screen.getByTestId('filter-completed')).toBeInTheDocument();
    expect(screen.getByTestId('filter-priority-select')).toBeInTheDocument();
  });

  it('triggers onStatusChange when status button is clicked', () => {
    const onStatusChange = vi.fn();
    const onPriorityChange = vi.fn();

    render(
      <TaskFilter
        statusFilter="all"
        priorityFilter="all"
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
      />
    );

    fireEvent.click(screen.getByTestId('filter-pending'));
    expect(onStatusChange).toHaveBeenCalledWith('pending');
  });

  it('triggers onPriorityChange when priority dropdown selection changes', () => {
    const onStatusChange = vi.fn();
    const onPriorityChange = vi.fn();

    render(
      <TaskFilter
        statusFilter="all"
        priorityFilter="all"
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
      />
    );

    fireEvent.change(screen.getByTestId('filter-priority-select'), {
      target: { value: 'high' },
    });
    expect(onPriorityChange).toHaveBeenCalledWith('high');
  });
});
