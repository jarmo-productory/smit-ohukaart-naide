# Sprint 02: Foto isikuandmete maskimine

## Agent Runtime Instructions

This sprint is a lightweight spec-driven development experiment.

Any agent or human continuing Sprint 02 must follow this order before implementation:

1. Read this `sprint-plan.md`.
2. Read [spec.md](spec.md), [technical-plan.md](technical-plan.md), [scenarios.md](scenarios.md), and [tasks.md](tasks.md).
3. Treat [spec.md](spec.md) as the behavior contract.
4. Treat [technical-plan.md](technical-plan.md) as the current architecture plan.
5. Treat [tasks.md](tasks.md) as the implementation source of truth and update task status as work progresses.
6. If behavior, scope, architecture, or acceptance criteria need to change, update the relevant SDD artifact first, then change code.
7. In implementation notes, reference the requirement IDs from [spec.md](spec.md) where practical, e.g. `R1`, `R2`, `R4`.

Runtime behavior change for this sprint:

- Do not jump directly from issue text to code.
- Do not treat chat context as the source of truth.
- Before coding a task, identify the requirement/scenario it satisfies.
- If code and spec disagree, pause and update the spec or record the discrepancy before continuing.
- During closeout, map completed work back to requirements and scenarios.

## Goal

Luua Ohukaardile fototeavituse privaatsusvundament: kodanik saab lisada kuni 3 pilti, mis maskitakse seadmes vaikimisi enne serverisse saatmist, koos eelvaate ja vastuvõtukinnitusega, mis vastab F-02, NF-05 ja F-04 ootustele.

## Linked Issues

- [#1 Lisa kaardivaatesse kiire foto tegemise nupp](https://github.com/jarmo-productory/smit-ohukaart-naide/issues/1) — seotud fotovoo UX-iga; sprinti põhiissue (maskimine + F-02) võib vajada eraldi `gh issue create` Phase 0-s.

## Product Intent

Kodanik usaldab pildistamist, sest rakendus kaitseb teiste inimeste nägusid ja numbreid automaatselt; dispetšer saab maskitud pilte operatiivselt kasutada ilma töötlemata isikuandmete edastamiseta.

## MVP Scope

### Workstream 1: Äriotsused ja SDD artefaktid

- Fikseeri R5 autonumbri erandi HARD GATE (dispetšer + DPO).
- Täida Phase 1-s `scenarios.md`, `technical-plan.md`, `tasks.md` spec'i põhjal.
- Viita tehnoloogiaanalüüsile: [`docs/analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md`](../../analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md).

### Workstream 2: On-device maskimise pipeline

- PoC: ML Kit (näod) + YOLOv8n/TFLite või CoreML (plaadid) + hägustus; mõõda p95 latentsus 3 pildiga.
- R1/R4 acceptance criteria testandmestik (näod, numbrid, ebaõnnestumine).

### Workstream 3: Fotovoo integratsioon teavitusega

- R2: kuni 3 foto, eemaldamine enne saatmist.
- R3: maskitud eelvaade + privaatsustekst.
- Ühendus sprint 01 saatmise vooga; F-04 kinnitus pärast maskitud üleslaadimist.

## Out of Scope

- Dispetšeri vaade ja serveripoolne demaskimine.
- Pilve ML vaikimisi pipeline.
- AI triage, suunamine, prioriteet.
- Piltide säilituspoliitika täisimplementatsioon.
- Sprint 03 aeglane võrk / järjekord.

## Product Decisions

- **Maskimise asukoht:** vaikimisi on-device enne TLS üleslaadimist (põhjendus: [`docs/analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md`](../../analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md)).
- **Autonumber:** kuni R5 gate on approved, numbrid alati maskitud (spec R1).

## Feature Flag Check

- Ei nõua eraldi feature flag'i harjutusrepos; kui mobiilikood ilmub, võib kasutada `photo_masking_enabled` arenduskeskkonnas, kuid MVP eesmärk on vaikimisi sisse lülitatud käitumine.

## Success Criteria

- [ ] R1 acceptance criteria läbib (QA kontrolllist + automaattestid kui olemas)
- [ ] R2 acceptance criteria läbib
- [ ] R3 acceptance criteria läbib
- [ ] R4 acceptance criteria läbib (PoC latentsus dokumenteeritud)
- [ ] R5 HARD GATE dokumenteeritud ja `Pre-Implementation Gate` ≠ blocked enne erandi koodi
- [ ] `docs/CHANGELOG.md` uuendatud
- [ ] Sprint-kataloogi `research/` sisaldab adversarial review'i

## Proposed Delivery Path

### Phase 0: Audit and plan

- [ ] Loo sprint-haru: `git checkout -b sprint-02-foto-maskimine`
- [ ] Kontrolli linked Issue #1 ja roadmap'i rida (F-02, NF-05); loo vajadusel sprinti põhiissue
- [ ] Salvesta esmased leiud `research/initial-audit.md`-na (olemasolev kood, sprint 01 voog, testseadmed)
- [ ] Adversarial SDD review: `research/adversarial-review.md` (sh R5, reversiibiliteet, NF-02 vs 2s eesmärk)

### Phase 1: SDD täiendus ja prototüüp

- [ ] Täida `scenarios.md` (S1–S4 min: maskimine, 3 foto, eelvaade, saatmine)
- [ ] Täida `technical-plan.md` (on-device pipeline, failivorming, vead)
- [ ] Täida `tasks.md` (R1–R4 taskid, R5 gate eraldi)
- [ ] Valikuline: `prototype/` maskitud eelvaate wireframe (H4)

### Phase 2: Maskimise PoC

- [ ] Implementeeri on-device tuvastus + hägustus ühe platvormi PoC
- [ ] Mõõda 3×1080p p95; salvesta tulemused `research/initial-audit.md` või PoC lisas
- [ ] Otsusta, kas jääda on-device või dokumenteeri pilve fallback tingimused

### Phase 3: Fotovoo integratsioon

- [ ] R2: foto lisamine/eemaldamine (max 3)
- [ ] R1 + R3: maskimine + eelvaade + veaolek
- [ ] R4: saatmine + F-04 kinnitus pärast maskitud uploadi

### Phase 4: QA ja closeout

- [ ] Käivita fokuseeritud testid (üksus + manuaalne QA nimekiri)
- [ ] Uuenda `docs/CHANGELOG.md` ja release notes
- [ ] Sulge või uuenda linked GitHub Issue(d)
- [ ] Mapi tehtud töö tagasi R1–R4 ja scenarios.md

## Risks

| Risk | Mitigation |
| --- | --- |
| Autonumbri erand jääb lahendamata → scope creep või vale vaike | R5 HARD GATE; ainult „alati maskitud“ enne gate approved |
| Vanemad seadmed ei jõua 2 s p95-ni | Resize enne inferentsi; progress UI; dokumenteeri min seadmed technical-plan.md-s |
| Tuvastus jätab maskimata väikese näo/plaadi | QA testandmestik + avatud küsimus täpsuse kohta; käsitsi blur fallback R3 veaolekus |
| Sprint 01 voog puudub või erineb | Phase 0 audit; mock API kuni 01 valmis |
| GDPR/pilv andmeedastus | On-device vaikimisi; pilv ainult gate’itud PoC |

## Initial Technical Notes

Vaata [`docs/analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md`](../../analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md). Phase 0 täidab [research/initial-audit.md](research/initial-audit.md).

## Pre-Implementation Gate

Adversarial review salvestatakse [research/adversarial-review.md](research/adversarial-review.md).

Gate result: **blocked** (ootab Phase 0 adversarial review ja R5 äriotsust). Implementatsioon R5 erandiga ei alga enne gate approved.

## Implementation Notes

_Täidetakse implementatsiooni käigus. Viited R1, R2, … peavad olema jälgitavad._

## Validation Notes

_Täidetakse QA faasis._

## Release Note Handling

Uuenda `docs/CHANGELOG.md` sprinti closeout'il; versioon vastavalt repo release harjumusele (harjutusrepo: üks kirje sprint 02 kohta).

## SDD Artifacts

Sprint 02 kasutab repo-sisest lihtsustatud spec-driven development protsessi.

- [spec.md](spec.md) on toote ja käitumise leping.
- [technical-plan.md](technical-plan.md) salvestab arhitektuuri ja implementatsiooni lähenemise.
- [scenarios.md](scenarios.md) jäädvustab käitumise näiteid lihtsustatud BDD-stiilis.
- [tasks.md](tasks.md) on implementatsiooni checklist ja edenemise jälgija.

**Reegel sellele sprintile:** uuenda asjakohast SDD-artefakti **enne** implementatsiooni muutmist, kui käitumine või arhitektuur muutub.

## Status

**Track:** Full 6-phase  
**Current phase:** Phase 0 — Planning  
**Branch:** `sprint-02-foto-maskimine` (luuakse Phase 0 esimese ülesande käigus)  
**Worktree:** `/Users/jarmotuisk/Projects/smit-ohukaart-naide`
