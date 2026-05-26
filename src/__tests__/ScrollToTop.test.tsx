import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ScrollToTop from "@/components/ScrollToTop";

// Mock scrollTo
const scrollToMock = vi.fn();
Object.defineProperty(window, "scrollTo", { value: scrollToMock });

describe("ScrollToTop", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    scrollToMock.mockClear();
    // Reset scroll position
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("is not visible initially (scrollY = 0)", () => {
    render(<ScrollToTop />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("becomes visible after scrolling past 400px", async () => {
    render(<ScrollToTop />);

    // Simulate scrolling down
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 500 });
      fireEvent.scroll(window);
    });

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();
  });

  it("scrolls to top when clicked", async () => {
    render(<ScrollToTop />);

    // Scroll down first
    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 500 });
      fireEvent.scroll(window);
    });

    const button = screen.getByRole("button");

    await act(async () => {
      fireEvent.click(button);
    });

    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("has proper accessibility attributes", async () => {
    render(<ScrollToTop />);

    await act(async () => {
      Object.defineProperty(window, "scrollY", { value: 500 });
      fireEvent.scroll(window);
    });

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Scroll to top");
    expect(button).toHaveAttribute("type", "button");
  });
});
