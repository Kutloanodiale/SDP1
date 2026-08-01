"use client";

export default function Toolbar({ sort, onSortChange, showArchived, onToggleArchived, onNewTask }) {
  return (
    <div className="toolbar">
      <div className="toolbar-controls">
        <div>
          <label htmlFor="sort">Sort by</label>
          <select id="sort" value={sort} onChange={(e) => onSortChange(e.target.value)}>
            <option value="due_date">Due date</option>
            <option value="status">Status</option>
            <option value="topic">Topic</option>
          </select>
        </div>

        <label className="toolbar-checkbox">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => onToggleArchived(e.target.checked)}
          />
          Show archived
        </label>
      </div>

      <button type="button" className="btn-new-entry" onClick={onNewTask}>
        + New entry
      </button>
    </div>
  );
}