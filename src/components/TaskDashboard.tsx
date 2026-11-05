import React from 'react';
import { Task } from '../types/task';

interface TaskDashboardProps {
  tasks: Task[];
}

export const TaskDashboard: React.FC<TaskDashboardProps> = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="dashboard-grid" aria-label="Task Statistics">
      <div className="stat-card stat-total">
        <span className="stat-label">Total Tasks</span>
        <span className="stat-value" data-testid="total-tasks-count">{total}</span>
      </div>
      <div className="stat-card stat-pending">
        <span className="stat-label">Pending</span>
        <span className="stat-value" data-testid="pending-tasks-count">{pending}</span>
      </div>
      <div className="stat-card stat-completed">
        <span className="stat-label">Completed</span>
        <span className="stat-value" data-testid="completed-tasks-count">{completed}</span>
      </div>
      <div className="stat-card stat-rate">
        <span className="stat-label">Completion Rate</span>
        <span className="stat-value" data-testid="completion-rate">{completionRate}%</span>
      </div>
    </section>
  );
};

