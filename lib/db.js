

import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "todo.db");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}


const globalForDb = globalThis;

const db = globalForDb.__todoDb || new Database(DB_PATH);
globalForDb.__todoDb = db;

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");


db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    due_date    TEXT,                     -- ISO date string (YYYY-MM-DD), nullable
    topic       TEXT NOT NULL DEFAULT 'General',
    status      TEXT NOT NULL DEFAULT 'todo'
                  CHECK (status IN ('todo', 'in-progress', 'complete')),
    archived    INTEGER NOT NULL DEFAULT 0 CHECK (archived IN (0, 1)),
    created_at  TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
  CREATE INDEX IF NOT EXISTS idx_tasks_topic ON tasks(topic);
  CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
`);

export default db;
