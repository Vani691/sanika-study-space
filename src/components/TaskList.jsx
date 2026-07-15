import TaskCard from './TaskCard';

function TaskList({ tasks, onToggleTask, onDeleteTask, onEditTask }) {
  if (!tasks.length) {
    return (
      <div className="empty-state">
        <p>No tasks match this view yet. Try creating a fresh study plan for Sanika.</p>
      </div>
    );
  }

  return (
    <div className="task-list" id="tasks">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
