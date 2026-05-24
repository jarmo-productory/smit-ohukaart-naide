# Spec'id — GitHub Speckit meetod

> See kaust on **harjutuse 3** sihtkoht. Siin ei ole praegu spec'e — sina (kursusel osaleja) loote ühe.

## Mis on GitHub Speckit?

GitHub Speckit (vt [github.com/github/spec-kit](https://github.com/github/spec-kit)) on **avatud lähtekoodiga raamistik** spec-driven arenduseks. Põhiidee: enne kui kirjutad koodi, kirjuta esmalt **spec**, mis on:

- **Käivitatav** — masin saab seda lugeda ja testida
- **Inimsõbralik** — analüütik / PO / arendaja saavad sama dokumendist lugeda
- **Versioneeritav** — git-i all, mitte Wordis
- **AI-loetav** — AI-agent saab spec'i põhjal kirjutada kvaliteetset koodi

Speckit on **4-faasiline töövoog**:

| Faas | Mida tehakse | Kuna kasutatakse |
|---|---|---|
| **1. /specify** | Kirjuta WHAT + WHY (kasutajalood, vastuvõtukriteeriumid) — **MITTE tehnoloogia** | Algfaas |
| **2. /plan** | Kirjuta HOW (tehnoloogia, arhitektuur, andmemudel) | Pärast /specify kinnitamist |
| **3. /tasks** | Tükelda /plan väiksemateks ülesanneteks | Pärast /plan kinnitamist |
| **4. /implement** | Realiseeri /tasks (AI-agent või arendaja) | Pärast /tasks kinnitamist |

**Tänase harjutuse fookus:** ainult **/specify** faas. Tehnoloogia-küsimused tulevad III päeval (arendajad/QA).

## Harjutus 3: kuidas alustada

1. Vali üks `roadmap-valikud/` failidest (01, 02, 03 või 04). Eelistus: üks, mis sind kõige enam huvitab.
2. Avaldukseta `_MALL-feature.spec.md` malli ja koopeeri see uue faili nimega: `<feature-number>-<feature-nimi>.spec.md`
    - Näiteks: `01-kodanik-app-foto-teavitus.spec.md`
3. Töötage Cursoris koos AI-agendiga, et täita kõik sektsioonid
4. **Põhilisteks valikukohtadeks** on Acceptance Scenarios (Gherkin formaadis) — sealt algab käivitatavaks-saamise võimalus

## Delivery — kuhu spec maandub?

(Lahendame harjutuse käigus.)

Lühivastus: **arendusrepos koos koodiga**, `specs/` kausta all. Põhjus: spec ja kood elavad sama lifecycle'iga. Word-dokumente eraldi "spec-repos" hoidmine on legacy-muster, mis ei tööta agentse arenduse ajastul.

Pikem vastus tuleb harjutuse käigus.
