import { expect, test } from "@playwright/test";

/**
 * Full booking flow, green from Phase 3 onward.
 * Goes through the mock payment provider and verifies the confirmation page.
 */
test("book a Tbilisi Airport → Gudauri sedan transfer", async ({ page }) => {
  await page.goto("/transfers/tbilisi-airport-gudauri");
  await expect(page.getByRole("heading", { name: /Tbilisi Airport.*Gudauri/i })).toBeVisible();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 3);
  const iso = tomorrow.toISOString().slice(0, 10);

  // Pick a whole-vehicle class so pax=2 is valid.
  await page.getByRole("radio", { name: /^Sedan/i }).check();

  await page.locator("#travelDate").fill(iso);
  await page.locator("#travelTime").fill("14:30");
  await page.locator("#pax").fill("2");
  await page.locator("#name").fill("Nino Test");
  await page.locator("#phone").fill("+995555123456");
  await page.locator("#email").fill("nino@example.com");
  await page.locator("#pickup").fill("Freedom Square 2");

  await Promise.all([
    page.waitForURL(/\/transfers\/confirmation\/GW-/),
    page.getByRole("button", { name: /Continue to payment/i }).click(),
  ]);

  await expect(page.getByText(/Booking confirmed/i)).toBeVisible();
});
