# Sprint 02: Foto isikuandmete maskimine — Spec

## Eesmärk

Ohukaardi kodanik peab saama teavitusele lisada kuni kolm pilti (F-02), kuid pildid sisaldavad sageli isikuandmeid — nägusid ja autonumbreid — mida dispetšer ja asutused ei tohi töötlemata edasi jagada (NF-05, intervjuu-paastedispetser). See sprint fikseerib ja valmistab ette **vaikimisi automaatse maskimise** enne pildi serverisse saatmist, et kodanik saaks teavitust saata ilma privaatsushirmuta ja dispetšer saaks pilte operatiivselt kasutada. Lahendus peab olema kooskõlas H1 nõuetega ja roadmap'i sprintiga 02 (`F-02`, `NF-05`); tehnoloogia-alane soovitus on dokumenteeritud analüüsis [`docs/analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md`](../../analysis/2026-05-26-foto-maskeerimise-tehnoloogiad.md). Sprint sõltub MVP tekstiteavitusest (sprint 01), kuid võib arendada paralleelselt sprintiga 03, kui fotovoo ühendus 01-ga on selge.

## Põhimõtted

- **Vaikimisi kaitse:** Iga teavituse foto maskitakse automaatselt enne üleslaadimist; kasutaja ei pea maskimist ise meeles pidama.
- **Minimaalne andmeedastus:** Töötlemata biomeetriline või identifitseeriv pildimaterjal ei lahku seadmest enne kohustuslikku maskimist (välja arvatud selgesõnaline äriotsusega dokumenteeritud erandid).
- **Operatiivne väärtus vs privaatsus:** Näod maskitakse alati; autonumbri käsitlus võib erineda, kuid otsus peab olema spec'is fikseeritud, mitte arendaja vaikimisi.
- **Läbipaistvus kasutajale:** Kasutaja näeb enne saatmist, et pilt on maskitud, ja saab aru, miks (lühike selgitus, mitte juristikeel).
- **Kiirus on nõue:** Maskimine ei tohi viia teavituse vastuvõtukinnitust (F-04) ebamõistlikult kaua ootele; eesmärk on kinnitada saatmine koos maskimisega alla ~2 s tüüpilises seadmes (mõõdetav PoC-ga).

## Requirements (Nõuded)

### R1: Vaikimisi näo- ja autonumbri maskimine

As a **kodanik**, I want **fotodel näod ja autonumbrid automaatselt hägustatud**, so that **ma saan teavitust saata ilma teiste inimeste privaatsuse rikkumata**.

Acceptance criteria:

- Kui kasutaja lisab teavitusele foto, kus tuvastatakse vähemalt üks nägu (testandmestik: min 1 näoga portreefoto), siis enne üleslaadimist on kõik tuvastatud näod hägustatud/pikseldatud nii, et näo tuvastamine inimese poolt on praktiliselt võimatu (manuaalne QA kontrolllistis ≥3 näidispilti).
- Kui kasutaja lisab foto, kus tuvastatakse vähemalt üks sõiduki registreerimismärk (testandmestik: min 1 selge EÜ-stiilis numbrimärk), siis enne üleslaadimist on kõik tuvastatud numbrid hägustatud (sama QA kontroll).
- Serverisse salvestatud või edastatud fail ei sisalda töötlemata näo- ega numbriplaadi piirkondi, mida klient tuvastas (võrdlus: klienti eelvaade vs serverisse jõudnud pildi hash/pikslitsoon).
- Maskimine käivitub iga foto kohta eraldi; kuni 3 foto puhul on kõik maskitud enne teavituse lõplikku saatmist.

### R2: Fotode lisamine teavitusele

As a **kodanik**, I want **lisada teavitusele kuni kolm pilti**, so that **dispetšer saab olukorda visuaalselt hinnata**.

Acceptance criteria:

- Kasutaja saab teavituse vormis lisada 1–3 fotot; neljanda lisamise katse on blokeeritud ja kuvatakse selge teade (F-02).
- Iga lisatud foto läbib R1 maskimise enne, kui see liitub „saadetavate“ fotodega.
- Kasutaja saab enne saatmist eemaldada üksiku foto; eemaldatud foto ei jõua serverisse.
- Saadetud teavituse koondandmetes on fotode arv 1–3 ja iga foto on maskitud vastavalt R1-le.

### R3: Eelvaade ja kasutajateave enne saatmist

As a **kodanik**, I want **näha maskitud fotode eelvaadet ja lühikest privaatsusselgitust**, so that **ma usaldan, mida saadan, ja ei tühista teavitust hirmust**.

Acceptance criteria:

- Enne „Saada“ kinnitust kuvatakse iga lisatud foto maskitud eelvaade (mitte töötlemata originaal täisekraanil).
- Ekraanil on staatiline tekst (max 2 lauset), et näod ja numbrid maskitakse automaatselt privaatsuse kaitseks; tekst on eesti keeles ja ilma tehnilise žargoonita.
- Kui maskimine ebaõnnestub (nt tuvastus ei käivitu), kasutaja näeb selge olekut („pilti ei saa veel saata“ / sarnane) ja saatmist ei lubata enne, kui R1 on täidetud või kasutaja eemaldab probleemse foto.

### R4: Saatmise jõudlus ja vastuvõtukinnitus

As a **kodanik**, I want **saada kinnituse, et teavitus koos fotodega on vastu võetud mõistliku aja jooksul pärast maskimist**, so that **ma ei arva, et rakendus hangus** (F-04, NF-02 kontekst).

Acceptance criteria:

- Mõõdetud testkeskkonnas (PoC: vähemalt üks keskmise klassi Android ja üks iOS seade, 3×1080p testpilti) on aeg „Saada“ vajutusest kuni F-04 vastuvõtukinnituse kuvamiseni p95 ≤ 2 s, kui võrk on stabiilne (Wi‑Fi või 4G laboritingimustes; tulemus dokumenteeritud `research/initial-audit.md` või PoC raportis).
- Kui maskimine ühe foto puhul ületab 2 s üksiku seadme puhul, kuvatakse kasutajale progressiindikaator; saatmist ei peeta vaikimisi „katkenuks“ ilma selge veateadeta.
- Vastuvõtukinnitus (F-04) ilmub alles pärast seda, kui kõik valitud fotod on maskitud ja server on need vastu võtnud.

### R5: Autonumbri erandi ärireegel (HARD GATE)

As a **dispetšer**, I want **võimalust operatiivselt vajalikel juhtudel näha autonumbrit**, so that **saan näiteks hüljesõiduki omaniku otsimisel kasutada numbrit**, ilma et vaikimisi privaatsus kaoks.

Acceptance criteria:

- Spec dokumenteerib ühe selge ärireegli variandi (nt „alati maskitud“ vs „dispetšer saab taotleda demaskimist“ vs „kasutaja lülitab numbri nähtavaks enne saatmist“) koos põhjenduse ja DPO/dispetšeri kinnituse viitega `research/`-s.
- Kuni HARD GATE on lahendatud (`sprint-plan.md` Pre-Implementation Gate ≠ approved), ei implementeerita autonumbri erandi käitumist — ainult R1 vaike (numbrid maskitud).
- Pärast kinnitatud reeglit on acceptance criteria erandi jaoks eraldi testjuhtumid scenarios.md-s (täidetakse Phase 1-s).

## Out of Scope

- Tekstiteavituse MVP tuum (sprint 01) — eeldame olemasolevat saatmise voogu; ei ehita uut 112 integratsiooni nullist.
- Dispetšeri operatiivvaade, fotode vaatamine ja demaskimise UI serveris (sprint 04+).
- AI-põhine sündmuse klassifitseerimine, prioriteet ja asutuse suunamine (sprint 05–06).
- Pilvepõhine vaikimisi maskimine (Google Vision / Azure / AWS) tootmisvalikuna — võib olla PoC alternatiiv, kuid mitte sprinti MVP.
- Piltide säilitusperioodi, kustutamise ja auditlogi täielik õigusraamistik — ainult avatud küsimus; minimaalne tehniline logimine võib tulla technical-plan.md-s.
- Aeglase võrgu üleslaadimise strateegia (sprint 03).
- Kaardivaate „kiire foto“ nupu paigutus (GitHub #1) — võib olla sõltuv töövoost, kuid ei ole maskimise tuum.

## Avatud küsimused

| Küsimus | Kellelt küsida | Tähtaeg |
| --- | --- | --- |
| Kas autonumber jääb alati maskituks, või on erand (dispetšeri taotlus / kasutaja lüliti)? | Operatiivjuht + DPO | Enne R5 implementatsiooni (HARD GATE) |
| Kas maskimine peab olema reversiibel serveris või dispetšeri vaates? | DPO + dispetšer | Phase 0 adversarial review |
| Milline minimaalne tuvastustäpsus (väike nägu, osaline plaat, ööpilt) on aktsepteeritav? | Dispetšer + tooteomanik | Phase 0 → scenarios.md |
| Kas töötlemata originaal võib ajutiselt jääda seadme mällu pärast maskimist? | DPO | Phase 1 technical-plan |
| Konkreetne p50/p95 latentsus 3×1080p pildil vanematel seadmetel? | Arendus (PoC) | Phase 1 |
| Kas sprint 02 GitHub Issue luuakse eraldi või piisab seotud backlog #1-st? | Tooteomanik (Jarmo) | Phase 0 |

## Viited AGENTS.md-sse

- **Mõtle enne koodi:** autonumbri erand ja reversiibiliteet vajavad kinnitust; ära vali vaikimisi.
- **Lihtsus:** minimaalne on-device pipeline; ära lisa pilve ML-i ilma gate’ita.
- **Sprint-töövoog:** arendus ainult harul `sprint-02-foto-maskimine`; HARD GATE = peatu kuni R5 reegel on kinnitatud.
