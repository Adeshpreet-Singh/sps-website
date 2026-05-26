import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCounter from "@/components/StatCounter";

// Mock useCountUp
vi.mock("@/hooks/useCountUp", () => ({
  useCountUp: ({ target, shouldStart }: { target: number; shouldStart: boolean }) => {
    return shouldStart ? String(target) : "0";
  },
}));

describe("StatCounter", () => {
  it("renders label", () => {
    render(
      <StatCounter value={100} label="Installations" started={false} />
    );
    expect(screen.getByText("Installations")).toBeInTheDocument();
  });

  it("renders value when started", () => {
    render(
      <StatCounter value={100} label="Installations" started={true} />
    );
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("renders suffix", () => {
    render(
      <StatCounter
        value={100}
        label="Rating"
        suffix="%"
        started={true}
      />
    );
    expect(screen.getByText("%")).toBeInTheDocument();
  });

  it("renders text value when isText is true", () => {
    render(
      <StatCounter
        value="5+"
        label="Years"
        started={false}
        isText={true}
      />
    );
    expect(screen.getByText("5+")).toBeInTheDocument();
  });

  it("renders card variant", () => {
    render(
      <StatCounter
        value={100}
        label="Installations"
        started={true}
        variant="card"
      />
    );
    expect(screen.getByText("Installations")).toBeInTheDocument();
  });

  it("renders hero variant by default", () => {
    const { container } = render(
      <StatCounter value={100} label="Installations" started={false} />
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("animate-slide-up");
  });

  it("handles string numeric value", () => {
    render(
      <StatCounter value="4.6" label="Rating" started={true} decimals={1} />
    );
    expect(screen.getByText("4.6")).toBeInTheDocument();
  });

  it("handles non-numeric string value gracefully", () => {
    render(
      <StatCounter value="N/A" label="Status" started={true} />
    );
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
