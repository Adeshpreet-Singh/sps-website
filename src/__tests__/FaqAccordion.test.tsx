import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FaqAccordion from "@/components/FaqAccordion";

const mockFaqs = [
  { question: "What areas do you serve?", answer: "All of Metro Vancouver." },
  { question: "Are you licensed?", answer: "Yes, fully licensed and insured." },
  {
    question: "How quickly can you schedule?",
    answer: "Within 2-5 business days.",
  },
];

describe("FaqAccordion", () => {
  it("renders all FAQ questions", () => {
    render(<FaqAccordion faqs={mockFaqs} />);
    mockFaqs.forEach((faq) => {
      expect(screen.getByText(faq.question)).toBeInTheDocument();
    });
  });

  it("answers are initially hidden (collapsed)", () => {
    render(<FaqAccordion faqs={mockFaqs} />);
    // The answers should be in collapsed panels
    const panels = screen.getAllByRole("region");
    panels.forEach((panel) => {
      expect(panel).toHaveStyle({ gridTemplateRows: "0fr" });
    });
  });

  it("toggles answer visibility when question is clicked", () => {
    render(<FaqAccordion faqs={mockFaqs} />);
    const firstButton = screen.getByText("What areas do you serve?").closest("button")!;

    // Initially collapsed
    expect(firstButton).toHaveAttribute("aria-expanded", "false");

    // Click to expand
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });

  it("supports multiple items open simultaneously", () => {
    render(<FaqAccordion faqs={mockFaqs} />);
    const buttons = screen.getAllByRole("button");

    // Open first and second
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[2]).toHaveAttribute("aria-expanded", "false");
  });

  it("can close an open item", () => {
    render(<FaqAccordion faqs={mockFaqs} />);
    const firstButton = screen.getByText("What areas do you serve?").closest("button")!;

    // Open then close
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });

  it("has proper ARIA attributes", () => {
    render(<FaqAccordion faqs={mockFaqs} />);
    const firstButton = screen.getByText("What areas do you serve?").closest("button")!;

    expect(firstButton).toHaveAttribute("aria-controls");
    expect(firstButton).toHaveAttribute("id");

    const panelId = firstButton.getAttribute("aria-controls");
    const panel = document.getElementById(panelId!);
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveAttribute("role", "region");
    expect(panel).toHaveAttribute("aria-labelledby", firstButton.id);
  });

  it("renders with group role and label", () => {
    render(<FaqAccordion faqs={mockFaqs} />);
    const group = screen.getByRole("group");
    expect(group).toHaveAttribute("aria-label", "Frequently asked questions");
  });

  it("renders empty list gracefully", () => {
    const { container } = render(<FaqAccordion faqs={[]} />);
    const group = screen.getByRole("group");
    expect(group.children).toHaveLength(0);
  });
});
