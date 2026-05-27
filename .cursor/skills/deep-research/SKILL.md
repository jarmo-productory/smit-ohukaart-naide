---
name: deep-research
description: >-
  Produces evidence-backed analysis documents in docs/analysis/ for Ohukaart and
  similar public-sector product work. Compares options, maps repo requirements
  to external sources, and surfaces open questions. Use when the user asks for
  deep research, analüüs, võrdlus, tehnoloogia/regulatsiooni/vendor valik,
  docs/analysis, taustauuringu süntees, or a structured recommendation with
  sources and sprint-ready open questions.
---

# Deep Research (Ohukaart)

Structured, source-linked research → one Markdown file under `docs/analysis/`. No speculative facts; uncertainty goes to **Lahtised küsimused**.

## When to use

| Signal | Action |
| --- | --- |
| User gives a research question + optional constraints | Run full workflow |
| User points at a gap table (e.g. H1 lüngad) | Treat gaps as required coverage |
| User only wants a quick answer in chat | Do **not** use this skill; answer briefly instead |

## Workflow

Copy and track:

```
- [ ] 1. Scope — question, type, constraints, output slug
- [ ] 2. Repo context — requirements, interviews, roadmap, sprints
- [ ] 3. External research — web search + fetch primary sources
- [ ] 4. Synthesis — variants, recommendation, open questions
- [ ] 5. Write docs/analysis/<YYYY-MM-DD>-<slug>.md (template below)
- [ ] 6. Self-check — every factual claim has a link; no invented repo paths
```

### 1. Scope

Extract and state explicitly (in the doc header):

- **Research question** — one sentence, falsifiable
- **Research type** — see [research-types.md](research-types.md)
- **Constraints** — e.g. GDPR, <2s ack, on-device only, budget, EU data residency
- **Output path** — `docs/analysis/<YYYY-MM-DD>-<slug>.md` (today's date, kebab-case Estonian or English slug)
- **Context line** — sprint (`sprint-XX-…`), H1/F-xx id, or initiative name if known

If scope is ambiguous, ask **one** focused question; do not guess the research type.

### 2. Repo context (mandatory before web search)

Read relevant material; cite repo paths in **Evidence trail** and inline where they support a claim.

| Priority | Locations |
| --- | --- |
| Requirements & gaps | `docs/background-research/`, especially gap tables (“Tuvastatud lüngad”) |
| Product framing | `README.md`, `docs/roadmap.md` |
| Sprint link | `docs/sprints/` if the question maps to a sprint |
| Agent rules | `AGENTS.md` (HARD GATE, branch rules if implementation follows) |

**Rules:**

- If a file is referenced in docs but missing, note **“repo fail puudub”** in Lahtised küsimused — do not invent contents.
- Map requirement IDs (F-xx, NF-xx, H1) when they exist.
- Capture **tensions** (stakeholder vs legal vs tech) in **Vastuolud ja erisused**.

### 3. External research

Use **WebSearch** and **WebFetch** (or Firecrawl MCP if available) for current facts.

| Practice | Detail |
| --- | --- |
| Recency | Prefer sources dated or updated within ~18 months; for fast-moving tech, state “seisuga YYYY-MM” |
| Primary sources | Official docs, pricing pages, legislation (Riigi Teataja), standards — not only blog posts |
| Claims | Every non-obvious fact in the body needs an inline link or footnote-style URL |
| Uncertainty | No link → move claim to **Lahtised küsimused**, not Executive Summary |
| Volume | Aim for 5–12 strong external sources; avoid padding |

Do not rely on training-data alone for pricing, API regions, or legal conclusions.

### 4. Synthesis

- **Variants:** 4–8 comparable options (including “do nothing”, hybrid, or phased approaches when relevant).
- **Comparison table:** Pick columns from [research-types.md](research-types.md) for the research type; add project-specific columns only when justified.
- **Soovitus:** One primary choice + **Alternatiivne plaan** if the primary fails a named gate (PoC, legal, performance).
- **Lahtised küsimused:** Actionable rows — question, who to ask, target sprint.

### 5. Write the file

- Read [analysis-template.md](analysis-template.md) and follow its section order.
- **First line of the file = first `#` heading.** No “Loon faili…”, no meta preamble.
- Language: **Estonian** for Ohukaart deliverables unless the user requests English.
- After writing, give the user only a **short** chat summary (2–3 sentences) + path to the file.

### 6. Self-check before finishing

- [ ] Executive Summary is 2–4 sentences and matches the recommendation
- [ ] No unsourced “facts” in summary or recommendation bullets
- [ ] Variant table has consistent units (ms vs s, EUR vs USD noted)
- [ ] Estonian public-sector lens addressed when data location, ISKE, or Riigipilv matter
- [ ] Evidence trail lists **both** repo paths and external URLs
- [ ] Open questions are not disguised guesses

## Branching & commits

- Analysis-only work may stay on the current branch; if the user ties research to active sprint implementation, prefer `sprint-XX-<nimi>` per `AGENTS.md`.
- Do not commit unless the user asks.

## Example invocation (abbreviated)

**User:** “Milline foto-maskerimise tehnoloogia sobib Ohukaart äpile? F-03, <2s ack, GDPR.”

**Agent does:** Read `docs/background-research/`, search 2026-era on-device vs cloud APIs, write `docs/analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md` using the technology_selection columns.

Reference output (do not duplicate into new files): `docs/analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md`.

## Additional resources

- Output skeleton: [analysis-template.md](analysis-template.md)
- Table columns & optional sections by type: [research-types.md](research-types.md)
