# Sprint 01 — Kodaniku saatmise prototüüp

Staatiline mobiili-UI prototüüp MVP kiirteavituse voogude jaoks. Ei ole tootmiskood.

## Ava

```bash
open docs/sprints/sprint-01-mvp-kiirteavitus/prototype/index.html
```

Või Cursoris: ava [`index.html`](index.html) ja kasuta sisseehitatud brauserit / `file://` URL-i.

## Failid

| Fail | Kirjeldus |
| --- | --- |
| [`index.html`](index.html) | Ainus aktiivne prototüüp (valitud suund **v2**: alusriba + kaart) |

Varasemad variatsioonid (v1 ülariba, v3 splash) on eemaldatud pärast v2 valikut.

## Valitud UX-suund (v2)

- **Kaart esikohal:** OpenStreetMap (Leaflet) mock-asukohaga Tallinnas.
- **Kirjeldus:** tumeda taustaga alumine leht (mock-tekst, ilma sisestuseta).
- **Peamine tegevus:** fikseeritud alusriba nupp „Saada teavitus“.
- **Päis:** täislaiuse header (Ohukaart / Ohuteavitus + GPS olek).
- **Õnnelik rada:** saatmine → laadimine → vastuvõtukinnitus (ID `OHU-2026-004821`).

## Seos nõuetega

| Prototüübi osa | Spec |
| --- | --- |
| Mock-tekst + min pikkuse vihje | R1 |
| OSM kaart + koordinaadid + „Asukoht OK“ | R2 |
| „Teavitus on vastu võetud“ + ID | R3 |
| Laadimise olek enne kinnitust | R6 (üldine) |

**Ei kata (järgmised iteratsioonid):** tekstisisestus, GPS puudumine, võrguviga, dispetšeri vaade (R4).

## Tehnoloogia

- HTML + Tailwind Play CDN
- [Leaflet](https://leafletjs.com/) 1.9 + [OpenStreetMap](https://www.openstreetmap.org/) kaardikiht
- Mock GPS: `59.436962, 24.753574` (Narva mnt 5, Tallinn)

## Spec-lüngad (HTML kommentaarid)

Prototüübi `index.html` alguses ja voos:

- `scenarios.md` pole veel sprint-01 kataloogis — õnnelik rada tuletatakse spec.md R1–R3-st.
- R2: kaart valitud MVP visuaalse suunana; spec ei ütle kaarti kohustuslikuks.

Tagasiside ja uued lüngad: salvesta [`../research/prototype-feedback.md`](../research/prototype-feedback.md) (loo fail vajadusel).

## Viited

- [sprint-plan.md](../sprint-plan.md) — faasid ja prototüübi staatus
- [spec.md](../spec.md) — nõuete leping R1–R6
