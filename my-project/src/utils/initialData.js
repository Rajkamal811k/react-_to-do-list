export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Finalize quarterly product roadmap & strategy presentation',
    description: 'Review OKRs with the team and create slides for the stakeholder review.',
    category: 'Work',
    priority: 'Urgent',
    completed: false,
    dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    title: 'Complete 30-minute cardio and strength training session',
    description: 'Focus on core stability and upper body routine at the gym.',
    category: 'Health',
    priority: 'High',
    completed: true,
    dueDate: new Date().toISOString().split('T')[0], // Today
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'task-3',
    title: 'Study React 19 server actions and modern concurrency hooks',
    description: 'Read the official docs and experiment with useActionState & optimistic UI patterns.',
    category: 'Study',
    priority: 'Medium',
    completed: false,
    dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'task-4',
    title: 'Pick up fresh organic groceries and matcha tea',
    description: 'Almond milk, avocados, whole grain sourdough, and organic green tea.',
    category: 'Shopping',
    priority: 'Low',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0], // Today
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'task-5',
    title: 'Plan weekend nature hike and photography trail',
    description: 'Check weather forecast, pack trail mix, and charge camera batteries.',
    category: 'Personal',
    priority: 'Medium',
    completed: true,
    dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    createdAt: new Date(Date.now() - 90000000).toISOString(),
  },
];

export const CATEGORIES = [
  { id: 'All', label: 'All Categories', icon: '✨' },
  { id: 'Work', label: 'Work', icon: '💼', color: 'var(--cat-work)' },
  { id: 'Personal', label: 'Personal', icon: '🧘', color: 'var(--cat-personal)' },
  { id: 'Study', label: 'Study', icon: '📚', color: 'var(--cat-study)' },
  { id: 'Shopping', label: 'Shopping', icon: '🛒', color: 'var(--cat-shopping)' },
  { id: 'Health', label: 'Health', icon: '🏃', color: 'var(--cat-health)' },
  { id: 'Other', label: 'Other', icon: '📌', color: 'var(--cat-other)' },
];

export const PRIORITIES = [
  { id: 'Urgent', label: 'Urgent', color: 'var(--priority-urgent)', icon: '🔥' },
  { id: 'High', label: 'High', color: 'var(--priority-high)', icon: '⚡' },
  { id: 'Medium', label: 'Medium', color: 'var(--priority-medium)', icon: '🔹' },
  { id: 'Low', label: 'Low', color: 'var(--priority-low)', icon: '🌱' },
];
