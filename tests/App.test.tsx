import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';

describe('Enterprise Task Manager App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders application title, dashboard, and initial tasks with priority badges', () => {
    render(<App />);

    expect(screen.getByText('Enterprise Task Manager')).toBeInTheDocument();
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('4');
    expect(screen.getByText('Initialize repository structure')).toBeInTheDocument();
    expect(screen.getByTestId('priority-badge-task-1')).toHaveTextContent('HIGH');
  });

  it('allows adding a new task with custom priority', () => {
    render(<App />);

    const titleInput = screen.getByLabelText(/Title \*/i);
    const prioritySelect = screen.getByLabelText(/Select Task Priority/i);
    const descInput = screen.getByLabelText(/Description/i);
    const submitBtn = screen.getByRole('button', { name: /Add Task/i });

    fireEvent.change(titleInput, { target: { value: 'Conduct Security Scan' } });
    fireEvent.change(prioritySelect, { target: { value: 'high' } });
    fireEvent.change(descInput, { target: { value: 'Run SAST and DAST scanners' } });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Conduct Security Scan')).toBeInTheDocument();
    expect(screen.getByText('Run SAST and DAST scanners')).toBeInTheDocument();
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('5');
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

  it('allows editing an existing task and updating its priority', () => {
    render(<App />);

    const editBtn = screen.getByLabelText(/Edit "Conduct architecture and security review"/i);
    fireEvent.click(editBtn);

    expect(screen.getByText('Edit Task')).toBeInTheDocument();
    const titleInput = screen.getByLabelText(/Title \*/i);
    const prioritySelect = screen.getByLabelText(/Select Task Priority/i);

    fireEvent.change(titleInput, { target: { value: 'Conduct architecture & SOC2 review' } });
    fireEvent.change(prioritySelect, { target: { value: 'high' } });

    const saveBtn = screen.getByRole('button', { name: /Save Changes/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText('Conduct architecture & SOC2 review')).toBeInTheDocument();
    expect(screen.getByTestId('priority-badge-task-3')).toHaveTextContent('HIGH');
  });

  it('allows deleting a task', () => {
    render(<App />);

    expect(screen.getByText('Initialize repository structure')).toBeInTheDocument();
    const deleteBtn = screen.getByLabelText(/Delete "Initialize repository structure"/i);
    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Initialize repository structure')).not.toBeInTheDocument();
    expect(screen.getByTestId('total-tasks-count')).toHaveTextContent('3');
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

  it('filters tasks by priority correctly', () => {
    render(<App />);

    const priorityFilterSelect = screen.getByTestId('filter-priority-select');

    // Filter by 'High' priority
    fireEvent.change(priorityFilterSelect, { target: { value: 'high' } });
    expect(screen.getByText('Initialize repository structure')).toBeInTheDocument();
    expect(screen.getByText('Implement CI/CD pipeline')).toBeInTheDocument();
    expect(screen.queryByText('Conduct architecture and security review')).not.toBeInTheDocument();
    expect(screen.queryByText('Explore theme customization')).not.toBeInTheDocument();

    // Filter by 'Low' priority
    fireEvent.change(priorityFilterSelect, { target: { value: 'low' } });
    expect(screen.queryByText('Initialize repository structure')).not.toBeInTheDocument();
    expect(screen.getByText('Explore theme customization')).toBeInTheDocument();
  });
});
