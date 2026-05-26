import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorContent, createRouteErrorPage } from "@/components/RouteError";

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

const mockError = new Error("Test error message");
mockError.digest = "abc123";

describe("ErrorContent", () => {
  it("renders default error title", () => {
    render(<ErrorContent error={mockError} reset={vi.fn()} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders custom title", () => {
    render(
      <ErrorContent
        error={mockError}
        reset={vi.fn()}
        title="Custom Error Title"
      />
    );
    expect(screen.getByText("Custom Error Title")).toBeInTheDocument();
  });

  it("renders custom description", () => {
    render(
      <ErrorContent
        error={mockError}
        reset={vi.fn()}
        description="Custom error description"
      />
    );
    expect(screen.getByText("Custom error description")).toBeInTheDocument();
  });

  it("renders error digest when present", () => {
    render(<ErrorContent error={mockError} reset={vi.fn()} />);
    expect(screen.getByText("Error ID: abc123")).toBeInTheDocument();
  });

  it("does not render digest when not present", () => {
    const errorNoDigest = new Error("No digest");
    render(<ErrorContent error={errorNoDigest} reset={vi.fn()} />);
    expect(screen.queryByText(/Error ID/)).not.toBeInTheDocument();
  });

  it("renders try again button that calls reset", () => {
    const reset = vi.fn();
    render(<ErrorContent error={mockError} reset={reset} />);
    const button = screen.getByText("Try Again");
    fireEvent.click(button);
    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("renders home link", () => {
    render(<ErrorContent error={mockError} reset={vi.fn()} />);
    const homeLink = screen.getByText("Back to Home");
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders phone CTA when showPhone is true", () => {
    render(
      <ErrorContent error={mockError} reset={vi.fn()} showPhone={true} />
    );
    expect(screen.getByText("(604) 865-0619")).toBeInTheDocument();
  });

  it("does not render phone CTA by default", () => {
    render(<ErrorContent error={mockError} reset={vi.fn()} />);
    expect(screen.queryByText("(604) 865-0619")).not.toBeInTheDocument();
  });

  it("has alert role", () => {
    render(<ErrorContent error={mockError} reset={vi.fn()} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders custom secondary link", () => {
    render(
      <ErrorContent
        error={mockError}
        reset={vi.fn()}
        secondaryHref="/services"
        secondaryLabel="Go to Services"
      />
    );
    const link = screen.getByText("Go to Services");
    expect(link.closest("a")).toHaveAttribute("href", "/services");
  });
});

describe("createRouteErrorPage", () => {
  it("creates a component with default config", () => {
    const ErrorPage = createRouteErrorPage();
    render(<ErrorPage error={mockError} reset={vi.fn()} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("creates a component with custom config", () => {
    const ErrorPage = createRouteErrorPage({
      title: "Couldn't load page",
      description: "Something went wrong while loading.",
    });
    render(<ErrorPage error={mockError} reset={vi.fn()} />);
    expect(screen.getByText("Couldn't load page")).toBeInTheDocument();
    expect(
      screen.getByText("Something went wrong while loading.")
    ).toBeInTheDocument();
  });
});
