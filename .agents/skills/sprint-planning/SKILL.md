---
name: sprint-planning
description: >-
  Bootstraps a new Ohukaart sprint package from docs/roadmap.md — creates
  docs/sprints/sprint-XX-<slug>/ with spec.md (what) and sprint-plan.md (how)
  only. Use when the user asks to start a sprint, create a sprint package,
  plan sprint XX, bootstrap spec/plan from roadmap, or says "uus sprint",
  "loo sprint-pakett", "sprint planning".
---

# Sprint Planning (Ohukaart)

Creates the **initial** sprint package: two files in `docs/sprints/sprint-XX-<slug>/`. Does **not** implement code, commit, or create branch unless the user explicitly asks.

For splitting a large initiative across multiple sprints, use the personal `sprint-manager` skill. This skill bootstraps **one** roadmap row.

## When to use

| Signal | Action |
| --- | --- |
| User names a sprint number or pastes a roadmap row | Run full workflow |
| User says "uus sprint", "loo sprint-pakett", "alusta sprinti" | Ask which roadmap row if unclear |
| User wants `scenarios.md`, `technical-plan.md`, `tasks.md` now | **Stop** — those belong to Phase 1+ inside the sprint |
| Sprint folder already has filled `spec.md` | Offer update/revision, do not blindly overwrite |

## Mandatory reads (before writing)

1. `AGENTS.md` — especially §5 (assumptions, simplicity, HARD GATE, branch rules)
2. `docs/roadmap.md` — the sprint row (number, slug, goal, H1 ids, dependencies, size)
3. `docs/sprints/README.md` — package layout and file roles
4. `docs/sprints/_template/spec.md` and `docs/sprints/_template/sprint-plan.md`
5. Relevant `docs/background-research/`, `docs/analysis/`, open GitHub issues (if user or roadmap points to them)

## Derive sprint identity

From a roadmap row like:

`02 | sprint-02-fotoga-teavitus - Fotoga teavitus...`

| Field | Source |
| --- | --- |
| `XX` | Sprint number (zero-padded: `02`) |
| `<slug>` | Folder slug after `sprint-XX-` (e.g. `fotoga-teavitus`) |
| Title | Human title after ` - ` |
| H1 ids | Roadmap "H1 nõuded" column |
| Dependencies | Roadmap "Sõltuvused" column |
| Size hint | `S` / `M` / `L` — influences track (light vs full phases) |

**Output directory:** `docs/sprints/sprint-XX-<slug>/`

If the user gives only a title ("foto maskimine"), map it to the matching roadmap row; do not invent `XX` or slug.

## Workflow checklist

Copy and track:

```
- [ ] 1. Resolve sprint row + confirm folder path with user if ambiguous
- [ ] 2. Pre-flight: folder missing or user approved overwrite
- [ ] 3. Gather context (roadmap, H1, analysis, issues, prior sprints)
- [ ] 4. Write spec.md (WHAT only)
- [ ] 5. Write sprint-plan.md (HOW only)
- [ ] 6. Self-check (rules below)
- [ ] 7. Report: paths, open questions, HARD GATEs, suggested next step (no auto-commit)
```

## File 1: `spec.md` (WHAT)

**Default — Speckit Lite:** hand-write from `docs/sprints/_template/spec.md`. Optionally follow structure hints in `help/speckit/lite-alternative.md` (user stories + testable AC), but keep Ohukaart section names.

**Optional — Speckit CLI:** only if `specify-cli` is installed and `specify init` was run for this repo. Run `/speckit.specify` with sprint context; save output as `spec.md`. Same sections as below.

### Required structure

```markdown
# Sprint XX: <Title> — Spec

## Eesmärk
(3–5 sentences: problem, who benefits, why now. User-facing, not stack choices.)

## Põhimõtted
(3–5 business/design principles as bullets.)

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
| --- | --- | --- |

## Viited AGENTS.md-sse
(Bullet links to relevant AGENTS.md §5 rules for this sprint.)
```

### Spec rules

- Each acceptance criterion must be **testable now** (QA checklist, measurable threshold, or explicit pass/fail observable).
- Map requirements to roadmap **H1** ids in prose where natural (`F-02`, `NF-05`, …).
- Link `docs/analysis/` or background research when they constrain the sprint.
- Mark **HARD GATE** requirements when AGENTS.md or business rules forbid defaulting (e.g. legal/ops choice). State blocked behavior until gate is approved.
- **No** implementation stack, API shapes, or file paths in spec (those go to `technical-plan.md` in Phase 1).
- Prefer **3–6** requirements; split scope rather than one giant R1.

## File 2: `sprint-plan.md` (HOW)

Copy **Agent Runtime Instructions** (items 1–7 + runtime behavior bullets) verbatim from `docs/sprints/_template/sprint-plan.md`, then fill project-specific sections.

### Minimum sections to fill

| Section | Content |
| --- | --- |
| **Goal** | 1–2 sentences aligned with roadmap goal |
| **Linked Issues** | GitHub issue URLs if known; note if issue must be created in Phase 0 |
| **MVP Scope** | 2–4 workstreams with concrete bullets tied to R1…Rn |
| **Out of Scope** | Mirror spec + delivery deferrals |
| **Success Criteria** | Checkboxes per R* AC + `docs/CHANGELOG.md` + `research/adversarial-review.md` when using full track |
| **Proposed Delivery Path** | Phases 0…N with checkboxes; Phase 0 includes branch + audit + adversarial review |
| **Risks** | Table: Risk \| Mitigation |
| **Status** | Track, current phase, branch name |

### Phase 0 template (always include)

```markdown
### Phase 0: Audit and plan
- [ ] Loo sprint-haru: `git checkout -b sprint-XX-<slug>`
- [ ] Kontrolli linked issue(id) ja olemasolevat koodi
- [ ] `research/initial-audit.md`
- [ ] `research/adversarial-review.md`
```

Add implementation phases mapped to R1…Rn. End with **QA and closeout** (tests, CHANGELOG, close/update issues).

### Track selection

| Roadmap maht | Suggested **Track** in Status |
| --- | --- |
| `S` or clearly &lt; ~200 LOC doc-only | `Lightweight` — fewer phases, still keep spec/plan split |
| `M` / `L` or compliance/privacy/multi-platform | `Full 6-phase` (or explicit phase count) |

**Branch:** document `sprint-XX-<slug>` in Status; creation happens in Phase 0 (not during planning-only task unless user asks).

### Plan rules

- **Do not** duplicate full requirement text — reference `R1`, `R2`, …
- **Do not** create `scenarios.md`, `technical-plan.md`, `tasks.md`, `prototype/`, or `research/*.md` content in this skill (only mention them as Phase 1+ deliverables).
- If spec has HARD GATE, set `Pre-Implementation Gate` to **blocked** or **conditional** until review exists.
- Align **Success Criteria** checkboxes with spec acceptance criteria (one checkbox can cover one R if AC are grouped).

## What vs how (hard rule)

| File | Contains |
| --- | --- |
| `spec.md` | Outcomes, stakeholders, requirements, AC, out of scope, open questions |
| `sprint-plan.md` | Agent order, phases, workstreams, risks, gates, status, links to research paths |

If content fits both, put observable behavior in spec and process/sequence in plan.

## Quality gate (before finishing)

- [ ] Folder name matches roadmap `sprint-XX-<slug>`
- [ ] Every R* has ≥2 testable acceptance criteria
- [ ] Out of scope appears in both files (consistent)
- [ ] Open questions name **who** to ask, not only "TBD"
- [ ] No invented repo paths, issue numbers, or analysis files
- [ ] HARD GATEs visible in spec **and** plan `Pre-Implementation Gate`
- [ ] Neither file starts implementation tasks beyond planning/audit

## Output to user

Report briefly:

1. Created/updated paths
2. Requirement count and any HARD GATE
3. Top 3 open questions needing human input
4. Suggested next step: Phase 0 audit, create GitHub issue, or user review of spec

Do **not** commit or push unless the user explicitly requests it.

## Reference example

Filled package (structure reference only; roadmap slug may differ):

- `docs/sprints/sprint-02-foto-maskimine/spec.md`
- `docs/sprints/sprint-02-foto-maskimine/sprint-plan.md`

## Copy-paste prompt for the user

See [prompt-template.md](prompt-template.md) for a generic user message to start this skill.
