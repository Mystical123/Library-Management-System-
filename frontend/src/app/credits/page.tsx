"use client";

import Image from "next/image";

export default function CreditsPage() {
  const members = [
    { name: "Iesha Khabra", role: "Frontend and Backend Developer", image: "/headshots/iesha.jpg" },
    { name: "Sukhdip Sandhu", role: "Project Manager, Designer, Frontend & UI design Developer", image: "/headshots/sukhdip.jpg" },
    { name: "Andy Wong", role: "Backend Developer", image: "/headshots/andy.jpg" },
    { name: "Andrew Jones", role: "Designer", image: "/headshots/andrew.jpg" },
    { name: "Dino Velagic", role: "Frontend Developer", image: "/headshots/dino.jpg" },
    { name: "David Stelzer", role: "Quality Control", image: "/headshots/david.jpg" },
    { name: "Gabriel Batarseh", role: "Analyst", image: "/headshots/gabriel.jpg" },
  ];

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="page-title mb-3">Credits</h1>
      <p className="page-intro mb-10">
        Project Delta was developed collaboratively as part of CSC 131 – Software Engineering.
      </p>

      <ul className="credits-grid">
  {members.map((m) => (
    <li key={m.name} className="credits-card">
      <Image
        src={m.image}
        alt={m.name}
        width={80}
        height={80}
        className="credits-headshot"
      />
      <p className="credits-name">{m.name}</p>
      <p className="credits-role">{m.role}</p>
    </li>
  ))}
</ul>

    </main>
  );
}
