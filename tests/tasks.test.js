
import { test, describe, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const dbPath = path.join(os.tmpdir(), `todo-test-${process.pid}-${Date.now()}.db`);
process.env.TODO_DB_PATH = dbPath;

const { createTask, listTasks, getTask, updateTask } = await import("../lib/tasks.js");
const db = (await import("../lib/db.js")).default;

function cleanupDbFiles() {
  for (const suffix of ["", "-wal", "-shm"]) {
    const f = dbPath + suffix;
    if (fs.existsSync(f)) fs.rmSync(f);
  }
}

before(() => {
  cleanupDbFiles();
});

beforeEach(() => {

  db.exec("DELETE FROM tasks");
});

after(() => {
  db.close();
  cleanupDbFiles();
});

describe("createTask", () => {
  test("creates a task with sensible defaults and persists it", () => {
    const task = createTask({ title: "Water the plants" });

    assert.equal(task.title, "Water the plants");
    assert.equal(task.status, "todo");
    assert.equal(task.archived, false);
    assert.equal(task.topic, "General");
    assert.ok(task.id, "task should have an id assigned by the database");

  
    const reloaded = getTask(task.id);
    assert.equal(reloaded.title, "Water the plants");
  });

  test("rejects a task with an empty or whitespace-only title", () => {
    assert.throws(() => createTask({ title: "   " }), /Title is required/);
    assert.throws(() => createTask({ title: "" }), /Title is required/);
  });
});

describe("archiving", () => {
  test("archived tasks are hidden by default but never deleted", () => {
    const task = createTask({ title: "Old task" });
    updateTask(task.id, { archived: true });

    const defaultList = listTasks({ showArchived: false });
    assert.equal(
      defaultList.find((t) => t.id === task.id),
      undefined,
      "archived task should not appear in the default list"
    );

    const fullList = listTasks({ showArchived: true });
    const found = fullList.find((t) => t.id === task.id);
    assert.ok(found, "archived task should still appear when showArchived is true");
    assert.equal(found.archived, true);

   
    const stillFetchable = getTask(task.id);
    assert.equal(stillFetchable.title, "Old task");
  });
});

describe("overdue", () => {
  test("a past-due, incomplete task is flagged overdue; completing it clears the flag", () => {
    const task = createTask({ title: "File taxes", dueDate: "2000-01-01" });
    assert.equal(task.overdue, true);

    const completed = updateTask(task.id, { status: "complete" });
    assert.equal(completed.overdue, false, "completed tasks are never overdue");
  });

  test("a task with no due date, or a future due date, is not overdue", () => {
    const noDueDate = createTask({ title: "Someday" });
    assert.equal(noDueDate.overdue, false);

    const future = createTask({ title: "Next year", dueDate: "2099-01-01" });
    assert.equal(future.overdue, false);
  });
});

describe("status", () => {
  test("only the three fixed statuses are accepted", () => {
    const task = createTask({ title: "Do a thing" });

    assert.throws(
      () => updateTask(task.id, { status: "blocked" }),
      /Status must be one of/,
      "a status outside the fixed set should be rejected"
    );

    const updated = updateTask(task.id, { status: "in-progress" });
    assert.equal(updated.status, "in-progress");
  });
});

describe("sorting", () => {
  test("sort=topic orders tasks alphabetically by topic", () => {
    createTask({ title: "C task", topic: "Zebra" });
    createTask({ title: "A task", topic: "Apple" });
    createTask({ title: "B task", topic: "Mango" });

    const sorted = listTasks({ sort: "topic" });
    const topics = sorted.map((t) => t.topic);

    assert.deepEqual(topics, ["Apple", "Mango", "Zebra"]);
  });
});
