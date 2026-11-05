import React from 'react';
import { Task } from '../types/task';
import { formatDate } from '../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  const isCompleted = task.status === 'completed';

  return (
    <article className={`task-card ${isCompleted ? 'task-completed' : ''}`} data-testid={`task-${task.id}`}>
      <div className="task-header">
        <label className="task-checkbox-label">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => onToggleStatus(task.id)}
            aria-label={`Mark "${task.title}" as ${isCompleted ? 'pending' : 'completed'}`}
          />
          <span className={`task-title ${isCompleted ? 'strikethrough' : ''}`}>
            {task.title}
          </span>
        </label>
        <div className="task-badges">
          <span
            className={`badge badge-priority-${task.priority}`}
            data-testid={`priority-badge-${task.id}`}
          >
            {task.priority.toUpperCase()}
          </span>
          <span className={`badge status-badge ${isCompleted ? 'badge-completed' : 'badge-pending'}`}>
            {isCompleted ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">
        <span className="task-date">
          Updated: {formatDate(task.updatedAt) || 'Just now'}
        </span>
        <div className="task-actions">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => onEdit(task)}
            aria-label={`Edit "${task.title}"`}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete "${task.title}"`}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};
