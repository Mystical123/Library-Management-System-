"use client";
import { FormEvent, useState } from "react";
import emailjs from "emailjs-com";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    emailjs
      .sendForm(
        "service_wp5032e", // Your Service ID
        "template_0kqcepg", // Your Template ID
        form,
        "KyHI9y3Pnfv8APkGw" // Your Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Message sent!");
          setStatusType("success");
          form.reset();
        },
        (error) => {
          console.error(error.text);
          setStatus("Failed to send message");
          setStatusType("error");
        }
      );
  };

  return (
    <>
      <Header />

      <main className="contact-page">
        <section className="contact-form-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions, feedback, or issues, send us a message and our team will respond as soon as possible.
          </p>

          <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" name="phone" />
            </div>

            <div className="field full">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={6} required />
            </div>

            <div className="field full">
              <button type="submit">Send Message</button>
            </div>
          </form>

          <p
            id="form-status"
            className={`muted ${statusType === "success" ? "success" : ""} ${statusType === "error" ? "error" : ""}`}
            aria-live="polite"
          >
            {status}
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

