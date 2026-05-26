# Ohukaart

> Sünteetiline avaliku sektori toote case study — kodaniku ohuteavituse mobiilirakendus AI-toega klassifikatsiooni ja suunamisega. See ei ole päris süsteem ega ühegi konkreetse riigiasutuse projekt; nimed, struktuurid ja nõuded on väljamõeldud harjutuskeskkonna jaoks.

## Mis see repo on

Repo sisaldab **toote konteksti**, **taustauuringut**, **struktureeritud nõudeid** ja **sprint-paketi töövoogu** (spec, stsenaariumid, plaan, prototüüp). Eesmärk on harjutada nõuete töötlust, intent architecture'i ja spetsifikatsioone AI-agenditega — mitte ehitada tootmisrakendust.

Koolituse juhised, harjutused ja promptid on ainult kaustas [`help/`](help/).

## Tellija brief (fiktiivne)

**Tellija:** Siseministeeriumi infosüsteemide arendusosakond koostöös Päästeametiga ja Politsei- ja Piirivalveametiga (PPA).

**Projekti nimi:** **Ohukaart** (töönimi)

**Lühivisioon:** Kodanik, kes märkab avalikus ruumis ohtu (lõhkenud teekate, suitsev hoone, kahtlane pakk, kütusereostus, ohtlik liiklusolukord), saab mobiilirakenduses sündmusest **5 sekundiga** teada anda — teeb pildi, kinnitab asukoha, valib (või laseb AI-l valida) ohu kategooria, saadab. AI klassifitseerib pildi ja konteksti, määrab esialgse prioriteedi ja **suunab teavituse õige asutuseni** (Päästeamet / PPA / Maanteeamet / KOV). Dispetšer saab ühtsesse operatiivvaatesse triage'tud teavituse koos AI usaldushinnetega.

### Kontekst

Eestis tehakse aastas ~200 000 hädaabikõnet 112-le; hinnanguliselt 30–40% on **mitte-hädaolukorrad**, mis koormavad keskust, aga vajaksid pigem **operatiivset teavitust** teisele teenusele (nt KOV-i kommunaalteenistus, Maanteeamet). Tänase 112 äpiga saab esitada ohuteavitusi, aga klassifitseerimine ja suunamine on käsitsi.

Ohukaardi visioon: AI-toega ohukanal **vabastab dispetšerite aega** päris-hädaolukordade tarbeks, **tõstab teavituste kvaliteeti** (pilt + GPS + klassifikatsioon) ja **suunab teavituse õigele agentuurile**.

### Sidusrühmad

| Roll | Vajadus | Liides |
|---|---|---|
| **Kodanik** | Lihtne, kiire teavitus. Ei pea teadma, kuhu suunata. | Mobiilirakendus (iOS/Android) |
| **Päästekeskuse dispetšer** | Triage AI-soovituste põhjal. Eskaleerimine 112-le, kui vaja. | Web operatiivvaade |
| **Asutuse-spetsiifiline vastuvõtja** (KOV, Maanteeamet, PPA) | Ainult tema vastutusala teavitused. SLA-jälgimine. | Web vaade, e-mail/SMS notif |
| **Operatiivjuht** | Trendid, hotspot'id, ressursside planeerimine. | Dashboard |
| **AI Trust & Safety analüütik** | Klassifikaatori kvaliteet, vale-positiivid, mudeli drift. | Monitoring dashboard |
| **Privaatsuse-haldur (DPO)** | GDPR: näod, autonumbrid pildil; säilitamise periood. | Audit log, policy konsool |

## Põhinõuded (ülevaade)

Täielik nõuete pakett, vastuolud ja lüngad: [`docs/background-research/112-nouded.md`](docs/background-research/112-nouded.md).

### Funktsionaalsed

| ID | Nõue | Prioriteet |
|---|---|---|
| F-01 | Tekstipõhine teavitus 112 keskusele | Kriitiline |
| F-02 | Teavitusele kuni 3 pilti | Kriitiline |
| F-03 | GPS-asukoht automaatselt teavitusele | Kriitiline |
| F-04 | Kinnitus, et teavitus on vastu võetud | Kriitiline |
| F-05 | Dispetšer saab vastata ja lisainfot küsida | Oluline |
| F-06 | Kasutaja ei määra prioriteeti ega sündmuse tüüpi | Oluline |

### Mittefunktsionaalsed

| ID | Nõue | Prioriteet |
|---|---|---|
| NF-01 | Ööpäevaringne kättesaadavus | Kriitiline |
| NF-02 | Edastus dispetšerini ≤ 60 s | Kriitiline |
| NF-03 | Töö aeglases võrgus (vähemalt tekst 2G-l) | Oluline |
| NF-04 | Krüpteeritud edastus (TLS 1.2+) | Kriitiline |
| NF-05 | Piltidel olevate isikuandmete reguleerimine | Kriitiline |

### Olulised vastuolud ja lüngad

| Teema | Kokkuvõte |
|---|---|
| Tagasiside | Kasutaja tahab kinnitust, mitte pidevat suhtlust; dispetšer ei tea ootusi. |
| Prioriteet | Kasutaja ei taha valida; operaator vajab reageerimiskiiruse infot. |
| Privaatsus | Pildistamise kõhklus vs isikuandmete risk piltidel. |
| Asukoht | GPS vea käsitlemine pole lahti kirjutatud. |
| Säilitus | Kasutaja ei tea, kui kaua pilte hoitakse. |
| Klassifitseerimine | Dispetšer ei usalda täielikku automaatikat. |

## Taustauuring

Mustad sisendid nõuete töötluseks:

| Fail | Sisu |
|---|---|
| [`intervjuu-paastedispetser.md`](docs/background-research/intervjuu-paastedispetser.md) | Päästekeskuse dispetšeri vaade |
| [`intervjuu-taksojuht.md`](docs/background-research/intervjuu-taksojuht.md) | Kodaniku-kasutaja vaade |
| [`legacy-112-lisanouded-2019.docx`](docs/background-research/legacy-112-lisanouded-2019.docx) | Vananenud nõuete dokument |
| [`112-nouded.md`](docs/background-research/112-nouded.md) | Struktureeritud nõuded, vastuolud, lüngad |

## Repo struktuur

```
smit-ohukaart-naide/
├── README.md                 # Repo ja toote ülevaade (see fail)
├── AGENTS.md                 # AI-agendi kontekst (täiendatakse töö käigus)
├── docs/
│   ├── background-research/  # Intervjuud, legacy, nõuete väljund
│   ├── roadmap.md            # Feature'ite järjekord
│   └── sprints/              # Sprint-paketid (_template/ + sprint-XX-…/)
├── help/                     # Koolitusmaterjal, näited, Speckit juhendid
└── specs/                    # Aegunud — vt docs/sprints/
```

## Töövoog

1. **Taustauuring** — loe `docs/background-research/`, täienda või võrdle `112-nouded.md`-ga.
2. **Roadmap** — planeeri feature'id [`docs/roadmap.md`](docs/roadmap.md)-is.
3. **Sprint-pakett** — kopeeri [`docs/sprints/_template/`](docs/sprints/_template/), täida spec, stsenaariumid, plaan, taskid; konventsioon: [`docs/sprints/README.md`](docs/sprints/README.md).
4. **AI kontekst** — täienda [`AGENTS.md`](AGENTS.md) projekti reeglite ja otsustega.

## Litsents

MIT — kasuta vabalt, kohanda oma organisatsioonile.

## Kontakt

Productory Services OÜ · [jarmo@productory.eu](mailto:jarmo@productory.eu) · [kristiina@productory.eu](mailto:kristiina@productory.eu)
