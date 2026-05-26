import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import ErrorIcon from "@/components/ErrorIcon";

describe("ErrorIcon", () => {
  it("renders with default size (md)", () => {
    const { container } = render(<ErrorIcon />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toBeInTheDocument();
  });

  it("renders with lg size", () => {
    const { container } = render(<ErrorIcon size="lg" />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("w-24");
  });

  it("renders pulse animation by default", () => {
    const { container } = render(<ErrorIcon />);
    const pulseDiv = container.querySelector(".animate-pulse");
    expect(pulseDiv).toBeInTheDocument();
  });

  it("hides pulse when pulse=false", () => {
    const { container } = render(<ErrorIcon pulse={false} />);
    const pulseDiv = container.querySelector(".animate-pulse");
    expect(pulseDiv).not.toBeInTheDocument();
  });

  it("contains an alert triangle icon", () => {
    const { container } = render(<ErrorIcon />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
