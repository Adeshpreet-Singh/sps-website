import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ScrollReveal from "@/components/ScrollReveal";

// Mock useScrollReveal
vi.mock("@/hooks/useScrollReveal", () => ({
  useScrollReveal: () => [{ current: null }, true],
}));

describe("ScrollReveal", () => {
  it("renders children", () => {
    render(
      <ScrollReveal>
        <p>Visible content</p>
      </ScrollReveal>
    );
    expect(screen.getByText("Visible content")).toBeInTheDocument();
  });

  it("applies fade-up variant classes by default", () => {
    const { container } = render(
      <ScrollReveal>
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("reveal-hidden");
    expect(wrapper.className).toContain("reveal-visible");
  });

  it("applies fade-scale variant classes", () => {
    const { container } = render(
      <ScrollReveal variant="fade-scale">
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("reveal-scale-hidden");
    expect(wrapper.className).toContain("reveal-scale-visible");
  });

  it("applies delay class", () => {
    const { container } = render(
      <ScrollReveal delay={3}>
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("reveal-delay-3");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ScrollReveal className="my-custom-class">
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("my-custom-class");
  });

  it("applies fade-left variant", () => {
    const { container } = render(
      <ScrollReveal variant="fade-left">
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("reveal-left-hidden");
  });

  it("applies fade-right variant", () => {
    const { container } = render(
      <ScrollReveal variant="fade-right">
        <p>Content</p>
      </ScrollReveal>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("reveal-right-hidden");
  });
});
