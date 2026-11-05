import React, { useState, useEffect, useMemo } from 'react';
import { Task, TaskFilterStatus, TaskFormData } from './types/task';
import { taskStorage } from './services/taskStorage';
import { TaskDashboard } from './components/TaskDashboard';
import { TaskFilter } from './components/TaskFilter';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import './App.css';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskFilterStatus>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const loaded = taskStorage.getTasks();
    setTasks(loaded);
  }, []);

  const handleCreateOrUpdate = (data: TaskFormData) => {
    const now = new Date().toISOString();
    if (editingTask) {
      const updatedTasks = tasks.map((t) =>
        t.id === editingTask.id
          ? {
              ...t,
              title: data.title,
              description: data.description,
              updatedAt: now,
            }
          : t
      );
      setTasks(updatedTasks);
      taskStorage.saveTasks(updatedTasks);
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        title: data.title,
        description: data.description,
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      };
      const updatedTasks = [newTask, ...tasks];
      setTasks(updatedTasks);
      taskStorage.saveTasks(updatedTasks);
    }
  };

  const handleToggleStatus = (id: string) => {
    const now = new Date().toISOString();
    const updatedTasks = tasks.map((t) =>
      t.id === id
        ? {
            ...t,
            status: (t.status === 'completed' ? 'pending' : 'completed') as Task['status'],
            updatedAt: now,
          }
        : t
    );
    setTasks(updatedTasks);
    taskStorage.saveTasks(updatedTasks);
  };

  const handleDelete = (id: string) => {
    const updatedTasks = tasks.filter((t) => t.id !== id);
    setTasks(updatedTasks);
    taskStorage.saveTasks(updatedTasks);
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (statusFilter === 'all') return true;
      return t.status === statusFilter;
    });
  }, [tasks, statusFilter]);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>Enterprise Task Manager</h1>
          <p className="subtitle">Enterprise Git Workflow & Code Review Platform</p>
        </div>
      </header>

      <main className="app-main">
        <TaskDashboard tasks={tasks} />

        <div className="content-layout">
          <aside className="sidebar">
            <TaskForm
              onSubmit={handleCreateOrUpdate}
              editingTask={editingTask}
              onCancelEdit={() => setEditingTask(null)}
            />
          </aside>

          <section className="tasks-view" aria-label="Tasks List View">
            <div className="tasks-header">
              <h2>Tasks ({filteredTasks.length})</h2>
              <TaskFilter
                statusFilter={statusFilter}
                onStatusChange={setStatusFilter}
              />
            </div>

            <TaskList
              tasks={filteredTasks}
              onToggleStatus={handleToggleStatus}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Enterprise Task Manager &copy; {new Date().getFullYear()} &bull; CI/CD & Branching Standard</p>
      </footer>
    </div>
  );
};

export default App;

