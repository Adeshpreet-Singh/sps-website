import { describe, it, expect } from "vitest";
import { iconMap, processStepIconMap, buildProcessSteps } from "@/lib/icons";
import { processStepsData, processStepImages } from "@/lib/data";

describe("iconMap", () => {
  it("has entries for all ServiceIconNames", () => {
    const expectedIcons = [
      "Wrench",
      "Droplets",
      "Home",
      "Building2",
      "Shield",
      "Clock",
      "BadgeCheck",
      "Sparkles",
    ];
    expectedIcons.forEach((name) => {
      expect(iconMap[name as keyof typeof iconMap]).toBeDefined();
      expect(typeof iconMap[name as keyof typeof iconMap]).toBe("function");
    });
  });

  it("each icon is a valid React component", () => {
    Object.values(iconMap).forEach((Icon) => {
      expect(Icon).toBeTruthy();
      expect(typeof Icon).toBe("function");
    });
  });
});

describe("processStepIconMap", () => {
  it("has entries for all ProcessStepIconNames", () => {
    const expectedIcons = [
      "MessageSquare",
      "ClipboardList",
      "Wrench",
      "ShieldCheck",
      "CalendarClock",
    ];
    expectedIcons.forEach((name) => {
      expect(
        processStepIconMap[name as keyof typeof processStepIconMap]
      ).toBeDefined();
    });
  });
});

describe("buildProcessSteps", () => {
  it("returns correct number of steps for known slug", () => {
    const steps = buildProcessSteps(
      "appliance-installation",
      processStepsData,
      processStepImages
    );
    expect(steps).toHaveLength(4);
  });

  it("each step has icon and image", () => {
    const steps = buildProcessSteps(
      "plumbing",
      processStepsData,
      processStepImages
    );
    steps.forEach((step, idx) => {
      expect(step.step).toBe(idx + 1);
      expect(step.title).toBeTruthy();
      expect(step.description).toBeTruthy();
      expect(typeof step.icon).toBe("function");
      expect(step.image).toBeTruthy();
    });
  });

  it("returns empty array for unknown slug", () => {
    const steps = buildProcessSteps(
      "nonexistent",
      processStepsData,
      processStepImages
    );
    expect(steps).toHaveLength(0);
  });

  it("works for all known service slugs", () => {
    const slugs = [
      "appliance-installation",
      "plumbing",
      "residential",
      "commercial",
    ];
    slugs.forEach((slug) => {
      const steps = buildProcessSteps(
        slug,
        processStepsData,
        processStepImages
      );
      expect(steps.length).toBeGreaterThan(0);
    });
  });
});
