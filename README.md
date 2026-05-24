# Ohukaart — koolituse näidisrepo

> Sünteetiline juhtum SMIT-i AI tarkvaraarenduse arenguprogrammi **II päeva** harjutusteks. See ei ole päris süsteem ega ühegi konkreetse riigiasutuse projekt — kõik nimed, struktuurid ja nõuded on välja mõeldud koolituse eesmärgil.

## Tellija brief (fiktiivne)

**Tellija:** Siseministeeriumi infosüsteemide arendusosakond koostöös Päästeametiga ja Politsei- ja Piirivalveametiga (PPA).

**Projekti nimi:** **Ohukaart** (töönimi)

**Lühivisioon:** Kodanik, kes märkab avalikus ruumis ohtu (lõhkenud teekate, suitsev hoone, kahtlane pakk, kütusereostus, ohtlik liiklusolukord), saab mobiilirakenduses sündmusest **5 sekundiga** teada anda — teeb pildi, kinnitab asukoha, valib (või laseb AI-l valida) ohu kategooria, saadab. AI klassifitseerib pildi ja konteksti, määrab esialgse prioriteedi ja **suunab teavituse õige asutuseni** (Päästeamet / PPA / Maanteeamet / KOV). Dispetšer saab ühtsesse operatiivvaatesse triage'tud teavituse koos AI usaldushinnetega.

### Kontekst, miks see vajalik on (fiktiivne põhjendus)

Eestis tehakse aastas ~200 000 hädaabikõnet 112-le. Sealhulgas hinnanguliselt 30-40% on **mitte-hädaolukorrad**, mis koormavad keskust, aga vajaksid pigem **operatiivset teavitust** mõnele teisele teenusele (nt KOV-i kommunaalteenistus, Maanteeamet). Tänase 112 äpiga saab esitada ohuteavitusi, aga nende klassifitseerimine ja suunamine on käsitsi.

Visioon: AI-toega "ohukanali" kasutuselevõtt **vabastab dispetšerite aega** päris-hädaolukordade tarbeks, **tõstab teavituste kvaliteeti** struktureeritud andmetega (pilt + GPS + AI-klassifikatsioon), ja **paneb õigele agentuurile** teavituse otse.

### Sidusrühmad ja kasutajad

| Roll | Vajadus | Liides |
|---|---|---|
| **Kodanik** | Lihtne, kiire teavitus. Ei pea teadma, kuhu suunata. | Mobiilirakendus (iOS/Android) |
| **Päästekeskuse dispetšer** | Triage AI-soovituste põhjal. Eskaleerimine 112-le, kui vaja. | Web operatiivvaade |
| **Asutuse-spetsiifiline vastuvõtja** (KOV, Maanteeamet, PPA) | Ainult tema vastutusala teavitused. SLA-jälgimine. | Web vaade, e-mail/SMS notif |
| **Operatiivjuht** | Trendid, hotspot'id, ressursside planeerimine. | Dashboard |
| **AI Trust & Safety analüütik** | Klassifikaatori kvaliteet, vale-positiivid, mudeli drift. | Monitoring dashboard |
| **Privaatsuse-haldur (DPO)** | GDPR-i nõuded: näod, autonumbrid pildil. Andmete säilitamise periood. | Audit log, policy konsool |

## Koolituse loogika

II päeva harjutused töötavad selle repo'ga **kihiti**:

| Harjutus | Mida tehakse | Sisend | Väljund |
|---|---|---|---|
| **H1: Copilot eeltöös** | Põhinõuete ekstraktimise agent loeb intervjuud + legacy Wordi → struktureeritud nõuded | `docs/intervjuu-paastedispetser.md` + `docs/legacy-112-lisanouded-2019.docx` | Osaleja oma `nouded-v1.md` (Copilotis) |
| **H2: Konstitutsioon + roadmap** | AGENTS.md / Cursor Rules täiendamine + projekti roadmap | See repo + H1 väljund | Täiendatud `AGENTS.md` + `roadmap.md` |
| **H3: Speckit feature spec** | Üks `roadmap-valikud/` feature → käivitatav spec | `roadmap-valikud/` ühe faili valik | Uus fail `specs/<feature>.spec.md` |
| **H4: Prototüüpimine** | H3 spec → töötav UI prototüüp (v0.dev / Lovable / Cursor) | H3 väljund | Töötav prototüüp (välja koolitusrepo'st) |

## Repo struktuur

```
smit-ohukaart-naide/
├── README.md                                  # Sina oled siin
├── AGENTS.md                                  # AI-agendi konteksti baas (H2 täiendab)
├── docs/
│   ├── intervjuu-paastedispetser.md           # H1 sisend 1
│   └── legacy-112-lisanouded-2019.docx        # H1 sisend 2
├── roadmap-valikud/                           # H2/H3 jaoks 4 feature-valikut
│   ├── 01-kodanik-app-foto-teavitus.md
│   ├── 02-dispetseri-triage-vaade.md
│   ├── 03-operatiivdashboard.md
│   └── 04-gdpr-pildi-maskerimine.md
├── specs/                                     # Tühi — H3 osalejad täidavad
└── .claude/skills/                            # Tühi — H2 osalejad täidavad
```

## Kuidas seda repo't koolituses kasutada

**Enne koolitust:**
1. Klooni repo: `git clone https://github.com/jarmo-productory/smit-ohukaart-naide.git`
2. Ava Cursoris (`File → Open Folder → smit-ohukaart-naide`)
3. Kontrolli, et Copilot Studio / Microsoft 365 Copilot ligipääs on töötav

**Koolituse käigus:**
- H1 toimub Copilotis (web liides), mitte selles repos
- H2-H4 toimuvad selles repos, Cursoris

**Pärast koolitust:**
- Repo on **avalik** — osalejad võivad oma haru fork'ida ja jätkata harjutamist
- Productory võtab tagasiside põhjal kasutusele uuendused

## Litsents

MIT — kasuta vabalt, kohanda oma organisatsioonile.

## Kontaktid

Productory Services OÜ
- Jarmo Tuisk · jarmo@productory.eu · +372 520 1443
- Kristiina Tuisk · kristiina@productory.eu · +372 5660 5457
