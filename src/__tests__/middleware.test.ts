import { describe, it, expect, vi } from "vitest";
import { middleware } from "@/middleware";
import { NextRequest, NextResponse } from "next/server";

function createRequest(pathname: string) {
  return new NextRequest(new URL(`https://spsinstallation.com${pathname}`));
}

describe("middleware", () => {
  it("redirects /index to /", () => {
    const response = middleware(createRequest("/index"));
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toContain("/");
  });

  it("redirects /index.html to /", () => {
    const response = middleware(createRequest("/index.html"));
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toContain("/");
  });

  it("redirects .html extensions", () => {
    const response = middleware(createRequest("/about.html"));
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toContain("/about");
  });

  it("redirects nested .html paths", () => {
    const response = middleware(createRequest("/services/plumbing.html"));
    expect(response.status).toBe(301);
    expect(response.headers.get("location")).toContain("/services/plumbing");
  });

  it("passes through non-matching routes", () => {
    const response = middleware(createRequest("/about"));
    expect(response.status).toBe(200);
  });

  it("passes through root path", () => {
    const response = middleware(createRequest("/"));
    expect(response.status).toBe(200);
  });
});
