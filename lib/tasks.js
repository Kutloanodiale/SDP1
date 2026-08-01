

import db from "./db";

const STATUSES = ["todo", "in-progress", "complete"];
const SORTS = ["due_date", "status", "topic"];

const ORDER_BY = {
  
  due_date: `
    due_date IS NULL, due_date ASC,
    CASE status WHEN 'todo' THEN 0 WHEN 'in-progress' THEN 1 ELSE 2 END ASC
  `,
  
  status: `
    CASE status WHEN 'todo' THEN 0 WHEN 'in-progress' THEN 1 ELSE 2 END ASC,
    due_date IS NULL, due_date ASC
  `,
 
  topic: `
    topic COLLATE NOCASE ASC,
    due_date IS NULL, due_date ASC
  `,
};

export function listTasks({sort = "due_date", showArchived = false} = {}) {
const orderby = ORDER_BY[sort] || ORDER_BY.due_date;
const where = showArchived ? "" : "WHERE archived = 0";
const rows = db.prepare(`SELECT * FROM tasks ${where} ORDER BY ${orderby}`).all();
return rows.map(overdue);
}
function todayISO() {
  
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function overdue(task){
  if(!task) return task;
  const over_due = 
        !!task.due_date &&
        task.due_date < todayISO()&&
        task.status !== "complete" &&
        !task.archived;
        return { ...task, archived: !!task.archived, overdue:over_due };
}

export function getTask(id){
  const task = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  return overdue(task);
}

export function createTask({ title, description ="", dueDate=null, topic ="General"} ) {
  const cleanTitle = (title || "").trim();
  if (!cleanTitle) {
    throw new Error("Title is required.");
  }
  const cleanTopic = (topic || "").trim() || "General";
  const newTask = db.prepare(`
    INSERT INTO tasks (title, description, due_date, topic, status, archived)
    VALUES (@title, @description, @dueDate, @topic, 'todo', 0)
  `);
  const result = newTask.run({
    title: cleanTitle,
    description: description || "",
    dueDate: dueDate || null,
    topic: cleanTopic,
  });
  return getTask(result.lastInsertRowid);
}


export function updateTask( id, fields={}) {
  const in_db = db.prepare("SELECT * FROM tasks WHERE id = ?").get(id);
  if(!in_db) return null;

  const updates = [];
  const params = { id };

  if (fields.title !== undefined) {
    const cleanTitle = (fields.title || "").trim();
    if (!cleanTitle) throw new Error("Title cannot be empty.");
    updates.push("title = @title");
    params.title = cleanTitle;
  }  
  
  if (fields.description !== undefined) {
    updates.push("description = @description");
    params.description = fields.description || "";
  }
  if (fields.dueDate !== undefined) {
    updates.push("due_date = @dueDate");
    params.dueDate = fields.dueDate || null;
  }
  if (fields.topic !== undefined) {
    const cleanTopic = (fields.topic || "").trim() || "General";
    updates.push("topic = @topic");
    params.topic = cleanTopic;
  }
  if (fields.status !== undefined) {
    if (!STATUSES.includes(fields.status)) {
      throw new Error(`Status must be one of: ${STATUSES.join(", ")}.`);
    }
    updates.push("status = @status");
    params.status = fields.status;
  }
  if (fields.archived !== undefined) {
    updates.push("archived = @archived");
    params.archived = fields.archived ? 1 : 0;
  }

  if (updates.length === 0) {
    return overdue(in_db);
  }

  updates.push("updated_at = datetime('now')");

  db.prepare(`UPDATE tasks SET ${updates.join(", ")} WHERE id = @id`).run(params);

  return getTask(id);
}

export const VALID_SORTS = SORTS;
export const VALID_STATUSES = STATUSES;