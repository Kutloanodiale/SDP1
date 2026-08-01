"use client";

const STATUS_LABELS = {
  todo: "todo",
  "in-progress": "in progress",
  complete: "complete",
};

const STATUS_ORDER = ["todo", "in-progress", "complete"];

export default function StatusStamp({ status, onChange }) {
  return (
    <select
      className={`status-stamp status-select status-stamp--${status}`}
      value={status}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Task status"
    >
      {STATUS_ORDER.map((s) => (
        <option key={s} value={s}>
          {STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
