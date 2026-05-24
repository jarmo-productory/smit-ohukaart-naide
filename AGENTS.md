# AGENTS.md

> See fail on **AI-agentide püsiv kontekst** Ohukaart projektis. Iga AI-tööriist (Claude Code, Cursor, GitHub Copilot, Codex) loeb selle faili automaatselt enne mistahes muudatuse tegemist.
>
> AGENTS.md on industry standard alates 2025 lõpust (OpenAI + Google + Sourcegraph + Cursor + Factory ühisarendus, doneeritud Linux Foundationile detsembris 2025).
>
> **Koolituslik märge:** See fail on **osaliselt täidetud** — strateegiline tase (projekti identiteet, sidusrühmad) on olemas. **Harjutuses 2** osaleja täiendab seda taktikalise tasemega: tehnoloogia-stack, konkreetsed reeglid AI-agendile, kvaliteediväravad. Lõppversioon näeb välja sarnane I päeva `intent-architect-naide/AGENTS.md`-le.

## Projekti identiteet

**Mis see on:** Ohukaart — kodaniku ohuteavituse mobiilirakendus AI-toega multi-agency triage'ga. Kodanik teeb pildi → AI klassifitseerib → suunab õige asutuseni (Päästeamet / PPA / Maanteeamet / KOV).

**Kes selle kasutajad on:**
- **Kodanik** (16+) — esitab teavitusi mobiilis
- **Päästekeskuse dispetšer** — triage AI-soovituste põhjal
- **Asutuse-spetsiifiline vastuvõtja** (KOV, Maanteeamet, PPA) — vastab oma vastutusala teavitustele
- **Operatiivjuht** — strateegiline vaade trendidele
- **AI Trust & Safety analüütik** — mudeli kvaliteedi monitooring
- **DPO** — GDPR-i vastavus, andmete säilitamine

**Kriitilisuse tase:** **TIER 2** — pole otsene hädaabiteenus (112 jääb alles), aga **lülitumine 112-le on kriitiline funktsioon** (kui kodanik on tegelikult hädaolukorras, peab äpp 1 puudutusega 112-le helistama). Kõik selle "üleminekutee" muudatused vajavad eraldi turva-ülevaatust.

## Sidusrühmad ja vastutused

| Roll | Vastutus | Kontakt |
|---|---|---|
| Tooteomanik (PO) | Visioon, prioriteedid, sidusrühmad | (täida koolituses) |
| Tehnoloogiajuht | Arhitektuur, AI-strateegia | (täida koolituses) |
| Pääste operatiivjuht (sponsor) | Töövoogude valideerimine | (täida koolituses) |
| PPA esindaja | Politsei vastutusala valideerimine | (täida koolituses) |
| RIA AI compliance | AI Acti vastavus | (täida koolituses) |

## ⚠️ TAKTIKALINE OSA — TÄIDA HARJUTUSES 2 ⚠️

Allpool olevad sektsioonid on praegu **tühjad / mall**. Sinu ülesanne H2-s on need täita. Vaata juhiseks I päeva `intent-architect-naide/AGENTS.md` faili.

### Tehnoloogia-stack

<!-- Mis on backend? Frontend? AI-mudel? Andmebaas? Logging? CI/CD?
     Mõtle: kuidas SMIT-i olemasolev stack mõjutab valikuid? -->

- **Backend:** _(täida)_
- **Mobiilirakendus:** _(täida)_
- **Web operatiivvaade:** _(täida)_
- **AI klassifikaator:** _(täida — mudeli tüüp, kus jookseb, kuidas valideeritakse)_
- **Andmebaas:** _(täida)_
- **Failihoidla (pildid):** _(täida — kus, kui kaua säilitatakse, kuidas krüpteeritud)_
- **Logging:** _(täida)_
- **CI/CD:** _(täida)_

### Põhireeglid AI-agentidele

<!-- Mida AI-agent peab ALATI tegema selles projektis töötades?
     Mida MITTE KUNAGI? Mida soovituslikult? -->

#### Mida ALATI tee

1. _(täida)_
2. _(täida)_
3. _(täida)_

#### Mida MITTE KUNAGI tee

1. _(täida)_
2. _(täida)_
3. _(täida)_

#### Mida soovituslikult tee

1. _(täida)_
2. _(täida)_

### Reguleerivad nõuded

<!-- GDPR, AI Act, eIDAS, KOV-i koostöö nõuded?
     Mis seadused/määrused/standardid mõjutavad seda toodet? -->

Kõik muudatused peavad arvestama:

- _(täida — viita konkreetsele paragrahvile)_
- _(täida)_
- _(täida)_

### Kvaliteediväravad

<!-- Mis kontrollid peavad PR-i läbima enne merge'imist?
     Typecheck? Testid? Security scan? Inimene review? -->

Iga PR sellesse projekti peab läbima:

1. _(täida)_
2. _(täida)_
3. _(täida)_

## Konteksti retrieval

Kui vajad rohkem konteksti, **eelista lugeda neid faile** enne uue informatsiooni küsimist:

- `README.md` — tellija brief ja projekti ülevaade
- `docs/intervjuu-paastedispetser.md` — Päästekeskuse dispetšeriga peetud intervjuu (sisaldab praktilist domeeniteadmist)
- `docs/legacy-112-lisanouded-2019.docx` — vananenud lisanõuded 112 äpile (referents võrdlemiseks)
- `roadmap-valikud/` — neli ettevalmistatud feature-võimalust koos kasutajalugude ja vastuvõtukriteeriumitega
- `specs/` — täielikud feature spec'id (Speckit / Gherkin formaadis)

## Versioon

- Viimati uuendatud: 2026-05-24
- Vastutav: Productory Services OÜ (koolitusmaterjal)
- Tagasiside: jarmo@productory.eu
