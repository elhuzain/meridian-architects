"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  // TODO: send the form data to an email service or API route
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-x-gutter gap-y-10 sm:grid-cols-2">
      <div>
        <label htmlFor="contact-name" className="field-label">
          Name
        </label>
        <input id="contact-name" name="name" type="text" required autoComplete="name" className="field" />
      </div>

      <div>
        <label htmlFor="contact-email" className="field-label">
          Email
        </label>
        <input id="contact-email" name="email" type="email" required autoComplete="email" className="field" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="contact-company" className="field-label">
          Company (optional)
        </label>
        <input id="contact-company" name="company" type="text" autoComplete="organization" className="field" />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className="field-label">
          About your project
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="Site, scale, timeline and anything else we should know"
          className="field resize-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-8 sm:col-span-2">
        <button type="submit" className="btn btn-solid">
          Send enquiry
          <span aria-hidden>→</span>
        </button>
        <p aria-live="polite" className="copy">
          {sent && "Thank you. We will be in touch within two working days."}
        </p>
      </div>
    </form>
  );
}
