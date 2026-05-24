# Sprint XX: <Sprindi pealkiri>

## Agent Runtime Instructions

This sprint is a lightweight spec-driven development experiment.

Any agent or human continuing Sprint XX must follow this order before implementation:

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

<1-2 lõiku: mida see sprint saavutab, mis on kasutaja-väljund, miks see on järgmine loogiline samm.>

## Linked Issues

- [#XX <Pealkiri>](https://github.com/<org>/<repo>/issues/XX)

## Product Intent

<1 lõik: mis on sprindi ärioskaal. Mitte tehniline, vaid kasutaja-vaates.>

## MVP Scope

### Workstream 1: <Nimi>

- Punkt 1
- Punkt 2

### Workstream 2: <Nimi>

- Punkt 1
- Punkt 2

## Out of Scope

- <Mida me selles sprintis EI tee, et vältida scope creep'i>

## Product Decisions

- **<Otsuse teema>:** <otsus> (põhjendus, kus dokumenteeritud)

## Feature Flag Check

- <Kas vajab feature flag'i? Kui jah, mis nimega? Kui ei, miks?>

## Success Criteria

- [ ] <Konkreetne, testitav punkt 1>
- [ ] <Konkreetne, testitav punkt 2>
- [ ] `docs/CHANGELOG.md` ja release notes uuendatud enne closeout'i
- [ ] Sprint-kataloogi `research/` sisaldab adversarial review'i

## Proposed Delivery Path

### Phase 0: Audit and plan

- [ ] Loo sprint-haru: `git checkout -b sprint-XX-<nimi>`
- [ ] Kontrolli linked Issue'i ja olemasolevat koodi
- [ ] Salvesta esmased leiud `research/initial-audit.md`-na
- [ ] Adversarial SDD review: `research/adversarial-review.md`

### Phase 1: <Implementatsiooni faas 1>

- [ ] <Task 1>
- [ ] <Task 2>

### Phase 2: <Implementatsiooni faas 2>

- [ ] <Task 1>
- [ ] <Task 2>

### Phase N: QA and closeout

- [ ] Käivita fokuseeritud testid
- [ ] Käivita QA-validatsioon (`./scripts/validate-qa.sh` vms)
- [ ] Uuenda release notes / changelog
- [ ] Sulge või uuenda linked GitHub Issue

## Risks

| Risk | Mitigation |
| --- | --- |
| <Risk 1> | <Maandamine> |
| <Risk 2> | <Maandamine> |

## Initial Technical Notes

See [research/initial-audit.md](research/initial-audit.md).

## Pre-Implementation Gate

Adversarial review is recorded in [research/adversarial-review.md](research/adversarial-review.md).

Gate result: **<approved | blocked | conditional>**. <Lühike põhjendus.>

## Implementation Notes

<Täidetakse implementatsiooni käigus. Viited R1, R2, ... peavad olema jälgitavad.>

## Validation Notes

<Mis testid läbisid, mis ebaõnnestusid, mis on pending manual.>

## Release Note Handling

<Kus release notes elavad ja millise versiooni alla see töö läheb.>

## SDD Artifacts

Sprint XX kasutab repo-sisest lihtsustatud spec-driven development protsessi.

- [spec.md](spec.md) on toote ja käitumise leping.
- [technical-plan.md](technical-plan.md) salvestab arhitektuuri ja implementatsiooni lähenemise.
- [scenarios.md](scenarios.md) jäädvustab käitumise näiteid lihtsustatud BDD-stiilis.
- [tasks.md](tasks.md) on implementatsiooni checklist ja edenemise jälgija.

**Reegel sellele sprintile:** uuenda asjakohast SDD-artefakti **enne** implementatsiooni muutmist, kui käitumine või arhitektuur muutub.

## Status

**Track:** <Planning | Implementation | QA | Done>
**Current phase:** <Phase 0 | Phase 1 | ...>
**Branch:** `sprint-XX-<nimi>`
**Worktree:** `<repo asukoht>`
