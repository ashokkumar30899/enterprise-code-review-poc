import React from 'react';
import { Task } from '../types/task';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleStatus,
  onEdit,
  onDelete,
}) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state" data-testid="empty-tasks-state">
        <p>No tasks found matching your filter criteria.</p>
      </div>
    );
  }

  return (
    <div className="task-list" role="list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleStatus={onToggleStatus}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

