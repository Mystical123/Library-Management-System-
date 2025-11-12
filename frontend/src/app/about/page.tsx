// frontend/src/app/about/page.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header/>
      <main className="about-page">
        <div className="about-container">
          <h1>Meet the Team — Project Delta</h1>

          {/* copy more team-member cards here */}
          <section className="about-team">
            <article className="about-card">
              <h2>Iesha Khabra</h2>
              <ul>
                <li><strong>Education:</strong> Pursuing B.S. Computer Science, Sacramento State</li>
                <li><strong>Skills:</strong> TypeScript, React, Node.js</li>
                <li><strong>Experience:</strong> Tech Fellow — CodePath</li>
              </ul>
            </article>

            {/* copy more team-member cards here */}
            <article className="about-card">
              <h2>Sukhdip Sandhu</h2>
              <ul>
                <li><strong>Education:</strong> Pursuing B.S. Computer Science, Sacramento State</li>
                <li><strong>Skills:</strong> C++, Java, HTML, CSS, SQL</li>
              </ul>
            </article>

            <article className="about-card">
              <h2> Dino Velagic</h2>
              <ul>
                <li><strong>Education:</strong> Pursuing B.S. Computer Science, Sacramento State</li>
                <li><strong>Skills:</strong> N/A </li>
                <li><strong>Experience:</strong> N/A </li>
              </ul>
            </article>

            <article className="about-card">
              <h2> Andy Wong </h2>
              <ul>
                <li><strong>Education:</strong> Pursuing B.S. Computer Science, Sacramento State</li>
                <li><strong>Skills:</strong> N/A </li>
                <li><strong>Experience:</strong> N/A </li>
              </ul>
            </article>

            <article className="about-card">
              <h2> Andrew Jones </h2>
              <ul>
                <li><strong>Education:</strong> Pursuing B.S. Computer Science, Sacramento State</li>
                <li><strong>Skills:</strong> N/A </li>
                <li><strong>Experience:</strong> N/A </li>
              </ul>
            </article>

            <article className="about-card">
              <h2> David Stelzer </h2>
              <ul>
                <li><strong>Education:</strong> Pursuing B.S. Computer Science, Sacramento State</li>
                <li><strong>Skills:</strong> N/A </li>
                <li><strong>Experience:</strong> N/A </li>
              </ul>
            </article>

            <article className="about-card">
              <h2> Gabriel </h2>
              <ul>
                <li><strong>Education:</strong> Pursuing B.S. Computer Science, Sacramento State</li>
                <li><strong>Skills:</strong> N/A </li>
                <li><strong>Experience:</strong> N/A </li>
              </ul>
            </article>
          
        </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
