import { NextResponse } from "next/server";

// GET  /api/tasks       -> list tasks (support ?sort= and ?showArchived=)
// POST /api/tasks       -> create a task

export async function GET(request) {
  // TODO: read sort/showArchived from request.nextUrl.searchParams,
  // call listTasks() from lib/tasks.js, and return it as JSON.
  return NextResponse.json({ tasks: [] });
}

export async function POST(request) {
  // TODO: read the task fields from the request body, call createTask()
  // from lib/tasks.js, and return the created task.
  return NextResponse.json(
    { error: "Not implemented yet." },
    { status: 501 }
  );
}
