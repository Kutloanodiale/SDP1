"use client";

import StatusStamp from "./StatusStamp";

function formatDueDate(dueDate) {
  if (!dueDate) return null;
  const [y, m, d] = dueDate.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function TaskRow({ task, index, onEdit, onArchive, onStatusChange }) {
  const dueLabel = formatDueDate(task.due_date);

  return (
    <div className={`task-row${task.archived ? " is-archived" : ""}`}>
      <div className="task-row-index">{String(index + 1).padStart(2, "0")}</div>

      <div className="task-row-main">
        <div className="task-title-line">
          <span className={`task-title${task.status === "complete" ? " is-complete" : ""}`}>
            {task.title}
          </span>
          <span className="task-topic">{task.topic}</span>
        </div>

        {task.description && <p className="task-description">{task.description}</p>}

        <div className="task-meta-line">
          {dueLabel ? (
            <span className={`task-due-date${task.overdue ? " is-overdue" : ""}`}>
              Due {dueLabel}
            </span>
          ) : (
            <span className="task-due-date">No due date</span>
          )}
          {task.overdue && <span className="overdue-stamp">Overdue</span>}
        </div>
      </div>

      <div className="task-actions">
        {task.archived ? (
          <span className="task-archived-label">Archived</span>
        ) : (
          <StatusStamp status={task.status} onChange={(status) => onStatusChange(task.id, status)} />
        )}
        <div className="task-row-buttons">
          <button type="button" onClick={() => onEdit(task)}>
            Edit
          </button>
          {!task.archived && (
            <button type="button" onClick={() => onArchive(task.id)}>
              Archive
            </button>
          )}
        </div>
      </div>
    </div>
  );
}