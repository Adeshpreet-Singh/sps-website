import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

// Mock useScrollReveal to avoid IntersectionObserver dependency
vi.mock("@/hooks/useScrollReveal", () => ({
  useScrollReveal: () => [{ current: null }, true],
}));

describe("Footer", () => {
  it("renders the company name", () => {
    render(<Footer />);
    expect(screen.getByText("Smith Pro Services")).toBeInTheDocument();
  });

  it("renders service links", () => {
    render(<Footer />);
    expect(screen.getByText("Appliance Installation")).toBeInTheDocument();
    expect(screen.getByText("Plumbing Services")).toBeInTheDocument();
    expect(screen.getByText("Residential Projects")).toBeInTheDocument();
    expect(screen.getByText("Commercial Projects")).toBeInTheDocument();
  });

  it("renders company links", () => {
    render(<Footer />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<Footer />);
    expect(screen.getByText("(604) 865-0619")).toBeInTheDocument();
    expect(screen.getByText("info@spsinstallation.com")).toBeInTheDocument();
  });

  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders legal links", () => {
    render(<Footer />);
    expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
  });

  it("renders trust badges", () => {
    render(<Footer />);
    expect(screen.getByText("Licensed & Insured")).toBeInTheDocument();
    expect(screen.getByText("Mon – Sat, 8 AM – 6 PM")).toBeInTheDocument();
    expect(screen.getByText("Metro Vancouver")).toBeInTheDocument();
  });

  it("has contentinfo landmark role", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
