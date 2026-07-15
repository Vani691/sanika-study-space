function DashboardStats({ totalTasks, completedTasks, pendingTasks, overdueTasks }) {
  const cards = [
    { label: 'Total Tasks', value: totalTasks },
    { label: 'Completed', value: completedTasks },
    { label: 'Pending', value: pendingTasks },
    { label: 'Overdue', value: overdueTasks },
  ];

  return (
    <div className="stats-grid" id="dashboard">
      {cards.map((card) => (
        <article key={card.label} className="glass-card stat-card">
          <p className="stat-label">{card.label}</p>
          <strong>{card.value}</strong>
        </article>
      ))}
    </div>
  );
}

export default DashboardStats;
