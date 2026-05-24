"use client";

import { useState, useRef, type FormEvent } from "react";
import { serviceTypeOptions, retailerOptions } from "@/lib/data";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const MAX_MESSAGE_LENGTH = 500;

/* ---------- Floating-label input wrapper ---------- */
function FloatingInput({
  id,
  label,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder ?? " "}
        className="peer w-full rounded-xl border-2 border-border bg-surface px-4 pt-6 pb-2 text-text placeholder-transparent focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-base pointer-events-none transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
    </div>
  );
}

/* ---------- Floating-label select wrapper ---------- */
function FloatingSelect({
  id,
  label,
  options,
  required,
}: {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        onChange={(e) => setHasValue(e.target.value !== "")}
        className="peer w-full rounded-xl border-2 border-border bg-surface px-4 pt-5 pb-2 text-text appearance-none focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200"
      >
        <option value="" disabled hidden>
          &nbsp;
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-4 pointer-events-none transition-all duration-200 ${
          hasValue
            ? "top-2 text-xs text-accent"
            : "top-1/2 -translate-y-1/2 text-base text-text-muted"
        }`}
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {/* Custom chevron */}
      <svg
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

/* ---------- Success animation ---------- */
function SuccessMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-success" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-success/30 animate-ping" />
      </div>
      <h3 className="text-2xl font-heading font-bold text-text mb-2">
        Thank you!
      </h3>
      <p className="text-text-muted max-w-md">
        Your quote request has been received. We&apos;ll get back to you within
        24 hours.
      </p>
    </div>
  );
}

/* ---------- Main form ---------- */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageLen, setMessageLen] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  if (submitted) return <SuccessMessage />;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingInput
          id="name"
          label="Full Name"
          required
          placeholder=" "
        />
        <FloatingInput
          id="phone"
          label="Phone Number"
          type="tel"
          required
          placeholder=" "
        />
      </div>

      <FloatingInput
        id="email"
        label="Email Address"
        type="email"
        required
        placeholder=" "
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingSelect
          id="serviceType"
          label="Service Type"
          options={serviceTypeOptions}
          required
        />
        <FloatingSelect
          id="retailer"
          label="Retailer"
          options={retailerOptions}
        />
      </div>

      {/* Textarea with character count */}
      <div className="relative">
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder=" "
          onChange={(e) => setMessageLen(e.target.value.length)}
          className="peer w-full rounded-xl border-2 border-border bg-surface px-4 pt-6 pb-2 text-text placeholder-transparent focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 resize-none"
        />
        <label
          htmlFor="message"
          className="absolute left-4 top-6 text-text-muted text-base pointer-events-none transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Tell us about your project…
        </label>
        <span className="absolute right-4 bottom-3 text-xs text-text-light">
          {messageLen}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>

      {/* Submit with loading state */}
      <button
        type="submit"
        disabled={loading}
        className="relative inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white px-8 py-4 font-medium transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto overflow-hidden"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Request a Quote
          </>
        )}
        {/* Animated shine on hover */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700" />
      </button>
    </form>
  );
}
