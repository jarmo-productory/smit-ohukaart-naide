# Sprint 01 — E2E eksploratsioon (§ 4.1)

> Kuupäev: 2026-05-28  
> Allikas: `scenarios.md`  
> Sihtmärk: `http://127.0.0.1:3000` (mock GPS: `59.436962,24.753574`)  
> Meetod: Playwright + DOM-inspektsioon (Cursor built-in brauseri asemel; sama PASS/FAIL kriteeriumid)

## Avastatud selectorid ja flow

| Element | Selector | Komponent |
| --- | --- | --- |
| Tekstiväli | `[data-testid="alert-text"]` | `alert-form.tsx` |
| Teksti viga | `[data-testid="alert-text-error"]` | `alert-form.tsx` |
| Saada nupp | `[data-testid="send-button"]` | `citizen-alert-flow.tsx` |
| GPS OK märk | `text=Asukoht OK` (badge) | `location-display.tsx` |
| Koordinaadid | `[data-testid="location-coordinates"]` | `location-display.tsx` |
| GPS viga | `[data-testid="location-error"]` | `location-display.tsx` |
| Kinnitus | `[data-testid="confirmation"]` | `confirmation-panel.tsx` |
| Saatmise viga | `[data-testid="send-error"]` | `confirmation-panel.tsx` |
| Laadimise overlay | `role=status[name="Saadan"]` | `confirmation-panel.tsx` |
| Aeglane saatmine | `text=Saadan… see võtab hetke` | `SendingOverlay` (slow=true) |
| Tagasi kaardile | `role=button[name="Tagasi kaardile"]` | `confirmation-panel.tsx` |
| Dispetšeri rida | `[data-testid="dispatcher-alert-item"]` | `dispatcher-alert-list.tsx` |
| Alert ID attr | `[data-alert-id="<id>"]` | `dispatcher-alert-list.tsx` |
| Teksti eelvaade | `[data-testid="alert-text-preview"]` | `dispatcher-alert-list.tsx` |
| Koordinaadid (disp) | `[data-testid="alert-coordinates"]` | `dispatcher-alert-list.tsx` |

### GPS test hook (S4)

`window.__OHUKAART_GEO_TEST__ = 'deny'` enne `page.goto('/')` — keelab mock-GPS (`geolocation.ts`).

## Kokkuvõttetabel

| Stsenaarium | R | Tulemus | Märkmed |
| --- | --- | --- | --- |
| S1 | R1 | **PASS** | POST `/api/alerts` payload: text + lat/lon; vastus sisaldab `OHU-*` ID-d |
| S2 | R1 | **PASS** | Lühike tekst → `alert-text-error`: „Kirjeldus peab olema vähemalt 10 tähemärki.“; kinnitust pole |
| S3 | R2 | **PASS** | Koordinaadid `59.436962, 24.753574` (4 komakohta); badge „Asukoht OK“ |
| S4 | R2 | **PASS** | `location-error` eesti keeles; `send-button` disabled |
| S5 | R3 | **PASS** | „Teavitus on vastu võetud“ + ID; sessionStorage säilitab kinnituse reloadil |
| S6 | R3 | **PASS** | HTTP 500 → `send-error`, `confirmation` puudub |
| S7 | R4 | **PASS** | `/dispatcher` — ID, aeg, tekst, koordinaadid, olek „Vastu võetud“ |
| S8 | R4 | **PASS** | Ebaõnnestunud saatmine ei suurenda dispatcher nimekirja |
| S9 | R5 | **PASS (local)** | Suhteline URL `/api/alerts`; täielik HTTPS — Deploy Preview QA |
| S10 | R5 | **DEFERRED** | Mixed-content test vajab Netlify Deploy Preview keskkonda |
| S11 | R6 | **PASS** | p95 ≤ 5 s (20 kordust) |
| S12 | R6 | **PASS** | >5 s → „Saadan… see võtab hetke“; 30 s → timeout + „Proovi uuesti“ |

## Stsenaariumite detailid

### S1 (R1) — Kehtiv tekstiteavitus

- **Flow:** `/` → oota „Asukoht OK“ → täida `alert-text` (≥10 tähemärki) → kliki „Saada teavitus“
- **Then:** Network POST `/api/alerts`; kinnitus kuvab `OHU-` prefiksiga ID

### S2 (R1) — Liiga lühike tekst

- **Flow:** täida „lühike“ (6 tähemärki) → Saada
- **Then:** täpne veateade eesti keeles; API-kutset ei tehta

### S3 (R2) — GPS enne saatmist

- **Then:** `location-coordinates` sisaldab mock koordinaate; kaart laadib (Leaflet)

### S4 (R2) — GPS puudumine

- **Hook:** `__OHUKAART_GEO_TEST__ = 'deny'`
- **Then:** juhis eesti keeles; nupp disabled

### S5 (R3) — Vastuvõtukinnitus

- **Then:** overlay tekst „Teavitus on vastu võetud“; ID monospaced; `sessionStorage` sisaldab kinnitust (reload test fixture tühjendab storage — kontroll otse storage'ist)

### S6 (R3) — Serveri viga

- **Sim:** route fulfill 500
- **Then:** `send-error` nähtav; kinnitust pole

### S7 (R4) — Dispetšeri vaade

- **Flow:** POST alert → `/dispatcher`
- **Then:** rida `[data-alert-id]` nähtav ≤10 s

### S8 (R4) — Ebaõnnestunud ei ilmu

- **Flow:** simuleeritud 500 kodaniku vormil → dispatcher count muutumatu

### S9 / S10 (R5) — HTTPS

- **Local (S9):** fetch kasutab suhtelist `/api/alerts` — **PASS** (`latency.spec.ts`)
- **Deploy Preview (S10):** mixed-content / HTTP fallback — **TBD**; käsitsi QA merge gate, vt `tasks.md` § Deploy Preview QA

### S11 / S12 (R6) — Latentsus

- **S11:** 20× saatmine; p95 ≤ 5000 ms (vt `research/latency-notes.md`)
- **S12:** API delay 6 s → slow overlay; delay >30 s → abort + veateade + retry nupp

## Avatud küsimused

| Küsimus | Mõju | Soovitus |
| --- | --- | --- |
| S10 Deploy Preview QA | R5 sad path | Merge gate — `tasks.md` § Deploy Preview QA; URL TBD PR-i tekkimisel |
| SendingOverlay testid | S12 | Kasuta `role=status` + tekst (testid ilma uute testid-ta) |

## Järgmine samm

§ 4.3 valmis. Merge gate: `tasks.md` § Deploy Preview QA. PR: `pr-creation` skill (§ 5).
