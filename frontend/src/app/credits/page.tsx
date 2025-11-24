export default function CreditsPage() {
  const members = [
    { name: "Iesha Khabra", role: "Frontend and Backend Developer" },
    { name: "Sukhdip Sandhu", role: "Project Manager, Designer, Frontend & UI design Developer" },
    { name: "Dino Velagic", role: "Frontend Developer" },
    { name: "Andy Wong", role: "Backend Developer" },
    { name: "Andrew Jones", role: "Designer" },
    { name: "David Stelzer", role: "Quality Control"}, 
    { name: "Gabriel Batarseh", role: "Analyst"}, 
  ];

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="page-title mb-3">Credits</h1>
      <p className="page-intro mb-10">
        Project Delta was developed collaboratively as part of CSC 131 – Software Engineering.
      </p>

      <ul className="credits-list">
        {members.map((m) => (
          <li key={m.name} className="credits-card">
            <p className="credits-name">{m.name}</p>
            <p className="credits-role">{m.role}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
