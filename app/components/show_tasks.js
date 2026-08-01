"use client";
import { useEffect, useState, useCallback } from "react";
import Toolbar from "./Toolbar";
import TaskList from "./Task_page";
import TaskForm from "./add_task";

export default function TaskBoard() {
    const [tasks, setTasks] = useState([]);
    const [sort, setSort] = useState("due_date");
    const [showArchived, setShowArchived] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    
    const [formTask, setFormTask] = useState(null); 

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try{ 
            const params = new URLSearchParams({ sort, showArchived: String(showArchived) });
            const res = await fetch(`/api/tasks?${params.toString()}`);
            if (!res.ok) throw new Error("Could not load tasks.");
            const data = await res.json();
            setTasks(data.tasks);
            } catch (err) {
            setError(err.message);
            } finally {
            setLoading(false);
            }
        }, [sort, showArchived]);

        useEffect(() => {
           fetchTasks ();
        }, [fetchTasks]);

    async function handleFormSubmit(fields) {
        const isEditing = !!formTask?.id;
        const url = isEditing ? `/api/tasks/${formTask.id}` : "/api/tasks";
        const method = isEditing ? "PATCH" : "POST";

        const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
        });

        if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not save task.");
        }

        setFormTask(null);
        await fetchTasks();
    }
    async function handleArchive(id) {
    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: true }),
    });
    await fetchTasks();
  }

  async function handleStatusChange(id, status) {
    
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      await fetchTasks();
      return;
    }
    await fetchTasks(); 
  }
   return (
    <div>
      <Toolbar
        sort={sort}
        onSortChange={setSort}
        showArchived={showArchived}
        onToggleArchived={setShowArchived}
        onNewTask={() => setFormTask({})}
      />

      {error && <p className="form-error">{error}</p>}

      {loading ? (
        <p className="ledger-empty">Loading…</p>
      ) : (
        <TaskList
          tasks={tasks}
          onEdit={setFormTask}
          onArchive={handleArchive}
          onStatusChange={handleStatusChange}
          showArchived={showArchived}
        />
      )}

      {formTask && (
        <TaskForm
          initialValues={formTask.id ? formTask : null}
          submitLabel={formTask.id ? "Save changes" : "Add entry"}
          onSubmit={handleFormSubmit}
          onCancel={() => setFormTask(null)}
        />
      )}
    </div>
  );
}
