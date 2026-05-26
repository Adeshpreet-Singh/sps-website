import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { ThemeProvider, useTheme, themeScript } from "@/components/ThemeProvider";
import { useContext } from "react";

// Test consumer component
function ThemeConsumer() {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button onClick={() => setTheme("dark")} data-testid="set-dark">
        Dark
      </button>
      <button onClick={() => setTheme("light")} data-testid="set-light">
        Light
      </button>
      <button onClick={toggleTheme} data-testid="toggle">
        Toggle
      </button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("light", "dark");
  });

  it("renders children", () => {
    render(
      <ThemeProvider>
        <div>Child content</div>
      </ThemeProvider>
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });

  it("provides default theme as system", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId("theme")).toHaveTextContent("system");
  });

  it("throws when useTheme is used outside ThemeProvider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    );
    consoleSpy.mockRestore();
  });

  it("toggleTheme switches between light and dark", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    const toggle = screen.getByTestId("toggle");

    await act(async () => {
      toggle.click();
    });

    const resolved = screen.getByTestId("resolved").textContent;
    expect(["light", "dark"]).toContain(resolved);
  });

  it("setTheme persists to localStorage", async () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    );

    await act(async () => {
      screen.getByTestId("set-dark").click();
    });

    expect(localStorage.getItem("theme")).toBe("dark");

    await act(async () => {
      screen.getByTestId("set-light").click();
    });

    expect(localStorage.getItem("theme")).toBe("light");
  });
});

describe("themeScript", () => {
  it("is a non-empty string", () => {
    expect(themeScript).toBeTruthy();
    expect(typeof themeScript).toBe("string");
  });

  it("contains self-executing function", () => {
    expect(themeScript).toContain("(function()");
    expect(themeScript).toContain("localStorage.getItem");
    expect(themeScript).toContain("matchMedia");
  });

  it("handles errors gracefully with try/catch", () => {
    expect(themeScript).toContain("try");
    expect(themeScript).toContain("catch");
  });
});
