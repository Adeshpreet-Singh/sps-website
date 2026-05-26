import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/Navbar";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock ThemeToggle to avoid ThemeProvider dependency
vi.mock("./ThemeToggle", () => ({
  default: () => <button>Toggle theme</button>,
}));

describe("Navbar", () => {
  it("renders the company name", () => {
    render(<Navbar />);
    expect(screen.getByText("SPS")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders phone CTA", () => {
    render(<Navbar />);
    expect(screen.getByText("(604) 865-0619")).toBeInTheDocument();
  });

  it("has a mobile menu toggle button", () => {
    render(<Navbar />);
    const toggleButton = screen.getByLabelText("Toggle menu");
    expect(toggleButton).toBeInTheDocument();
  });

  it("renders nav landmark", () => {
    render(<Navbar />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("theme toggle is rendered", () => {
    render(<Navbar />);
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });
});
