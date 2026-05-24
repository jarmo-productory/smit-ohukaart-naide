# Sprint XX Tasks

> Implementatsiooni source of truth. Iga task viitab nõudele R1, R2, ... (spec.md-st) või stsenaariumile S1, S2, ... (scenarios.md-st). Märgi ✅ kui tehtud, ⏳ kui in-progress, ⏸ kui blokeeritud.

## Phase 0: Audit and plan

- [ ] Loo sprint-haru: `git checkout -b sprint-XX-<nimi>`
- [ ] Inspect linked Issue body ja akzepteerimiskriteeriumid
- [ ] Inspect olemasolevat koodi, mis puudutab seda feature'i
- [ ] Salvesta initial audit `research/initial-audit.md`
- [ ] Adversarial SDD review: `research/adversarial-review.md`
- [ ] Resolve gate result enne implementatsiooni alustamist

## Phase 1: <Implementatsiooni alus>

- [ ] **R1:** <Task 1>
- [ ] **R1:** <Task 2>
- [ ] **R2:** <Task 1>

## Phase 2: <Implementatsiooni keskosa>

- [ ] **R2, S2:** <Task 1>
- [ ] **R3:** <Task 1>

## Phase 3: <Implementatsiooni lõpetus>

- [ ] <Task 1>
- [ ] <Task 2>

## Phase N: QA and closeout

- [ ] Käivita fokuseeritud unit-testid
- [ ] Käivita integration-testid
- [ ] Käivita E2E-testid
- [ ] Manual smoke-test (vt sprint-plan.md Validation Notes sektsioon)
- [ ] Uuenda release notes / changelog
- [ ] Sulge linked GitHub Issue
- [ ] Update sprint-plan.md Status sektsioon: "Done"

## Mapping tabel

| Task | Phase | Requirement | Scenario | Status |
| --- | --- | --- | --- | --- |
| <task pealkiri> | 1 | R1 | S1 | ⏳ |
| <task pealkiri> | 1 | R1 | — | ✅ |
| <task pealkiri> | 2 | R2 | S2, S3 | ⏸ blokeeritud |
