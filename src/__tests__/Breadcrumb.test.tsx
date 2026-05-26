import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Breadcrumb from "@/components/Breadcrumb";

describe("Breadcrumb", () => {
  it("renders Home link as first item", () => {
    render(<Breadcrumb items={[]} />);
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("renders single item as current page (not a link)", () => {
    render(<Breadcrumb items={[{ name: "Services", path: "/services" }]} />);
    const current = screen.getByText("Services");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).not.toBe("A");
  });

  it("renders multiple items with last as current page", () => {
    render(
      <Breadcrumb
        items={[
          { name: "Services", path: "/services" },
          { name: "Plumbing", path: "/services/plumbing" },
        ]}
      />
    );

    // First item should be a link
    const servicesLink = screen.getByText("Services");
    expect(servicesLink.closest("a")).toHaveAttribute("href", "/services");

    // Last item should be current page
    const plumbing = screen.getByText("Plumbing");
    expect(plumbing).toHaveAttribute("aria-current", "page");
  });

  it("renders separator characters", () => {
    render(
      <Breadcrumb
        items={[
          { name: "Services", path: "/services" },
          { name: "Plumbing", path: "/services/plumbing" },
        ]}
      />
    );
    const separators = screen.getAllByText("/");
    expect(separators.length).toBeGreaterThanOrEqual(2);
    separators.forEach((sep) => {
      expect(sep).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("has accessible nav landmark", () => {
    render(<Breadcrumb items={[{ name: "About", path: "/about" }]} />);
    expect(screen.getByRole("navigation")).toHaveAttribute(
      "aria-label",
      "Breadcrumb"
    );
  });

  it("renders items in an ordered list", () => {
    render(
      <Breadcrumb
        items={[
          { name: "Services", path: "/services" },
          { name: "Plumbing", path: "/services/plumbing" },
        ]}
      />
    );
    const list = screen.getByRole("list");
    expect(list.tagName).toBe("OL");
  });
});
