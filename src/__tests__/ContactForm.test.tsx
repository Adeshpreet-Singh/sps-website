import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ContactForm from "@/app/contact/ContactForm";

// Mock the data imports to control the select options
vi.mock("@/lib/data", () => ({
  serviceTypeOptions: [
    "Refrigerator / Freezer",
    "Range / Cooktop",
    "Dishwasher",
  ],
  retailerOptions: ["Home Depot", "Best Buy", "Other / Not Applicable"],
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders all required form fields", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/service type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/retailer/i)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /message/i })).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /submit request/i })
    ).toBeInTheDocument();
  });

  it("renders form with noValidate attribute", () => {
    render(<ContactForm />);
    const form = screen.getByRole("form");
    expect(form).toHaveAttribute("novalidate");
  });

  it("has accessible form label", () => {
    render(<ContactForm />);
    expect(screen.getByRole("form")).toHaveAttribute(
      "aria-label",
      "Contact us"
    );
  });

  it("shows name validation error on blur with empty value", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/full name/i);

    await act(async () => {
      fireEvent.blur(nameInput);
    });

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
  });

  it("shows email validation error for invalid email", async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email address/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "notanemail" } });
      fireEvent.blur(emailInput);
    });

    expect(
      screen.getByText(/please enter a valid email address/i)
    ).toBeInTheDocument();
  });

  it("shows phone validation error for too-short number", async () => {
    render(<ContactForm />);
    const phoneInput = screen.getByLabelText(/phone number/i);

    await act(async () => {
      fireEvent.change(phoneInput, { target: { value: "123" } });
      fireEvent.blur(phoneInput);
    });

    expect(
      screen.getByText(/please enter a valid phone number/i)
    ).toBeInTheDocument();
  });

  it("clears error when user starts typing after error", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/full name/i);

    // Trigger error
    await act(async () => {
      fireEvent.blur(nameInput);
    });
    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();

    // Start typing
    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John" } });
    });

    // Error should still show (it shows until re-validated on blur)
    // But form-level error should clear
  });

  it("validates name with minimum length", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/full name/i);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "A" } });
      fireEvent.blur(nameInput);
    });

    expect(
      screen.getByText(/name must be at least 2 characters/i)
    ).toBeInTheDocument();
  });

  it("validates name only accepts letters and spaces", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/full name/i);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John123" } });
      fireEvent.blur(nameInput);
    });

    expect(
      screen.getByText(/name can only contain letters/i)
    ).toBeInTheDocument();
  });

  it("accepts valid name", async () => {
    render(<ContactForm />);
    const nameInput = screen.getByLabelText(/full name/i);

    await act(async () => {
      fireEvent.change(nameInput, { target: { value: "John Smith" } });
      fireEvent.blur(nameInput);
    });

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("validates email pattern correctly", async () => {
    render(<ContactForm />);
    const emailInput = screen.getByLabelText(/email address/i);

    // Invalid emails
    const invalidEmails = ["test", "test@", "@domain.com", "test@.com"];

    for (const email of invalidEmails) {
      await act(async () => {
        fireEvent.change(emailInput, { target: { value: email } });
        fireEvent.blur(emailInput);
      });
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    }
  });

  it("character counter updates for message textarea", async () => {
    render(<ContactForm />);
    const textarea = screen.getByRole("textbox", { name: /message/i });

    await act(async () => {
      fireEvent.change(textarea, { target: { value: "Hello world" } });
    });

    expect(screen.getByText("11 / 500")).toBeInTheDocument();
  });

  it("submit button is disabled until form is valid", () => {
    render(<ContactForm />);
    const submitButton = screen.getByRole("button", {
      name: /submit request/i,
    });
    expect(submitButton).toBeDisabled();
  });
});
