"use client";
import { FormEvent, useState } from "react";
import emailjs from "emailjs-com";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
  const [status, setStatus] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    emailjs.sendForm(
      "service_wp5032e",      // Your Service ID
      "template_0kqcepg",      // Your Template ID
      form,
      "KyHI9y3Pnfv8APkGw"      // Your Public Key
    )
    .then(
      (result) => {
        console.log(result.text);
        setStatus("Message sent!");
        form.reset();
      },
      (error) => {
        console.log(error.text);
        setStatus("Failed to send message");
      }
    );
  };

  return (
    <>
      <Header />

      <main>
        <section className="contact-form-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions, feedback, or issues, send us a message and our team will respond as soon as possible.
          </p>

          <form id="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows={5} required></textarea>

            <button type="submit">Send Message</button>
          </form>

          <p id="form-status" className="muted">{status}</p>
        </section>
      </main>

      <Footer />
    </>
  );
}
