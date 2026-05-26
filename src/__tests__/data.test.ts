import { describe, it, expect } from "vitest";
import {
  siteConfig,
  navLinks,
  services,
  testimonials,
  whyUsFeatures,
  serviceAreas,
  serviceTypeOptions,
  retailerOptions,
  serviceImages,
  serviceImageAlts,
  processStepsData,
  processStepImages,
  serviceHeroImages,
  pricingTiers,
  plumbingTiers,
  homeFaqItems,
  pricingFaqItems,
  comparisonRows,
  testimonialAvatars,
  type Service,
  type Testimonial,
  type FaqItem,
  type PricingTier,
  type PlumbingTier,
  type ComparisonRow,
} from "@/lib/data";

/* ================================================================== */
/*  siteConfig                                                        */
/* ================================================================== */

describe("siteConfig", () => {
  it("has required string fields", () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.shortName).toBeTruthy();
    expect(siteConfig.tagline).toBeTruthy();
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.url).toBeTruthy();
    expect(siteConfig.phone).toBeTruthy();
    expect(siteConfig.email).toBeTruthy();
    expect(siteConfig.hours).toBeTruthy();
  });

  it("has valid URL format", () => {
    expect(siteConfig.url).toMatch(/^https?:\/\//);
  });

  it("has valid phone format", () => {
    expect(siteConfig.phone).toMatch(/^\(\d{3}\)\s?\d{3}-\d{4}$/);
  });

  it("has valid email format", () => {
    expect(siteConfig.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  });

  it("has valid phone link", () => {
    expect(siteConfig.phoneLink).toMatch(/^tel:/);
  });

  it("has valid email link", () => {
    expect(siteConfig.emailLink).toMatch(/^mailto:/);
  });

  it("has complete address", () => {
    expect(siteConfig.address.street).toBeTruthy();
    expect(siteConfig.address.city).toBeTruthy();
    expect(siteConfig.address.province).toBeTruthy();
    expect(siteConfig.address.postal).toBeTruthy();
    expect(siteConfig.address.country).toBeTruthy();
  });

  it("has legal entity info", () => {
    expect(siteConfig.legal.name).toBeTruthy();
    expect(siteConfig.legal.corpNumber).toBeTruthy();
    expect(siteConfig.legal.bn).toBeTruthy();
    expect(siteConfig.legal.incorporated).toBeTruthy();
    expect(siteConfig.legal.act).toBeTruthy();
    expect(siteConfig.legal.directors.length).toBeGreaterThan(0);
  });

  it("has stats with string values", () => {
    expect(siteConfig.stats.yearsInBusiness).toBeTruthy();
    expect(siteConfig.stats.installations).toBeTruthy();
    expect(siteConfig.stats.licensedInsured).toBeTruthy();
    expect(siteConfig.stats.rating).toBeTruthy();
  });

  it("has at least one retailer", () => {
    expect(siteConfig.retailers.length).toBeGreaterThan(0);
  });
});

/* ================================================================== */
/*  navLinks                                                          */
/* ================================================================== */

describe("navLinks", () => {
  it("has at least one link", () => {
    expect(navLinks.length).toBeGreaterThan(0);
  });

  it("each link has label and href", () => {
    navLinks.forEach((link) => {
      expect(link.label).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.href.startsWith("/")).toBe(true);
    });
  });

  it("has no duplicate hrefs", () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

/* ================================================================== */
/*  services                                                          */
/* ================================================================== */

describe("services", () => {
  it("has exactly 4 services", () => {
    expect(services).toHaveLength(4);
  });

  it("each service has required fields", () => {
    services.forEach((svc: Service) => {
      expect(svc.slug).toBeTruthy();
      expect(svc.number).toBeTruthy();
      expect(svc.icon).toBeTruthy();
      expect(svc.title).toBeTruthy();
      expect(svc.shortDescription).toBeTruthy();
      expect(svc.description).toBeTruthy();
      expect(svc.items.length).toBeGreaterThan(0);
    });
  });

  it("each service has a unique slug", () => {
    const slugs = services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("each service has a unique number", () => {
    const numbers = services.map((s) => s.number);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("each service item is a non-empty string", () => {
    services.forEach((svc) => {
      svc.items.forEach((item) => {
        expect(item.trim()).toBeTruthy();
      });
    });
  });
});

/* ================================================================== */
/*  testimonials                                                      */
/* ================================================================== */

describe("testimonials", () => {
  it("has at least one testimonial", () => {
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("each testimonial has required fields", () => {
    testimonials.forEach((t: Testimonial) => {
      expect(t.name).toBeTruthy();
      expect(t.location).toBeTruthy();
      expect(t.source).toBeTruthy();
      expect(t.rating).toBeGreaterThanOrEqual(1);
      expect(t.rating).toBeLessThanOrEqual(5);
      expect(t.service).toBeTruthy();
      expect(t.quote).toBeTruthy();
    });
  });

  it("all testimonials have photo URLs", () => {
    testimonials.forEach((t) => {
      expect(t.photo).toBeTruthy();
      expect(t.photo).toMatch(/^https?:\/\//);
    });
  });
});

/* ================================================================== */
/*  pricingTiers                                                      */
/* ================================================================== */

describe("pricingTiers", () => {
  it("has exactly 3 tiers", () => {
    expect(pricingTiers).toHaveLength(3);
  });

  it("each tier has required fields", () => {
    pricingTiers.forEach((tier: PricingTier) => {
      expect(tier.slug).toBeTruthy();
      expect(tier.name).toBeTruthy();
      expect(tier.tagline).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.priceNote).toBeTruthy();
      expect(tier.icon).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
      expect(tier.ctaLabel).toBeTruthy();
      expect(tier.ctaHref).toBeTruthy();
    });
  });

  it("exactly one tier is marked popular", () => {
    const popular = pricingTiers.filter((t) => t.popular);
    expect(popular).toHaveLength(1);
  });

  it("each feature has label and included fields", () => {
    pricingTiers.forEach((tier) => {
      tier.features.forEach((f) => {
        expect(f.label).toBeTruthy();
        expect(typeof f.included).toBe("boolean");
      });
    });
  });

  it("has unique slugs", () => {
    const slugs = pricingTiers.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

/* ================================================================== */
/*  plumbingTiers                                                     */
/* ================================================================== */

describe("plumbingTiers", () => {
  it("has exactly 3 tiers", () => {
    expect(plumbingTiers).toHaveLength(3);
  });

  it("each tier has required fields", () => {
    plumbingTiers.forEach((tier: PlumbingTier) => {
      expect(tier.slug).toBeTruthy();
      expect(tier.name).toBeTruthy();
      expect(tier.tagline).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.priceNote).toBeTruthy();
      expect(tier.icon).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
      expect(tier.ctaLabel).toBeTruthy();
      expect(tier.ctaHref).toBeTruthy();
    });
  });

  it("exactly one tier is marked popular", () => {
    const popular = plumbingTiers.filter((t) => t.popular);
    expect(popular).toHaveLength(1);
  });
});

/* ================================================================== */
/*  FAQ items                                                         */
/* ================================================================== */

describe("homeFaqItems", () => {
  it("has at least one FAQ", () => {
    expect(homeFaqItems.length).toBeGreaterThan(0);
  });

  it("each FAQ has question and answer", () => {
    homeFaqItems.forEach((faq: FaqItem) => {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
      expect(faq.question.trim()).toBe(faq.question); // no leading/trailing whitespace
    });
  });

  it("no duplicate questions", () => {
    const questions = homeFaqItems.map((f) => f.question);
    expect(new Set(questions).size).toBe(questions.length);
  });
});

describe("pricingFaqItems", () => {
  it("has at least one FAQ", () => {
    expect(pricingFaqItems.length).toBeGreaterThan(0);
  });

  it("each FAQ has question and answer", () => {
    pricingFaqItems.forEach((faq: FaqItem) => {
      expect(faq.question).toBeTruthy();
      expect(faq.answer).toBeTruthy();
    });
  });
});

/* ================================================================== */
/*  serviceAreas                                                      */
/* ================================================================== */

describe("serviceAreas", () => {
  it("has at least one area", () => {
    expect(serviceAreas.length).toBeGreaterThan(0);
  });

  it("each area is a non-empty string", () => {
    serviceAreas.forEach((area) => {
      expect(area.trim()).toBeTruthy();
    });
  });

  it("has no duplicates", () => {
    expect(new Set(serviceAreas).size).toBe(serviceAreas.length);
  });
});

/* ================================================================== */
/*  serviceTypeOptions                                                */
/* ================================================================== */

describe("serviceTypeOptions", () => {
  it("has at least one option", () => {
    expect(serviceTypeOptions.length).toBeGreaterThan(0);
  });

  it("each option is a non-empty string", () => {
    serviceTypeOptions.forEach((opt) => {
      expect(opt.trim()).toBeTruthy();
    });
  });
});

/* ================================================================== */
/*  retailerOptions                                                   */
/* ================================================================== */

describe("retailerOptions", () => {
  it("has at least one option", () => {
    expect(retailerOptions.length).toBeGreaterThan(0);
  });

  it("includes 'Other / Not Applicable'", () => {
    expect(retailerOptions).toContain("Other / Not Applicable");
  });
});

/* ================================================================== */
/*  serviceImages                                                     */
/* ================================================================== */

describe("serviceImages", () => {
  it("has images for all service slugs", () => {
    services.forEach((svc) => {
      expect(serviceImages[svc.slug]).toBeTruthy();
      expect(serviceImages[svc.slug]).toMatch(/^https:\/\/images\.unsplash\.com\//);
    });
  });

  it("includes width and height params", () => {
    Object.values(serviceImages).forEach((url) => {
      expect(url).toMatch(/w=\d+/);
      expect(url).toMatch(/h=\d+/);
    });
  });
});

/* ================================================================== */
/*  serviceHeroImages                                                 */
/* ================================================================== */

describe("serviceHeroImages", () => {
  it("has hero images for all service slugs", () => {
    services.forEach((svc) => {
      expect(serviceHeroImages[svc.slug]).toBeTruthy();
    });
  });

  it("hero images are larger than card images", () => {
    Object.keys(serviceHeroImages).forEach((slug) => {
      const heroUrl = serviceHeroImages[slug];
      const cardUrl = serviceImages[slug];
      // Hero should have larger dimensions
      const heroW = parseInt(heroUrl.match(/w=(\d+)/)?.[1] ?? "0");
      const cardW = parseInt(cardUrl.match(/w=(\d+)/)?.[1] ?? "0");
      expect(heroW).toBeGreaterThan(cardW);
    });
  });
});

/* ================================================================== */
/*  serviceImageAlts                                                  */
/* ================================================================== */

describe("serviceImageAlts", () => {
  it("has alt text for all service slugs", () => {
    services.forEach((svc) => {
      expect(serviceImageAlts[svc.slug]).toBeTruthy();
    });
  });

  it("alt text is descriptive (at least 20 chars)", () => {
    Object.values(serviceImageAlts).forEach((alt) => {
      expect(alt.length).toBeGreaterThanOrEqual(20);
    });
  });
});

/* ================================================================== */
/*  processStepsData                                                  */
/* ================================================================== */

describe("processStepsData", () => {
  it("has steps for all service slugs", () => {
    services.forEach((svc) => {
      expect(processStepsData[svc.slug]).toBeTruthy();
      expect(processStepsData[svc.slug].length).toBeGreaterThan(0);
    });
  });

  it("each step has required fields", () => {
    Object.entries(processStepsData).forEach(([, steps]) => {
      steps.forEach((step) => {
        expect(step.step).toBeGreaterThan(0);
        expect(step.title).toBeTruthy();
        expect(step.description).toBeTruthy();
        expect(step.iconName).toBeTruthy();
      });
    });
  });

  it("steps are numbered sequentially starting from 1", () => {
    Object.entries(processStepsData).forEach(([, steps]) => {
      steps.forEach((step, idx) => {
        expect(step.step).toBe(idx + 1);
      });
    });
  });
});

/* ================================================================== */
/*  processStepImages                                                 */
/* ================================================================== */

describe("processStepImages", () => {
  it("has at least one image", () => {
    expect(processStepImages.length).toBeGreaterThan(0);
  });

  it("each image is a valid unsplash URL", () => {
    processStepImages.forEach((url) => {
      expect(url).toMatch(/^https:\/\/images\.unsplash\.com\//);
    });
  });
});

/* ================================================================== */
/*  comparisonRows                                                    */
/* ================================================================== */

describe("comparisonRows", () => {
  it("has at least one row", () => {
    expect(comparisonRows.length).toBeGreaterThan(0);
  });

  it("each row has feature, basic, standard, pro", () => {
    comparisonRows.forEach((row: ComparisonRow) => {
      expect(row.feature).toBeTruthy();
      expect(row.basic !== undefined).toBe(true);
      expect(row.standard !== undefined).toBe(true);
      expect(row.pro !== undefined).toBe(true);
    });
  });

  it("no duplicate features", () => {
    const features = comparisonRows.map((r) => r.feature);
    expect(new Set(features).size).toBe(features.length);
  });
});

/* ================================================================== */
/*  whyUsFeatures                                                     */
/* ================================================================== */

describe("whyUsFeatures", () => {
  it("has at least one feature", () => {
    expect(whyUsFeatures.length).toBeGreaterThan(0);
  });
});

/* ================================================================== */
/*  testimonialAvatars                                                */
/* ================================================================== */

describe("testimonialAvatars", () => {
  it("has avatar URLs", () => {
    Object.values(testimonialAvatars).forEach((url) => {
      expect(url).toMatch(/^https:\/\/images\.unsplash\.com\//);
    });
  });
});
