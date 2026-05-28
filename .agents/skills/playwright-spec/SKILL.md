---
name: playwright-spec
description: >-
  Generates Playwright .spec.ts E2E tests for Ohukaart sprints from scenarios.md
  and browser exploration notes. Writes tests in tests/e2e/ with S<n>+R<n>
  traceability; does not run the browser for QA exploration. Use when the user
  says "genereeri testifailid", "kirjuta spec.ts", "loo Playwright testid",
  "pane testid kirja", "genereeri CI testid", or "playwright-spec". Never
  implements app code or explores UI live unless asked.
---

# Playwright Spec (Ohukaart)

Generates deterministic Playwright `.spec.ts` files for CI regression. Live browser QA belongs to built-in browser exploration (§ 4.1) or `playwright-mcp` — this skill **writes test code only**.

## When to use

| Use this skill | Not this skill |
| --- | --- |
| "genereeri testifailid", "kirjuta spec.ts", "playwright-spec" | "kontrolli UI", "testi brauseris", "ava localhost" |
| After § 4.1 exploration notes exist | Before selectors/flows are known |
| Sprint closeout / T6 e2e task | Planning scenarios (use `sprint-planning`) |

Planning belongs to `sprint-planning`. App code belongs to `nextjs-implementation`. PR creation belongs to `pr-creation`.

## Pre-flight (always)

1. Read sprint `scenarios.md`, `spec.md` (R-requirements), and `research/e2e-exploration-notes.md` when present.
2. Read `playwright.config.ts`, `tests/e2e/test-fixture.ts`, and existing `*.spec.ts` — extend, do not duplicate.
3. Read UI components for `data-testid` and stable selectors documented in exploration notes.
4. Confirm `npx playwright test` runs (Playwright setup complete).

## Workflow

### Step 1 — Map scenarios to files

Group by user journey; default layout for Ohukaart:

| File | Scenarios | Focus |
| --- | --- | --- |
| `citizen-send.spec.ts` | S1, S2, S5, S6 | Form, validation, confirmation, errors |
| `gps-block.spec.ts` | S3, S4 | Location display and GPS gate |
| `dispatcher-view.spec.ts` | S7, S8 | `/dispatcher` list |
| `latency.spec.ts` | S9, S10, S11, S12 | HTTPS, timing, slow/timeout UX |

Adjust groups only when a new sprint adds routes — keep one concern per file.

### Step 2 — Write tests

Rules for each test:

- **Name:** include scenario id, e.g. `S2: liiga lühike tekst näitab veateadet`.
- **Traceability:** `test.describe('S1, S2 — …')` or comment `// S1 (R1)` at top of test.
- **Then-strict:** assert exact Estonian copy from scenarios/spec when specified; no loose `toBeTruthy()` on user-visible outcomes.
- **Selectors:** prefer `data-testid`; fallback `getByRole` / `getByText` only when stable.
- **Isolation:** import `{ test, expect }` from `./test-fixture` (clears sessionStorage).
- **API simulation:** use `page.route()` for 5xx, delay, or payload capture — not real network flakiness.
- **GPS deny (S4):** `page.addInitScript(() => { window.__OHUKAART_GEO_TEST__ = 'deny'; })` before `goto`.
- **Deploy-only (S9/S10):** local proxy via relative URL; mark Deploy Preview checks `test.skip` with reason.

Template:

```typescript
import { expect, test } from './test-fixture';

test.describe('S1, S5 — kodaniku saatmine', () => {
  test('S1 (R1): kehtiv teavitus saadetakse serverisse', async ({ page }) => {
    // Given / When / Then from scenarios.md
  });
});
```

### Step 3 — Run and fix

```bash
npm run test:e2e
# or: npx playwright test
```

- **FAIL + app bug:** report bug; do not weaken assertions.
- **FAIL + scenario too vague:** note in exploration notes; propose AC tightening.
- **Flaky:** prefer explicit waits on visible state, not fixed `sleep`.

### Step 4 — Document gaps

Update `research/e2e-exploration-notes.md` or sprint `tasks.md` if:

- A scenario has no automatable local test (e.g. S10 Deploy Preview).
- A new `data-testid` was needed in app code — stop and ask before editing `src/` unless user requested testability fix.

## Output

| Artifact | Location |
| --- | --- |
| Test files | `tests/e2e/*.spec.ts` |
| Shared fixture | `tests/e2e/test-fixture.ts` (extend only if needed) |
| Latency evidence | `research/latency-notes.md` (S11) |

Each test must reference `S<n>` and map to `R<n>` via scenario title or comment.

## Gate (skill completion)

- [ ] Every automatable scenario in `scenarios.md` has ≥1 test (or explicit `test.skip` with environment reason)
- [ ] Test names or comments include `S<n>` (+ `R<n>` where helpful)
- [ ] `npm run test:e2e` passes locally
- [ ] No invented routes, copy, or selectors not verified in exploration notes or DOM
- [ ] Tests assert Then-clauses **exactly** — not approximate matches

## Stop conditions

Stop and ask one focused question if:

- Playwright is not installed or `playwright.config.ts` is missing.
- `scenarios.md` is missing for the sprint.
- Exploration notes and DOM disagree on selectors.
- Implementing a test requires app changes outside `tests/`.
- HARD GATE requirement blocks the scenario.

## Output to user

Short report:

1. Scenarios covered (S ids) and any skipped (with reason).
2. Files created/updated under `tests/e2e/`.
3. `npm run test:e2e` result (pass count / failures).
4. Open gaps (Deploy Preview, missing testids, flaky notes).

Do **not** commit or push unless the user explicitly requests it.
