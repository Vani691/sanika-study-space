function ProgressCard({ completion, message }) {
  return (
    <article className="glass-card progress-card">
      <div
        className="progress-ring"
        aria-label={`Study completion ${completion}%`}
        style={{
          background: `conic-gradient(var(--accent) 0 ${completion}%, rgba(255,255,255,0.33) ${completion}% 100%)`,
        }}
      >
        <div className="progress-ring-inner">
          <span>{completion}%</span>
        </div>
      </div>
      <div>
        <p className="eyebrow">Daily progress</p>
        <h2>Completion mood</h2>
        <p className="progress-copy">{message}</p>
      </div>
    </article>
  );
}

export default ProgressCard;
