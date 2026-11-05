import React from 'react';
import { TaskFilterStatus } from '../types/task';

interface TaskFilterProps {
  statusFilter: TaskFilterStatus;
  onStatusChange: (status: TaskFilterStatus) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  onStatusChange,
}) => {
  return (
    <div className="filter-controls" role="region" aria-label="Task Filters">
      <div className="filter-group">
        <label htmlFor="status-filter" className="filter-label">Filter by Status:</label>
        <div className="filter-button-group" id="status-filter">
          {(['all', 'pending', 'completed'] as TaskFilterStatus[]).map((status) => (
            <button
              key={status}
              type="button"
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => onStatusChange(status)}
              data-testid={`filter-${status}`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

