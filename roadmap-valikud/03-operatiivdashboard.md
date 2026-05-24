# Feature 03: Operatiivjuhi dashboard

> **Roadmapi positsioon:** Kolmas tarnitav ühik. Sõltub feature 01 ja 02 olemasolust — alles siis on andmeid, mida visualiseerida.

## Lühivisioon

Operatiivjuht avab veebipõhise dashboardi ja näeb **reaalajas piltlikku ülevaadet** Eesti ohu-olukorrast: kaart soojuskaardiga (hotspot'id), trendid (viimase 24h, 7d, 30d), kategooria-jaotus, asutuste tööjaotus. **Mitte triage-vahend**, vaid **strateegiline vaade** ressursside planeerimiseks ja korduvate ohu-mustrite tuvastamiseks.

## Sidusrühmad

| Roll | Mida ta soovib |
|---|---|
| **Pääste operatiivjuht** | Strateegiline vaade — kus Eestis on probleeme, kus mitte |
| **Asutuse juht (KOV, Maanteeamet)** | Tema vastutusala teavituste agregeeritud vaade |
| **Sisekommunikatsiooni juht** | Kvartali / aasta raportite alusmaterjal |
| **Pressi-osakond** | Aluskestastistika meediakajastusteks ("kuus oli X teavitust") |

## Põhilised kasutajalood

**KL-01:** *Operatiivjuhina* tahan ma näha **Eesti kaarti soojuskaardiga**, *et* ma näeksin, kus teavitusi tuleb kõige rohkem (hotspot'id).

**KL-02:** *Operatiivjuhina* tahan ma näha **trende ajas** (tunnis, päevas, nädalas, kuus), *et* ma näeksin, kas olukord halveneb või paraneb.

**KL-03:** *Operatiivjuhina* tahan ma näha **kategooriate jaotust** (kütusereostus vs liiklus vs avalik kord vs muu), *et* ma saaksin ressursse prioritiseerida.

**KL-04:** *KOV-i juhina* tahan ma näha **ainult minu omavalitsuse** teavitusi, *et* ma ei peaks filtreerima kogu Eesti müra hulgast.

**KL-05:** *Operatiivjuhina* tahan ma näha **AI-dispetšeri lahknevuse trende** (millises kategoorias dispetšerid muutavad AI soovitust kõige sagedamini), *et* ma teaksin, kuhu treeningu-ressursse suunata.

**KL-06:** *Operatiivjuhina* tahan ma **eksportida andmeid** CSV/Excel formaati, *et* ma saaksin neid kasutada raportites ja eelarve-arutelustes.

## Vastuvõtukriteeriumid

- ✅ Dashboard laeb täielikult ≤ 3 sekundiga (cached data)
- ✅ Andmed uuenevad reaalajas (≤ 60 sek viive teavituse ja dashboardile kuvamise vahel)
- ✅ Kaart toetab zoom-i (Eesti tervikvaade → küla tasandile)
- ✅ Filtrid: kuupäeva-vahemik, kategooria, asutus, KOV
- ✅ Eksport: CSV + Excel + PDF (visuaalne raport)
- ✅ Rollipõhine ligipääs: KOV-i juht näeb ainult oma KOV-i andmeid
- ✅ Anonüümseerimine: dashboardil EI näidata üksikteavitusi (ainult agregeeritud andmed) — vt feature 04

## Sõltuvused

- **Feature 01 + 02:** vajame teavituste voogu ja triage-tulemusi
- **Andmehoidla:** Time-series DB (nt TimescaleDB) jaoks
- **Kaardi-teenus:** Maa-ameti WMS (Eesti aluskaardid) või Google Maps / Mapbox
- **Auth + rollid:** Kes näeb mida (RIA + TARA + sisemine rollihaldus)
- **DPO heakskiit:** anonüümseerimise reeglite kinnitamine

## Lahtised küsimused / riskid

1. **Avalik vs sisemine dashboard** — kas mingi (vähem detailne) versioon on avalik? Vt Politsei "Naabrivalve" eeskuju.
2. **Mis on hotspot?** Tehnika: aglomeratsioon vs DBSCAN vs lihtne radius. Mõjutab visuaalset selgust.
3. **Raporteerimise sagedus** — kas operatiivjuht tahab e-maili dailyt? Slack-i? Or ainult portaal?
4. **Andmete säilitamine vs anonüümseerimine** — kui kaua säilitatakse personaalselt seostatav GPS-andmeid?
5. **Multi-tenant arhitektuur** — kas iga asutus saab oma "näo" dashboardile, või on kõik ühises vaates?

## Hinnanguline maht

| Komponent | Hinnang |
|---|---|
| Frontend dashboard (kaart + chart-id) | 8-10 nädalat |
| Backend agregeerimise teenus | 5-7 nädalat |
| Time-series andmehoidla seadistus | 2-3 nädalat |
| Rollipõhine ligipääs + filtrid | 3-4 nädalat |
| Eksport (CSV/Excel/PDF) | 2-3 nädalat |
| **Kokku** | **~20-27 nädalat** |
