# components/

This folder is where the UI pieces will go once you start building features:

- `TaskBoard.js` — top-level client component: fetches tasks, holds sort/filter
  state, opens the create/edit form.
- `TaskList.js` — renders the list of tasks.
- `TaskRow.js` — a single task's title, description, due date, status, and
  archive/edit actions.
- `TaskForm.js` — the create/edit form (title, description, due date, topic).
- `Toolbar.js` — sort controls (by topic, status, due date) and the
  show-archived toggle.
- `StatusStamp.js` — small display component for the three fixed statuses
  (Todo / In Progress / Complete).

None of these exist yet — this file is just a map for when you do.
