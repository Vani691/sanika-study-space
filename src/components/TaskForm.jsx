import { useEffect, useState } from 'react';

const emptyTask = {
  title: '',
  subject: '',
  description: '',
  dueDate: '',
  priority: 'Medium',
  studyTime: 25,
  category: '',
};

function TaskForm({ onCreateTask, onUpdateTask, taskToEdit, setTaskToEdit }) {
  const [form, setForm] = useState({ ...emptyTask });
  const [error, setError] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setForm({ ...taskToEdit });
    } else {
      setForm({ ...emptyTask });
    }
  }, [taskToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.subject.trim() || !form.dueDate) {
      setError('Please fill in the task title, subject, and due date.');
      return;
    }

    const normalizedTask = {
      ...form,
      title: form.title.trim(),
      subject: form.subject.trim(),
      description: form.description.trim(),
      category: form.category.trim() || '✨',
      studyTime: Number(form.studyTime) || 25,
    };

    if (taskToEdit) {
      onUpdateTask({ ...normalizedTask, id: taskToEdit.id });
    } else {
      onCreateTask(normalizedTask);
    }

    setForm({ ...emptyTask });
    setError('');
    setTaskToEdit(null);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          <span>Task title</span>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Finish chemistry notes" required />
        </label>
        <label>
          <span>Subject</span>
          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Chemistry" required />
        </label>
        <label className="span-2">
          <span>Description</span>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Focus on organic reactions and review examples." rows="4" />
        </label>
        <label>
          <span>Due date</span>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required />
        </label>
        <label>
          <span>Priority</span>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          <span>Estimated study time</span>
          <input type="number" name="studyTime" min="5" step="5" value={form.studyTime} onChange={handleChange} />
        </label>
        <label>
          <span>Category or emoji</span>
          <input name="category" value={form.category} onChange={handleChange} placeholder="📘 or Revision" />
        </label>
      </div>

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      <div className="form-actions">
        <button type="submit" className="primary-btn">{taskToEdit ? 'Save changes' : 'Add task'}</button>
        {taskToEdit ? (
          <button type="button" className="ghost-btn" onClick={() => { setTaskToEdit(null); setForm({ ...emptyTask }); }}>
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}

export default TaskForm;
