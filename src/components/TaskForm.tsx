import React, { useState, useEffect } from 'react';
import { Task, TaskFormData } from '../types/task';

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  editingTask,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setError(null);
    } else {
      setTitle('');
      setDescription('');
      setError(null);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required.');
      return;
    }
    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
    if (!editingTask) {
      setTitle('');
      setDescription('');
    }
    setError(null);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
      {error && <div className="form-error" role="alert">{error}</div>}

      <div className="form-field">
        <label htmlFor="task-title">Title *</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Conduct security vulnerability assessment"
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details, acceptance criteria, or notes..."
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Save Changes' : 'Add Task'}
        </button>
        {editingTask && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

