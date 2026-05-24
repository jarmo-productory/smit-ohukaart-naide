# Agents.md / CLAUDE.md näited

Selles kaustas on **päris-elust** võetud `AGENTS.md` / `CLAUDE.md` näited, mida saab Ohukaart projekti `AGENTS.md` taktikalise osa täitmisel võrdluseks vaadata.

> **AGENTS.md** vs **CLAUDE.md**: vaata projekti juur-`AGENTS.md` sissejuhatust. Lühidalt: `AGENTS.md` on tööriista-agnostiline standard (OpenAI + Google + Sourcegraph + Cursor + Factory, Linux Foundation, dets 2025). `CLAUDE.md` on Anthropic'i Claude Code'i spetsiifiline. Tihti on need sama sisuga ja üks viitab teisele.

## Näited

### 1. [`karpathy-inspired-CLAUDE.md`](./karpathy-inspired-CLAUDE.md) — käitumisreeglid (universaalne)

**Mis see on:** Forrest Chang'i koondatud minimaalne käitumisjuhend Claude Code'ile (ja teistele LLM-agentidele), **destilleeritud Andrej Karpathy avalikest tähelepanekutest** LLM-coding probleemide kohta. *Karpathy ise pole seda kirjutanud ega heaks kiitnud — see on "Karpathy-inspired", mitte "Karpathy-authored".* 4 reeglit: *Think Before Coding*, *Simplicity First*, *Surgical Changes*, *Goal-Driven Execution*.

**Mida sealt õppida:**
- **Lühidus võidab** — kogu fail on alla 60 rea, aga on jõudnud 220 000+ GitHub'i tärni juurde.
- **Negatiivsed reeglid** ("don't assume", "no abstractions for single-use code") on sageli väärtuslikumad kui positiivsed.
- **Edukriteerium kirjas:** lõpus on "These guidelines are working if: ..." — annab agendile viisi enesehinnanguks.

**Millal kasutada eeskujuna:** kui projekti AGENTS.md läheb liiga pikaks ja tundub, et reeglid uppuvad konteksti sisse — proovi seda Karpathy stiili (terav, lühike, üks reegel = üks sektsioon).

**Allikas:** [github.com/multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)

### 2. [`ritemark-native-AGENTS.md`](./ritemark-native-AGENTS.md) — Codex-i pool (lühike, delegeeriv)

**Mis see on:** Sama projekti (`ritemark-native`) **Codex'ile** mõeldud lühike juhend. Tükkis Claude'iga: `AGENTS.md` ütleb selgelt "Leave `.claude/**` unchanged" ja jätab kogu detailse osa CLAUDE.md hooleks.

**Mida sealt õppida:**
- **Hard Gates** sektsioon — konkreetsed reeglid, mida agent EI TOHI murda (nt "do not develop on `main`", "treat each sprint as one feature branch"). Praktilised, mitte ähmased.
- **Skill Routing** — projektis on hulk omavalmistatud skille (qa-validation, release-process jne) ja AGENTS.md ütleb agendile **millal kumbagi kasutada**.
- **Boundary** sektsioon — selgelt määratletud, kus üks tööriist (Codex) lõpeb ja teine (Claude) algab. Vähendab konflikte multi-tooling setup'is.
- **Reporting** — kuidas agent peaks ebaõnnestumistest teatama.

**Millal kasutada eeskujuna:** kui Ohukaart projektis on mitu AI-tööriista ja vaja on määratleda kes-mille-eest-vastutab — või kui tahad teha **lühikese** AGENTS.md, mis ainult viitab põhjalikule juhendile mujal.

**Allikas:** Productory `ritemark-native` repo (privaatne).

### 3. [`ritemark-native-CLAUDE.md`](./ritemark-native-CLAUDE.md) — Claude'i pool (mahukas, struktureeritud)

**Mis see on:** Sama projekti `CLAUDE.md` — täielik tooteomaniku (Jarmo) ja Claude'i vaheline "töökorraldus". Märkimisväärselt **mahukam** kui AGENTS.md, sest sisaldab arhitektuurivõimsamaid otsuseid, "expert agents" maatrikseid, patch-süsteemi, repo struktuuri jne.

**Mida sealt õppida:**
- **Project Identity** + **Architecture (Locked Decisions)** — alguses on tabel, kus iga arhitektuurivalik on tähistatud "Non-Negotiable" põhjendusega. Hoiab agendi värisemise eest, kui keegi proovib mõnda otsust uuesti avada.
- **NEVER Remove, Stub, or Disable Existing Features** — HARD RULE'id koos **konkreetse intsidendi viite**ga ("Violation in v1.3.0 broke Settings..."). Põhjus + tagajärg jääb meelde paremini kui abstraktne reegel.
- **Approval Gates** — tabel "Gate | Condition | Release Phrase", mis võtab kokku TÄPSED fraasid, mida Jarmo peab ütlema, et Claude saaks edasi liikuda. See on otse 2026 hea praktika "explicit-handoff approval".
- **Expert Agents (MANDATORY Routing)** — trigger-keywords kolumn ütleb agendile **millal millise eksperdi poole pöörduda**. Sisuliselt mini-DSL agendi orkestreerimiseks.
- **Critical Invariants** — viide single-source-of-truth pre-commit hookile, mitte juhendi sisse kopeerimine. Hoiab CLAUDE.md sünkroonis koodiga.

**Millal kasutada eeskujuna:** kui Ohukaart projekt kasvab ja sul on **mitu spetsiifilist agendi-rolli** (nt "AI Trust & Safety reviewer", "GDPR reviewer", "Päästekeskuse-poolne valideerija"), vajad selget reeglite hierarhiat (locked decisions vs sprint-otsused) või intsidente, mida ei taha korduvalt seletada — kopeeri see struktuur ja kohanda.

**Allikas:** Productory `ritemark-native` repo (privaatne).

## Seotud materjal

- [`../agents-md-init-tools.md`](../agents-md-init-tools.md) — kuidas iga AI-tööriist (Claude Code, Codex, Cursor, Copilot) aitab AGENTS.md / CLAUDE.md alguse generaaktorida (`/init`, `/create-rule` jne).

## Kuidas neid kasutada Ohukaart H2 harjutuses

1. Ava projekti juur-[`AGENTS.md`](../../AGENTS.md) — vaata "TAKTIKALINE OSA" sektsioone.
2. **Karpathy stiilis** kirjuta "Põhireeglid AI-agentidele" — lühidalt, teravalt.
3. **ritemark-native stiilis** kirjuta "Kvaliteediväravad" ja kui rakendub, lisa "Hard Gates" sektsioon.
4. **Ära kopeeri** — kohanda Ohukaart kontekstiga (TIER 2 turvalisus, 112-üleminek, GDPR, AI Act).

## Edasi lisamiseks (kui on aega)

Mõned teised hästi tehtud avalikud näited, mida saab siia lisada:
- `karpathy/nanochat/.claude/skills/` — Karpathy enda Claude Code skill'ide setup nanochat repos
- OpenAI Codex enda `AGENTS.md` näited (vt agents.md spec'i veebilehte)
- Mõni Eesti riigiasutuse avalik AI use policy (kui sellised tekivad)
