import { Search, Trash2 } from 'lucide-react';

const priorityOptions = ['All', 'Low', 'Medium', 'High'];
const filterOptions = ['All', 'Pending', 'Completed', 'Overdue'];

function TaskFilters({ search, setSearch, filter, setFilter, priorityFilter, setPriorityFilter, sortBy, setSortBy, clearAllTasks }) {
  return (
    <div className="filters-wrap">
      <div className="search-input-wrap">
        <Search size={16} />
        <input
          type="search"
          aria-label="Search tasks"
          placeholder="Search by title or subject"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="filter-row">
        <select aria-label="Filter tasks by status" value={filter} onChange={(event) => setFilter(event.target.value)}>
          {filterOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select aria-label="Filter tasks by priority" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
          {priorityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        <select aria-label="Sort tasks" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="dueDate">Sort by due date</option>
          <option value="priority">Sort by priority</option>
          <option value="newest">Sort by newest</option>
        </select>
      </div>

      <button type="button" className="ghost-btn delete-btn" onClick={clearAllTasks}>
        <Trash2 size={16} /> Clear all tasks
      </button>
    </div>
  );
}

export default TaskFilters;
