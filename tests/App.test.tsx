import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Enterprise Task Manager App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application title, dashboard, and initial tasks', () => {
    render(<App />);

    expect(screen.getByText('Enterprise Task Manager')).toBeInTheDocument();
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('3');
    expect(screen.getByText('Initialize repository structure')).toBeInTheDocument();
  });

  it('allows adding a new task', () => {
    render(<App />);

    const titleInput = screen.getByLabelText(/Title \*/i);
    const descInput = screen.getByLabelText(/Description/i);
    const submitBtn = screen.getByRole('button', { name: /Add Task/i });

    fireEvent.change(titleInput, { target: { value: 'Conduct Security Scan' } });
    fireEvent.change(descInput, { target: { value: 'Run SAST and DAST scanners' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Conduct Security Scan')).toBeInTheDocument();
    expect(screen.getByText('Run SAST and DAST scanners')).toBeInTheDocument();
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('4');
  });

  it('validates that title is required when adding a task', () => {
    render(<App />);

    const submitBtn = screen.getByRole('button', { name: /Add Task/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Task title is required.')).toBeInTheDocument();
  });

  it('allows toggling task completion status', () => {
    render(<App />);

    const checkbox = screen.getByLabelText(/Mark "Conduct architecture and security review" as completed/i);
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByTestId('completed-tasks-count')).toHaveTextContent('3');
  });

  it('allows editing an existing task', () => {
    render(<App />);

    const editBtn = screen.getByLabelText(/Edit "Conduct architecture and security review"/i);
    fireEvent.click(editBtn);

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    const titleInput = screen.getByLabelText(/Title \*/i);
    fireEvent.change(titleInput, { target: { value: 'Conduct architecture & SOC2 review' } });

    const saveBtn = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText('Conduct architecture & SOC2 review')).toBeInTheDocument();
  });

  it('allows deleting a task', () => {
    render(<App />);

    expect(screen.getByText('Initialize repository structure')).toBeInTheDocument();
    const deleteBtn = screen.getByLabelText(/Delete "Initialize repository structure"/i);
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Initialize repository structure')).not.toBeInTheDocument();
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('2');
  });

  it('filters tasks by status correctly', () => {
    render(<App />);

    // Click 'Pending' filter
    const pendingFilterBtn = screen.getByTestId('filter-pending');
    fireEvent.click(pendingFilterBtn);

    expect(screen.getByText('Conduct architecture and security review')).toBeInTheDocument();
    expect(screen.queryByText('Initialize repository structure')).not.toBeInTheDocument();

    // Click 'Completed' filter
    const completedFilterBtn = screen.getByTestId('filter-completed');
    fireEvent.click(completedFilterBtn);

    expect(screen.queryByText('Conduct architecture and security review')).not.toBeInTheDocument();
    expect(screen.getByText('Initialize repository structure')).toBeInTheDocument();

    // Click 'All' filter
    const allFilterBtn = screen.getByTestId('filter-all');
    fireEvent.click(allFilterBtn);

    expect(screen.getByText('Conduct architecture and security review')).toBeInTheDocument();
    expect(screen.getByText('Initialize repository structure')).toBeInTheDocument();
  });
});

