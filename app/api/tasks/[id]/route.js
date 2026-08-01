import { NextResponse } from "next/server";
import { getTask, updateTask } from "@/lib/tasks";


export async function GET(_request, { params }) {
  const task = getTask(params.id);
  if (!task) {
    return NextResponse.json({ error: "Task not found." }, { status: 404 });
  }
  return NextResponse.json({ task });
}

export async function PATCH(request, { params }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  try {
    const task = updateTask(params.id, {
      title: body.title,
      description: body.description,
      dueDate: body.dueDate,
      topic: body.topic,
      status: body.status,
      archived: body.archived,
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found." }, { status: 404 });
    }
    return NextResponse.json({ task });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
