import React from 'react';

export default function Toast({ toast, onUndo, onClose }) {
  if (!toast) return null;

  return (
    <div className={`toast-notification ${toast.type || 'info'}`} role="status">
      <div className="toast-content">
        <span className="toast-icon">
          {toast.type === 'success' ? '✨' : toast.type === 'delete' ? '🗑️' : 'ℹ️'}
        </span>
        <span className="toast-message">{toast.message}</span>
      </div>

      <div className="toast-actions">
        {toast.canUndo && (
          <button type="button" className="toast-undo-btn" onClick={onUndo}>
            Undo
          </button>
        )}
        <button
          type="button"
          className="toast-close-btn"
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
