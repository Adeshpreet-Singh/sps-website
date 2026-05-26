import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import type { Testimonial } from "@/lib/data";

const mockTestimonials: Testimonial[] = [
  {
    name: "Michael T.",
    location: "Burnaby",
    source: "Google Review",
    rating: 5,
    service: "Appliance Installation",
    quote: "Smith Pro installed our new dishwasher and range on the same day.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sandra & James K.",
    location: "Coquitlam",
    source: "Homestars Review",
    rating: 5,
    service: "Plumbing Services",
    quote: "Had our entire master bathroom redone — new vanity, toilet, and soaker tub.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Patricia M.",
    location: "Surrey",
    source: "Google Review",
    rating: 5,
    service: "Appliance Installation",
    quote: "Smith Pro installed our new fridge and over-the-range microwave.",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
  },
];

describe("TestimonialCarousel", () => {
  it("renders the first testimonial by default", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    expect(screen.getByText("Michael T.")).toBeInTheDocument();
    expect(screen.getByText("Burnaby")).toBeInTheDocument();
  });

  it("renders star ratings", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    // Should have star icons (5 stars per testimonial)
    const stars = screen.getAllByText("5");
    expect(stars.length).toBeGreaterThan(0);
  });

  it("renders quote text", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    expect(
      screen.getByText(/Smith Pro installed our new dishwasher/)
    ).toBeInTheDocument();
  });

  it("renders source attribution", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    expect(screen.getByText("Google Review")).toBeInTheDocument();
  });

  it("renders navigation dots", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    const dots = screen.getAllByRole("button", { name: /go to testimonial/i });
    expect(dots).toHaveLength(3);
  });

  it("renders prev/next buttons", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    expect(
      screen.getByRole("button", { name: /previous testimonial/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next testimonial/i })
    ).toBeInTheDocument();
  });

  it("navigates to next testimonial on next button click", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    const nextButton = screen.getByRole("button", {
      name: /next testimonial/i,
    });

    fireEvent.click(nextButton);

    expect(screen.getByText("Sandra & James K.")).toBeInTheDocument();
  });

  it("navigates to previous testimonial on prev button click", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    const nextButton = screen.getByRole("button", {
      name: /next testimonial/i,
    });
    const prevButton = screen.getByRole("button", {
      name: /previous testimonial/i,
    });

    // Go forward then back
    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    expect(screen.getByText("Michael T.")).toBeInTheDocument();
  });

  it("navigates to specific slide on dot click", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    const dots = screen.getAllByRole("button", {
      name: /go to testimonial/i,
    });

    fireEvent.click(dots[2]); // Third testimonial

    expect(screen.getByText("Patricia M.")).toBeInTheDocument();
  });

  it("renders service badge", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    expect(screen.getByText("Appliance Installation")).toBeInTheDocument();
  });
});
