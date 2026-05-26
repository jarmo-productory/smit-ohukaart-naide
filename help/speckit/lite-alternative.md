# Speckit Lite — ilma installimata, kombinatsioon A + B

> **Kellele:** kui sa **ei taha** [Speckit'i](./README.md) installida (`uv tool install specify-cli ...`), aga tahad **sama distsipliini** — spec → plan → tasks → kood — kasuta seda kombinatsiooni.
>
> **Mida säilitad:** struktureeritud töövoo, versionit artefaktid Git'is, AGENTS.md kui "constitution", ambivalentsuse esitamine eraldi sammus.
>
> **Mida loobud:** sujuvad `/speckit.*` slash-käsud (asendad tavalise vestlusega), automaatne template-genereerimine (kirjeldad ise), tööriista-bagid (vt Cursor CLI bug Speckit'i README's).

## Lühike loogika

Kombinatsioon koosneb kahest osast, mis töötavad **koos**:

| Osa | Asukoht | Roll | Millised tööriistad näevad |
|---|---|---|---|
| **A** — Sprint Workflow sektsioon | `AGENTS.md` (repo juur) | Tööriista-agnostiline "põhiseadus" — kõik agendid loevad enne tööd | Claude Code, Cursor, Copilot, Codex, Gemini... |
| **B** — `sprint-planning` skill | `.cursor/skills/sprint-planning/SKILL.md` | Sprint-paketi bootstrap (`spec.md` + `sprint-plan.md`) roadmap'ist | Cursor, Claude Code, Codex (kui skill kaust on nähtav) |

**Miks mõlemad:**
- **A üksi** = ükski agent tunneb põhireegleid, aga Claude'i kogemus on sama "lame" kui teistel. Hea kui sa kasutad mitut tööriista, aga puudub kiire UX.
- **B üksi** = Claude Code'is on sujuv kogemus, aga kui keegi avab projekti Cursoris/Codex'is, ei tea ta töövoost midagi.
- **A + B** = põhireeglid kõigile + sujuv UX Claude'i kasutajatele. Kaks faili, üks kontseptsioon.

---

## Variant A — AGENTS.md sektsioon

Lisa see plokk olemasolevasse `AGENTS.md`-sse (kas eraldi sektsioonina või "Põhireeglid AI-agentidele" sees):

```markdown
## Sprint workflow (Speckit-lite)

Iga uue feature jaoks järgi seda 4-sammulist voogu **enne** koodi
kirjutamist. Iga samm = eraldi commit, eraldi PR review (vajadusel).

### 1. Spec (MIDA ja MIKS)

Loo `specs/<feature-slug>/spec.md` — sisu:
- Probleem ühe lõiguga
- Sidusrühmad ja nende vajadused
- Kasutajalood (User Stories) + vastuvõtukriteeriumid
- Mis on **väljas** scope'ist (non-goals)

⚠️ Spec.md EI sisalda tehnoloogia-valikuid ega API-de detaile.

### 2. Clarify (vajadusel)

Kui spec'is on ambivalentsust, **küsi enne planeerimist**.
Salvesta küsimused-vastused `specs/<feature-slug>/clarifications.md`-sse
(või uuenda spec'i).

⚠️ Ära "leiuta" vastust. Kui kasutaja pole vastust andnud, peatu.

### 3. Plan (KUIDAS)

Loo `specs/<feature-slug>/plan.md` — sisu:
- Komponentide jaotus + sõltuvused
- Andmemudel (kui muutub)
- API-kontraktid (kui on)
- Riskid ja avatud küsimused

### 4. Tasks (JÄRJEKORD)

Loo `specs/<feature-slug>/tasks.md` — checklist:
- [ ] Iga task = 1 commit / 1 PR (kui võimalik)
- Märgi sõltuvused (`(blocked by #2)`)
- Märgi paralleeltöö-võimalused (`[P]`)

### 5. Implement

Liigu üks task korraga. Iga task'i järel: testid + commit + uuenda
tasks.md checklist.

⚠️ Ära alusta sammu N enne, kui samm N-1 on Git'is salvestatud.
```

**Selgitus:** see on kogu Speckit'i tuum **15 reaga**, ilma `.specify/`-kaustata, ilma `uv`-ta, ilma slash-käskudeta. Iga AI-tööriist saab seda lugeda.

---

## Variant B — `sprint-planning` skill

Projekti skill: [`.cursor/skills/sprint-planning/SKILL.md`](../../.cursor/skills/sprint-planning/SKILL.md) (kasutaja prompt: [`prompt-template.md`](../../.cursor/skills/sprint-planning/prompt-template.md)).

Allpool on **vanem Speckit-lite** näide (`specs/<slug>/` struktuur). Ohukaardi repo kasutab hoopis `docs/sprints/sprint-XX-<slug>/` — eelista ülalolevat skilli.

<details>
<summary>Vanem näide (specs/ kaust, mitte docs/sprints/)</summary>

Loo fail `.claude/skills/sprint-planning/SKILL.md`:

```markdown
---
name: sprint-planning
description: Spec-driven sprint workflow for Ohukaart projekt. Use when starting a new feature, when user says "alustan sprint", "uus feature", "/specify", "/plan", "/tasks", or when tasked with non-trivial implementation that lacks a spec.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
metadata:
  version: 1.0.0
---

# Sprint Planning (Speckit-lite)

Strukteeritud feature-arenduse töövoog Ohukaart projektis. Asendab
GitHub Spec Kit'i installimist — sama distsipliin, lihtsamad
tööriistad.

## Millal seda skill'i kasutada

- Kasutaja ütleb "alustan sprint", "uus feature", "loome spec'i"
- Kasutaja palub implementeerida feature, mille kohta pole `specs/<X>/spec.md`-d
- Kasutaja viidab Speckit'i käsule (`/specify`, `/plan`, `/tasks`)

## Põhireegel

**EI** alusta koodi-kirjutamist enne, kui sammud 1-4 on Git'is.

## Sammud

### Samm 1: Spec

1. Küsi kasutajalt feature-slug (lühike kebab-case nimi, nt `pildi-maskerimine`)
2. Loo kaust `specs/<slug>/`
3. Loo `spec.md` selle template'iga:

\`\`\`markdown
# <Feature pealkiri>

## Probleem
<üks lõik>

## Sidusrühmad
| Roll | Vajadus |
|---|---|

## Kasutajalood
**KL-01:** Kui <kontekst>, siis tahan <eesmärk>, et <tulemus>.
- Vastuvõtukriteerium: ...

## Non-goals
- ...
\`\`\`

4. Küsi kasutajalt sisu, mitte täida ise. Pakkuda ainult struktuuri.
5. Pärast salvestamist: `git add specs/<slug>/spec.md && git commit -m "spec: <slug>"`

### Samm 2: Clarify

Loe `spec.md` läbi. Tee nimekiri **ambivalentsetest kohtadest**:
- Kus on "tõenäoliselt", "võib-olla", "umbes"
- Kus on numbreid puudu (SLA, mahud, ajaline raam)
- Kus on tehnoloogia-sõnu, mis kuuluvad plan.md-sse

Esita küsimused kasutajale **AskUserQuestion** tööriistaga, mitte
vestluses. Salvesta vastused `clarifications.md`-sse VÕI uuenda otse
`spec.md`-d.

⚠️ Kui kasutaja vastab "tee otsus sa", märgi see selgelt:
"OTSUS (sprint-planning, <kuupäev>): valisin X, sest..."

### Samm 3: Plan

Loo `plan.md`. Sisu peab näitama **KUIDAS**, mitte MIDA:
- Komponentide jaotus (kasta + nooled-tabel)
- Andmemudel (kui andmebaas muutub)
- API endpoint'id (URL + meetod + päring/vastus)
- Sõltuvused (mis on olemas, mis tuleb luua)
- Riskid (technical + business)

Pärast: commit.

### Samm 4: Tasks

Loo `tasks.md` checklist:

\`\`\`markdown
# Tasks: <feature>

- [ ] T1: <kirjeldus> [~Xh]
- [ ] T2: <kirjeldus> (blocked by T1)
- [ ] T3: <kirjeldus> [P] — paralleeltöö T2-ga
\`\`\`

Reeglid:
- Iga task ≤ 1 päev (kui suurem, jaga)
- Märgi sõltuvused `(blocked by Tn)`
- Märgi paralleeltöö `[P]`
- Lisa hinnangulised tundid `[~Xh]`

### Samm 5: Implement

Liigu tasks läbi **järjekorras** (välja arvatud `[P]` tasks).

Iga task'i järel:
1. Käivita testid (kui on)
2. Commit muudatused
3. Märgi tasks.md checklist (`- [x]`)
4. Liigu järgmise juurde

⚠️ Kui task'i ajal avastad, et plan.md on vale, **PEATU**. Teata
kasutajale, uuenda plan.md, küsi heakskiit, alles siis jätka.

## Töökorralduse tagasiside

Pärast iga sammu (1-4) anna kasutajale:
- Mis valmis sai (üks lause)
- Mis fail tekkis (path)
- Mis on järgmine samm
- Kas kasutaja peaks midagi heaks kiitma enne edasiminekut
```

**Selgitus:** see skill **automaatselt triggerub**, kui kasutaja ütleb märksõnu (`description:` reas), ja juhib agendi läbi samade 5 sammu nagu Speckit, aga ilma `.specify/`-kaustata ja ilma slash-käskudeta. Triggerimine põhineb märksõnadel, mitte slash-prefiksil.

</details>

---

## Kuidas A ja B koos töötavad

```
Kasutaja: "alustan sprint pildi-maskerimine"
   ↓
Claude Code triggerib sprint-planning skill'i (Variant B)
   ↓
Skill loeb sisse AGENTS.md "Sprint workflow" sektsiooni (Variant A)
   ↓
Skill juhib läbi 5 sammu, järgides AGENTS.md reegleid
   ↓
Iga samm = eraldi commit + AGENTS.md viidatud kausta-struktuur
```

**Kui keegi avab projekti Cursoris** (kus skille pole):
- Cursor loeb `AGENTS.md`-d → näeb "Sprint workflow" sektsiooni
- Cursor agent peaks ise samme järgima (vähem sujuv kui Claude'is, aga töötab)
- Kui ei tööta, kasutaja saab paluda: *"Järgi AGENTS.md Sprint workflow'd ja alusta spec'iga"*

---

## Mida kaotad võrreldes päris Speckit'iga

| Funktsioon | Päris Speckit | A + B lite |
|---|---|---|
| Slash-käsud (`/specify`) | ✅ | ❌ (kasutad vestlust) |
| Automaatne template-faili genereerimine | ✅ | ⚠️ (skill loob, aga sisu kirjutad sa) |
| `/analyze` konsistentsi-kontroll | ✅ | ❌ (peate ise vaatama) |
| `/taskstoissues` (→ GitHub Issues) | ✅ | ❌ (käsitsi `gh issue create`) |
| `/clarify` automaatne ambivalentsuse-skanner | ✅ | ⚠️ (skill teeb käsitsi, vähem põhjalik) |
| Installimine | `uv tool install ...` | **0 installi** |
| Tööriista-bugid (Cursor CLI, Codex slash) | võimalikud | ei ole asjakohased |
| Iga AI-tööriist näeb | ✅ (kus Speckit toetatud) | ✅ (kõik loevad AGENTS.md-d) |

---

## Millal Speckit ON ikkagi mõistlik

Vali päris Speckit kui:
- Tiim on suur ja vajate ühtset sundvoogu, mida üksikud arendajad ei saa kõrvale jätta
- Kasutate `/analyze` ja `/taskstoissues` aktiivselt
- Tahate, et töövoog elaks väljaspool repo-d (Speckit-it saab uuendada ilma repo'd muutmata)

Vali **A + B lite** kui:
- Olete väike tiim või üksiknarendaja
- Tahate, et töövoog elaks **koos koodiga** (versionitud `AGENTS.md`-s)
- Te ei taha lisada `uv` + Python 3.11 + Speckit'i sõltuvust setup'i
- Te kasutate mitut AI-tööriista (Claude + Cursor jne) ja tahate, et kõik näevad sama reeglistikku

## Edasi

- Vaata [Speckit ülevaade](./README.md) — kui A+B sind ei rahulda, on Speckit installimine vaid 1 käsk.
- Vaata [agents-examples/](../agents-examples/) — `AGENTS.md` näiteid, kuhu Sprint workflow sektsiooni lisada.
- Vaata Claude Code skills dokumentatsiooni Anthropicu sait (skill formaat võib muutuda — ametlik referents on alati ülemuslik).
