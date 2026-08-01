import TAskBoard from "./components/show_tasks";
export default function Home() {
  return (
    <main className="Tasks-page">
      <header className="Tasks-header">
        <h1>Ledger</h1>
      </header>
      <TAskBoard />
    </main>
  );
}
