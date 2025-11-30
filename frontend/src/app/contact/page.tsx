"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        "service_wp5032e",     
        "template_0kqcepg",    
        formRef.current,
        "KyHI9y3Pnfv8APkGw"       
      );

      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="page-title mb-3">Contact Us</h1>
      <p className="page-intro mb-10">
        Have questions or feedback? Fill out the form and we’ll get back to you.
      </p>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="contact-form-container flex flex-col gap-6"
      >
        <div>
          <label className="contact-label">Full Name</label>
          <input
            name="user_name"
            required
            className="contact-input"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="contact-label">Email Address</label>
          <input
            name="user_email"
            type="email"
            required
            className="contact-input"
            placeholder="example@gmail.com"
          />
        </div>

        <div>
          <label className="contact-label">Message</label>
          <textarea
            name="message"
            required
            className="contact-textarea"
            placeholder="Write your message…"
            rows={6}
          />
        </div>

        <button className="primary-link" type="submit">
          Send Message
        </button>

        {status === "success" && (
          <p className="text-green-700">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-700">Message failed to send.</p>
        )}
      </form>
    </main>
  );
}
