// frontend/src/app/about/page.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./about.module.css";

const TEAM = [
  {
    name: "Iesha Khabra",
    education: "Pursuing B.S. Computer Science, Sacramento State",
    skills: "Python, TypeScript, React, Node.js",
    experience: "Tech Fellow — CodePath",
  },
  {
    name: "Sukhdip Sandhu",
    education: "Pursuing B.S. Computer Science, Sacramento State",
    skills: "C++, Java, HTML, CSS, SQL",
  },
  {
    name: "Dino Velagic",
    education: "Pursuing B.S. Computer Science, Sacramento State",
  },
  {
    name: "Andy Wong",
    education: "Pursuing B.S. Computer Science, Sacramento State",
  },
  {
    name: "Andrew Jones",
    education: "Pursuing B.S. Computer Science, Sacramento State",
    skills: "Java, Graphic Design",
    experience: "backend of live productions",
  },
  {
    name: "David Stelzer",
    education: "Pursuing B.S. Computer Science, Sacramento State",
  },
  {
    name: "Gabriel",
    education: "Pursuing B.S. Computer Science, Sacramento State",
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className={styles["about-page"]}>
        <div className={styles["about-container"]}>
          <h1>Meet the Team — Project Delta</h1>

          <section className={styles["about-team"]}>
            {TEAM.map((member) => (
              <article key={member.name} className={styles["about-card"]}>
                <div>
                  <h2>{member.name}</h2>
                  <ul>
                    {member.education && (
                      <li>
                        <strong>Education:</strong> {member.education}
                      </li>
                    )}
                    {member.skills && (
                      <li>
                        <strong>Skills:</strong> {member.skills}
                      </li>
                    )}
                    {member.experience && (
                      <li>
                        <strong>Experience:</strong> {member.experience}
                      </li>
                    )}
                  </ul>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

