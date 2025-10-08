import { test, expect } from "@playwright/test";


await page.getByRole("textbox", {Name: "Email адреса *"}).fill("test");
await page.getByRole()