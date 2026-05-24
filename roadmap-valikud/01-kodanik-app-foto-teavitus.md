# Feature 01: Kodaniku mobiilirakendus — foto-põhine ohuteavitus

> **Roadmapi positsioon:** Esimene tarnitav ühik (MVP süda). Ilma selleta ei ole midagi triagida ega dashboardile kuvada.

## Lühivisioon

Kodanik avab äpi, **3 puudutusega** saadab teavituse: (1) pilt, (2) asukoha kinnitus, (3) saada. AI tegeleb taustal kategoriseerimisega — kasutaja ei pea valima "milline asutus" ega "milline ohutüüp".

## Sidusrühmad

| Roll | Mida ta soovib |
|---|---|
| **Kodanik** | 5-sekundiline teavitamine. Ei pea otsustama, kuhu suunata. |
| **Päästekeskuse dispetšer** | Struktureeritud teavitus (pilt + GPS + AI-soovitus), mis on triage-valmis |
| **Pääste juriidiline nõuandja** | Selge eristus "ohuteavitus" vs "hädaabikõne 112" — mitte hädaolukord-eskaleerimise asendaja |
| **Privaatsuse-haldur** | Pildil olevate isikuandmete kasutuse õiguslik raamistik (vt feature 04) |

## Põhilised kasutajalood

**KL-01:** *Kodanikuna* tahan ma märgata ohtu (nt lõhkenud teekate) ja sellest sekunditega teada anda, *et* õige asutus saaks reageerida, **ilma et ma peaksin teadma**, milline asutus on õige.

**KL-02:** *Kodanikuna* tahan ma näha kinnitust, et minu teavitus jõudis kohale, *et* ma teaksin, kas pean tegema midagi muud (nt ikkagi 112-le helistama).

**KL-03:** *Kodanikuna* tahan ma näha **selget hädaabi-nuppu (112)** äpi peaekraanil, *et* ma saaksin **vajadusel kohe helistada**, kui tegemist on tegeliku hädaolukorraga.

**KL-04:** *Kodanikuna* tahan ma saata teavitusi ka **nõrga võrgu** (2G / ebastabiilse 4G) tingimustes, *et* maapiirkonnad poleks välistatud.

**KL-05:** *Kodanikuna* tahan ma teha pildi **kohaliku salvestusena**, kui võrk pole hetkel saadaval, *et* teavitus läheks taustal välja siis, kui võrk taastub.

## Vastuvõtukriteeriumid (kõrgel tasemel)

- ✅ Kodanik saab esitada teavituse 3 puudutusega (mõõdetuna stopperitega usability-testis)
- ✅ Esitamise → "vastu võetud" kinnituse aeg ≤ 5 sekundit (3G normaaltingimustes)
- ✅ Hädaabi-nupp (112) on igal ekraanil nähtav, mitte peidetud menüü taga
- ✅ Offline-režiimis tehtud teavitused saadetakse võrgu taastumisel automaatselt
- ✅ Äpp toimib iOS 16+ ja Android 11+ peal
- ✅ Asukohaõigust **küsitakse** alles teavituse saatmise hetkel (mitte sundväljakutse)
- ✅ Pildi suurus on automaatselt kompressitud max 2 MB-ni (võrgu säästmiseks)

## Sõltuvused

- **Backend API:** teavituse vastuvõtu endpoint (REST + multipart)
- **AI klassifikaator:** vt feature 02 (kuid see feature töötab ka ilma, prooviversioonis "tundmatu" kategooria all)
- **GDPR-maskerimine:** vt feature 04 (PII varjamine pildi serveri poolelt)
- **112 integratsioon:** ainult kõne-üleminek (deeplink); ei integreeri 112 äpi sisukõnesüsteemiga

## Lahtised küsimused / riskid

1. **Pildi kvaliteet pimedas** — kas vajame välku, HDR-i, või lisame öörežiimi-juhise?
2. **Anonüümne esitamine?** Kas teavitus on anonüümne või seotud kasutaja kontakti telefoninumbriga (push-vastusteks)?
3. **Võltsteavituste ennetamine** — kuidas tuvastada pahatahtlikud kasutajad ilma autentimiseta?
4. **Mitme keele tugi** — algselt ainult eesti keeles, vene/inglise lisame hiljem? Vahetult arengukava taga.
5. **Vananenud telefonid (Android 7-10)** — kui suur protsent Eesti kasutajaid? Vajame andmete-tuge otsuseks.

## Hinnanguline maht

| Komponent | Hinnang |
|---|---|
| iOS app (SwiftUI) | 8-10 nädalat |
| Android app (Kotlin Jetpack Compose) | 8-10 nädalat |
| Backend API (teavituse vastuvõtt + GPS + kompresseerimine) | 4-5 nädalat |
| Usability testimine + iteratsioon | 3-4 nädalat |
| **Kokku** | **~16-20 nädalat (ühe meeskonna paralleeltöö korral)** |
