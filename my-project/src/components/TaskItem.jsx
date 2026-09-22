import React, { useState } from 'react';
import { CATEGORIES, PRIORITIES } from '../utils/initialData';

export default function TaskItem({ task, onToggleComplete, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editCategory, setEditCategory] = useState(task.category);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');
  const [showNotes, setShowNotes] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
  const isDueToday = !task.completed && task.dueDate === todayStr;

  const currentCategory = CATEGORIES.find(c => c.id === task.category) || CATEGORIES[1];
  const currentPriority = PRIORITIES.find(p => p.id === task.priority) || PRIORITIES[2];

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    onUpdateTask({
      ...task,
      title: editTitle.trim(),
      description: editDescription.trim(),
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate || null,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  const formatDueDate = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (isEditing) {
    return (
      <li className="task-item editing">
        <form className="edit-form" onSubmit={handleSaveEdit}>
          <div className="edit-row">
            <input
              type="text"
              className="edit-input-title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title..."
              required
              autoFocus
            />
          </div>

          <div className="edit-row">
            <textarea
              className="edit-textarea-desc"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Notes or description..."
              rows={2}
            />
          </div>

          <div className="edit-controls-row">
            <select
              className="select-custom edit-select"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              {CATEGORIES.filter(c => c.id !== 'All').map(c => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.label}
                </option>
              ))}
            </select>

            <select
              className="select-custom edit-select"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              {PRIORITIES.map(p => (
                <option key={p.id} value={p.id}>
                  {p.icon} {p.label}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="input-date-custom edit-date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />

            <div className="edit-buttons-group">
              <button type="button" className="btn-cancel-edit" onClick={handleCancelEdit}>
                Cancel
              </button>
              <button type="submit" className="btn-save-edit">
                Save
              </button>
            </div>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority.toLowerCase()}`}>
      <div className="task-main-content">
        {/* Custom Checkbox */}
        <button
          type="button"
          className={`task-checkbox ${task.completed ? 'checked' : ''}`}
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark task incomplete' : 'Mark task complete'}
        >
          {task.completed && (
            <svg className="check-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </button>

        {/* Task Body */}
        <div className="task-details-col">
          <div className="task-title-line">
            <span 
              className="task-title" 
              onClick={() => onToggleComplete(task.id)}
            >
              {task.title}
            </span>
          </div>

          {/* Badges line: Category, Priority, Due Date */}
          <div className="task-metadata-line">
            <span className="task-badge category-badge">
              <span className="badge-icon">{currentCategory.icon}</span>
              <span>{currentCategory.label}</span>
            </span>

            <span className={`task-badge priority-badge priority-${task.priority.toLowerCase()}`}>
              <span className="badge-icon">{currentPriority.icon}</span>
              <span>{currentPriority.label}</span>
            </span>

            {task.dueDate && (
              <span className={`task-badge date-badge ${isOverdue ? 'overdue' : ''} ${isDueToday ? 'today' : ''}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                </svg>
                <span>
                  {isOverdue ? '⚠️ Overdue: ' : isDueToday ? '⏰ Today' : ''}
                  {!isDueToday && formatDueDate(task.dueDate)}
                </span>
              </span>
            )}

            {task.description && (
              <button
                type="button"
                className="task-notes-toggle"
                onClick={() => setShowNotes(!showNotes)}
                title="Toggle notes"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>{showNotes ? 'Hide notes' : 'View notes'}</span>
              </button>
            )}
          </div>

          {showNotes && task.description && (
            <div className="task-notes-expanded">
              {task.description}
            </div>
          )}
        </div>

        {/* Task Actions */}
        <div className="task-action-buttons">
          <button
            type="button"
            className="action-btn edit-btn"
            onClick={() => setIsEditing(true)}
            title="Edit task"
            aria-label="Edit task"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>

          <button
            type="button"
            className="action-btn delete-btn"
            onClick={() => onDeleteTask(task.id)}
            title="Delete task"
            aria-label="Delete task"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}
