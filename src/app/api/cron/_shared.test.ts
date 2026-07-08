import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/supabase/admin", () => ({
  getAdminSupabase: vi.fn(),
}));

import { getAdminSupabase } from "@/lib/supabase/admin";
import { guardCron, tokenize, topKeywords } from "./_shared";

const mockedGetAdminSupabase = vi.mocked(getAdminSupabase);

describe("tokenize", () => {
  it("removes stopwords and short tokens", () => {
    const tokens = tokenize("The quick brown fox jumps over 42");
    expect(tokens).toContain("quick");
    expect(tokens).toContain("brown");
    expect(tokens).not.toContain("the");
    expect(tokens).not.toContain("42");
  });

  it("filters arXiv boilerplate", () => {
    const tokens = tokenize("We propose a novel method for this paper");
    expect(tokens).not.toContain("propose");
    expect(tokens).not.toContain("paper");
  });
});

describe("topKeywords", () => {
  it("ranks tokens by frequency with alphabetical tie-breaks", () => {
    expect(topKeywords("neural neural network learning", 2)).toEqual([
      "neural",
      "learning",
    ]);
  });

  it("respects the limit", () => {
    expect(topKeywords("alpha beta gamma delta", 2)).toHaveLength(2);
  });
});

describe("guardCron", () => {
  beforeEach(() => {
    vi.stubEnv("CRON_SECRET", "test-secret");
    mockedGetAdminSupabase.mockReturnValue({} as never);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it("returns 503 when CRON_SECRET is missing", async () => {
    vi.unstubAllEnvs();

    const result = guardCron(new Request("http://localhost/api/cron/test"));

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(503);
      expect(await result.response.json()).toMatchObject({
        error: expect.stringContaining("CRON_SECRET"),
      });
    }
  });

  it("returns 401 when the bearer token is wrong", async () => {
    const result = guardCron(
      new Request("http://localhost/api/cron/test", {
        headers: { Authorization: "Bearer wrong-secret" },
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(401);
      expect(await result.response.json()).toEqual({ error: "Unauthorized" });
    }
  });

  it("returns 503 when Supabase admin client is unavailable", async () => {
    mockedGetAdminSupabase.mockReturnValue(null);

    const result = guardCron(
      new Request("http://localhost/api/cron/test", {
        headers: { Authorization: "Bearer test-secret" },
      }),
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.response.status).toBe(503);
      expect(await result.response.json()).toMatchObject({
        error: expect.stringContaining("Supabase is not configured"),
      });
    }
  });

  it("returns the admin client when auth and env are valid", () => {
    const admin = { from: vi.fn() };
    mockedGetAdminSupabase.mockReturnValue(admin as never);

    const result = guardCron(
      new Request("http://localhost/api/cron/test", {
        headers: { Authorization: "Bearer test-secret" },
      }),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.admin).toBe(admin);
    }
  });
});
