# Sprint 01 — Tasks

> Source of truth for implementation. Iga task viitab R-nõudele ja S-stsenaariumile. ✅ tehtud / ⏳ in-progress / ⏸ blokeeritud.

## Phase 1: T1 — Skeleton

- [x] **(setup)** `npm create next-app@latest .` — Tailwind + TypeScript + App Router + ESLint + `src/` dir (käsitsi scaffold; `npm` puudub keskkonnas)
- [x] **(setup)** Esimene `/` route — projekti tiitelleht „Ohukaart“
- [x] **(setup)** Smoke check: `localhost:3000` laeb veata

**Commit pärast faasi:** `feat: T1 skeleton — Next.js bootstrap + esimene route`

## Phase 2: T2 — Alert API

- [x] **R1, R5, S1, S9:** `POST /api/alerts` — valideerimine (text min 10, GPS), ID genereerimine, in-memory store
- [x] **R5, S9, S10:** Tagada, et API URL on suhteline (`/api/alerts`) — Deploy Preview kasutab HTTPS automaatselt

**Commit pärast faasi:** `feat: T2 alert API (R1, R5)`

## Phase 3: T3 — Kodaniku vorm

- [x] **R1, S1, S2:** `alert-form.tsx` — vabatekstiväli, min/max valideerimine, eestikeelsed veateated
- [x] **R2, S3, S4:** `location-display.tsx` + `geolocation.ts` — GPS kuvamine kaardil/koordinaatidena, blokeerimine ilma asukohata, retry juhis

**Commit pärast faasi:** `feat: T3 citizen form (R1, R2)`

## Phase 4: T4 — Saatmine, kinnitus ja latentsus

- [x] **R3, S5, S6:** Saatmise voog — fetch POST, kinnitus panel ID-ga, veaolek ilma valepositiivseta, sessionStorage korduv-vaatamine
- [x] **R6, S11, S12:** Laadimise indikaator (>5 s), 30 s timeout + „Proovi uuesti“, vorm tühjeneb pärast edukat saatmist

**Commit pärast faasi:** `feat: T4 send flow + confirmation (R3, R6)`

## Phase 5: T5 — Dispetšeri operatiivvaade

- [x] **R4 (HARD GATE):** PO kinnitas `/dispatcher` stub definitsiooni (2026-05-28)
- [x] **R4, S7, S8:** `dispatcher/page.tsx` + `dispatcher-alert-list.tsx` — nimekiri ID, aeg, tekst (≤500 + „…“), koordinaadid, olek „received“
- [x] **R4, S7:** `GET /api/alerts` — sorteeritud uusimad esimesena

**Commit pärast faasi:** `feat: T5 dispatcher view (R4)`

## Phase 6: T6 — E2E testid ja latentsus

- [x] **R1–R3, S1–S6:** Playwright `citizen-send.spec.ts` + `gps-block.spec.ts`
- [x] **R4, S7, S8:** Playwright `dispatcher-view.spec.ts`
- [x] **R5, S9, S10:** HTTPS kontroll — S9 automaatne (suhteline URL local); S10 `test.skip` + käsitsi QA (vt allpool Deploy Preview QA)
- [x] **R6, S11, S12:** Playwright `latency.spec.ts` — p95 ≤5 s; tulemus → `research/latency-notes.md`

**Commit pärast faasi:** `test: T6 e2e + latency (R5, R6)`

## Deploy Preview QA (R5, S10) — merge gate

> **Ei blokeeri MVP planeerimist ega implementatsiooni.** Täidetakse pärast Netlify Deploy Preview URL-i tekkimist (tavaliselt PR-i avamisel).

- [ ] **TBD:** Netlify Deploy Preview URL lisatakse PR-i tekkimisel
- [ ] **QA (S10, R5):** kontrollida Deploy Preview keskkonnas, et mixed-content warninguid ei teki ja HTTP fallbacki ei kasutata
  - ava Deploy Preview URL brauseris; ava DevTools → Console ja Network
  - saada kehtiv teavitus (S1 happy path)
  - Console: mixed-content hoiatusi ei tohiks tekkida
  - Network: `POST` `/api/alerts` peab minema `https://` URL-ile
  - kood ei tohi kasutada kõva `http://` API base URL-i
- [ ] **Gate:** enne merge'i peab kontroll olema tehtud Deploy Preview URL-il

## Phase 7: T7 — Closeout

- [x] Smoke check kõikide R-nõuete vastu (käsitsi + e2e)
- [x] Playwright testid läbivad (`npm run test:e2e` — 12/12 passed, 1 skipped S10)
- [x] Loo/uuenda `docs/CHANGELOG.md` — üks kirje sprint 01 kohta
- [x] Uuenda `sprint-plan.md` Status: **Done**
- [ ] Sulge / uuenda linked GitHub Issue (TBD — vajab `git remote` + `gh auth`; sprint-plan § Linked Issues)
- [x] Final commit: `chore: sprint-01 closeout — CHANGELOG + status`

## Post-MVP / Deferred

- Smart-ID / eID autentimine
- GPS käsitsi parandamine (sprint 07)
- Püsiv andmebaas (PostgreSQL / SQLite)
- Pildid (sprint 02)
- Päris 112 integratsioon
- Tekstikategooria/maärksõna väli (dispetšer review)

## Mapping tabel

| Task | Phase | Requirement | Scenario | Status |
| --- | --- | --- | --- | --- |
| T1 skeleton | 1 | — | — | ✅ |
| T2 alert API | 2 | R1, R5 | S1, S9, S10 | ✅ |
| T3 citizen form | 3 | R1, R2 | S1–S4 | ✅ |
| T4 send flow | 4 | R3, R6 | S5, S6, S11, S12 | ✅ |
| T5 dispatcher | 5 | R4 | S7, S8 | ✅ |
| T6 e2e + latency | 6 | R5, R6 | S9–S12 | ✅ (S10 → Deploy Preview QA gate) |
| T7 closeout | 7 | R1–R6 | S1–S12 | ✅ (GitHub issue TBD; S10 merge gate TBD) |
