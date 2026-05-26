/**
 * @fileoverview Contact/quote request form with client-side validation.
 *
 * Features:
 * - Floating-label input design for all fields
 * - Real-time validation on blur with inline error messages
 * - Fields: name, email, phone, service type (select), retailer (optional),
 *   preferred date (optional), message (textarea with 500 char limit)
 * - Required field validation before submission
 * - Success/error states with animated feedback
 * - Retry capability on submission failure
 * - Full keyboard accessibility
 *
 * Validation rules:
 * - Name: min 2 chars, letters/spaces/hyphens only
 * - Email: RFC 5322 simplified pattern
 * - Phone: 10-15 digits (formatting chars stripped for validation)
 * - Service type: required select
 *
 * @remarks
 * The form currently simulates submission (no backend endpoint wired).
 * Replace the setTimeout in handleSubmit with a real API call when
 * the backend is ready.
 */

"use client";

import { useState, useRef, useCallback, type FormEvent } from "react";
import { serviceTypeOptions, retailerOptions } from "@/lib/data";
import {
  Send,
  CheckCircle,
  XCircle,
  Loader2,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import ErrorIcon from "@/components/ErrorIcon";

const MAX_MESSAGE_LENGTH = 500;

/** Fields that must pass validation before the form can be submitted. */
const REQUIRED_FIELDS = ["name", "email", "phone", "serviceType"] as const;

/* ---------- Shared validation error icon + text ---------- */
function ValidationError({ error }: { error: string }) {
  return (
    <p
      role="alert"
      className="mt-1.5 text-xs text-error flex items-center gap-1 animate-slide-up"
    >
      <svg
        aria-hidden="true"
        className="w-3.5 h-3.5 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {error}
    </p>
  );
}

/* ---------- Validation helpers ---------- */
function validateName(value: string): string | null {
  if (!value.trim()) return "Full name is required.";
  if (value.trim().length < 2) return "Name must be at least 2 characters.";
  if (!/^[a-zA-ZÀ-ÿ\s'.-]+$/.test(value.trim()))
    return "Name can only contain letters, spaces, and hyphens.";
  return null;
}

function validateEmail(value: string): string | null {
  if (!value.trim()) return "Email address is required.";
  // RFC 5322 simplified
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()))
    return "Please enter a valid email address.";
  return null;
}

function validatePhone(value: string): string | null {
  if (!value.trim()) return "Phone number is required.";
  // Strip common formatting chars for validation
  const digits = value.replace(/[\s\-().+]/g, "");
  if (digits.length < 10 || digits.length > 15)
    return "Please enter a valid phone number (10–15 digits).";
  if (!/^\d+$/.test(digits))
    return "Phone number can only contain digits and formatting characters.";
  return null;
}

function validateRequired(value: string, label: string): string | null {
  if (!value.trim()) return `${label} is required.`;
  return null;
}

/* ---------- Floating-label input wrapper ---------- */
interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string | null;
  valid?: boolean;
  onBlur?: () => void;
  onChange?: (value: string) => void;
}

function FloatingInput({
  id,
  label,
  type = "text",
  required,
  placeholder,
  error,
  valid,
  onBlur,
  onChange,
}: FloatingInputProps) {
  const borderClass = error
    ? "border-error focus:border-error focus:ring-error/20"
    : valid
      ? "border-success focus:border-success focus:ring-success/20"
      : "border-border dark:border-dark-border focus:border-accent focus:ring-accent/20";

  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder ?? " "}
        onBlur={onBlur}
        onChange={(e) => onChange?.(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`peer w-full rounded-xl border-2 bg-surface dark:bg-dark-surface px-4 pt-6 pb-2 text-text dark:text-dark-text placeholder-transparent focus:outline-none focus:ring-2 transition-all duration-200 ${borderClass}`}
        style={{ transition: 'all 0.2s cubic-bezier(0.22, 1, 0.36, 1)' }}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted dark:text-dark-text-muted text-base pointer-events-none transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent-safe peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {/* Validation icon */}
      {(error || valid) && (
        <span aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {error ? (
            <XCircle className="h-5 w-5 text-error" aria-hidden="true" />
          ) : (
            <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
          )}
        </span>
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5"
        >
          <ValidationError error={error} />
        </p>
      )}
    </div>
  );
}

/* ---------- Floating-label select wrapper ---------- */
interface FloatingSelectProps {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
  error?: string | null;
  valid?: boolean;
  onBlur?: () => void;
  onChange?: (value: string) => void;
}

function FloatingSelect({
  id,
  label,
  options,
  required,
  error,
  valid,
  onBlur,
  onChange,
}: FloatingSelectProps) {
  const [hasValue, setHasValue] = useState(false);
  const [focused, setFocused] = useState(false);

  const borderClass = error
    ? "border-error focus:border-error focus:ring-error/20"
    : valid
      ? "border-success focus:border-success focus:ring-success/20"
      : "border-border dark:border-dark-border focus:border-accent focus:ring-accent/20";

  return (
    <div className="relative">
      <select
        id={id}
        name={id}
        required={required}
        defaultValue=""
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          onBlur?.();
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== "");
          onChange?.(e.target.value);
        }}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`peer w-full rounded-xl border-2 bg-surface dark:bg-dark-surface px-4 pt-5 pb-2 text-text dark:text-dark-text appearance-none focus:outline-none focus:ring-2 transition-all duration-200 ${borderClass}`}
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
          hasValue || focused
            ? "top-2 text-xs text-accent-safe"
            : "top-1/2 -translate-y-1/2 text-base text-text-muted dark:text-dark-text-muted"
        }`}
      >
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      {/* Custom chevron — decorative */}
      <svg
        aria-hidden="true"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted dark:text-dark-text-muted pointer-events-none"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5"
        >
          <ValidationError error={error} />
        </p>
      )}
    </div>
  );
}

/* ---------- Success animation ---------- */
function SuccessMessage() {
  return (
    <div aria-live="polite" role="status" className="flex flex-col items-center justify-center py-16 text-center animate-badge-enter">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-success" aria-hidden="true" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-success/30 animate-ping-once" />
      </div>
      <h3 className="text-2xl font-heading font-bold text-text dark:text-dark-text mb-2">
        Thank you!
      </h3>
      <p className="text-text-muted dark:text-dark-text-muted max-w-md mb-6">
        Your quote request has been received. We&apos;ll get back to you within
        24 hours.
      </p>
      {/* Next steps hint */}
      <div className="flex items-center gap-2 text-sm text-accent-safe font-medium">
        <span>Check your email for a confirmation</span>
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </div>
    </div>
  );
}

/* ---------- Error state ---------- */
function ErrorMessage({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <div aria-live="assertive" role="alert" className="flex flex-col items-center justify-center py-12 text-center animate-scale-in">
      <ErrorIcon pulse={false} />
      <h3 className="text-2xl font-heading font-bold text-text dark:text-dark-text mb-2">
        Something went wrong
      </h3>
      <p className="text-text-muted dark:text-dark-text-muted max-w-md mb-6">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg btn-press"
      >
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try Again
      </button>
    </div>
  );
}

/* ---------- Main form ---------- */
export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messageLen, setMessageLen] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  // Track which fields have been interacted with
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  // Track current values for live validation
  const [values, setValues] = useState<Record<string, string>>({});
  // Ref for error to avoid circular dependency in updateValue callback
  const errorRef = useRef<string | null>(null);

  const markTouched = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const updateValue = useCallback(
    (field: string, value: string) => {
      setValues((prev) => ({ ...prev, [field]: value }));
      // Clear form-level error when user starts editing
      if (errorRef.current) {
        errorRef.current = null;
        setError(null);
      }
    },
    [],
  );

  // Derive errors only for touched fields
  function getFieldError(field: string): string | null {
    if (!touched[field]) return null;
    const value = values[field] ?? "";
    switch (field) {
      case "name":
        return validateName(value);
      case "email":
        return validateEmail(value);
      case "phone":
        return validatePhone(value);
      case "serviceType":
        return validateRequired(value, "Service type");
      default:
        return null;
    }
  }

  function isFieldValid(field: string): boolean {
    if (!touched[field]) return false;
    return getFieldError(field) === null;
  }

  // Check if all required fields are valid
  function isFormValid(): boolean {
    return REQUIRED_FIELDS.every((f) => {
      const value = values[f] ?? "";
      if (!value.trim()) return false;
      return getFieldError(f) === null;
    });
  }

  // Check if all required fields have been touched and are valid
  function canSubmit(): boolean {
    return REQUIRED_FIELDS.every((f) => touched[f] && getFieldError(f) === null);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Touch all required fields to show any remaining errors
    const newTouched: Record<string, boolean> = {};
    REQUIRED_FIELDS.forEach((f) => (newTouched[f] = true));
    setTouched((prev) => ({ ...prev, ...newTouched }));

    if (!isFormValid()) return;

    setLoading(true);
    errorRef.current = null;
    setError(null);

    // Simulate network request with occasional failure for demo
    setTimeout(() => {
      setLoading(false);
      // Simulate ~10% failure rate for realistic UX
      const shouldFail = Math.random() < 0.1;
      if (shouldFail) {
        const msg = "We couldn't send your request due to a network issue. Please try again or call us directly.";
        errorRef.current = msg;
        setError(msg);
      } else {
        setSubmitted(true);
      }
    }, 1200);
  }

  function handleRetry() {
    errorRef.current = null;
    setError(null);
    setSubmitted(false);
  }

  if (submitted) return <SuccessMessage />;
  if (error)
    return <ErrorMessage message={error} onRetry={handleRetry} />;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      aria-label="Contact us"
      aria-describedby="form-instructions"
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingInput
          id="name"
          label="Full Name"
          required
          placeholder=" "
          error={getFieldError("name")}
          valid={isFieldValid("name")}
          onBlur={() => markTouched("name")}
          onChange={(v) => updateValue("name", v)}
        />
        <FloatingInput
          id="phone"
          label="Phone Number"
          type="tel"
          required
          placeholder=" "
          error={getFieldError("phone")}
          valid={isFieldValid("phone")}
          onBlur={() => markTouched("phone")}
          onChange={(v) => updateValue("phone", v)}
        />
      </div>

      <FloatingInput
        id="email"
        label="Email Address"
        type="email"
        required
        placeholder=" "
        error={getFieldError("email")}
        valid={isFieldValid("email")}
        onBlur={() => markTouched("email")}
        onChange={(v) => updateValue("email", v)}
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <FloatingSelect
          id="serviceType"
          label="Service Type"
          options={serviceTypeOptions}
          required
          error={getFieldError("serviceType")}
          valid={isFieldValid("serviceType")}
          onBlur={() => markTouched("serviceType")}
          onChange={(v) => updateValue("serviceType", v)}
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
          onChange={(e) => {
            setMessageLen(e.target.value.length);
            updateValue("message", e.target.value);
          }}
          aria-describedby="message-count"
          className="peer w-full rounded-xl border-2 border-border dark:border-dark-border bg-surface dark:bg-dark-surface px-4 pt-6 pb-2 text-text dark:text-dark-text placeholder-transparent focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 resize-none"
        />
        <label
          htmlFor="message"
          className="absolute left-4 top-6 text-text-muted dark:text-dark-text-muted text-base pointer-events-none transition-all duration-200 peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:text-accent-safe peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs"
        >
          Tell us about your project…
        </label>
        <span
          id="message-count"
          aria-live="polite"
          className="absolute right-4 bottom-3 text-xs text-text-light dark:text-dark-text-muted"
        >
          {messageLen}/{MAX_MESSAGE_LENGTH}
        </span>
      </div>

      {/* Submit with loading state */}
      <div aria-live="polite">
        <button
          type="submit"
          disabled={loading || !canSubmit()}
          className="relative inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white px-8 py-4 font-medium transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 w-full sm:w-auto overflow-hidden btn-press btn-shimmer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
              <span className="animate-pulse">Sending…</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              Request a Quote
            </>
          )}
        </button>
      </div>

      {/* Privacy note */}
      <p className="text-xs text-text-light dark:text-dark-text-muted text-center sm:text-left">
        Your information is secure and will only be used to respond to your
        inquiry.
      </p>
    </form>
  );
}
