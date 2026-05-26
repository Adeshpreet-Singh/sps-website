import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";

function renderWithTheme(ui: React.ReactNode) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("ThemeToggle", () => {
  it("renders a button", () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("has accessible label for light mode", () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button");
    // Default resolved theme is light (system preference in jsdom)
    expect(button).toHaveAttribute("aria-label");
  });

  it("toggles theme when clicked", () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    // After clicking, the label should change
    const label = button.getAttribute("aria-label");
    expect(["Switch to light mode", "Switch to dark mode"]).toContain(label);
  });

  it("meets minimum touch target size", () => {
    renderWithTheme(<ThemeToggle />);
    const button = screen.getByRole("button");
    expect(button.className).toContain("min-w-[44px]");
    expect(button.className).toContain("min-h-[44px]");
  });
});
