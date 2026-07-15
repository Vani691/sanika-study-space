import { useEffect, useMemo, useState } from 'react';
import {
  CalendarClock,
  ListTodo,
  NotebookPen,
  Sparkles,
} from 'lucide-react';
import Navbar from './components/Navbar';
import WelcomeHeader from './components/WelcomeHeader';
import DashboardStats from './components/DashboardStats';
import ProgressCard from './components/ProgressCard';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import PomodoroTimer from './components/PomodoroTimer';
import QuoteCard from './components/QuoteCard';
import ThemeToggle from './components/ThemeToggle';
import ConfirmDialog from './components/ConfirmDialog';

const getTodayStart = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

const formatDateInput = (date) => date.toISOString().slice(0, 10);

const parseDueDate = (value) => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getDueStatus = (task) => {
  const today = getTodayStart();
  const dueDate = parseDueDate(task.dueDate);

  if (!dueDate) return 'Invalid date';
  if (task.completed) return 'Completed';

  const diffInDays = Math.round((dueDate - today) / 86400000);
  if (diffInDays < 0) return 'Overdue';
  if (diffInDays === 0) return 'Due today';
  if (diffInDays === 1) return 'Due tomorrow';
  return `Due in ${diffInDays} days`;
};

const readStoredTasks = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultTasks;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : defaultTasks;
  } catch {
    return defaultTasks;
  }
};

const readStoredTheme = () => {
  try {
    return window.localStorage.getItem(THEME_KEY) || 'light';
  } catch {
    return 'light';
  }
};

const writeStoredValue = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable; fail gracefully.
  }
};

const STORAGE_KEY = 'sanika-study-space.tasks';
const THEME_KEY = 'sanika-study-space.theme';

const defaultTasks = [
  {
    id: 1,
    title: 'Review biology flashcards',
    subject: 'Biology',
    description: 'Go over the chapter summary and quiz yourself on key terms.',
    dueDate: formatDateInput(new Date()),
    priority: 'High',
    studyTime: 45,
    category: '🧬',
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: 'Solve two math problems',
    subject: 'Mathematics',
    description: 'Complete a short set of algebra questions with a timer.',
    dueDate: formatDateInput(new Date(Date.now() + 86400000)),
    priority: 'Medium',
    studyTime: 30,
    category: '📐',
    completed: false,
    createdAt: Date.now() + 1000,
  },
  {
    id: 3,
    title: 'Draft literature notes',
    subject: 'English',
    description: 'Summarize the key themes and quote a few supporting lines.',
    dueDate: formatDateInput(new Date(Date.now() - 86400000)),
    priority: 'Low',
    studyTime: 20,
    category: '📚',
    completed: false,
    createdAt: Date.now() + 2000,
  },
];

const priorityRank = {
  High: 3,
  Medium: 2,
  Low: 1,
};

function App() {
  const [tasks, setTasks] = useState(() => readStoredTasks());
  const [theme, setTheme] = useState(() => readStoredTheme());
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [pendingDeletionId, setPendingDeletionId] = useState(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

  useEffect(() => {
    writeStoredValue(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    writeStoredValue(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const today = getTodayStart();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overdueTasks = tasks.filter((task) => getDueStatus(task) === 'Overdue').length;
  const completion = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    return [...tasks]
      .filter((task) => {
        const matchesSearch =
          !searchTerm ||
          task.title.toLowerCase().includes(searchTerm) ||
          task.subject.toLowerCase().includes(searchTerm);

        const dueStatus = getDueStatus(task);
        const isOverdue = dueStatus === 'Overdue';
        const matchesFilter =
          filter === 'All' ||
          (filter === 'Pending' && !task.completed) ||
          (filter === 'Completed' && task.completed) ||
          (filter === 'Overdue' && isOverdue);

        const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
        return matchesSearch && matchesFilter && matchesPriority;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          return priorityRank[b.priority] - priorityRank[a.priority] || a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === 'newest') {
          return b.createdAt - a.createdAt;
        }
        return a.dueDate.localeCompare(b.dueDate);
      });
  }, [tasks, search, filter, priorityFilter, sortBy, today]);

  const createTask = (task) => {
    setTasks((currentTasks) => [
      {
        ...task,
        id: Date.now() + Math.random(),
        createdAt: Date.now(),
        completed: false,
      },
      ...currentTasks,
    ]);
  };

  const updateTask = (task) => {
    setTasks((currentTasks) =>
      currentTasks.map((item) => (item.id === task.id ? { ...task, createdAt: item.createdAt } : item)),
    );
    setTaskToEdit(null);
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setPendingDeletionId(taskId);
  };

  const confirmDeleteTask = () => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== pendingDeletionId));
    setPendingDeletionId(null);
  };

  const clearAllTasks = () => {
    setShowClearAllConfirm(true);
  };

  const confirmClearAllTasks = () => {
    setTasks([]);
    setShowClearAllConfirm(false);
  };

  const getMotivation = () => {
    if (completion >= 100) return 'A full day of progress — you are glowing with consistency.';
    if (completion >= 60) return 'You are moving steadily. One focused session at a time.';
    if (completion >= 30) return 'A gentle rhythm is building. Keep the momentum kind.';
    return 'A soft start is still a start. Let’s make this hour count.';
  };

  return (
    <div className="app-shell">
      <div className="background-orb orb-1" />
      <div className="background-orb orb-2" />
      <div className="background-orb orb-3" />

      <Navbar />
      <main className="page-content">
        <WelcomeHeader />
        <section className="dashboard-grid" aria-label="Study dashboard">
          <DashboardStats totalTasks={totalTasks} completedTasks={completedTasks} pendingTasks={pendingTasks} overdueTasks={overdueTasks} />
          <ProgressCard completion={completion} message={getMotivation()} />
        </section>

        <section className="content-grid">
          <div className="glass-card form-card">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Create a task</p>
                <h2>Plan your next learning session</h2>
              </div>
              <span className="pill-icon"><NotebookPen size={18} /></span>
            </div>
            <TaskForm onCreateTask={createTask} onUpdateTask={updateTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
          </div>

          <div className="glass-card focus-card">
            <PomodoroTimer />
          </div>
        </section>

        <section className="below-grid">
          <div className="glass-card filters-card">
            <div className="section-title-row">
              <div>
                <p className="eyebrow">Task workspace</p>
                <h2>Search, sort, and organize</h2>
              </div>
              <span className="pill-icon"><ListTodo size={18} /></span>
            </div>
            <TaskFilters
              search={search}
              setSearch={setSearch}
              filter={filter}
              setFilter={setFilter}
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              clearAllTasks={clearAllTasks}
            />
            <TaskList
              tasks={filteredTasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
              onEditTask={setTaskToEdit}
            />
          </div>

          <div className="glass-card quote-card">
            <QuoteCard />
          </div>
        </section>

        <div className="theme-toggle-wrap">
          <ThemeToggle theme={theme} onToggle={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))} />
        </div>

        <ConfirmDialog
          open={Boolean(pendingDeletionId)}
          title="Delete this task?"
          message="This task will be removed from your study plan."
          onConfirm={confirmDeleteTask}
          onCancel={() => setPendingDeletionId(null)}
        />

        <ConfirmDialog
          open={showClearAllConfirm}
          title="Clear all tasks?"
          message="This will remove every saved task from your planner."
          onConfirm={confirmClearAllTasks}
          onCancel={() => setShowClearAllConfirm(false)}
        />

        <footer className="app-footer">
          <span><Sparkles size={16} /> Sanika’s Study Space</span>
          <span><CalendarClock size={16} /> Keep your goals gentle and consistent</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
