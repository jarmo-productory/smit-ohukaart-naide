# Sprint 01 Tasks — Pildi saatmine + ACK

> Implementatsiooni source of truth. Iga task viitab nõudele R1, R2, ... (spec.md-st) või stsenaariumile S1, S2, ... (scenarios.md-st). Märgi ✅ kui tehtud, ⏳ kui in-progress, ⏸ kui blokeeritud.

## Phase 0: Audit and plan

- [ ] Loo sprint-haru: `git checkout -b sprint-01-pildi-saatmine-<initsiaalid>`
- [ ] Inspect linked Issue body ja aktsepteerimiskriteeriumid
- [ ] Inspect olemasolevat koodi, mis puudutab seda feature'i
- [ ] Salvesta initial audit `research/initial-audit.md`
- [ ] Adversarial SDD review: `research/adversarial-review.md`
- [ ] Resolve gate result enne implementatsiooni alustamist

## Phase 1: T1 — Skeleton (struktuur + routing)

- [ ] **R1:** Loo `app/send/page.tsx` — tühi leht, placeholder tekst
- [ ] **R1:** Loo `components/ImageUpload.tsx` — tühi komponent, `<input type="file" />` stub
- [ ] **R1:** Loo `app/api/send-alert/route.ts` — mock endpoint, tagastab alati `{ status: "ok" }`
- [ ] **R2:** Loo `components/AckMessage.tsx` — tühi komponent, placeholder `<div>`
- [ ] Kontrolli: `localhost:3000/send` laeb veata

**Commit pärast faasi:** `feat: T1 skeleton — routing + placeholder UI`

## Phase 2: T2 — Feature (pildi saatmine + ACK)

- [ ] **R1, S1:** `ImageUpload` — `<input type="file" accept="image/*">`, preview
- [ ] **R1, S1:** `send/page.tsx` — FormData POST → `/api/send-alert`, loading state
- [ ] **R2, S1:** `AckMessage` — näita `"Teade saadetud ✓"` edukal vastusel
- [ ] **R3, S2:** GPS puudub → hoiatus `"Asukoht pole saadaval"`, luba siiski saata
- [ ] **R3, S3:** Server 500 → vea kuvamine `"Saatmine ebaõnnestus, proovi uuesti"`

**Commit pärast faasi:** `feat: T2 pildi saatmine + ACK kuvamine (R1, R2, R3)`

## Phase N: QA and closeout

- [ ] Käivita fokuseeritud unit-testid
- [ ] Käivita integration-testid
- [ ] Käivita E2E-testid (`playwright-testing` skill — S1, S2, S3)
- [ ] Manual smoke-test (vt sprint-plan.md Validation Notes sektsioon)
- [ ] Uuenda release notes / changelog
- [ ] Sulge linked GitHub Issue
- [ ] Update sprint-plan.md Status sektsioon: "Done"

## Mapping tabel

| Task | Phase | Requirement | Scenario | Status |
| --- | --- | --- | --- | --- |
| Skeleton lehed + routing | 1 | R1, R2 | — | ⏸ |
| Mock API endpoint | 1 | R1 | — | ⏸ |
| ImageUpload + FormData POST | 2 | R1 | S1 | ⏸ |
| ACK kuvamine | 2 | R2 | S1 | ⏸ |
| GPS puudumise hoiatus | 2 | R3 | S2 | ⏸ |
| Server 500 vea käsitlus | 2 | R3 | S3 | ⏸ |
| Playwright testid | N | R1–R3 | S1–S3 | ⏸ |
