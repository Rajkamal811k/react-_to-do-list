import React from 'react';

export default function StatsOverview({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  const todayStr = new Date().toISOString().split('T')[0];
  const overdue = tasks.filter(t => !t.completed && t.dueDate && t.dueDate < todayStr).length;
  const urgentCount = tasks.filter(t => !t.completed && t.priority === 'Urgent').length;

  let motivation = "Let's make today productive!";
  if (total > 0 && percentage === 100) {
    motivation = '🎉 All tasks completed! You are phenomenal!';
  } else if (percentage >= 70) {
    motivation = '🔥 Incredible momentum! Almost there!';
  } else if (percentage >= 40) {
    motivation = '⚡ Steady progress, keep going!';
  }

  return (
    <section className="stats-container" aria-label="Productivity Overview">
      <div className="stats-card-main">
        <div className="progress-info">
          <div className="progress-badge">Productivity Pulse</div>
          <h2 className="progress-percentage">{percentage}%</h2>
          <p className="progress-motivation">{motivation}</p>
        </div>

        <div className="progress-ring-wrapper">
          <svg className="progress-ring" viewBox="0 0 100 100">
            <circle
              className="progress-ring-bg"
              cx="50"
              cy="50"
              r="40"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              className="progress-ring-fill"
              cx="50"
              cy="50"
              r="40"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 - (251.2 * percentage) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="progress-ring-text">
            <span>{completed}</span> / {total}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-pill">
          <div className="stat-icon total">📋</div>
          <div className="stat-data">
            <span className="stat-val">{total}</span>
            <span className="stat-lbl">Total Tasks</span>
          </div>
        </div>

        <div className="stat-pill">
          <div className="stat-icon completed">✅</div>
          <div className="stat-data">
            <span className="stat-val">{completed}</span>
            <span className="stat-lbl">Completed</span>
          </div>
        </div>

        <div className="stat-pill">
          <div className="stat-icon pending">⏳</div>
          <div className="stat-data">
            <span className="stat-val">{pending}</span>
            <span className="stat-lbl">Pending</span>
          </div>
        </div>

        <div className="stat-pill">
          <div className="stat-icon urgent">🔥</div>
          <div className="stat-data">
            <span className="stat-val">{urgentCount}</span>
            <span className="stat-lbl">Urgent</span>
          </div>
        </div>
      </div>
    </section>
  );
}
