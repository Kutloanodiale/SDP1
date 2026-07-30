# Ledger — starter scaffold

This is just the **project start-up**: a working Next.js + SQLite skeleton
you can run, with none of the todo-list features built yet. It's meant as
the foundation to build on.

## Requirements

- [Node.js](https://nodejs.org/) 18.18 or newer (includes npm)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). You should see a
plain "Ledger" page — that confirms Next.js, React, and the SQLite
connection are all wired up correctly.

## What's in here vs. what's left to build

Wired up already:
- Next.js app router project structure
- SQLite connection and the `tasks` table schema (`lib/db.js`)
- Empty API route files at the right paths (`app/api/tasks`)
- A base stylesheet and layout

Left as TODOs for you (or for a future request) to implement:
- The actual task queries in `lib/tasks.js` (create, list + sort, update,
  archive)
- The API route logic in `app/api/tasks/route.js` and
  `app/api/tasks/[id]/route.js`
- The UI components listed in `app/components/README.md`
