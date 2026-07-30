import { NextResponse } from "next/server";

// GET   /api/tasks/:id  -> fetch one task
// PATCH /api/tasks/:id  -> update a task (edit fields, change status, archive)

export async function GET(_request, { params }) {
  // TODO: fetch a single task by params.id.
  return NextResponse.json(
    { error: "Not implemented yet." },
    { status: 501 }
  );
}

export async function PATCH(request, { params }) {
  // TODO: read updated fields from the request body, call updateTask()
  // from lib/tasks.js, and return the updated task.
  return NextResponse.json(
    { error: "Not implemented yet." },
    { status: 501 }
  );
}
