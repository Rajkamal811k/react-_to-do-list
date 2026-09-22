import React, { useState } from 'react';
import { CATEGORIES, PRIORITIES } from '../utils/initialData';

export default function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      id: 'task-' + Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setShowDetails(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !showDetails) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form className="task-input-card" onSubmit={handleSubmit}>
      <div className="input-main-row">
        <div className="input-field-wrapper">
          <svg className="input-sparkle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" strokeDasharray="3 3"/>
            <path d="M12 8v8M8 12h8" />
          </svg>
          <input
            id="task-title-input"
            type="text"
            className="main-input"
            placeholder="What needs to be done? (e.g., Review design mocks...)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            required
          />
        </div>

        <div className="input-actions-quick">
          <button
            type="button"
            className={`btn-toggle-details ${showDetails ? 'active' : ''}`}
            onClick={() => setShowDetails(!showDetails)}
            title="Add more details (notes, date, category)"
            aria-label="Toggle task details"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
            <span>Options</span>
          </button>

          <button 
            id="btn-add-task" 
            type="submit" 
            className="btn-primary-add"
            disabled={!title.trim()}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="input-expanded-drawer">
          <div className="input-field-group">
            <label htmlFor="task-desc-input" className="field-label">Notes & Sub-details (Optional)</label>
            <textarea
              id="task-desc-input"
              className="details-textarea"
              placeholder="Add extra context, links, or notes..."
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="input-options-grid">
            {/* Category Select */}
            <div className="option-item">
              <label htmlFor="category-select" className="field-label">Category</label>
              <select
                id="category-select"
                className="select-custom"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.filter(c => c.id !== 'All').map(c => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority Select */}
            <div className="option-item">
              <label htmlFor="priority-select" className="field-label">Priority</label>
              <select
                id="priority-select"
                className="select-custom"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {PRIORITIES.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.icon} {p.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div className="option-item">
              <label htmlFor="due-date-input" className="field-label">Due Date</label>
              <input
                id="due-date-input"
                type="date"
                className="input-date-custom"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
