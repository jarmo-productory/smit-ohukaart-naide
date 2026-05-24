# Speckit — Spec-Driven Development toolkit

> **Mis see on:** Spec Kit (a.k.a. **Speckit**) on GitHub'i avatud-lähtekoodiga tööriistakomplekt, mis lisab AI-coding-agentidele (Claude Code, Cursor, Copilot, Codex jt) seitse `/speckit.*` slash-käsku, et viia projekt **läbi struktureeritud nõuded-→-plaan-→-task-→-implementatsioon töövoo**.
>
> **Ei taha installida?** Vaata [Speckit Lite (A+B kombo)](./lite-alternative.md) — sama distsipliin ilma `uv tool install`-imata, kombineerib `AGENTS.md` sektsiooni + Claude Code skill'i.
>
> **Idee:** ära lase agendil "vibe-coding'uga" otse koodi kirjutada. Sunni teda kõigepealt **kirja panema, mida ehitatakse ja miks** (`/speckit.specify`), siis **kuidas** (`/speckit.plan`), siis **järjekorras** (`/speckit.tasks`), ja alles siis **tegelikult koodi** (`/speckit.implement`). Iga samm tekitab versionit Markdown-faili, mis on Git'is jälgitav.

## Ametlikud allikad

- **Repo:** [github/spec-kit](https://github.com/github/spec-kit) (MIT, GitHub)
- **Dokumentatsioon:** [github.github.io/spec-kit](https://github.github.io/spec-kit/)
- **Quickstart:** [Quick Start Guide](https://github.github.io/spec-kit/quickstart.html)
- **CLI reference:** [Core Commands (`specify init` jt)](https://github.github.io/spec-kit/reference/core.html)
- **Tööriista-integratsioonid:** [Integrations](https://github.github.io/spec-kit/reference/integrations.html) — toetab 30+ agendit (Claude Code, Cursor, Copilot, Codex, Gemini CLI jt)
- **Käskude prompt-failid:** [templates/commands/](https://github.com/github/spec-kit/tree/main/templates/commands) — iga `/speckit.*` käsk on üks `.md` fail, mille agent loeb tegelikult sisse. Siin näeb täpselt, mida iga käsk teeb.

## Installimine

```bash
# vajab uv + Python 3.11+ + Git + toetatud AI agent
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# uues projektis
specify init
```

`specify init` genereerib `.specify/` kausta ja lisab valitud AI-agendi seadistustesse `/speckit.*` slash-käsud.

## Slash-käsud — mida igaüks teeb

> **Allikas:** Iga käsu "definition" on Markdown-fail repos `templates/commands/`. Lingid alltoodud tabelis viivad just nendele failidele — see on **see, mida agent tegelikult loeb**, kui käsu välja kutsud.

| # | Käsk | Mida teeb | Mis fail tekib | Prompt-fail |
|---|---|---|---|---|
| 1 | `/speckit.constitution` | Määratleb **projekti printsiibid ja reeglid** — analoog `AGENTS.md` "põhireeglite" sektsioonile. Sina ütled mis on prioriteet, mis on keelatud, mis on must-have. | `.specify/memory/constitution.md` | [constitution.md](https://github.com/github/spec-kit/blob/main/templates/commands/constitution.md) |
| 2 | `/speckit.specify` | **Nõuete defineerimine: MIDA ja MIKS.** Mitte KUIDAS. Tooteomaniku keeles — kasutajalood, vastuvõtukriteeriumid, sidusrühmad. | `specs/<feature>/spec.md` | [specify.md](https://github.com/github/spec-kit/blob/main/templates/commands/specify.md) |
| 3 | `/speckit.clarify` | Käib spec'i läbi, tuvastab **ambivalentsused ja lüngad**, esitab sulle suunatud küsimusi enne planeerimist. Hoiab ära "agent leiutab vastuse ise" probleemi. | uuendab `spec.md` | [clarify.md](https://github.com/github/spec-kit/blob/main/templates/commands/clarify.md) |
| 4 | `/speckit.plan` | **Tehniline implementatsiooni plaan** — KUIDAS me selle ehitame. Andmemudel, API-de kontraktid, komponentide jaotus, sõltuvused. | `plan.md`, `data-model.md`, `contracts/` | [plan.md](https://github.com/github/spec-kit/blob/main/templates/commands/plan.md) |
| 5 | `/speckit.tasks` | Jagab plaani **konkreetseks tasks-checklist'iks** — iga task on üks PR-i väärt tükk, sõltuvused märgitud, paralleeltöö-võimalused tähistatud. | `tasks.md` | [tasks.md](https://github.com/github/spec-kit/blob/main/templates/commands/tasks.md) |
| 6 | `/speckit.analyze` | **Konsistentsi-kontroll**: kas spec ↔ plan ↔ tasks räägivad sama asja? Avastab vasturääkivused enne, kui koodi kirjutama hakkad. | analüüsi-raport | [analyze.md](https://github.com/github/spec-kit/blob/main/templates/commands/analyze.md) |
| 7 | `/speckit.implement` | **Käivitab kõik tasks** korras, üks-haaval. Iga task → kood + testid + commit. | päris kood + commits | [implement.md](https://github.com/github/spec-kit/blob/main/templates/commands/implement.md) |

### Lisakäsud

| Käsk | Mida teeb | Prompt-fail |
|---|---|---|
| `/speckit.checklist` | Genereerib **kvaliteedi-valideerimise checklist'i** (nt code review, security, accessibility) — eraldi nõuetest. | [checklist.md](https://github.com/github/spec-kit/blob/main/templates/commands/checklist.md) |
| `/speckit.taskstoissues` | Konverdib `tasks.md` → **GitHub Issues** (kasutab `gh` CLI-d), et tiim näeks tööd GitHub'i Projects'is. | [taskstoissues.md](https://github.com/github/spec-kit/blob/main/templates/commands/taskstoissues.md) |

## Kaks töövoogu

**Lean (kiire eksperiment):**

```
/speckit.specify → /speckit.plan → /speckit.tasks → /speckit.implement
```

**Full (produktiivne feature, kus on ambivalentsust):**

```
/speckit.constitution
  → /speckit.specify
  → /speckit.clarify
  → /speckit.checklist
  → /speckit.plan
  → /speckit.tasks
  → /speckit.analyze
  → /speckit.implement
```

## Ohukaart koolituse kontekstis

| Koolituspäev | Speckit-käsk | Miks |
|---|---|---|
| **H2** (taktikalise AGENTS.md täitmine) | `/speckit.constitution` rolli täidab `AGENTS.md` | Speckit eeldab eraldi `constitution.md`-d, aga **meie kasutame AGENTS.md-d sama eesmärgi jaoks** — nii saab see olla nähtav ka tööriistadele, mis Speckit'i ei kasuta. |
| **H3** (feature spec) | `/speckit.specify`, `/speckit.clarify` | Tooteomaniku fookus — MIDA ja MIKS. Tehnilisi otsuseid veel ei tee. |
| **III päev** (arendajad/QA) | `/speckit.plan`, `/speckit.tasks`, `/speckit.analyze`, `/speckit.implement` | Spec-ist päris koodini. |

> **Tähtis erisus:** kui kasutad Speckit'i **koos** projekti `AGENTS.md`-ga, peaks `AGENTS.md` viitama sellele, et constitution-rolli täidab tema (vältida tühja `.specify/memory/constitution.md`-d, mis võib agendi segadusse ajada).

## Tööriista-spetsiifilised märkused

- **Claude Code** — toetab kõiki käske, kuvab need slash-menüüs automaatselt pärast `specify init`-i.
- **Cursor** — Cursori CLI-l on hetkel teadaolev bug, kus `/speckit.*` käskude argumendid kaovad ära ([issue #1264](https://github.com/github/spec-kit/issues/1264)). IDE chat töötab.
- **Codex / Gemini / Qwen** — mõnes versioonis on agentidel slash-käskude avastamise probleem, kus näevad ainult `/speckit.constitution`-i ([issue #797](https://github.com/github/spec-kit/issues/797)). Kontrolli enne tundi, et sinu seadistus näeb kõiki 7 käsku.

## Edasi lugemiseks

- [LogRocket — Exploring spec-driven development with the new GitHub Spec Kit](https://blog.logrocket.com/github-spec-kit/) — hea käegakatsutav näide ühel ülesandel
- [Microsoft for Developers — Diving Into Spec-Driven Development With GitHub Spec Kit](https://developer.microsoft.com/blog/spec-driven-development-spec-kit) — laiem kontekst, miks SDD
- [DeepWiki — github/spec-kit](https://deepwiki.com/github/spec-kit/5-slash-commands-reference) — käskude põhjalik tehniline ülevaade

## Seotud materjal selles repos

- [`../agents-examples/`](../agents-examples/) — AGENTS.md / CLAUDE.md näited (Karpathy-inspired, ritemark-native)
- [`../agents-md-init-tools.md`](../agents-md-init-tools.md) — kuidas iga tööriist aitab AGENTS.md alustada (`/init`, `/create-rule` jne)
- [`../../specs/`](../../specs/) — kus Speckit'i tehtud `spec.md` failid Ohukaart-projektis elavad
