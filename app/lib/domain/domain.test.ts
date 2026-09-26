import { describe, expect, it } from "vitest";
import { parseGithubUrl, validateSelection, formatBytes, MB } from "./upload";
import { filterGraph, parseGraph, countByStatus } from "./graph";
import { decodeClaims, isExpired, needsOnboarding } from "./jwt";
import { decideRoute } from "./routing";
import { isTerminal, nextPollDelay, hasTimedOut, failureMessage } from "./submission";

const pdf = (name = "cv.pdf", size = 1000) => ({ name, size, type: "application/pdf" });
const png = (name = "a.png", size = 1000) => ({ name, size, type: "image/png" });

describe("parseGithubUrl", () => {
  it.each([
    ["github.com/octo", { owner: "octo", repo: null }],
    ["https://github.com/octo/api.git", { owner: "octo", repo: "api" }],
    ["https://www.github.com/octo/api/tree/main", { owner: "octo", repo: "api" }],
  ])("accepts %s", (url, ref) => {
    expect(parseGithubUrl(url)).toMatchObject(ref);
  });
  it.each(["", "https://gitlab.com/a", "https://github.com.evil.com/a", "https://u:p@github.com/a", "https://github.com/settings", "javascript:alert(1)"])(
    "rejects %s",
    (url) => expect(parseGithubUrl(url)).toBeNull(),
  );
});

describe("validateSelection", () => {
  const base = { resume: pdf(), portfolio: [], images: [], githubUrl: "" };
  it("ok with resume only", () => expect(validateSelection(base)).toEqual([]));
  it("requires resume", () => expect(validateSelection({ ...base, resume: null })).toContain("請選擇履歷 PDF"));
  it("checks types, counts and sizes", () => {
    const errs = validateSelection({
      resume: pdf("cv.pdf", 11 * MB),
      portfolio: [pdf("a.pdf"), pdf("b.pdf"), pdf("c.pdf"), pdf("d.pdf")],
      images: [png(), { name: "x.gif", size: 10, type: "image/gif" }],
      githubUrl: "gitlab.com/x",
    });
    expect(errs).toEqual(
      expect.arrayContaining(["履歷不可超過 10MB", "作品集最多 3 份", "「x.gif」不是 PNG / JPG / WebP", expect.stringContaining("GitHub")]),
    );
  });
  it("formats bytes", () => expect(formatBytes(1.5 * MB)).toBe("1.5 MB"));
});

describe("graph", () => {
  const g = {
    nodes: [
      { id: "0", name: "我", level: 0, score: 5 },
      { id: "1", name: "A", level: 1, score: 3, status: "owned" as const },
      { id: "g-1", name: "B", level: 2, score: 0, status: "recommended" as const },
    ],
    links: [
      { source: "0", target: "1" },
      { source: "1", target: "g-1" },
    ],
  };
  it("filters recommended nodes and dangling links", () => {
    const f = filterGraph(g, { includeRecommended: false });
    expect(f.nodes.map((n) => n.id)).toEqual(["0", "1"]);
    expect(f.links).toEqual([{ source: "0", target: "1" }]);
    expect(filterGraph(g, { includeRecommended: true })).toBe(g);
  });
  it("counts", () => expect(countByStatus(g)).toEqual({ owned: 1, recommended: 1 }));
  it("parses safely", () => {
    expect(parseGraph("not json")).toBeNull();
    expect(parseGraph('{"nodes":[]}')).toBeNull();
    expect(parseGraph(JSON.stringify(g))?.nodes).toHaveLength(3);
  });
});

describe("jwt", () => {
  const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const token = `${enc({ alg: "HS256" })}.${enc({ user_id: 1, exp: 100, onboarded: false, name: "王" })}.sig`;
  it("decodes utf-8 claims", () => expect(decodeClaims(token)).toMatchObject({ user_id: 1, name: "王" }));
  it("expiry", () => {
    expect(isExpired(decodeClaims(token), 80)).toBe(false);
    expect(isExpired(decodeClaims(token), 95)).toBe(true);
    expect(isExpired(null, 0)).toBe(true);
  });
  it("onboarding", () => {
    expect(needsOnboarding(decodeClaims(token))).toBe(true);
    expect(needsOnboarding({})).toBe(false);
    expect(decodeClaims("garbage")).toBeNull();
  });
});

describe("decideRoute", () => {
  const anon = { loggedIn: false, needsOnboarding: false };
  const user = { loggedIn: true, needsOnboarding: false };
  const fresh = { loggedIn: true, needsOnboarding: true };
  it.each([
    ["/", anon, { action: "next" }],
    ["/Growth", anon, { action: "redirect", to: "/Login" }],
    ["/api/submissions", anon, { action: "unauthorized" }],
    ["/api/auth/google", anon, { action: "next" }],
    ["/Login", user, { action: "redirect", to: "/Growth" }],
    ["/Growth", user, { action: "next" }],
    ["/Onboarding", user, { action: "redirect", to: "/Growth" }],
    ["/Growth", fresh, { action: "redirect", to: "/Onboarding" }],
    ["/api/submissions", fresh, { action: "unauthorized" }],
    ["/api/auth/onboarding", fresh, { action: "next" }],
    ["/Onboarding", fresh, { action: "next" }],
  ])("%s", (path, session, expected) => expect(decideRoute(path, session)).toEqual(expected));
});

describe("submission", () => {
  it("terminal", () => {
    expect(isTerminal("done")).toBe(true);
    expect(isTerminal("generating")).toBe(false);
  });
  it("poll backoff", () => {
    expect(nextPollDelay(0)).toBe(2000);
    expect(nextPollDelay(12)).toBe(4000);
    expect(nextPollDelay(100)).toBe(10000);
  });
  it("timeout & messages", () => {
    expect(hasTimedOut(0, 5 * 60 * 1000 + 1)).toBe(true);
    expect(failureMessage("not_relevant")).toContain("找不到");
    expect(failureMessage(null)).toContain("失敗");
  });
});
