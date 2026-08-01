import TaskRow from "./TaskRow";

export default function TaskList({ tasks, onEdit, onArchive, onStatusChange, showArchived }) {
  if (tasks.length === 0) {
    return (
      <div className="ledger-sheet">
        <p className="ledger-empty">
          {showArchived
            ? "No archived entries yet."
            : "No entries yet. Add your first task to open the ledger."}
        </p>
      </div>
    );
  }

  return (
    <div className="ledger-sheet">
      {tasks.map((task, i) => (
        <TaskRow
          key={task.id}
          task={task}
          index={i}
          onEdit={onEdit}
          onArchive={onArchive}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}