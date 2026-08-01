"use client";

import { useState } from "react";

export default function TaskForm({ initialValues, onSubmit, onCancel, submitLabel }) {
    const [title, setTitle] = useState(initialValues?.title || "");
    const [description, setDescription] = useState(initialValues?.description || "");
    const [dueDate, setDueDate] = useState(initialValues?.due_date || "");
    const [topic, setTopic] = useState(initialValues?.topic || "");
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);

    const isEditing = !!initialValues?.id;

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) {
        setError("Title is required.");
        return;
        }
        setError(null);
        setSaving(true);
        try {
        await onSubmit({
            title: title.trim(),
            description: description.trim(),
            dueDate: dueDate || null,
            topic: topic.trim() || "General",
        });
        } catch (err) {
        setError(err.message || "Something went wrong.");
        setSaving(false);
        }
    }
    return (
    <div className="form-overlay" onClick={onCancel}>
      <form className="task-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{isEditing ? "Edit entry" : "New entry"}</h2>

        {error && <p className="form-error">{error}</p>}

        <div className="form-field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="dueDate">Due date</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate || ""}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            type="text"
            placeholder="General"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="button" className="btn-secondary" onClick={onCancel} disabled={saving}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? "Saving…" : submitLabel || "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}