"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="text-lg text-fog">Message sent. I&apos;ll reply within a day or two.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label className="label" htmlFor="name">Name</label>
        <input id="name" name="name" placeholder="Your Name" required className="field" />
      </div>
      <div>
        <label className="label" htmlFor="email">Email</label>
        <input id="email" name="email" type="email" placeholder="Your@email.com" required className="field" />
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="budget">Budget</label>
        <select id="budget" name="budget" defaultValue="" required className="field">
          <option value="" disabled>Select…</option>
          <option>&lt;$3k</option>
          <option>$3k - $5k</option>
          <option>$5k - $10k</option>
          <option>&gt;$10k</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell me about your project" rows={5} required className="field" />
      </div>
      <button
        disabled={status === "sending"}
        className="rounded-lg bg-white py-3.5 font-semibold text-ink hover:bg-orange hover:text-white disabled:opacity-60 sm:col-span-2"
      >
        {status === "sending" ? "Sending..." : "Submit"}
      </button>
      {status === "error" && <p className="text-sm text-orange sm:col-span-2">Couldn&apos;t send. Check the fields and try again.</p>}
    </form>
  );
}
