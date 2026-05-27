---
name: sprint-planning
description: >-
  Plans an Ohukaart sprint end-to-end in three steps: Bootstrap (spec.md +
  sprint-plan.md from docs/roadmap.md row), Phase 0 (sprint branch +
  research/initial-audit.md + research/adversarial-review.md), Phase 1
  (scenarios.md + technical-plan.md + tasks.md). Auto-detects current step from
  folder contents. Use when the user says "uus sprint", "loo sprint-pakett",
  "alusta sprinti", "vii sprint Phase 0/1-sse", "loo scenarios/technical-plan/
  tasks", "arendaja sprint-planning". Never implements code or commits unless
  asked.
---

# Sprint Planning (Ohukaart)

Drives the full planning lifecycle in three sequential steps. Implementation belongs to `nextjs-implementation` skill.

| Step | Output |
| --- | --- |
| **Bootstrap** | `spec.md` (WHAT) + `sprint-plan.md` (HOW) |
| **Phase 0** | sprint branch + `research/initial-audit.md` + `research/adversarial-review.md` |
| **Phase 1** | `scenarios.md` + `technical-plan.md` + `tasks.md` |

> Naming: **Bootstrap** is the pre-Phase step (PO bootstrap). **Phase 0** and **Phase 1** match `sprint-plan.md`'s delivery-path phases of the same names. After Phase 1, the sprint moves to Phase 2..N (implementation), which belongs to `nextjs-implementation` skill.

## Auto-detect step (run first, always)

List `docs/sprints/sprint-XX-<slug>/` and pick the step where output is missing. Skip completed steps. If the user names a specific step ("vii sprint Phase 0-sse"), honor that.

| Folder state | Start at |
| --- | --- |
| Folder missing or empty | Bootstrap |
| `spec.md` + `sprint-plan.md` exist, `research/` empty | Phase 0 |
| `research/initial-audit.md` + `research/adversarial-review.md` exist; `scenarios.md` / `technical-plan.md` / `tasks.md` missing | Phase 1 |
| All Phase 1 files present | Stop — suggest `nextjs-implementation` on `tasks.md` T1 |
| `spec.md` already filled and user re-requests Bootstrap | Offer update; do not overwrite |

Before writing any file: read `AGENTS.md` (§5 rules, §2 stack), the roadmap row, `docs/sprints/README.md`, and `_template/` for the step you are about to run. If continuing from earlier step, re-read its output so later steps stay consistent.

## Derive sprint identity

From a roadmap row `02 | sprint-02-fotoga-teavitus - Fotoga teavitus...`:

| Field | Source |
| --- | --- |
| `XX` | Sprint number zero-padded (`02`) |
| `<slug>` | Folder slug after `sprint-XX-` |
| Title | Human title after ` - ` |
| H1 ids | Roadmap "H1 nõuded" column |
| Dependencies | Roadmap "Sõltuvused" column |
| Size hint | `S` / `M` / `L` (drives track choice) |

If the user gives only a title, map it to the matching roadmap row. Do not invent `XX` or slug.

* * *

## Bootstrap

### `spec.md` (WHAT)

Hand-write from `docs/sprints/_template/spec.md`. (Optional Speckit CLI: only if `specify-cli` is installed; save `/speckit.specify` output as `spec.md` with the same sections.)

Required structure:

```markdown
# Sprint XX: <Title> — Spec

## Eesmärk
(3–5 sentences: problem, who benefits, why now.)

## Põhimõtted
(3–5 business/design principles.)

## Requirements (Nõuded)

### R1: <Title>
As a <stakeholder>, I want <capability>, so that <value>.
Acceptance criteria:
- <testable>
- <testable>

### R2: ...

## Out of Scope
- ...

## Avatud küsimused
| Küsimus | Kellelt küsida | Tähtaeg |

## Viited AGENTS.md-sse
```

Rules:

- Every AC is **testable now** (measurable threshold or pass/fail observable).
- Map requirements to roadmap **H1** ids in prose where natural.
- Mark **HARD GATE** requirements when AGENTS.md or business rules forbid defaulting.
- No stack, API shapes, or file paths (those belong to Phase 1).
- Prefer **3–6** requirements; split scope rather than one giant R1.

### `sprint-plan.md` (HOW)

Copy **Agent Runtime Instructions** verbatim from `docs/sprints/_template/sprint-plan.md`, then fill:

| Section | Content |
| --- | --- |
| Goal | 1–2 sentences aligned with roadmap |
| Linked Issues | GitHub URLs or "create in Phase 0" |
| MVP Scope | 2–4 workstreams tied to R1…Rn |
| Out of Scope | Mirror spec |
| Success Criteria | Checkboxes per R* + `docs/CHANGELOG.md` + `research/adversarial-review.md` |
| Proposed Delivery Path | Phases 0…N with checkboxes |
| Risks | Table: Risk \| Mitigation |
| Status | Track, current phase, branch name |

Phase 0 template (always include — executed by this skill's Phase 0 section):

```markdown
### Phase 0: Audit and plan
- [ ] Loo sprint-haru: `git checkout -b sprint-XX-<slug>`
- [ ] Kontrolli linked issue(id) ja olemasolevat koodi
- [ ] `research/initial-audit.md`
- [ ] `research/adversarial-review.md`
```

Track: `S` or doc-only → `Lightweight`; `M` / `L` / compliance / multi-platform → `Full 6-phase`.

Rules:

- Do **not** duplicate requirement text — reference `R1`, `R2`, …
- Do **not** create `scenarios.md` / `technical-plan.md` / `tasks.md` / `research/*` content in Bootstrap.
- If spec has HARD GATE, set `Pre-Implementation Gate` to **blocked** / **conditional**.

### Bootstrap gate (before Phase 0)

- [ ] Folder name = `sprint-XX-<slug>`
- [ ] Every R* has ≥2 testable AC; HARD GATEs visible in both files
- [ ] Out of scope mirrored in both files
- [ ] Open questions name **who** to ask, not just "TBD"
- [ ] No invented paths, issue numbers, or analysis files

* * *

## Phase 0: Audit and branch

### Pre-flight

- Read `AGENTS.md §5`: "EI tohi koodi muuta `main`-harul".
- `git status` clean, `git rev-parse --abbrev-ref HEAD` returns `main`. If not, **stop and ask**.
- Confirm `spec.md` + `sprint-plan.md` exist; if not, go back to Bootstrap.

### Create branch

```bash
git checkout main
git pull --ff-only
git checkout -b sprint-XX-<slug>
```

Record the branch name in `sprint-plan.md` Status (no auto-commit).

### `research/initial-audit.md`

```markdown
# Sprint XX — Initial audit

## Repo current state
(What code exists today that touches this sprint? What is missing?)

## Existing assets relevant to R1..Rn
(prototype/, background-research/, prior sprints, GitHub issues)

## Open technical questions for Phase 1
(What must technical-plan.md decide that is not yet decided?)

## Risks discovered during audit
(Anything not yet in sprint-plan.md Risks.)
```

### `research/adversarial-review.md`

At least **3 counter-arguments** to spec choices. Hostile to the spec, not the author. Common targets: scope creep, HARD GATE defaults, missing sad paths, unrealistic performance targets, untested user assumptions.

```markdown
# Sprint XX — Adversarial review

## Counter-argument 1: <topic>
**Claim in spec:** ...
**Counter:** ...
**Resolution:** addressed in <R*, AC, or sprint-plan section> / deferred to <sprint or issue> + reason.

## Counter-argument 2: ...
## Counter-argument 3: ...
```

### Phase 0 gate (before Phase 1)

- [ ] On sprint branch (`git rev-parse --abbrev-ref HEAD` = `sprint-XX-<slug>`)
- [ ] `initial-audit.md` non-empty; `adversarial-review.md` has ≥3 counter-arguments, each addressed or deferred with reason
- [ ] HARD GATE R-requirements: pause and ask user before Phase 1
- [ ] `sprint-plan.md` Status updated (branch + current phase)

* * *

## Phase 1: SDD artefaktid

Generate in this order — later files depend on earlier ones: `scenarios.md` → `technical-plan.md` → `tasks.md`.

### `scenarios.md`

```markdown
# Sprint XX — Scenarios

## S1 (R1, happy) — <short title>
**Given** <starting state>
**When** <user action>
**Then** <observable outcome>

## S2 (R1, sad) — <short title>
...
```

Rules:

- Every R from `spec.md` gets **≥1 happy + ≥1 sad** scenario.
- Title format: `S<n> (R<n>, happy|sad) — <title>` (enables cross-reference from `tasks.md` and tests).
- One observable outcome per `Then` (no AND-chains).
- If `spec.md` AC mentions a threshold (≥4 decimals, ≤5s p95), the scenario restates it.

### `technical-plan.md`

```markdown
# Sprint XX — Technical plan

## Stack
(Must match AGENTS.md §2. Concrete versions if known.)

## Routes
| Path | Method | Page/Component | Purpose | Related R |

## API endpoints
| Path | Method | Request | Response | Related R |

## Data model
(Tables, types, interfaces. Omit if MVP has no persistence.)

## Component structure
(File tree under `app/` and `components/` — only files the sprint creates or touches.)

## Cross-cutting
- TLS / HTTPS (R5 or equivalent)
- Performance measurement (R6 or equivalent)
- Error handling pattern
- Logging / telemetry (or explicit "none in MVP")

## Risks / open technical questions
(Carry over from initial-audit.md.)
```

Rules:

- Must **not** contradict AGENTS.md §2. If a different stack choice is needed, update AGENTS.md §2 first — do not silently diverge.
- Every R is traceable to ≥1 Route or API endpoint row (or explicitly marked "non-functional, no surface").
- No speculative endpoints / routes / models that no R needs.

### `tasks.md`

```markdown
# Sprint XX — Tasks

> Source of truth for implementation. Iga task viitab R-nõudele ja S-stsenaariumile. ✅ tehtud / ⏳ in-progress / ⏸ blokeeritud.

## Phase 1: T1 — Skeleton
- [ ] **(setup)** `npm create next-app@latest .` — Tailwind + TypeScript + App Router + ESLint (vt nextjs-implementation skill flagid)
- [ ] **(setup)** Esimene `/` route — projekti tiitelleht
- [ ] **(setup)** Smoke check: `localhost:3000` laeb veata

**Commit pärast faasi:** `feat: T1 skeleton — Next.js bootstrap + esimene route`

## Phase 2: T2 — <Feature group 1>
- [ ] **R1, S1, S2:** <implementeeritav samm>
- [ ] **R2, S3, S4:** <implementeeritav samm>

**Commit pärast faasi:** `feat: T2 <feature group> (R1, R2)`

## Phase N+1: Closeout (Tn)
- [ ] Smoke check kõikide R-nõuete vastu (käsitsi)
- [ ] Playwright testid läbivad (vt playwright-spec skill)
- [ ] Loo/uuenda `docs/CHANGELOG.md` (kui faili pole, loo see) — üks kirje sprint XX kohta
- [ ] Uuenda `sprint-plan.md` Status: **Done**
- [ ] Sulge / uuenda linked GitHub Issue
- [ ] Final commit: `chore: sprint-XX closeout — CHANGELOG + status`

## Mapping tabel
| Task | Phase | Requirement | Scenario | Status |
```

Rules:

- **T1 is always skeleton** — first runnable app (document explicitly if Next.js already exists and T1 is empty).
- **Tn (last task) is always closeout** — CHANGELOG entry + Status: Done + Issue close.
- Each non-setup task references `R<n>` + `S<n>`.
- One task = one observable change. If touching >~3 files or 2 R-requirements, split.
- Each phase ends with a commit.
- HARD GATE R-requirements: mark blocked in `tasks.md` until gate approved (`**R4 (HARD GATE):** ⏸ blokeeritud kuni operatiivvaate definitsioon kinnitatud`).

### Phase 1 gate (skill completion)

- [ ] `scenarios.md`: every R has ≥1 happy + ≥1 sad; titles follow `S<n> (R<n>, happy|sad)`
- [ ] `technical-plan.md` aligns with AGENTS.md §2; every R traceable to route/endpoint or marked non-functional
- [ ] `tasks.md`: T1 = skeleton, Tn = closeout (CHANGELOG + Status + Issue); every feature task references `R<n>` + `S<n>`
- [ ] HARD GATE R-requirements marked blocked in `tasks.md`
- [ ] `sprint-plan.md` Status = "Phase 1 complete; ready for implementation"

* * *

## Output to user (after each step)

One short report: step completed, paths created/updated, open questions or HARD GATEs needing input, suggested next step.

| Just completed | Suggested next |
| --- | --- |
| Bootstrap | "Run this skill again — it will continue with Phase 0" |
| Phase 0 | "Run this skill again — it will continue with Phase 1 (pause if HARD GATE pending)" |
| Phase 1 | "Run `nextjs-implementation` skill on `tasks.md` T1" |

Do **not** commit or push unless the user explicitly requests it.
