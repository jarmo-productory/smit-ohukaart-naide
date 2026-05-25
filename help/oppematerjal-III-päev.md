# SMIT koolituse õppematerjal: päev III ehk praktiline arendus

> See on koolituse **osalejatele mõeldud materjal** — sisaldab harjutuste lühikirjeldusi ja copy-paste prompte. Kasuta koos koolitusel toimuva juhendamisega.

## Kontekst

II päeval valmis sprint-pakett (`spec.md`, `scenarios.md`, `sprint-plan.md`). III päeval arendaja+QA viivad selle täieliku elutsükli läbi — planeerimisest kuni PR-i ja AI review'ni.

```plaintext
smit-ohukaart-naide/
├── AGENTS.md                         # II päev: sektsioonid 0+5 täidetud
├── docs/
│   └── sprints/sprint-01-pildi-saatmine/
│       ├── spec.md                   # II päev — MIDA
│       ├── scenarios.md              # II päev — Gherkin
│       └── sprint-plan.md            # II päev — protsess
└── .agents/skills/                   # III päev — 4 skill'i, mille ise ehitad
```

**Repo:** `https://github.com/jarmo-productory/smit-ohukaart-naide`

* * *

# 1 Setup ja konteksti sisselugemine

## 1.1. Repo lokaalselt

**Variant A —** `gh` **CLI + fork (soovitatud, H4 PR jaoks):**

```bash
gh repo fork jarmo-productory/smit-ohukaart-naide --clone --remote
cd smit-ohukaart-naide && npm install && npm run dev
```

**Variant B — manuaalne** `git clone`**:**

```bash
git clone https://github.com/jarmo-productory/smit-ohukaart-naide.git
cd smit-ohukaart-naide && npm install && npm run dev
```

**Variant C — Cursor agent klonib:**

```plaintext
Klooni https://github.com/jarmo-productory/smit-ohukaart-naide,
käivita npm install + npm run dev.
```

Kontroll: `localhost:3000` näitab Ohukaart skeletoni.

## 1.2. Playwright MCP setup (kui vaja)

Playwrighti vaja siis, kui meil Cursori sisemine brauser ei all kontrollile mingil põhjusel.

1.  **Cmd+Shift+P** → "MCP: Show Configured Servers" — kontrolli `playwright` olemasolu. Kui puudub, lisa `~/.cursor/mcp.json`:
    

```json
{ "mcpServers": { "playwright": { "command": "npx", "args": ["@playwright/mcp@latest"] } } }
```

1.  **Restart Cursor** (Cmd+Q).
    
2.  **Test:** agent chat'is → *"Võta screenshot localhost:3000 lehest."* — screenshot tuleb → MCP töötab.
    

## 1.3. Sprint-paketi sisselugemine

```plaintext
Loe sisse: AGENTS.md, docs/sprints/sprint-01-pildi-saatmine/ (kõik failid),
.agents/skills/sprint-planning/SKILL.md.

Tee 5-rea kokkuvõte:
- Sprint Goal (sprint-plan.md-st)?
- R-ide arv spec.md-s?
- Gherkin'i arv scenarios.md-s?
- AGENTS.md sektsioonide 1-4 staatus (täidetud / tühi)?
- sprint-planning skill: Workflow sammude arv (PO osa)?
```

## 1.4. AGENTS.md sektsioonid 1-4 täiendamine

```plaintext
Täida AGENTS.md sektsioonid 1-4 vastavalt alltoodud stack-tabelile.

Kiht, Tehnoloogia
Frontend, Next.js 14+ (App Router) + TypeScript
Stiilid, Tailwind CSS
API, Next.js API routes (mock API, real backend API to be added in later sprints)
Testimine, Playwright (+ MCP)
Versioonihaldus, Git + GitHub
Hostimine, Netlify (Frontend + API routes (serverless))
AI tööriistad, Cursor + Playwright MCP
Code review, Cursor BugBot (P1) / Claude Code Review GitHub Action (P2)
```

Arutelu: Mis peaks seal "tabelis" veel olema?

Kontroll: AGENTS.md sektsioonid 1-4 pole enam tühjad.

* * *

# 2 Planeerimine: sprint-planning skill

**Skill:** `.agents/skills/sprint-planning/SKILL.md`

## 2.1. Skill täiendamine arendaja-osaga

II päeval PO ehitas skill'i PO osa. Arendaja täiendab sama skill'i arendaja-kihiga:

```plaintext
Täienda `.agents/skills/sprint-planning/SKILL.md` arendaja-osaga.
Lähtu skill-loome parimast praktikast — säilita PO osa, lisa arendaja kiht.

Lisa: HARD GATE sprint-haru loomine + technical-plan.md generation rules
+ tasks.md generation rules (T1 = setup/skeleton, Tn = cleanup + CHANGELOG).
Eeskuju kogu sprint-tsükli range agent: ~/.../ritemark-native/.claude/agents/sprint-manager.md.
```

## 2.2. Sprint-haru + artefaktid

```plaintext
Käivita `sprint-planning` skill paketile docs/sprints/sprint-01-pildi-saatmine/.
Initsiaalid haru-nime jaoks: <X>.
Vii sprint Phase 2 → Phase 3 üleminekuni.
```

* * *

# 3 Implementatsioon: nextjs-implementation skill

**Skill:** `.agents/skills/nextjs-implementation/SKILL.md`

## 3.1. Skill loomine

Kirjuta esmalt **oma mustand** `.agents/skills/nextjs-implementation/SKILL.md` — mõni märksõna sellest, mida Next.js + Tailwind arenduse ajal arvesse võtta (file structure, client/server piir, tüüpilised vead). Seejärel:

```plaintext
Olen kirjutanud `.agents/skills/nextjs-implementation/SKILL.md` mustandi.
Täienda seda skill-loome parimast praktikast lähtudes — säilita mu sisu,
lisa puuduvad osad (frontmatter, Workflow, Output Format, Common Pitfalls).

Hinda ka, kas AGENTS.md sektsioonid 1-4 vajavad selle skill'i valguses
täiendust (nt projekti konventsioon, mis seni ei olnud kirjas).
```

## 3.2. Sprint-01 implementatsioon

> **Eelkontroll:** Ava `tasks.md` — kas T1 (skeleton) ja T2 (feature) on eraldi faasidena kirjas? Näide: `help/sprint-paketi-naited/tasks.md`

```plaintext
Käivita `nextjs-implementation` skill paketile docs/sprints/sprint-01-pildi-saatmine/.
Implementeeri tasks.md T1 (skeleton), siis T2 (põhi-feature). Iga task = eraldi commit.
Kontrolli brauseris localhost:3000 pärast iga task'i.
```

* * *

# 4 Testimine: playwright-testing skill

**Skill'id:** `.agents/skills/playwright-mcp/SKILL.md` + `.agents/skills/playwright-spec/SKILL.md`

## 4.1. Skill loomine: playwright-mcp (live brauseri juhtimine)

`playwright-mcp` skill koondab MCP browser control töövoo — agent avab brauseri, navigeerib, klikib, täidab vormi, loeb DOM-i. See **ei genereeri testifaile** — ainult valideerib live UI vastu.

```plaintext
Loo `playwright-mcp` skill `.agents/skills/` alla.
Lähtu skill-loome parimast praktikast.

Kontekst: agent juhib live brauserit MCP tööriistade kaudu (browser_navigate,
browser_click, browser_fill, browser_scroll, browser_screenshot). Käivitub 
fraasidelt: "testi brauseris", "käi stsenaarium läbi", "kontrolli UI",
"jooksuta exploratory test", "vaata kas leht töötab". MITTE fraasidelt:
"genereeri testifail" ega "kirjuta spec.ts".

Workflow: Gherkin stsenaarium → järjestikused MCP sammud → PASS/FAIL + screenshot
+ bug report. 
```

> Edasijõudnud: iga stsenaarium eraldi failina `scenarios/` all → `[help/playwright-mcp-stsenaarium-skill.md](../help/playwright-mcp-stsenaarium-skill.md)`

## 4.2. Skill loomine: playwright-spec (.spec.ts genereerimine)

`playwright-spec` skill genereerib `.spec.ts` testifailid — kas Gherkin stsenaariumide või MCP eksploratsioon-tulemuste põhjal. See **ei käivita brauserit ise** — kirjutab testid, mida CI jooksutab.

```plaintext
Loo `playwright-spec` skill `.agents/skills/` alla.
Lähtu skill-loome parimast praktikast.

Kontekst: skill genereerib Playwright .spec.ts testifailid olemasoleva info põhjal
(Gherkin stsenaariumid scenarios.md-st, MCP eksploratsiooni tulemused). Käivitub
fraasidelt: "genereeri testifailid", "kirjuta spec.ts", "loo Playwright testid",
"pane testid kirja", "genereeri CI testid". MITTE: "kontrolli UI" ega "testi brauseris".

Output: tests/ kataloogis .spec.ts failid, mis läbivad `npx playwright test`.
```

NB! Vaata, et pärast playwright testid saaks ka QA intent arhitektuuri osaks!

## 4.3. Soovitatav protsess: MCP enne, .spec.ts pärast

**Miks see järjekord?** MCP eksploratsioon käib live brauseri vastu — agent näeb päris DOM-i, leiab reaalsed selectorid, kinnitab et flow töötab. Seejärel genereeritud `.spec.ts` on täpne kohe esimesel katsel, mitte selector-arvamusmäng.

**Samm 1 — MCP eksploratsioon** (iga Gherkin stsenaarium korra läbi):

```plaintext
Käivita `playwright-mcp` skill paketile docs/sprints/sprint-01-pildi-saatmine/.
Jooksuta stsenaariumid S1, S2, S3 MCP kaudu (localhost:3000). Raportoi PASS/FAIL + screenshot.
Tee ka 2 exploratory check'i (nt tühi input, kahekordne klõps).
```

**Samm 2 — .spec.ts genereerimine MCP seansi põhjal:**

```plaintext
Käivita `playwright-spec` skill — genereeri .spec.ts testifailid MCP eksploratsioonil
nähtud selectorite ja flow põhjal. Jooksuta: npx playwright test. Kõik testid peavad läbima.
```

> `.spec.ts` failid on CI pipeline'i ja regressioonikaitse lõppeesmärk. MCP eemaldab 80% tüütust tööst (selector discovery, flow tracing) — seega kirjuta testid pärast, mitte enne eksploratsioonsi.

* * *

# 5 PR + code review: code-review skill

**Skill:** `.agents/skills/code-review/SKILL.md`

## 5.1. Skill loomine

```plaintext
Loo `code-review` skill `.agents/skills/code-review/SKILL.md` alla.
Lähtu skill-loome parimast praktikast.

Kontekst: PR review meeshybrid voos — AI review tool (Cursor BugBot / Codex /
Claude Action) annab esimese ringi, osaleja tõlgendab. Skill kodifitseerib
severity rubric (Critical/High/Medium/Low), false-positive verification ja
otsuse (APPROVE / REQUEST CHANGES / NEEDS DISCUSSION). Eeskuju struktuuri vaates:
~/.../ritemark-native/.agents/skills/codereview/SKILL.md ja .claude/agents/pr-reviewer.md.
```

## 5.2. PR loomine

Kasuta agenti, et luua PRi.

Mõtle läbi, kas luua enne PRi tegemise skill?

Võimalik PRi käsk, mida agent võiks kasutada.

```bash
gh pr create \
  --base master \
  --head sprint-01-pildi-saatmine-<initsiaalid> \
  --title "Sprint 01: Pildi saatmine + ack" \
  --body "$(cat <<'EOF'
## Summary
- Implementeerib R1 (pildi saatmine) + R2 (ack kuvamine)
- Playwright testid (S1, S2, S3)
- QA findings: docs/sprints/sprint-01-pildi-saatmine/research/qa-findings.md

## Test plan
- [x] S1 happy path (Playwright pass)
- [x] S2 GPS puudub (Playwright pass)
- [x] S3 server 500 (Playwright pass)
- [x] Exploratory: empty input, rapid clicks (vt qa-findings.md)
EOF
)"
```

## 5.3. AI review käivitamine

**Variant 1: Cursor BugBot** (eelistatud) — `cursor.com/dashboard` → BugBot → "Connect repository". Käivitub automaatselt iga PR-i juures; kommenteerib 1-5 min jooksul.

**Variant 2: OpenAI Codex** — GitHub Copilot Enterprise seadetes "Code review" → lülita sisse. Eeldab Copilot Enterprise litsentsi.

**Variant 3: Claude Code Review GitHub Action** (tagavarana) — vt Lisamaterjalid setup.

## 5.4. Review otsus

```plaintext
Käivita `code-review` skill PR #<N> jaoks.
AI tool: <Cursor BugBot / Codex / Claude Action>. Acceptance allikas: tasks.md.
```

* * *

# Lisamaterjalid

## Claude Code Review GitHub Action setup

`.github/workflows/claude-review.yml`:

```yaml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic-api-key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            Review this PR for correctness, bugs, security issues.
            Use severity: Critical/High/Medium/Low. Output as PR comment.
```

Repo Settings → Secrets → `ANTHROPIC_API_KEY` (koolitaja jagab koolituse ajal).