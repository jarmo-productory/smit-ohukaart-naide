# Sprint 01: MVP kiirteavitus — Spec

## Eesmärk

Ohukaardi esimene tarne peab andma kodanikule **minimaalse, töötava** kanali avaliku ruumi ohu teavitamiseks ilma fotode, prioriteedi valiku või AI-suunamiseta. Kodanik kirjutab lühikese teksti, süsteem lisab automaatselt GPS-asukoha ja saadab teavituse krüpteeritult edasi, kuni kodanik näeb selget kinnitust, et teavitus on vastu võetud. See on kriitilise tee alguspunkt (`01 → 04 → 05 → 06 → 08`) ja katab H1 nõuded F-01, F-03, F-04, NF-02 ja NF-04. Sprint ei lahenda H1 vastuolusid (pidev suhtlus vs kinnitus, prioriteet, pildid) — need jäävad hilisemate sprintide design-otsusteks.

## Põhimõtted

- **Üks selge tegevus:** Teavituse saatmine on ühe vooga lõpetatav; kasutaja ei vali asutust, prioriteeti ega sündmuse tüüpi (F-06 vaim).
- **Asukoht kaasas:** Iga teavitus sisaldab automaatset GPS-koordinaati; kasutaja näeb, mis asukoht saadetakse (läbipaistvus enne saatmist).
- **Kinnitus, mitte vestlus:** Pärast saatmist piisab vastuvõtukinnitusest; dispetšeri vastus ja lisaküsimused on väljas (F-05, H1 tagasiside vastuolu).
- **Usaldus läbi turvalisuse:** Andmeedastus on krüpteeritud; kasutajale ei pea tehnilist detaili näitama, kuid süsteem peab seda tõestatavalt täitma (NF-04).
- **Kiirus on mõõdetav:** Kodanik ei tohi jääda ootama ilma tagasisideta kauem, kui H1 ja dispetšeri intervjuu aktsepteerivad (NF-02; dispetšer: ~30 s paanika piir).

## Requirements (Nõuded)

### R1: Tekstipõhine ohuteavitus

As a **kodanik**, I want **kirjutada lühikese tekstilise kirjelduse ohust ja saata selle 112 operatiivkanalisse**, so that **ma saan teada anda ilma kõne tegemata** (F-01).

Acceptance criteria:

- Teavituse vormil on üks kohustuslik vabatekstiväli (min 10, max 2000 tähemärki); tühja või alla miinimumi saatmise katse on blokeeritud ja kuvatakse selge veateade eesti keeles.
- Kasutaja saab enne saatmist teksti üle vaadata ja muuta; pärast edukat saatmist on vorm tühi või suunab uue teavituse algusesse (ei saa kogemata sama teksti uuesti saata ilma uut sisestust).
- Saadetud teavituse koondandmetes (serveri või demo-stub'i logis) on tekst, saatmise aeg (ISO 8601) ja unikaalne teavituse ID, mida saab siduda vastuvõtukinnitusega (R3).

### R2: Automaatne GPS-asukoht

As a **kodanik**, I want **et minu asukoht lisatakse teavitusele automaatselt**, so that **dispetšer teab, kus oht on, ilma et ma peaksin aadressi käsitsi sisestama** (F-03).

Acceptance criteria:

- Enne „Saada“ kinnitust kuvatakse kasutajale automaatselt tuvastatud asukoht (laiuskraad/pikkuskraad või kaardil/mapiinisel kujul); kasutaja näeb seda samal ekraanil koos tekstiga.
- Kui asukoha õigus on antud ja GPS on saadaval, kaasatakse teavituse payload'is vähemalt laius- ja pikkuskraad (WGS84) täpsusega, mis on dokumenteeritud testis (nt ≥4 komakohta).
- Kui asukoht puudub (õigus keelatud, GPS timeout ≤10 s testkeskkonnas), saatmist ei lubata; kuvatakse selge juhis õiguse andmiseks või proovimiseks uuesti — **ei** saadeta teavitust ilma koordinaatideta MVP-s.
- Asukoha viga käsitsi parandamine (taksojuhi intervjuu) on **väljas**; avatud küsimus sprint 07 jaoks.

### R3: Vastuvõtukinnitus kodanikule

As a **kodanik**, I want **näha kohe pärast saatmist kinnitust, et teavitus on vastu võetud**, so that **ma ei kahtlusta, kas keegi minu sõnumi kätte sai** (F-04; intervjuu-taksojuht).

Acceptance criteria:

- Pärast edukat serveri vastust kuvatakse ekraanil staatiline kinnitus eesti keeles (nt „Teavitus on vastu võetud“), mis sisaldab teavituse ID-d või viidet, mida kasutaja saab vajadusel korduvalt vaadata samal sessioonil.
- Kinnitus ilmub alles pärast seda, kui backend/stub on teavituse salvestanud ja tagastanud HTTP 2xx (või dokumenteeritud demo-vastuse ekvivalent).
- Kui saatmine ebaõnnestub (võrk, serveri viga), kuvatakse selge veaolek; kasutaja **ei** näe edukat vastuvõtukinnitust (valepositiivne kinnitus on QA blokeerija).
- Kinnitus ei ava dispetšeri vestlust ega pidevat suhtluskanalit (F-05 väljas).

### R4: Operatiivvaate vastuvõtt (dispetšeri nähtavus)

As a **päästekeskuse dispetšer**, I want **näha uut tekstiteavitust koos asukohaga operatiivvaates**, so that **ma saan hakata triage'iga tegelema** (roadmap eesmärk: „112 operatiivvaade võttis vastu“).

Acceptance criteria:

- Sama teavitus, mis R1–R3 all edukalt saadeti, ilmub dispetšeri vaates (web demo või stub) **ühe minuti jooksul** pärast kodaniku edukat saatmist testkeskkonnas (Wi‑Fi, üks klient + üks vaade).
- Vaates on nähtav: teavituse ID, saatmise aeg, teksti sisu (täielik või esimesed 500 tähemärki + „…“ kui pikem), GPS-koordinaadid või kaardipin.
- Teavitus on olekus „uus / vastu võetud“ (täpne olekumaskin fikseeritakse `technical-plan.md`-s); MVP-s ei nõuta triage'i, suunamist ega prioriteeti.

### R5: Krüpteeritud edastus

As a **privaatsuse-haldur (DPO)**, I want **et teavituse andmed liiguks võrgu kaudu krüpteeritult**, so that **täidetakse NF-04 nõue** (TLS 1.2+).

Acceptance criteria:

- Kõik kliendi–serveri teavituse API-kutsed kasutavad HTTPS-i; testkeskkonnas dokumenteeritakse TLS versioon (≥1.2) või kasutatakse ainult HTTPS URL-e (ei HTTP fallback).
- QA kontrollnimekirjas on üks punkt: võrgu päringu URL algab `https://` ja sertifikaadi viga ei ole vaikimisi ignoreeritud tootmislikus konfiguratsioonis.

### R6: Edastuse kiirus (NF-02 kontekst)

As a **kodanik**, I want **et teavitus jõuab dispetšerini mõistliku aja jooksul**, so that **ma ei arva, et süsteem on katki** (NF-02: H1 ülempiir 60 s; dispetšer: ~30 s ebakindlus).

Acceptance criteria:

- Mõõdetud testkeskkonnas (üks klient, stabiilne Wi‑Fi) on aeg „Saada“ vajutusest kuni R3 kinnituse kuvamiseni **p95 ≤ 5 s**; tulemus dokumenteeritud `research/initial-audit.md` või PoC lisas.
- Sama teavitus on R4 järgi dispetšeri vaates nähtav **≤ 60 s** pärast saatmist (H1 NF-02 ülempiir; MVP eesmärk on tavaliselt palju kiirem).
- Kui vastus ületab 5 s, kuvatakse kasutajale laadimise/indikaatori olek; pärast 30 s ilma edukat kinnitust kuvatakse selge veateade ja võimalus proovida uuesti (ei jää vaikimisi „hangunud“ olekusse).

## Out of Scope

- Fotod ja pildivoo (F-02, NF-05) — sprint 02.
- Aeglase võrgu (2G) strateegia ja järjekord — sprint 03 (NF-03).
- Dispetšeri vastamine, lisaküsimused, pidev suhtlus (F-05) ja tagasiside vastuolu lahendus — sprint 04.
- AI klassifitseerimine, prioriteedi soovitus, asutuse suunamine (F-06 täielik automaatika, F-07) — sprint 05–06.
- GPS käsitsi parandamine ja asukoha vea täielik UX — sprint 07.
- Kaardivaate „kiire foto“ nupp — GitHub #1; seotud fotovood, mitte MVP tekst.
- Ööpäevaringse kättesaadavuse (NF-01) täielik SLO ja monitooring — ainult dokumenteeritud eeldus demo keskkonnas.
- Tõeline 112/Päästeameti tootmisintegratsioon — harjutusrepo kasutab stub'i või demo-backend'i (vt R4 HARD GATE all).

## Avatud küsimused

| Küsimus | Kellelt küsida | Tähtaeg |
| --- | --- | --- |
| Kas „operatiivvaade“ MVP-s on minimaalne web-stub, mock API või midagi muud? | Tooteomanik (Jarmo) | Enne R4 implementatsiooni (HARD GATE) |
| Kas kodanik peab olema sisse logitud (Smart-ID jms) või piisab anonüümsest demo-identiteedist? | Tooteomanik + DPO | Phase 0 adversarial review |
| Kas tekstiteavitusel on kohustuslik kategooria/maärksõna väli (dispetšer: inimesed kirjutavad ebaselgelt)? | Dispetšer + analüütik | Phase 1 scenarios.md |
| Milline minimaalne tekstipikkus on operatiivselt piisav (10 vs 20 tähemärki)? | Dispetšer | Phase 0 |
| Kas MVP katab ainult mobiili (iOS/Android) või ka veebi kodaniku vormi? | Tooteomanik | Phase 0 |
| Kas sprint 01 vajab eraldi GitHub Issue'i (praegu backlog #1 on foto-nupp)? | Tooteomanik | Phase 0 |

## Prototüüp (kodaniku UI)

Visuaalne referents valitud **v2** suunale (kaart + alumine leht + alusriba). Ei asenda käitumisspec'i.

| Viide | Sisu |
| --- | --- |
| [prototype/index.html](prototype/index.html) | Interaktiivne mock: OSM kaart, kirjelduse paneel, saatmine, R3 kinnitus |
| [prototype/README.md](prototype/README.md) | Ava juhised, R1–R3 kaardistus, spec-lüngad |
| [research/prototype-feedback.md](research/prototype-feedback.md) | UX-otsused ja review küsimused |

Prototüüp demonstreerib praegu **õnnelikku rada** (mock-tekst, GPS OK); erijuhtumid (GPS puudub, võrguviga) tulevad pärast `scenarios.md` täitmist.

## Viited AGENTS.md-sse

- **Mõtle enne koodi:** ära vali vaikimisi integratsiooni tüüpi (stub vs päris 112); küsi R4 HARD GATE.
- **Lihtsus:** minimaalne tekst + GPS + kinnitus + demo dispetšeri vaade; ära lisa fotot, AI-d ega prioriteeti.
- **Kirurgilised muutused:** sprint 01 on fond; hilisemad sprintid ehitavad sellele, ära laienda skoopi „väikese lisana“.
- **Sprint-töövoog:** arendus ainult harul `sprint-01-mvp-kiirteavitus`; kui plaanis on HARD GATE, peatu kuni operatiivvaate definitsioon on kinnitatud.
