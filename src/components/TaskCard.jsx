import { CalendarDays, CircleCheckBig, PencilLine, Trash2 } from 'lucide-react';

const getTodayStart = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const parseDueDate = (value) => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

function statusText(task) {
  const today = getTodayStart();
  const dueDate = parseDueDate(task.dueDate);

  if (!dueDate) return 'Invalid date';
  if (task.completed) return 'Completed';

  const dateDiff = Math.round((dueDate - today) / 86400000);
  if (dateDiff === 0) return 'Due today';
  if (dateDiff === 1) return 'Due tomorrow';
  if (dateDiff < 0) return 'Overdue';
  return `Due in ${dateDiff} days`;
}

function TaskCard({ task, onToggleTask, onDeleteTask, onEditTask }) {
  const status = statusText(task);
  const isOverdue = status === 'Overdue';

  return (
    <article className={`task-card ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-head">
        <div>
          <div className="task-meta-row">
            <span className="emoji-badge">{task.category || '✨'}</span>
            <span className={`priority-tag priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
          </div>
          <h3>{task.title}</h3>
          <p className="subject-line">{task.subject}</p>
        </div>
        <div className="task-actions">
          <button type="button" aria-label={`Edit ${task.title}`} className="icon-btn" onClick={() => onEditTask(task)}>
            <PencilLine size={16} />
          </button>
          <button type="button" aria-label={`Delete ${task.title}`} className="icon-btn danger" onClick={() => onDeleteTask(task.id)}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <p className="task-description">{task.description || 'No description added yet.'}</p>

      <div className="task-footer-row">
        <span className="due-pill"><CalendarDays size={14} /> {statusText(task)}</span>
        <span className="time-pill">{task.studyTime} min</span>
      </div>

      <button type="button" className="task-complete-btn" onClick={() => onToggleTask(task.id)}>
        <CircleCheckBig size={16} />
        {task.completed ? 'Mark as pending' : 'Mark as completed'}
      </button>
    </article>
  );
}

export default TaskCard;
