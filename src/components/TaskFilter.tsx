import React from 'react';
import { TaskFilterStatus, TaskFilterPriority } from '../types/task';

interface TaskFilterProps {
  statusFilter: TaskFilterStatus;
  priorityFilter: TaskFilterPriority;
  onStatusChange: (status: TaskFilterStatus) => void;
  onPriorityChange: (priority: TaskFilterPriority) => void;
}

export const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}) => {
  return (
    <div className="filter-controls" role="region" aria-label="Task Filters">
      <div className="filter-group">
        <label htmlFor="status-filter" className="filter-label">Status:</label>
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

      <div className="filter-group">
        <label htmlFor="priority-filter-select" className="filter-label">Priority:</label>
        <select
          id="priority-filter-select"
          className="filter-select"
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value as TaskFilterPriority)}
          data-testid="filter-priority-select"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>
    </div>
  );
};
