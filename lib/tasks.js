// lib/tasks.js
//
// This is where task queries will live: createTask, listTasks (with
// sorting), updateTask, and archiveTask. The API routes in app/api/tasks
// will call functions from this file.
//
// Nothing is implemented yet — this file is just a placeholder so the
// import paths already used elsewhere in the project resolve.

import db from "./db";

export function listTasks(/* { sort, showArchived } */) {
  // TODO: SELECT from tasks, ordered by the requested sort (due date,
  // status, or topic), filtered by archived state.
  throw new Error("listTasks() is not implemented yet.");
}

export function createTask(/* { title, description, dueDate, topic } */) {
  // TODO: INSERT a new row with status 'todo' and archived = 0.
  throw new Error("createTask() is not implemented yet.");
}

export function updateTask(/* id, fields */) {
  // TODO: UPDATE title/description/dueDate/topic/status/archived for a task.
  throw new Error("updateTask() is not implemented yet.");
}
