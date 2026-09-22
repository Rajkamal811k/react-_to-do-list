import React from 'react';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
  isFiltered,
  onResetFilters,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state-card">
        <div className="empty-state-icon">
          {isFiltered ? '🔍' : '🎯'}
        </div>
        <h3 className="empty-state-title">
          {isFiltered ? 'No tasks match your criteria' : 'You have no tasks yet'}
        </h3>
        <p className="empty-state-text">
          {isFiltered
            ? 'Try changing your search keywords, priority, or category filters.'
            : 'Add your first task above to kickstart your productivity!'}
        </p>
        {isFiltered && (
          <button
            type="button"
            className="btn-reset-filters"
            onClick={onResetFilters}
          >
            Clear All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <ul className="task-list" aria-label="Tasks list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </ul>
  );
}
