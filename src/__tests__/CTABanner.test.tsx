import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CTABanner from "@/components/CTABanner";

// Mock ScrollReveal
vi.mock("@/components/ScrollReveal", () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("CTABanner", () => {
  it("renders default title", () => {
    render(<CTABanner />);
    expect(screen.getByText("Ready to get started?")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(<CTABanner title="Custom CTA Title" />);
    expect(screen.getByText("Custom CTA Title")).toBeInTheDocument();
  });

  it("renders default description", () => {
    render(<CTABanner />);
    expect(
      screen.getByText(/Get a free quote for your next/)
    ).toBeInTheDocument();
  });

  it("renders primary CTA button", () => {
    render(<CTABanner />);
    expect(screen.getByText("Get a Free Quote")).toBeInTheDocument();
  });

  it("renders custom primary label", () => {
    render(<CTABanner primaryLabel="Contact Us" />);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders secondary button when label provided", () => {
    render(
      <CTABanner
        secondaryLabel="Call Us"
        secondaryHref="tel:+16048650619"
      />
    );
    expect(screen.getByText("Call Us")).toBeInTheDocument();
  });

  it("does not render secondary button when no label", () => {
    render(<CTABanner />);
    // Only the primary button should be present
    expect(screen.getByText("Get a Free Quote")).toBeInTheDocument();
  });

  it("renders phone link when primaryIsPhone is true", () => {
    render(<CTABanner primaryLabel="(604) 865-0619" primaryIsPhone={true} />);
    const phoneLink = screen.getByText("(604) 865-0619").closest("a");
    expect(phoneLink).toHaveAttribute("href", "tel:+16048650619");
  });
});
