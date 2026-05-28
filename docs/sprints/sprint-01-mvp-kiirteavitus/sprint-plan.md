# Sprint 01: MVP kiirteavitus

## Agent Runtime Instructions

This sprint is a lightweight spec-driven development experiment.

Any agent or human continuing Sprint 01 must follow this order before implementation:

1. Read this `sprint-plan.md`.
2. Read [spec.md](spec.md), [technical-plan.md](technical-plan.md), [scenarios.md](scenarios.md), and [tasks.md](tasks.md).
3. Kodaniku UI puhul loe ka [prototype/README.md](prototype/README.md) ja vaata [prototype/index.html](prototype/index.html) (valitud v2 suund).
4. Treat [spec.md](spec.md) as the behavior contract.
5. Treat [technical-plan.md](technical-plan.md) as the current architecture plan.
6. Treat [tasks.md](tasks.md) as the implementation source of truth and update task status as work progresses.
7. If behavior, scope, architecture, or acceptance criteria need to change, update the relevant SDD artifact first, then change code.
8. In implementation notes, reference the requirement IDs from [spec.md](spec.md) where practical, e.g. `R1`, `R2`, `R4`.

Runtime behavior change for this sprint:

- Do not jump directly from issue text to code.
- Do not treat chat context as the source of truth.
- Before coding a task, identify the requirement/scenario it satisfies.
- If code and spec disagree, pause and update the spec or record the discrepancy before continuing.
- During closeout, map completed work back to requirements and scenarios.

## Goal

Luua Ohukaardi MVP: kodanik saab saata tekstilise ohuteavituse automaatse GPS-asukohaga, saab vastuvõtukinnituse ja dispetšer näeb teavitust demo operatiivvaates — kriitilise tee algus (F-01, F-03, F-04, NF-02, NF-04).

## Linked Issues

- [#1 Lisa kaardivaatesse kiire foto tegemise nupp](https://github.com/jarmo-productory/smit-ohukaart-naide/issues/1) — **ei kuulu** sprint 01 tuuma; foto UX on sprint 02/07 kontekst.
- Sprint 01 põhiissue: **puudub** — loo Phase 0-s `gh issue create` pealkirjaga nt „Sprint 01: MVP tekstiteavitus + GPS + kinnitus“ ja lisa siia link.

## Product Intent

Kodanik saab kiiresti ja lihtsalt teada anda tekstiga, teades et asukoht on kaasas ja keegi operatiivses vaates teavituse kätte sai; dispetšer ei pea veel triage'i ega suunamist tegema, kuid näeb uut signaali reaalajas (demo ulatuses).

## MVP Scope

### Workstream 1: Äriotsused ja SDD artefaktid

- Fikseeri R4 **HARD GATE**: mis loeb MVP-s „112 operatiivvaate vastuvõtuks“ (stub vs integratsioon).
- Täida Phase 1-s `scenarios.md`, `technical-plan.md`, `tasks.md` spec'i põhjal.
- Kaardista H1: [`docs/background-research/112-nouded.md`](../../background-research/112-nouded.md); intervjuud: taksojuht (kinnitus, GPS usaldus), dispetšer (kiirus, selgus).

### Workstream 2: Kodaniku saatmise voog

- R1: tekstiväli, valideerimine, saatmine.
- R2: GPS õigused, kuvamine, blokeerimine ilma asukohata.
- R3: vastuvõtukinnitus ja veaolekud.
- R6: latentsus ja laadimise olekud.

### Workstream 3: Dispetšeri demo vaade ja edastus

- R4: teavituste nimekiri/detail minimaalses web-vaates või vastavas stub'is.
- R5: HTTPS/TLS kontroll dokumenteeritud QA-s.

### Workstream 4: Harjutusrepo demo lõpp

- Ühendatud demo: üks kodaniku klient → API → dispetšeri vaade (või samaväärne lõpp-tõestus).
- Ei nõua tootmis-112 integratsiooni.

## Out of Scope

- Fotod (F-02), maskimine (NF-05), aeglane võrk (NF-03).
- Dispetšeri vastus ja lisasuhtlus (F-05).
- AI, prioriteet, asutuse suunamine (F-06, F-07).
- GPS käsitsi parandus (sprint 07).
- Issue #1 (kiire foto nupp kaardil).

## Product Decisions

- **MVP kanal:** ainult **tekst + automaatne GPS**; kasutaja ei vali prioriteeti ega asutust (F-06 vaim, roadmap piirang).
- **Asukoht:** ilma koordinaadita ei saadeta (R2); käsitsi parandus deferred sprint 07.
- **Tagasiside:** ainult vastuvõtukinnitus (R3), mitte vestlus — vastuolu lahendus hilisemates sprintides.
- **Integratsioon:** harjutusrepo eeldab **demo backend + operatiivvaate stub** kuni HARD GATE kinnitab teisiti.
- **Kodaniku UI (prototüüp):** valitud **v2** — kaart esikohal (OpenStreetMap), tumeda taustaga kirjelduse leht, „Saada“ alusribal; vt [prototype/README.md](prototype/README.md).

## Prototüüp

| Viide | Kirjeldus |
| --- | --- |
| [prototype/index.html](prototype/index.html) | Interaktiivne HTML prototüüp (iPhone 14 raam, mock-andmed) |
| [prototype/README.md](prototype/README.md) | Ava juhised, R1–R3 kaardistus, tehnoloogia |
| [research/prototype-feedback.md](research/prototype-feedback.md) | UX-otsused ja avatud küsimused prototüübist |

**Staatus:** esimene iteratsioon valmis (v2 valitud; v1/v3 eemaldatud). Katab õnneliku raja visuaalselt; `scenarios.md` veel täitmata.

## Feature Flag Check

- Ei nõua eraldi feature flag'i harjutusrepos; MVP käitumine on vaikimisi sisse lülitatud. Kui kood ilmub, võib arenduses olla `mvp_text_alert_enabled` ainult testimiseks.

## Success Criteria

- [x] R1 acceptance criteria läbib
- [x] R2 acceptance criteria läbib
- [x] R3 acceptance criteria läbib
- [x] R4 acceptance criteria läbib (HARD GATE approved; `/dispatcher` stub)
- [x] R5 acceptance criteria läbib (S9 local; S10 Deploy Preview QA — merge gate, vt `tasks.md`)
- [x] R6 acceptance criteria läbib (p95 ≤ 5 s — `research/latency-notes.md`)
- [x] `docs/CHANGELOG.md` uuendatud
- [x] Sprint-kataloogi `research/` sisaldab adversarial review'i

## Proposed Delivery Path

### Phase 0: Audit and plan

- [ ] Loo sprint-haru: `git checkout -b sprint-01-mvp-kiirteavitus`
- [ ] Loo sprinti põhiissue GitHubis; lisa link ülal `Linked Issues`
- [ ] Kontrolli repo olekut (kood puudub vs olemasolev demo); salvesta `research/initial-audit.md`
- [ ] Adversarial SDD review: `research/adversarial-review.md` (sh R4 stub, autentimine, NF-02 mõõdikud)

### Phase 1: SDD täiendus ja prototüüp

- [ ] Täida `scenarios.md` (S1–S6 min: tekst, GPS puudub, saatmine OK, viga, dispetšer näeb, HTTPS)
- [ ] Täida `technical-plan.md` (klient, API, stub, andmemudel, TLS)
- [ ] Täida `tasks.md` (R1–R6 taskid)
- [x] `prototype/` — kodaniku saatmise UI ([index.html](prototype/index.html), [README](prototype/README.md)); v2 valitud
- [ ] **Käsitsi QA checklist (Deploy Preview sõltuv, ei blokeeri MVP-d):** S10/R5 mixed-content ja HTTP fallback — vt [tasks.md](tasks.md) § Deploy Preview QA; URL **TBD** kuni PR-i Deploy Preview tekib

### Phase 2: Backend ja operatiivvaate stub

- [ ] Teavituse vastuvõtu API (tekst + GPS + ID + ajatempel)
- [ ] R5: HTTPS ainult
- [ ] R4: minimaalne dispetšeri nimekiri/vaade

### Phase 3: Kodaniku klient

- [ ] R1 + R2: vorm, valideerimine, asukoha kuvamine
- [ ] R3 + R6: saatmine, kinnitus, latentsus ja vead

### Phase 4: QA ja closeout

- [ ] Käivita fokuseeritud testid + manuaalne QA (R1–R6)
- [ ] Mõõda R6 p95 ja R4 ≤60 s; salvesta tulemused `research/`
- [ ] Uuenda `docs/CHANGELOG.md`
- [ ] Sulge või uuenda linked GitHub Issue

## Risks

| Risk | Mitigation |
| --- | --- |
| R4 „operatiivvaade“ jääb defineerimata → vale MVP | HARD GATE Phase 0; stub dokumenteeritud technical-plan.md-s |
| GPS ebausaldusväärne (taksojuht) | MVP blokeerib saatmise ilma koordinaadita; sprint 07 täpsustus |
| Scope creep (foto, AI, prioriteet) | Spec out of scope; iga task seotud R-idaga |
| Harjutusrepo ilma päris 112-ga | Selge demo piir; ära väida tootmisvalmidust |
| Issue #1 segab fookust | Eraldi sprint 01 issue; #1 jätab backlogi |

## Initial Technical Notes

Phase 0 täidab [research/initial-audit.md](research/initial-audit.md). Repo on praegu peamiselt dokumentatsioon; implementatsiooni valikud tulevad `technical-plan.md`-sse pärast auditit.

## Pre-Implementation Gate

Adversarial review salvestatakse [research/adversarial-review.md](research/adversarial-review.md).

Gate result: **blocked** (ootab Phase 0 adversarial review ja R4 operatiivvaate definitsiooni). Implementatsioon R4 stub'i üle ei alga enne gate **approved** või tingimuslikult dokumenteeritud stub-otsus.

## Implementation Notes

_Täidetakse implementatsiooni käigus. Viited R1, R2, … peavad olema jälgitavad._

## Validation Notes

| Kontroll | Tulemus | Viide |
| --- | --- | --- |
| Playwright e2e | PASS | `npm run test:e2e` — 12 passed, 1 skipped (S10) |
| Build | PASS | `npm run build` |
| R6 p95 ≤ 5 s | PASS | `research/latency-notes.md` |
| R4 dispetšeri vaade ≤ 60 s | PASS | `dispatcher-view.spec.ts` |
| TLS S9 (local) | PASS | `latency.spec.ts` S9 — suhteline URL |
| TLS S10 (Deploy Preview) | **TBD** | Käsitsi QA merge gate — vt `tasks.md` § Deploy Preview QA; URL lisatakse PR-i tekkimisel |

## Release Note Handling

Uuenda `docs/CHANGELOG.md` sprinti closeout'il; üks kirje sprint 01 kohta (harjutusrepo).

## SDD Artifacts

Sprint 01 kasutab repo-sisest lihtsustatud spec-driven development protsessi.

- [spec.md](spec.md) on toote ja käitumise leping.
- [technical-plan.md](technical-plan.md) salvestab arhitektuuri ja implementatsiooni lähenemise.
- [scenarios.md](scenarios.md) jäädvustab käitumise näiteid lihtsustatud BDD-stiilis.
- [tasks.md](tasks.md) on implementatsiooni checklist ja edenemise jälgija.
- [prototype/](prototype/) on kodaniku UI visuaalne referents (mitte käitumisleping; spec kehtib konflikti korral).

**Reegel sellele sprintile:** uuenda asjakohast SDD-artefakti **enne** implementatsiooni muutmist, kui käitumine või arhitektuur muutub.

## Status

**Track:** Full 6-phase  
**Current phase:** Done — MVP implementeeritud; S10 Deploy Preview QA merge gate TBD  
**Branch:** `sprint-01-mvp-kiirteavitus`
