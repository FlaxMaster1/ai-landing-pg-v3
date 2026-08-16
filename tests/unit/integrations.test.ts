import { describe, expect, it } from "vitest";
import { createFixtureProviders } from "@integrations/fixtures";
import { loadSite } from "@rendering/site-loader";

describe("fixture provider adapters", () => {
  const providers = createFixtureProviders(loadSite("reference"));
  it("preserves requested entity order", async () => {
    const events = await providers.events.list({ ids: ["content-workshop", "framework-review"] });
    expect(events.map(({ id }) => id)).toEqual(["content-workshop", "framework-review"]);
  });
  it("searches fixture content behind the provider interface", async () => {
    const results = await providers.search.search("accessibility");
    expect(results).toHaveLength(1);
    expect(results[0]?.title).toMatch(/Accessible/);
  });
  it("simulates form submission without an external service", async () => {
    await expect(providers.forms.submit({ formId: "demo", values: { email: "a@example.invalid" } })).resolves.toMatchObject({ ok: true });
  });
});
