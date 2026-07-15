function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="confirm-modal glass-card">
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="form-actions">
          <button type="button" className="primary-btn" onClick={onConfirm}>Confirm</button>
          <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
