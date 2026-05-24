# Feature 04: GDPR-vastav pildi-maskerimine

> **Roadmapi positsioon:** Cross-cutting concern, mis mõjutab feature 01, 02, 03 — peab olema lahendatud enne tootmist. Saab arendada paralleelselt.

## Lühivisioon

Iga kodaniku saadetud pilt töödeldakse **automaatselt** enne, kui see jõuab dispetšeri vaatesse: AI tuvastab pildilt **näod, autonumbrid, isikutunnistused** ja **maskib (häguseks teeb)** vastavad alad. Dispetšeril on **õigus maskeering eemaldada** ühest-kahest klõpsuga, kui see on triage'i jaoks vajalik (nt põhjenduses fikseeritakse "vajalik kahtlustatava tuvastamiseks"). Iga eemaldamine on **logitud**.

## Sidusrühmad

| Roll | Mida ta soovib |
|---|---|
| **Privaatsuse-haldur (DPO)** | GDPR-i nõuetele vastav vaikimisi-režiim. Erandid on logitud. |
| **Dispetšer** | Töövoog ei aeglustu — maskeering on automaatne, "loomulik osa" |
| **Asutuse-spetsiifiline vastuvõtja** (politsei, KOV) | Vajadusel saab andmeid kasutada uurimises/menetluses |
| **AI Trust & Safety analüütik** | Maskerimise kvaliteet (vale-positiivid: maskitud asjad, mis polegi PII; vale-negatiivid: mittetuvastatud näod) |
| **Õigusosakond** | Maskeerimise eemaldamise õiguslik raamistik — kes võib, mis põhjusel, mis logiga |

## Põhilised kasutajalood

**KL-01:** *DPO-na* tahan ma teada, et **iga kodaniku saadetud pilt on vaikimisi maskeeritud** (näod, autonumbrid), *et* meie GDPR Art. 25 vaikevormide-by-design-vastutus on täidetud.

**KL-02:** *Dispetšerina* tahan ma näha pilte koos maskeeringuga, *et* ma ei pea pidevalt tegelema isikuandmete-küsimustega — saan keskenduda triage'ile.

**KL-03:** *Dispetšerina* tahan ma **eemaldada maskeeringu** (üks autonumber, näiteks), *kui* see on triage'i jaoks vajalik (nt põhjenduses märgin "vajalik liiklusõnnetuse uurimiseks"), **ja teadma**, et minu otsus on logitud.

**KL-04:** *AI Trust & Safety analüütikuna* tahan ma jälgida **maskerimise kvaliteeti** (kui sageli süsteem ei tuvasta nägu, kui sageli tuvastab valesti), *et* ma saaksin mudeli täiendamise prioriteete seada.

**KL-05:** *Õigusosakonnana* tahan ma näha **kõik eemaldamise põhjendused agregeeritult**, *et* ma saaksin tuvastada, kas mõni põhjendus-muster on ebakorrektne.

**KL-06:** *Kodanikuna* tahan ma teada, et **minu saadetud pildil olevad inimesed (juhuslikud möödujad) on maskitud**, *et* ma ei oleks tahtmatult kellelegi haiget teinud.

## Vastuvõtukriteeriumid

- ✅ Pilt maskeeritakse ≤ 2 sekundi jooksul vastuvõtmisest (enne dispetšeri vaatesse jõudmist)
- ✅ Tuvastatakse: näod (vähemalt 90% recall), autonumbrid (vähemalt 95% recall), ID-kaardid (vähemalt 95% recall)
- ✅ Maskeering on **pöörduv ainult salvestuse poolelt** (originaalpilt säilitatakse krüpteeritult eraldi)
- ✅ Maskeerimise eemaldamine vajab põhjendust (vähemalt 30 tähemärki) + sünnipäev-rolli ID
- ✅ Eemaldamise logi sisaldab: kasutaja, ajaTempel, põhjendus, mis konkreetselt maskitult eemaldati
- ✅ Originaalpildid säilitatakse 6 kuud, maskitult versioonid 2 aastat (audit)
- ✅ Vaikimisi-režiim on **maximum maskeering**; dispetšer peab AKTIIVSELT eemaldama

## Sõltuvused

- **Pildi-tuvastuse mudel** (näod + autonumbrid + ID-kaardid). Kas:
    - (a) Avalik mudel (YOLOv8 + pretrained)
    - (b) Sisemine treenitud mudel (rohkem privaatne, aga rohkem tööd)
    - (c) MS Azure Face / AWS Rekognition (välja antud risk!)
- **Salvestus:** 2 paralleelset hoidlat (originaalid krüpteeritud + maskitult versioonid)
- **Logging:** integreeruda SMIT-i tsentraalse audit-süsteemiga
- **Õigusliku konsultatsioon:** AKI (Andmekaitse Inspektsioon) heakskiit eelnevalt

## Lahtised küsimused / riskid

1. **GDPR-i seisukoht:** kas vajame DPIA (Data Protection Impact Assessment) eelnevalt? Vastus: tõenäoliselt JAH.
2. **AKI-ga konsultatsioon** — kui kaua võtab? Eelneb tarnele.
3. **Mis on "isikuandmed pildil"** — kas tätoveeringud, T-särgi tekstid, autode firmade logod? Õiguslik küsimus, vajab paragrahvi tasemel selgust.
4. **Vale-positiivid** — kui süsteem maskitult midagi, mis polegi PII (nt skulptuur), kas dispetšer saab seda lihtsalt eemaldada? Liiga lihtne eemaldamine = privaatsuse-by-design tühistamine.
5. **Kodaniku teavitamine** — kas äpis ütleme kasutajale, et tema pildilt midagi maskitult? GDPR Art. 12 läbipaistvuse-nõue.
6. **Treening-andmed** — kuidas treenime mudelit, kui me ei tohi näha päris pilte? Sünteetiline andmestik?

## Hinnanguline maht

| Komponent | Hinnang |
|---|---|
| AI mudeli valik + integreerimine | 4-6 nädalat |
| Maskerimise teenus (backend, 2 sek SLA) | 5-7 nädalat |
| Kaherealine salvestus (originaal + maskitult) | 3-4 nädalat |
| Eemaldamise UX + logging | 3-4 nädalat |
| DPIA + AKI konsultatsioon | 6-8 nädalat (paralleelne, blocking enne tarnet) |
| **Kokku** | **~20-25 nädalat (kalendrilist, sõltub AKI vastustest)** |
