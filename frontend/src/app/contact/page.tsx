"use client";
<<<<<<< HEAD

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
=======
import { FormEvent, useState } from "react";
import emailjs from "emailjs-com";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./contact.module.css";

// using emailjs to handle all emails 
>>>>>>> origin/main

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

<<<<<<< HEAD
    try {
      const result = await emailjs.sendForm(
        "service_xxxxx",      // <-- Replace with your Service ID
        "template_xxxxx",     // <-- Replace with your Template ID
        formRef.current,
        "public_xxxxx"        // <-- Replace with your Public Key
=======
    emailjs
      .sendForm(
        "service_wp5032e", // Service ID
        "template_0kqcepg", // Template ID
        form,
        "KyHI9y3Pnfv8APkGw" // Public Key
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
>>>>>>> origin/main
      );

      console.log("Email sent:", result.text);
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <main className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-serif tracking-wide mb-3 text-deep-brown">
        Contact Us
      </h1>

<<<<<<< HEAD
      <p className="text-muted mb-10 max-w-2xl">
        If you have any questions, concerns, or feedback regarding the Project
        Delta Library System, please fill out the form below. Our team will get
        back to you as soon as possible.
      </p>
=======
      <main className={styles["contact-page"]}>
        <section className="contact-form-section">
          <h2>Contact Us</h2>
          <p>
            If you have questions, feedback, or issues, send us a message and our team will respond as soon as possible.
          </p>
>>>>>>> origin/main

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white/70 shadow-md border border-deep-brown/20 rounded-xl p-8 flex flex-col gap-6"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="user_name"
            required
            className="w-full border rounded-md p-2 bg-white/90"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">Email Address</label>
          <input
            type="email"
            name="user_email"
            required
            className="w-full border rounded-md p-2 bg-white/90"
            placeholder="example@gmail.com"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold mb-1">Message</label>
          <textarea
            name="message"
            required
            className="w-full border rounded-md p-2 bg-white/90 min-h-[130px]"
            placeholder="Write your message here..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-deep-brown text-ivory font-semibold py-2 rounded-md hover:bg-black transition"
        >
          Send Message
        </button>

        {/* Status Messages */}
        {status === "success" && (
          <p className="text-green-700 text-sm mt-2">Message sent successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-700 text-sm mt-2">Failed to send message.</p>
        )}
      </form>
    </main>
  );
}
