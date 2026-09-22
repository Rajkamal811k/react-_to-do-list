import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsOverview from './components/StatsOverview';
import TaskInput from './components/TaskInput';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import Toast from './components/Toast';
import Confetti from './components/Confetti';
import { INITIAL_TASKS } from './utils/initialData';
import './App.css';

const STORAGE_KEY_TASKS = 'taskflow_tasks_v1';
const STORAGE_KEY_THEME = 'taskflow_theme_v1';

const PRIORITY_SCORES = {
  Urgent: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export default function App() {
  // Theme state with system preference fallback
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Tasks state
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TASKS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e);
    }
    return INITIAL_TASKS;
  });

  // Filter, Category, Search, Sort
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('createdAt-desc');

  // Toast & Confetti
  const [toast, setToast] = useState(null);
  const [lastDeletedTasks, setLastDeletedTasks] = useState(null);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  // Sync theme to DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY_THEME, theme);
  }, [theme]);

  // Sync tasks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleAddTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
    setToast({
      message: 'Task added successfully!',
      type: 'success',
      canUndo: false,
    });
  };

  const handleToggleComplete = (id) => {
    setTasks(prev => {
      const nextTasks = prev.map(task => {
        if (task.id === id) {
          const updated = { ...task, completed: !task.completed };
          return updated;
        }
        return task;
      });

      // Check if all tasks are now completed
      const allCompleted = nextTasks.length > 0 && nextTasks.every(t => t.completed);
      const justCompleted = nextTasks.find(t => t.id === id)?.completed;

      if (allCompleted && justCompleted) {
        setConfettiTrigger(Date.now());
        setToast({
          message: '🏆 Outstanding! All tasks completed!',
          type: 'success',
          canUndo: false,
        });
      }

      return nextTasks;
    });
  };

  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    setToast({
      message: 'Task updated!',
      type: 'info',
      canUndo: false,
    });
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find(t => t.id === id);
    if (!taskToDelete) return;

    setLastDeletedTasks([taskToDelete]);
    setTasks(prev => prev.filter(t => t.id !== id));
    setToast({
      message: `Deleted "${taskToDelete.title.slice(0, 24)}${taskToDelete.title.length > 24 ? '...' : ''}"`,
      type: 'delete',
      canUndo: true,
    });
  };

  const handleUndoDelete = () => {
    if (lastDeletedTasks && lastDeletedTasks.length > 0) {
      setTasks(prev => [...lastDeletedTasks, ...prev]);
      setLastDeletedTasks(null);
      setToast({
        message: 'Restored deleted task(s)!',
        type: 'success',
        canUndo: false,
      });
    }
  };

  const handleClearCompleted = () => {
    const completedTasks = tasks.filter(t => t.completed);
    if (completedTasks.length === 0) return;

    setLastDeletedTasks(completedTasks);
    setTasks(prev => prev.filter(t => !t.completed));
    setToast({
      message: `Cleared ${completedTasks.length} completed task(s)`,
      type: 'delete',
      canUndo: true,
    });
  };

  const handleResetData = () => {
    setTasks(INITIAL_TASKS);
    setToast({
      message: 'Reset tasks to default template',
      type: 'info',
      canUndo: false,
    });
  };

  const handleResetFilters = () => {
    setActiveFilter('all');
    setActiveCategory('All');
    setSearchQuery('');
  };

  // Filter & Sort tasks
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (activeFilter === 'active' && task.completed) return false;
    if (activeFilter === 'completed' && !task.completed) return false;
    if (activeFilter === 'today' && task.dueDate !== todayStr) return false;

    // Category filter
    if (activeCategory !== 'All' && task.category !== activeCategory) return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description && task.description.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc) return false;
    }

    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'createdAt-desc') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === 'dueDate-asc') {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sortBy === 'priority-desc') {
      return (PRIORITY_SCORES[b.priority] || 0) - (PRIORITY_SCORES[a.priority] || 0);
    }
    if (sortBy === 'title-asc') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const isFiltered = activeFilter !== 'all' || activeCategory !== 'All' || searchQuery.trim() !== '';
  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div className="app-wrapper">
      <Confetti trigger={confettiTrigger} />

      <main className="app-container">
        <Navbar
          theme={theme}
          onToggleTheme={toggleTheme}
          onResetData={handleResetData}
        />

        <StatsOverview tasks={tasks} />

        <TaskInput onAddTask={handleAddTask} />

        <TaskFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />

        <TaskList
          tasks={sortedTasks}
          onToggleComplete={handleToggleComplete}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          isFiltered={isFiltered}
          onResetFilters={handleResetFilters}
        />
      </main>

      <Toast
        toast={toast}
        onUndo={handleUndoDelete}
        onClose={() => setToast(null)}
      />
    </div>
  );
}
