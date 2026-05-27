# Research types — comparison columns & optional sections

Pick **one primary type**. Use **mixed** only when the user explicitly needs two lenses (e.g. tech + legal); then add at most one extra optional section.

## technology_selection

**Use for:** libraries, APIs, on-device vs cloud, protocols, ML models.

**Default table columns:**

| Variant | Tüüp | Andmete asukoht | Jõudlus (ligi) | Hind | Sobivus / risk |

**Optional sections:**

- Eesti kontekst — andmete asukoht ja GDPR
- Jõudlus — vastuvõetav \<X\> kontekstis
- Erisus: \<projekti-spetsiifiline konflikt, nt autonumbrid vs maskimine\>

## regulatory_compliance

**Use for:** GDPR, ISKE, 112 nõuded, andmekaitse, lepingud.

**Default table columns:**

| Nõue / interpretatsioon | Allikas | Kohaldub Ohukaardile | Tõendusaste | Järgmine samm |

**Optional sections:**

- Vastuolud seaduse / juhendi / toote vahel
- Eesti avaliku sektori erisused

## vendor_market

**Use for:** SaaS, pilv, riigihanked, teenusepakkuja valik.

**Default table columns:**

| Pakkuja / toode | Tüüp | EL/Eesti andmed | Hind (ligikaudu) | Leping / DPA | Sobivus |

**Optional sections:**

- Riigipilv vs kommertspilv
- Hanke- või raamlepingu piirangud (kui teada)

## architecture

**Use for:** süsteemidisain, integratsioonid, andmevoog, triage pipeline.

**Default table columns:**

| Lähenemine | Komplekssus | Latentsus / SLO | Ops risk | Ühilduvus olemasolevaga | Märkused |

**Optional sections:**

- Andmevoog (tekst või viide diagrammile — ära lisa diagrammi faili ilma palumata)
- Turvapiirid ja usalduspiirkonnad

## process_policy

**Use for:** dispetšeri töövoog, käitumisreeglid, SLA, inim+AI protsess.

**Default table columns:**

| Variant | Kirjeldus | Mõju kasutajale | Mõju operatsioonile | Rakendamise kulu | Risk |

## competitive

**Use for:** teised riiklikud / 112 / hädaabirakendused, turu praktika.

**Default table columns:**

| Toode / riik | Funktsioon | Meie positsioon | Õppetund | Allikas |

**Optional sections:**

- Mida kopeerida / mida mitte

## mixed

Combine **at most two** column sets above. Keep the variant table under ~8 rows; split detail into subsections if needed.

## Naming output files

| Pattern | Example |
| --- | --- |
| `docs/analysis/<YYYY-MM-DD>-<teema-slug>.md` | `2026-05-26-foto-maskeerimise-tehnoloogiad.md` |

Slug: lowercase, hyphenated, reflects the research question (not the recommendation).
