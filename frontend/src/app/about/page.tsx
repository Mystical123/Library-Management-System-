export default function AboutPage() {
  return (
    <div className="about-page">
      <header>
        <h1 className="page-title">Meet the Team — Project Delta</h1>
        <p className="page-intro">
          Project Delta is a Library Management System developed for CSC 131 at
          Sacramento State. Our team collaborated on requirements, design, and
          implementation to model how real-world software engineering projects
          are built.
        </p>
      </header>

      <section>
        <h2 className="text-subheading">Project Team</h2>
        <div className="about-team-grid">

          {/* Iesha */}
          <article className="card">
            <h3 className="about-card-name">Iesha Khabra</h3>
            <ul className="about-card-list">
              <li>
                <strong>Education:</strong> Pursuing B.S. Computer Science,
                Sacramento State
              </li>
              <li>
                <strong>Skills:</strong> TypeScript, React, Node.js
              </li>
              <li>
                <strong>Experience:</strong> Tech Fellow — CodePath
              </li>
            </ul>
          </article>

          {/* Sukhdip */}
          <article className="card">
            <h3 className="about-card-name">Sukhdip Sandhu</h3>
            <ul className="about-card-list">
              <li>
                <strong>Education:</strong> Pursuing B.S. Computer Science,
                Sacramento State
              </li>
              <li>
                <strong>Skills:</strong> C++, Java, HTML, CSS, SQL
              </li>
              <li>
                <strong>Experience:</strong> Frontend & UI design for Project
                Delta
              </li>
            </ul>
          </article>

          {/* Dino */}
          <article className="card">
            <h3 className="about-card-name">Dino Velagic</h3>
            <ul className="about-card-list">
              <li>
                <strong>Education:</strong> Pursuing B.S. Computer Science,
                Sacramento State
              </li>
            </ul>
          </article>

          {/* Andy */}
          <article className="card">
            <h3 className="about-card-name">Andy Wong</h3>
            <ul className="about-card-list">
              <li>
                <strong>Education:</strong> Pursuing B.S. Computer Science,
                Sacramento State
              </li>
            </ul>
          </article>

          {/* Andrew */}
          <article className="card">
            <h3 className="about-card-name">Andrew Jones</h3>
            <ul className="about-card-list">
              <li>
                <strong>Education:</strong> Pursuing B.S. Computer Science,
                Sacramento State
              </li>
              <li>
                <strong>Skills:</strong> N/A
              </li>
              <li>
                <strong>Experience:</strong> N/A
              </li>
            </ul>
          </article>

          {/* David */}
          <article className="card">
            <h3 className="about-card-name">David Stelzer</h3>
            <ul className="about-card-list">
              <li>
                <strong>Education:</strong> Pursuing B.S. Computer Science,
                Sacramento State
              </li>
            </ul>
          </article>

          {/* Gabriel */}
          <article className="card">
            <h3 className="about-card-name">Gabriel Batarseh</h3>
            <ul className="about-card-list">
              <li>
                <strong>Education:</strong> Pursuing B.S. Computer Science,
                Sacramento State
              </li>
            </ul>
          </article>

        </div>
      </section>
    </div>
  );
}
