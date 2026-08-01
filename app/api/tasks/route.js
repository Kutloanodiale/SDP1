import { NextResponse } from "next/server";
import { createTask, listTasks, VALID_SORTS } from "@/lib/tasks";

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const sortParam = params.get("sort");
  const sort = VALID_SORTS.includes(sortParam) ? sortParam : "due_date";
  const showArchived = params.get("showArchived") === "true";

  const tasks = listTasks({ sort, showArchived });
  return NextResponse.json({ tasks });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const task = createTask({
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      topic: body.topic,
    });
    return NextResponse.json({ task }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
