# Feature 02: Dispetšeri triage-vaade

> **Roadmapi positsioon:** Teine kriitiline ühik. Ilma selleta on AI klassifikatsioon kasutu — keegi peab seda inimese silmaga kinnitama.

## Lühivisioon

Dispetšer avab veebivaate ja näeb **kõik sissetulnud teavitused ühel ekraanil**, järjestatud AI esialgse prioriteedi järgi. Iga teavituse juures on: pilt (eelvaade), GPS-asukoht kaardil, AI-soovitus (kategooria + soovitatud asutus + usaldushinne), 2 nuppu: **kinnita** või **muuda + saada**.

## Sidusrühmad

| Roll | Mida ta soovib |
|---|---|
| **Päästekeskuse dispetšer** | Kiire triage. AI ettepanek ON soovitus, mitte otsus. |
| **Vanemdispetšer** | Triage-mustri jälgimine: kus AI eksib, kus ei eksi |
| **AI Trust & Safety analüütik** | Kõik dispetšeri muudatused AI ettepanekule on logitud (mudeli täiendamiseks) |
| **Operatiivjuht** | Triage'i läbilaskevõime mõõdik (teavitusi/dispetšer/tund) |

## Põhilised kasutajalood

**KL-01:** *Dispetšerina* tahan ma näha kõik sissetulnud teavitused **prioriteedi järgi sorditud**, *et* ma alustaksin kõige kiireloomulisematest.

**KL-02:** *Dispetšerina* tahan ma näha AI **usaldushinnet** (nt "87% kindel, et tegemist on liiklusõnnetusega"), *et* ma saaksin otsustada, kas pean AI ettepaneku üle vaatama.

**KL-03:** *Dispetšerina* tahan ma **1 klõpsuga kinnitada** AI soovitust ja saata teavitus õigele asutusele, *et* minu töö oleks kiire kui AI eksib harva.

**KL-04:** *Dispetšerina* tahan ma **muuta** AI kategooriat / asutust / prioriteeti enne saatmist, *et* ma jääksin otsuse-tegijaks (ja vastutajaks).

**KL-05:** *Vanemdispetšerina* tahan ma näha **AI-ja-dispetšeri lahknevuse statistikat** (mis kategooriates AI eksib kõige tihedamini), *et* ma saaksin mudeli treeningu prioriteeti seada.

**KL-06:** *Dispetšerina* tahan ma näha **mitme dispetšeri korraga töötamist samal teavitusel** (kes vaatab, kes triage'is on), *et* me ei dubleeriks tööd.

## Vastuvõtukriteeriumid

- ✅ Teavitused kuvatakse ≤ 2 sekundiga pärast esitamist
- ✅ Iga teavitus näitab: pilt, GPS kaardil, AI-soovitus, usaldushinne, ajaTempel
- ✅ Üks-klõpsu kinnitamine saadab teavituse 1 sekundi jooksul
- ✅ Muudetud kategooria / asutus / prioriteet on logitud (kes, millal, mis muutus)
- ✅ Vaade toimib 1080p ja 1440p ekraanidel (operatiivkeskuse standard)
- ✅ Öörežiim (tume taust) on saadaval (vt intervjuu märkus)
- ✅ Töö korraga mitme dispetšeriga: locking mehhanism kuvab "vaatab praegu: M. Tamm"

## Sõltuvused

- **Feature 01:** Kodaniku äpp peab esitama struktureeritud teavitusi
- **AI klassifikaator** (eraldi tehniline komponent): klassifitseerib pildi + konteksti, tagastab kategooria + usaldushinne
- **Asutuste integratsioonid:** Päästeamet, PPA, KOV-id, Maanteeamet — igaüks oma vastuvõtu-API-ga (vt R-suunamise spec eraldi)
- **Auth:** Dispetšerid kasutavad TARA + asutuse-sisemine roll

## Lahtised küsimused / riskid

1. **AI usaldushinne — kas kuvame numbri (87%) või sõnaliselt ("Kõrge")?** Dispetšerite kognitiivne koormus on oluline tegur.
2. **Mis juhtub, kui asutus ei kinnita vastuvõttu** (nt KOV-i süsteem on maas)? Vajame fallback-it.
3. **Eskaleerimine 112-le** — kui dispetšer otsustab "see on tegelikult hädaolukord", kas süsteem kannab info üle 112 keskusesse automaatselt?
4. **Dispetšerite väljaõpe** — kuidas mõõdame, et dispetšerid ei muutu "AI-soovituste mehhaanilisteks kinnitajateks" (rubber-stamping)?
5. **Logging — kui kaua säilitatakse?** GDPR vs audit (vt feature 04 + DPO konsultatsioon)

## Hinnanguline maht

| Komponent | Hinnang |
|---|---|
| Frontend (React / Vue + kaart) | 6-8 nädalat |
| Backend triage-API (auth, locking, logging) | 4-5 nädalat |
| AI-integratsiooni adapter | 2-3 nädalat (mudel ise eraldi projekt) |
| Asutuste suunamise integratsioonid | 6-10 nädalat (sõltub asutusest) |
| Usability testimine dispetšeritega | 3-4 nädalat |
| **Kokku** | **~20-30 nädalat** |
