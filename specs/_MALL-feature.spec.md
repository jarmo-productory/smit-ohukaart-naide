# Feature Spec: [Feature nimi]

> **Mall — koopeeri ja täida.**
> Speckit /specify faas: WHAT + WHY, mitte HOW. Tehnoloogia-küsimused jäta /plan faasi.

---

## 1. Ülevaade

**Feature ID:** [nt FEAT-001]
**Feature nimi:** [lühike, inimsõbralik]
**Roadmap-allikas:** [link `roadmap-valikud/` failile]
**Spec versioon:** 0.1 (mustand)
**Spec autor:** [sinu nimi]
**Spec kuupäev:** [täna]

### Lühivisioon (1-2 lauset)

[Mis see feature ühe-kahe lausega on?]

### Äriline väärtus / probleem mida lahendab

[Miks me seda teeme? Mis on hind, kui me seda ei tee?]

---

## 2. Sidusrühmad

| Roll | Mida ta soovib | Mida ta annab |
|---|---|---|
| [Roll 1] | [...] | [...] |
| [Roll 2] | [...] | [...] |
| [Roll 3] | [...] | [...] |

---

## 3. Kasutajalood (User Stories)

### KL-01: [Lühike pealkiri]

*[Rollina]* tahan ma *[mida]*, *et* *[milline ärilise väärtuse põhjendus]*.

**Vastuvõtukriteeriumid:**
- [ ] [Kriteerium 1 — konkreetne, mõõdetav]
- [ ] [Kriteerium 2]
- [ ] [Kriteerium 3]

### KL-02: [...]

*[Rollina]* tahan ma *[mida]*, *et* *[miks]*.

**Vastuvõtukriteeriumid:**
- [ ] [...]
- [ ] [...]

### KL-03: [...]

[...]

---

## 4. Aktsepteerimisstsenaariumid (Gherkin formaadis)

> **NB:** See on **käivitatav** osa spec'ist. Iga stsenaarium saab hiljem viia üle Cucumber/Behave testiks.

```gherkin
Funktsionaalsus: [Feature nimi]

  Stsenaarium: [Stsenaariumi pealkiri — õnnelik tee]
    Eeldused [Pre-condition]
    Kui [tegevus]
    Siis [oodatav tulemus]

  Stsenaarium: [Edge case 1]
    Eeldused [...]
    Kui [...]
    Siis [...]

  Stsenaarium: [Vea-juhtum]
    Eeldused [...]
    Kui [...]
    Siis [...]
    Ja [...]
```

---

## 5. Funktsionaalsed nõuded (mitte-Gherkin)

[Lisaks ülevaltoodud stsenaariumitele, kõik konkreetsed funktsionaalsed nõuded.]

- **FN-01:** [Nõue]
- **FN-02:** [Nõue]
- **FN-03:** [Nõue]

---

## 6. Mittefunktsionaalsed nõuded

### Jõudlus
- [Mõõdetavad numbrid: vastuse aeg, läbilaskevõime, jne]

### Käideldavus
- [SLA — kui tihti võib teenus mitte töötada]

### Turvalisus
- [Auth, autoriseerimine, krüpteerimine, audit]

### Privaatsus / GDPR
- [Isikuandmete kohtlemine, säilitamine, õiguslik alus]

### Käideldavus (kasutaja vaates)
- [WCAG vastavus, mobiilne tugi, keele-tugi]

---

## 7. Skoobi piirid (mis EI ole skoobis)

[Selgesti määra, mida see feature EI tee — vältida hiljem "scope creep" vaidlusi.]

- [Asi 1, mis ei ole skoobis]
- [Asi 2, mis ei ole skoobis]

---

## 8. Sõltuvused

### Tehnilised sõltuvused
- [Komponent 1, mille olemasolu vajalik]
- [Komponent 2]

### Organisatsioonilised sõltuvused
- [Sponsorlus / heakskiit kelt]
- [Andmete saamine kelt]

---

## 9. Riskid ja avatud küsimused

| # | Risk / küsimus | Mõju | Tegevus | Vastutaja |
|---|---|---|---|---|
| 1 | [Riski kirjeldus] | [Kõrge/Keskmine/Madal] | [Mida teha] | [Kes] |
| 2 | [...] | [...] | [...] | [...] |

---

## 10. Edu mõõdikud

Kuidas me teame, et see feature on edukas?

- [Mõõdik 1 — konkreetne number, mille suunas liigume]
- [Mõõdik 2]
- [Mõõdik 3]

---

## 11. Heakskiidud

| Roll | Nimi | Kuupäev | Allkiri |
|---|---|---|---|
| Tooteomanik (PO) | [...] | [...] | [...] |
| Tehnoloogiajuht | [...] | [...] | [...] |
| Sponsor (asutus) | [...] | [...] | [...] |

---

## Lisad

### Lisa A: Wireframes / mockupid
[Lingi prototüübile, kui H4-s loodud]

### Lisa B: Andmemudel (kõrgel tasemel)
[Kui asjakohane]

### Lisa C: Seotud dokumendid
- Roadmap kirje: `roadmap-valikud/[...]`
- Intervjuu: `docs/intervjuu-paastedispetser.md`
- Legacy nõuded: `docs/legacy-112-lisanouded-2019.docx`
