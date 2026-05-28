---
name: pr-creation
description: >-
  Creates Ohukaart/SMIT sprint pull requests with readiness gates, sprint-paketi
  context, test evidence, local Agent Review check, and gh pr create. Use when the
  user says "tee PR", "loo PR", "create pull request", "ava merge request", or
  "pr-creation". Never merges, approves, or creates PRs from main or a dirty
  worktree. Post-PR AI review guidance: help/ai-reviewers/README.md.
---

# PR Creation (Ohukaart)

Agent workflow for **creating** a GitHub pull request — not merging or approving. Planning belongs to `sprint-planning`. Implementation belongs to `nextjs-implementation`. Playwright tests belong to `playwright-spec`.

| Phase | Output |
| --- | --- |
| **Pre-flight** | Sprint slug, sprint-paketi kontekst, `AGENTS.md` PR reeglid |
| **Readiness gate** | PASS or BLOCKED (branch, worktree, commits, tests, Agent Review) |
| **Draft** | PR title + body (SMITi sektsioonid) |
| **Publish** | `git push` + `gh pr create` |
| **Report** | Readiness, PR URL, summary, next steps |

> Naming: **Readiness gate** peab olema läbitud enne `gh pr create`. **Publish** ei toimu `main`-harult ega musta tööpuuga.

## When to use

| Trigger | Action |
| --- | --- |
| "tee PR", "loo PR", "create pull request", "ava merge request", "pr-creation" | Run full workflow below |
| User asks only for PR body text | Draft title + body only; do **not** push or create PR unless asked |

## Pre-flight (always, first)

1. Read `AGENTS.md` (§1 PR-i kirjeldusnõuded, §3 CI/CD merge gate).
2. Read `help/ai-reviewers/README.md` (Agent Review enne PR-i; BugBot/Codex pärast PR-i).
3. Identify sprint folder from user input or branch name (`sprint-XX-<slug>` → `docs/sprints/sprint-XX-<slug>/`).
4. Read sprint-pakett (kõik, mis on olemas):

| File | Milleks |
| --- | --- |
| `spec.md` | R-nõuded, AC, out of scope |
| `scenarios.md` | S-stsenaariumid AC coverage tabelisse |
| `technical-plan.md` | Riskid, mock vs päris piir |
| `tasks.md` | T1..Tn staatus, merge gate (nt Deploy Preview QA) |
| `sprint-plan.md` | Sprint eesmärk, branch, linked issues |

5. If sprint folder or branch mapping is unclear, **stop and ask** one focused question.

* * *

## Readiness gate

Run checks **in order**. First failure → **BLOCKED** (do not create PR). Exception: user may override only when explicitly stated after seeing the block reason — default is **no PR**.

Copy checklist and track:

```
Readiness:
- [ ] 1. Git state
- [ ] 2. Sprint scope
- [ ] 3. Tests and build
- [ ] 4. Local review (Agent Review)
- [ ] 5. PR format clarity
```

### 1. Git state

Run in parallel:

```bash
git rev-parse --abbrev-ref HEAD
git status --short
git log main..HEAD --oneline
git diff main...HEAD --stat
```

| Check | PASS | BLOCKED |
| --- | --- | --- |
| Branch | `sprint-XX-<slug>` or agreed feature branch; **not** `main` | On `main`, detached, or unknown branch |
| Worktree | Clean (`git status --short` empty) | Any modified/untracked files — especially `src/`, `tests/`, `package.json`, sprint docs, `.env*` |
| Secrets | No `.env`, tokens, credentials staged or unstaged | Secrets or debug junk present |
| Commits | ≥1 commit ahead of `main` | No commits to PR |

If BLOCKED on worktree: list blocking paths; ask user to commit, stash, or discard before retrying. **Do not** create PR with dirty worktree.

If branch name does not match a sprint folder, ask user to confirm sprint path before continuing.

### 2. Sprint scope

From `tasks.md` and `git diff main...HEAD`:

- Map changed files to completed tasks (T1..Tn-1) for this PR scope.
- Unchecked tasks in scope → note in PR body; do not claim full sprint done unless true.
- **Deploy Preview QA / merge gate** (nt S10/R5): if unchecked in `tasks.md`, PR may still be **created** but body must flag it as **pre-merge requirement** — do not block PR creation for this alone.
- Closeout (Tn): note CHANGELOG, issue close, Deploy Preview URL — done vs TBD.

### 3. Tests and build

When code changed, run (or confirm user already ran):

```bash
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

| Outcome | Action |
| --- | --- |
| All pass | Record counts in Test evidence |
| Some fail | May still create PR **only if** user explicitly wants — mark failures honestly |
| Not run | **BLOCKED** by default; ask user to run or confirm skip. If user confirms skip, proceed and state "not run" + reason in Test evidence |

Never claim tests passed without evidence.

### 4. Local review (Agent Review)

**Before PR**, SMITi soovitus: Cursor **Agent Review** kogu branchi muudatustele (Source Control tab või `/agent-review`). See erineb lühikesest task-review'st.

Ask user (if not already stated in conversation):

> Kas Cursor Agent Review on tehtud?  
> - **Jah** → küsige lühike kokkuvõte (kriitilised leiud parandatud / false positive / puudub) → täida Local review evidence.  
> - **Ei** → küsi: **(A)** tee Agent Review nüüd (kasutaja teeb käsitsi; oota kinnitust) või **(B)** jätka PR-iga ja märgi body-sse, et lokaalset agent-review'd **ei tehtud**.

Do **not** impersonate Agent Review output. If environment cannot run it, user must run it or choose option B.

Triage enne PR-i (kui review tehtud): real bug / missing test → fix enne PR-i; false positive → ignore with reason; outside scope / pre-existing → follow-up, ära scope'i kasvata.

### 5. PR format clarity

SMITi PR-vormistus tuleb `AGENTS.md` §1 + selle skill'i body mallist. Kui title/body reegel on **puudu või ebaselge** (nt base branch, fork vs upstream, issue link), **stop and ask** one focused question before `gh pr create`.

* * *

## PR title format

```
feat(sprint-01): MVP tekstiteavitus + GPS + kinnitus
```

Pattern: `<type>(sprint-XX): <short sprint goal>` — Conventional Commits + sprint number. Type: `feat`, `fix`, `chore`, `docs`, `test` per change nature.

* * *

## PR body template

Fill every section from **actual** sprint data and command output — no placeholder lorem.

```markdown
## Summary

<1–3 sentences: mida muudeti, miks, kellele>

## Sprint / task references

- Sprint: docs/sprints/sprint-XX-<slug>/
- Branch: sprint-XX-<slug>
- Tasks: T1–Tn (list completed for this PR)
- Requirements: R1–Rn (brief map)
- Linked issue: <URL or ID or "none">

## Acceptance criteria coverage

| Requirement | Scenario | Evidence |
| --- | --- | --- |
| R1 | S1, S2 | Playwright `citizen-send.spec.ts` / manual |
| … | … | … |

## Test evidence

- `npm run lint`: PASS / FAIL / not run
- `npm run typecheck`: PASS / FAIL / not run
- `npm run build`: PASS / FAIL / not run
- `npm run test:e2e`: <N> passed, <M> failed, <K> skipped / not run (<reason>)
- Deploy Preview QA (if applicable): **TBD** or URL — merge gate per `tasks.md`

## Local review evidence

- Cursor Agent Review: done / not done
- If done: <1–2 sentences — critical findings fixed or waived with reason>
- If not done: explicitly state lokaalset agent-review'd ei tehtud

## Screenshots / Playwright evidence

- <Playwright report path, trace, screenshot paths, or "none — add after Deploy Preview">
- Netlify Deploy Preview URL when available

## Risks and known limitations

- <from spec out of scope, technical-plan, adversarial-review — mock API, no 112, etc.>

## AI usage note

- Agent: <Cursor / other>
- Skills used: <sprint-planning, nextjs-implementation, playwright-spec, pr-creation, …>
```

Optional short checklist (mirror `AGENTS.md`):

```markdown
## Checklist

- [ ] lint
- [ ] typecheck
- [ ] build
- [ ] Playwright e2e
```

* * *

## Create PR workflow

Only when readiness gate is **PASS** (or user explicitly accepted documented gaps after BLOCKED items).

1. **Analyze diff** — `git diff main...HEAD` for summary and AC mapping; include ALL commits on branch, not just latest.
2. **Draft title + body** from template above.
3. **Show draft** if user asked to review first; otherwise proceed when PASS.
4. **Push** if branch not on remote:

```bash
git push -u origin HEAD
```

5. **Create PR** (default base: `main`; confirm if user specified otherwise):

```bash
gh pr create --base main --head "$(git rev-parse --abbrev-ref HEAD)" --title "<title>" --body "$(cat <<'EOF'
<body markdown here>
EOF
)"
```

6. **Return report** (see Output format). Do **not** merge, approve, or comment `@codex review` unless user asks for post-PR AI review steps.

* * *

## Rules (hard)

- Do **not** create PR from `main`.
- Do **not** create PR when worktree is dirty or important files are uncommitted.
- Do **not** merge the PR.
- Do **not** approve your own PR (`gh pr review --approve`).
- Do **not** force-push unless user explicitly requests.
- Do **not** commit unless user explicitly requests.
- Do **not** push to remote unless creating PR (or user asks).
- If tests fail or were not run, state honestly in Test evidence — never fabricate green CI.
- Post-PR AI reviewer: default **Cursor BugBot**; alternative **Codex** per `help/ai-reviewers/README.md` — that is **next step**, not part of PR creation.

* * *

## Output format

Report to user after workflow:

```
Readiness: PASS | BLOCKED
PR URL: <url> | (not created — <reason>)
Summary: <what went into the PR — scope, key files, tasks covered>
Next steps: <Agent Review if skipped / BugBot or Codex review / human review / merge gate items>
```

Examples:

- **PASS:** PR URL returned; next steps = run BugBot (`cursor review` on PR) + human triage + Deploy Preview QA if pending.
- **BLOCKED:** dirty worktree → list files; no PR URL; next steps = commit/stash then re-run skill.

* * *

## Stop conditions

Ask one focused question if:

- No git remote or `gh` not authenticated.
- Branch name does not match any sprint folder and user did not give sprint path.
- Base branch unclear (default `main` for Ohukaart koolitusfork).
- Fork vs upstream remote setup unclear for PR target.
- SMIT PR format requirement missing from repo and not inferable from `AGENTS.md`.

* * *

## References

- PR rules: `AGENTS.md` §1, §3
- AI review flow: `help/ai-reviewers/README.md`
- Agent Review (enne PR-i): [Cursor Agent Review docs](https://cursor.com/docs/agent/agent-review)
- BugBot setup: [cursor.com/dashboard](https://cursor.com/dashboard) — manual OAuth; agent cannot connect
- Post-PR review prompt: `help/oppematerjal-III-päev.md` § 5.4–5.5
- Related skills: `sprint-planning`, `nextjs-implementation`, `playwright-spec`
