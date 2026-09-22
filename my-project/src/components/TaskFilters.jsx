import React from 'react';
import { CATEGORIES } from '../utils/initialData';

export default function TaskFilters({
  activeFilter,
  setActiveFilter,
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  completedCount,
  onClearCompleted,
}) {
  const filterTabs = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'today', label: 'Due Today' },
  ];

  return (
    <div className="filters-container">
      {/* Top row: Search and Sort */}
      <div className="search-sort-row">
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            id="search-task-input"
            type="text"
            className="search-input"
            placeholder="Search tasks by title or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort-tasks-select" className="sort-label">
            Sort:
          </label>
          <select
            id="sort-tasks-select"
            className="select-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="dueDate-asc">Due Date (Soonest)</option>
            <option value="priority-desc">Priority (Urgent first)</option>
            <option value="title-asc">Alphabetical (A - Z)</option>
          </select>
        </div>
      </div>

      {/* Middle row: Status tabs & Clear Completed */}
      <div className="status-tabs-row">
        <div className="tabs-pill-group" role="tablist">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeFilter === tab.id}
              className={`filter-tab-btn ${activeFilter === tab.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {completedCount > 0 && (
          <button
            id="btn-clear-completed"
            className="clear-completed-btn"
            onClick={onClearCompleted}
            title="Clear all completed tasks"
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>

      {/* Category Pills Bar */}
      <div className="category-scroll-bar" role="toolbar" aria-label="Filter by Category">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`category-chip ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="chip-icon">{cat.icon}</span>
            <span className="chip-label">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
