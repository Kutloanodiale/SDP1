import "./globals.css";

export const metadata = {
  title: "Ledger — a local todo list",
  description: "A local-first todo list. Your tasks, your machine, no accounts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
