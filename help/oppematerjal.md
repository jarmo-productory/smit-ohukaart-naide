# SMIT koolituse õppematerjal: päev II ehk AI PO, PM ja analüütiku töös

> See on koolituse **osalejatele mõeldud materjal** — sisaldab harjutuste lühikirjeldusi, copy-paste prompte ja viiteid. Kasuta koos kursusel toimuva juhendamisega.

## Ühine kontekst — sünteetiline juhtum "Ohukaart"

Stsenaarium: Eesti riik arendab uut kodaniku ohuteavituse mobiilirakendust **Ohukaart**.

Ohukaart peab:

-   vastu võtma kodaniku teateid (pilt, tekst, asukoht)
    
-   AI-toega esmase klassifikatsiooni ja triage'i tegema
    
-   suunama teate õigele asutusele (Päästeamet / PPA / KOV / Häirekeskus)
    
-   maskeerima fotodel isikuandmeid privaatsuse jaoks
    
-   andma kodanikule tagasisidet, et tema teade jõudis kohale
    

Sinu roll harjutustes on **analüütik / PO**, kes valmistab ette nõudeid, intent architecture'it ja spetsifikatsioone, et arendustiim (AI-agendid + inimkolleegid) saaks Ohukaarti ehitada.

## Repo struktuur (kus mis asub)

```plaintext
smit-ohukaart-naide/
├── README.md                       # Tellija brief
├── AGENTS.md                       # Peaaegu tühi — H2-s ehitame koos
├── docs/
│   ├── background-research/        # Intervjuud + legacy + H1 väljund
│   ├── roadmap.md                  # H2-s täidame
│   └── sprints/                    # H3, H4 sprintide kohad
│       ├── README.md               # Sprint-konventsioon
│       └── _template/              # Sprint-paketi mall
├── help/
│   ├── oppematerjal.md             # SEE FAIL
│   ├── speckit/                    # Speckit ülevaade + Lite alternatiiv
│   └── agents-examples/            # AGENTS.md / CLAUDE.md näited
```

* * *

# 1\. Copilot eeltöös: põhinõuete ekstraktimine

## Eesmärk

Õpid kasutama Copilotit nõuete eeltööks (mitte ainult kokkuvõtete tegemiseks):

1.  Struktureerid mustadest sisenditest käivitatavad nõuded (tabel-formaat, mitte vabavorm)
    
2.  Tuvastad **stakeholderite vastuolud** (sama teema, erinevad vaated)
    
3.  Tuvastad **lüngad** (mis sisendites pole, aga peaks olema)
    

## Sisendid

Kõik failid asuvad: `docs/background-research/`

| # | Fail | Sisu |
| --- | --- | --- |
| 1 | `intervjuu-paastedispetser.md` | Dispetšeri intervjuu (operaatori vaade). Sisaldab müra ja lünki. |
| 2 | `intervjuu-taksojuht.md` | Kodaniku-kasutaja intervjuu. Sisaldab vastuolusid dispetšeri vaatega. |
| 3 | `legacy-112-lisanouded-2019.docx` | Vananenud nõuete dokument (osaliselt aegunud). |

**H1 väljund:** commitu oma struktureeritud nõuete pakett samasse kataloogi failina `docs/background-research/h1-noeded.md`. See on H2 sisend.

## Näidisprompt

> Microsoft 365 Copilot Chat'is:

```plaintext
ROLL: Sa oled vanem-analüütik, kes valmistab ette uue avaliku sektori
toote "Ohukaart" (kodaniku ohuteavituse mobiilirakendus) nõuete
struktureerimist arendustiimi jaoks.

KONTEKST: Saad sisendiks 3 allikat:
1. Päästekeskuse dispetšeri intervjuu (operaatori vaade)
2. Taksojuhi intervjuu (lõppkasutaja vaade)
3. Vananenud 112-äpi lisanõuete Word-dokument (2019)

ÜLESANNE: Loo neist allikatest struktureeritud nõuete pakett, mis
koosneb 4 osast:

1) FUNKTSIONAALSED NÕUDED — mida toode peab tegema
   - Iga nõude juurde märgi allikas: Dispetšer / Kasutaja / Legacy-2019
   - Iga nõude juurde märgi prioriteet: Kriitiline / Oluline / Nice-to-have
   - Kui sama nõue tuleb mitmest allikast, märgi kõik
   - Vorm: tabel veergudega [ID | Nõue | Allikas | Prioriteet | Märkused]

2) MITTEFUNKTSIONAALSED NÕUDED — kuidas toode peab käituma
   - Jõudlus, turvalisus, privaatsus, ligipääsetavus, kasutatavus
   - Sama tabelivorm ja sama märgistus

3) STAKEHOLDERITE VASTUOLUD — kus operaator ja kasutaja räägivad
   sama teema erinevalt
   - Vorm: tabel veergudega
     [Teema | Dispetšer ütleb | Kasutaja ütleb | Soovitatud lahendus]

4) TUVASTATUD LÜNGAD — mis on toote ehitamiseks vajalik, aga sisendites
   puudub või on ebamäärane
   - Vorm: tabel veergudega
     [Teema | Miks oluline | Kellelt küsida | Kuidas avastasin]

REEGLID:
- Tugine AINULT sisendite tekstile. Ära oleta, ära lisa "tavaliselt
  selliste süsteemide puhul..." üldistusi.
- Kui kahest allikast tuleb vastuoluline info, ÄRA vali ühte poolt —
  pane vastuolusse (osa 3).
- Kui sa pole milleski kindel, lisa lüngana (osa 4), mitte ära oleta.
- Iga nõude juurde lisa lühike tsitaat allikast (1–2 lauset).

VÄLJUND: Struktureeritud Markdown 4 tabeliga. Mitte mingit
sissejuhatust ega lõpetussõnu — alustad otse esimese tabeliga.
```

Kuidas sellest teha korduvkasutatav prompt või oskus Copiloti sees? Õpime looma ja kasutama "agente"

## Viited

-   [Microsoft 365 Copilot — file analysis](https://learn.microsoft.com/en-us/copilot/microsoft-365/copilot-faq)
    
-   [Copilot Studio — Build your first agent](https://learn.microsoft.com/en-us/microsoft-copilot-studio/fundamentals-what-is-copilot-studio)
    
-   [Anthropic — Prompt engineering guide](https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview)
    

* * *

# 2\. Cursor + intent architecture: AGENTS.md + roadmap + backlog

## 2.1. AGENTS.md osa 1 — Projekti ülevaade

Osa 1 on AGENTS.md **päis**: projekti nimi, ühe-lauseline kirjeldus ja viited background-materjalidele. Agendil peab kohe faili avades olema selge, kus ta on ja kuhu lisainfo vaatama minna. Sektsioonid 1–4 märgitakse `<!-- TODO: <roll> -->` — need täidab tehniline tiim hiljem.

### Mall

```markdown
# AGENTS.md — Ohukaart

> Ohukaart on Eesti kodaniku ohuteavituse mobiilirakendus.
> Kodaniku teavitus → kahetasemeline triage (AI + dispetšeri kinnitus) → asutuse-spetsiifiline tegutsemine.

## Viited
- Tellija brief: `README.md`
- Taustauuringud: `docs/background-research/`
- Roadmap: `docs/roadmap.md`
- Sprint-konventsioon: `docs/sprints/README.md`
- Sprint-paketi mall: `docs/sprints/_template/`

## 1. Arendusreeglid <!-- TODO: lead-arendaja -->
## 2. Tech stack <!-- TODO: arhitekt -->
## 3. CI/CD <!-- TODO: devops -->
## 4. Projekti struktuur <!-- TODO: arhitekt -->

## 5. AI agendi käitumine
(vt allpool — sektsioon 5)
```

* * *

## 2.2. AGENTS.md osa 2 — AI agendi käitumine

Osa 2 on AGENTS.md **sektsioon 5**: käitumuslikud reeglid AI-agendile. Need ei kirjelda toodet ega äriloogikat — need ütlevad agendile **kuidas mõelda ja käituda** igas olukorras. Hea sektsioon 5 on alla 50 rea, terav ja negatiivsetele reeglitele kaldu ("ÄRA eelda" töötab paremini kui "Ole täpne").

Eeskuju: `help/agents-examples/karpathy-inspired-CLAUDE.md` — 4 reeglit, alla 60 rea.

### Mall

```markdown
## 5. AI agendi käitumine

### Mõtle enne koodi kirjutamist
- Ütle eeldused välja sõnaselgelt. Kui pole kindel — küsi mult juurde (askusertool).
- On sul mitu tõlgendust? Esita need, ära vali vaikimisi, vaid küsi mult kinnitust.
- Kas sul on lihtsam lahendus olemas? Ütle seda. Vajadusel vaidle minuga.

### Lihtsus on prioriteet
- Minimaalne kood, mis lahendab probleemi. Ei midagi spekulatiivset.
- Ei tekita lisafunktsioone peale küsitu. Ei tekita abstraktsioone ühe-kordse koodi jaoks.
- 200 rida, mis mahub 50-sse? Kirjuta ümber.

### Kirurgilised muutused
- Puuduta ainult seda osa koodist, mida pead.
- Ära "paranda" kõrvalset koodi — isegi kui see on halb.
- Ühita olemasoleva stiiliga, isegi kui teeksid teisiti. Kui olemasolev muster läheb väga lahku sinu visioonist, siis ütle seda välja ja küsi minult juhendamist.

### Sprint-töövoog
- ESIMENE samm igas arenduses: `git checkout -b sprint-XX-<nimi>`
- EI tohi koodi muuta `main`-harul
- Kui sprindi plaanis on HARD GATE = peatu, küsi kinnitust, ära liigu edasi ilma vastuseta
```

**NB!** Kogu AGENTS.md maht peaks jääma 80–150 rea vahele. Kui läheb üle, lühenda ja delegeeri skillidesse.

## 2.3. Roadmap'i loomine

Iga sprint = demoeeldav tükike. Igal sprintil on selge **kasutaja-väljund** (mitte sisemine tehniline samm).

**Eeldus:** sinu H1 väljund on commit'itud `docs/background-research/h1-noeded.md` failina.

### Näidisprompt — roadmap.md genereerimine Cursoris

```plaintext
KONTEKST: Repo sisaldab kõik background-materjalid:
- docs/background-research/intervjuu-paastedispetser.md
- docs/background-research/intervjuu-taksojuht.md
- docs/background-research/legacy-112-lisanouded-2019.docx
- docs/background-research/h1-noeded.md  (H1 etapis ekstraktitud nõuded)
- AGENTS.md (projekti konstitutsioon, sh sektsioon "AI agendi käitumine")

ÜLESANNE: Koosta või täienda `docs/roadmap.md` faili, mis jagab Ohukaart
toote arenduse demoeeldavateks SPRINTideks. Iga sprint saab omaette
kataloogi `docs/sprints/sprint-XX-<lyhinimi>/`, kus on spec.md,
scenarios.md, technical-plan.md, tasks.md, sprint-plan.md.

REEGLID:
- Iga sprint = 1-3 nädalat (meeskond 2-3 inimest + AI-agendid)
- Iga sprint omab selget KASUTAJA-väljundit (mitte tehnilist sammu nagu
  "andmebaasi seadistamine")
- Esimene sprint = MVP, mis tarnib äriliselt minimaalse aga töötava
  väärtuse (vähemalt üks H1 KRIITILINE nõue saab kaetud)
- Vastuolulised nõuded (H1 osa 3) EI lähe esimesse sprinti — kavanda
  eraldi "design-otsus" sammuna järgneva sprindi spec'i juurde
- Märgi sprintide vahelised sõltuvused (mis paralleelsed, mis järjestikused)
- Iga sprint peab viitama vähemalt ühele H1 nõude ID-le (F-01, NF-03, ...)

VORM: Tabel `docs/roadmap.md` failis veergudega:
[Sprint# | Pealkiri | Eesmärk (1 lause) | H1 nõuded | Sõltuvused | Maht]

ALUSTA: 6-8 esimese sprindiga.
```

## 2.4. Idee lennult backlogi

**Argipäeva-mall:** koosolekul, intervjuus või kasutaja-feedback'is märkab keegi väärtusliku mõtte. Klassikaline lahendus: kirjutab Wordi/Notion'isse "TODO" ja unustab. **Agentse arenduse argipäev:** üks lause Cursorisse → `gh issue create` → idee on backlogis, ei kao.

**Loogiline järjekord:** Issue'd EELNEVAD sprindi-loomisele. Sprint-planeerimine on hetk, mil **valime backlogist Issue'd**, mis järgmisesse sprinti lähevad.

Kaks erinevat töövoogu, mida segada ei tohi:

| Voog | Sagedus | Vorm |
| --- | --- | --- |
| **Backlogi täiendamine** | igapäevane, mitu korda | üks Issue, label `backlog` + `triage-vajab` |
| **Sprindi planeerimine** | iga 2-4 nädalat | valik Issue'd backlogist, sprint-pakett `docs/sprints/sprint-XX-X/` loodud |

**Eeldus:** `gh` (GitHub CLI) on installitud + autenditud. Kontroll: `gh auth status`.

### Näidisprompt — kiire Issue Cursori chat'ist

```plaintext
ÜLESANNE: Loo backlogi GitHub Issue selle vabavormis mõtte põhjal:

"<kopeeri siia stakeholderi tsitaat või enda märkus>"

Tegevus:
1. Tõlgi vabavormis mõte ühe Issue'i pealkirjaks (max 70 tähemärki),
   mis on äriliselt selge (mitte tehniliselt) ja algab tegusõnast
   ("Lisa", "Toeta", "Võimalda", ...).
2. Koosta Issue body Markdownis:
   - ## Kontekst (kust see mõte tuli — 1-2 lauset, sh kuupäev ja
     kes ütles, kui teada)
   - ## Eeldatav stakeholder-väärtus (1 lause)
   - ## Avatud küsimused (2-3 punkti, mida me ei tea)
   - ## Sõltuvus (kas vajab eelnevalt mõnda teist feature'it?)
3. Lisa label'id: `backlog`, `triage-vajab` (näitab, et see pole veel
   valideeritud — ootab sprindi-planeerimise otsust).
4. ÄRA pane milestone'i — milestone määratakse alles siis, kui Issue
   liigub mõnda sprinti.
5. Käivita `gh issue create ...` käsk terminalist.
6. Prinda Issue URL ja kinnitus "lisatud backlogi".

ÄRA puuduta spec'e ega roadmap'i — see on backlogi-täiendus, mitte
sprindi-muudatus.
```

## Viited

-   [AGENTS.md spec](https://agents.md/) — Karpathy ja kogukonna defineeritud standard
    
-   [Cursor Rules — official docs](https://docs.cursor.com/context/rules-for-ai)
    
-   [Anthropic — Claude Code memory & CLAUDE.md](https://docs.claude.com/en/docs/claude-code/memory)
    
-   `help/agents-examples/` repos — konkreetsed AGENTS.md / CLAUDE.md näited
    
-   [GitHub CLI](https://cli.github.com/) — `gh issue create` ja muud käsud
    

* * *

# 3\. Sprindi ettevalmistus

## 3.1. Analüüs enne spec'i: tehnoloogia ja koodibaasi audit

### Millal vajab analüüsi enne spec'i?

| Olukord | Analüüs vajalik? | Põhjus |
| --- | --- | --- |
| Tuntud lahendus, palju näiteid (nt "kasutaja-loend") | Ei | Otse spec — analüüs ei lisa väärtust |
| Ebakindel tehnoloogia-valik (nt "milline vektor-andmebaas?") | **Jah** | Tehnoloogia-võrdlus, 3-6 varianti |
| Olemasoleva koodibaasi muutmine, mida me ei tunne | **Jah** | Koodibaasi audit — kus on praegu mis? |
| GDPR / regulatsiooni mõju, mida me veel ei tea | **Jah** | Õigus-analüüs |
| H1 "Lüngad" tabelist konkreetne küsimus | **Tihti** | Lünk = analüüsi-vajadus |
| Sprint pidi olema 2 nädalat, aga arendaja ütleb "tehniliselt ei tea" | **Jah** | Sprint blokeeritud, kuni analüüs valmis |

**Praktiline reegel:** kui spec.md kirjutamisel hakkad kirjutama "TBD" või "vaja uurida" rohkem kui 3 korral, **peatu** ja tee analüüs eraldi failina.

### Tegevus

1.  Loo kataloog `docs/analysis/` (esimene kord — pärast saab kaust juba olemas)
    
2.  Loo täna kuupäevaga fail: `docs/analysis/<YYYY-MM-DD>-<teema>.md`
    
3.  Käivita Cursoris allpool olev prompt — Cursor uurib veebis, võrdleb variante, sünteesib struktureeritud analüüsi-faili
    
4.  Faili lõpus on **konkreetne soovitus** + **lahtised küsimused tabel**, mille saab edaspidi sprindi spec.md-le viidata
    

### Näidisprompt — Cursori deep research prompt

```plaintext
KONTEKST: Olen analüütik, kes valmistab ette uut avaliku sektori
toodet "Ohukaart" (kodaniku ohuteavituse mobiilirakendus). H1
nõuetes on KRIITILISE prioriteediga "Süsteem maskib fotodel näod
ja autonumbrid vaikimisi" (F-03). H1 jättis paljud küsimused
lahtisteks — vt `docs/background-research/h1-noeded.md` "Tuvastatud
lüngad" tabelit.

ÜLESANNE: Loo analüüsi-fail
`docs/analysis/<YYYY-MM-DD>-foto-maskerimise-tehnoloogiad.md`,
mis vastab küsimusele "Milline foto-maskerimise tehnoloogia sobib
Ohukaart kontekstis?"

KASUTA: web search'i (kui sul on see võime — Cursor Pro / Claude Code).
Otsi 2026 seisuga aktuaalseid lahendusi. Märgi iga väite juurde allikas.

STRUKTUUR (kasuta täpselt seda):

# Foto-maskerimise tehnoloogia valik Ohukaart äpile

**Date:** <YYYY-MM-DD>
**Context:** Ohukaart sprint XX (foto isikuandmete maskimise pipeline)
**Problem:** Vali tehnoloogia, mis (a) maskib näod ja autonumbrid
vaikimisi, (b) sobib Eesti GDPR-konteksti, (c) saavutab vastuvõetava
jõudluse (eesmärk: < 2s ack koos maskimisega)

## Executive Summary
(2-4 lauset: mida leidsime, mida soovitame, mis on järgmised sammud)

## Variandid

| Variant | Tüüp | Andmete asukoht | Jõudlus (ligi) | Hind | GDPR-mõju |
| --- | --- | --- | --- | --- | --- |
| Google Cloud Vision API | Cloud API | EU regioonid valitavad | ~500 ms | Per request | DPA + andmete-asukoht |
| Azure Face API | Cloud API | EU regioonid | ~500 ms | Per request | DPA + andmete-asukoht |
| AWS Rekognition | Cloud API | EU / USA | ~500 ms | Per request | DPA + andmete-asukoht |
| OpenCV + Haar Cascades (lokaalne) | On-device | Local | < 100 ms | Tasuta | Pole väljaspool seadet |
| MediaPipe Face Mesh | On-device | Local | < 50 ms | Tasuta | Pole väljaspool seadet |
| Lokaalne ML mudel (nt YOLOv8 fine-tuned) | On-device | Local | varieerub | Tasuta | Pole väljaspool seadet |

## Eesti kontekst — andmete asukoht ja GDPR
(2-3 lauset: kas pildi-andmete saatmine cloud-i välismaale on
seaduslik / soovitatav avaliku sektori jaoks?)

## Jõudlus — vastuvõetav < 2s ack-i kontekstis
(1 lõik: milline pildi-suurus? batch vs sünkroon? võrgu-latentsus?)

## Erisus: autonumbrid (H1 vastuolu)
(1-2 lauset: kuidas tehnoloogia-valik mõjutab autonumbrite
käsitsemist?)

## Soovitus

**Variant: <konkreetne valik>**

Põhjendus (3-5 punkti):
- ...

**Alternatiivne plaan:** kui peamine variant ei tööta, siis ...

## Lahtised küsimused (sprintide jaoks)

| Küsimus | Kellelt küsida | Sprintile |
| --- | --- | --- |
| Kas Eesti riigi andmete-asukoha juhend lubab AWS Iiri? | Andmekaitsespetsialist | sprint-02 |
| Kas autonumber-maskimine peab olema reversiibel? | Operatiivjuht + andmekaitse | sprint-02 |

## Evidence trail
(lingid, dokumendid, koodi-failid mida vaatasin)

REEGEL: Tugine konkreetsetele allikatele, mitte üldistustele. Iga
"fakt" peab olema lingitav. Kui sa pole kindel, märgi "Lahtine
küsimus" osasse, ÄRA OLETA.

VÄLJUND: Üks Markdown-fail. Mitte mingit "Loon faili..."
sissejuhatust — otse esimene pealkiri.
```

**Küsimus:** Kuidas sellest luua korduvkasutatav prompt ehk skill?

### Kuidas analüüs hilisemates sprintides kasutusele tuleb

H3-s sprindi spec.md-d luues lingitakse analüüsi-failile:

```markdown
## Põhimõtted (spec.md)
(...)
**Tehnoloogia valik:** Vt analüüs
`docs/analysis/<kuupäev>-foto-maskerimise-tehnoloogiad.md`.
Selle põhjal kasutame OpenCV + MediaPipe Face Mesh lokaalset
varianti.

## Avatud küsimused (spec.md)
- Andmete-asukoha küsimus (vt analyysi "Lahtised küsimused" tabelit)
  — kellelt küsida: andmekaitsespetsialist
```

Analüüsi-fail elab repos **igaveseks** — uus sprint, mis sama teemat puudutab, viitab samale analüüsile, mitte kordab uurimist.

### Viited

-   `ritemark-native/docs/development/analysis/` — Productory enda toote analüüsi-näited
    
-   AGENTS.md sektsioon "AI agendi käitumine" — kus mainitakse, et lahtised vastuolud lahendatakse spec'i juures
    
-   [Cursor docs — web search](https://docs.cursor.com/) — kuidas Cursoris veebi-otsingu kasutada
    

* * *

## 3.2. Sprindi dokumentatsioon

### Raam — kaks dimensiooni samas paketis

Sprindi ettevalmistus on **kaks paralleelset töövoogu**, mis kohtuvad sprint-paketis:

| Dimensioon | Vastab küsimusele | Sprint-paketi fail |
| --- | --- | --- |
| **MIDA teeme?** | Mis on nõuded ja käitumine | `spec.md`, `scenarios.md` |
| **KUIDAS teeme?** | Mis on sprindi protsess | `sprint-plan.md` |

Klassikaline viga: kõik kirjutatakse Wordi (kontrollimatu segu) ja arendaja saab "spec'i", mis on osaliselt nõuded ja osaliselt protsess. Agentse arenduse muster eristab need **kaheks failiks**, mis vastutavad eri asjade eest.

### Mida teeme — spec.md sisu (Speckit-stiilis)

GitHub Speckit muster, kus iga feature spec sisaldab:

1.  **Probleem** — mida lahendame, kellele, miks praegu
    
2.  **Lahenduse kontuur** — kõrgtasemeline disain (mitte implementatsioon)
    
3.  **Käitumislepingud** — Gherkin-stiilis stsenaariumid (Given/When/Then)
    
4.  **API kontuur** — kui asjakohane (endpoint'id, payload'id)
    
5.  **Mittefunktsionaalsed nõuded** — jõudlus, turvalisus, ligipääsetavus
    
6.  **Tundmatud küsimused** — mis on lahtine
    

Erinevus klassikalisest spec'ist: **iga punkt on katsetatav**. AI-agent saab Gherkin-stiilis stsenaariumitest otse testid genereerida; API kontuurist mock'i; käitumislepingutest acceptance criteria'd.

### Kuidas teeme — sprint-plan.md sisu

`spec.md` ütleb arendajale "mis valmis peab tulema". `sprint-plan.md` ütleb meeskonnale **kuidas selle juurde jõutakse**.

### Sprint-plan.md komponendid

1.  **Release-seos** — mis release-ga see sprint seotud on?
    
2.  **Sammud / faasid** — sprindi etapid (vt allpool kaks track'i)
    
3.  **Gates** — kus on **kontrollipunkt**, mis ei lase järgmisse faasi minna ilma kinnituseta (nt "ei tohi koodi muuta ilma sprint-haru loomata")
    
4.  **Dokumentide uuendused** — millised failid muutuvad sprindi lõpus (CHANGELOG, release-notes, AGENTS.md viidete uuendamine)
    
5.  **Status** — kus me praegu oleme (Track, Current Phase, Branch)
    

Lisavõimalus: Sprindi suurus — kaks track'i

| Mõõdupuu | Lightweight track | Full 6-phase track |
| --- | --- | --- |
| Maht | < 200 LOC | \> 200 LOC, mitmes domeenis |
| Tüüp | Bug fix, väike refactor | Net-new feature |
| Dokumendid | Ainult `sprint-plan.md` | `sprint-plan.md` + `research/` + `notes/` + `spec.md` + `scenarios.md` |
| Faasid | Plan → Branch → Dev+Test+Cleanup → Commit | Research → Plan → Develop → Test → Cleanup → Deploy |
| Gates | 1 (sprint-haru loomine) | 3+ (sprint-haru, QA-validator pärast Phase 4 ja Phase 6) |

#### 6-faasiline workflow sprindi sees (nö Full track)

| # | Faas | Mida tehakse | Gate |
| --- | --- | --- | --- |
| 1 | **RESEARCH** | Loe olemasolevat dokumentatsiooni, koodi. Salvesta leiud `research/`\-i. | Auto |
| 2 | **PLAN** | Kirjuta `sprint-plan.md` (checklist + success criteria) | **HARD GATE** — tellija/PO kinnitus |
| 3 | **DEVELOP** | **ESIMENE samm:** `git checkout -b sprint-XX-<nimi>`. Alles siis koodi muutmine. | **HARD GATE** — ei tohi `main` peal koodi muuta |
| 4 | **TEST & VALIDATE** | Kontrolli kõik checklist'i punktid, dev + prod build, manual smoke | **HARD GATE** — `qa-validator` peab läbima |
| 5 | **CLEANUP** | Eemalda debug, uuenda docs, lõpp-review | Auto |
| 6 | **DEPLOY** | Push, tag, release | **HARD GATE** — `qa-validator` prod-build'i peal |

**HARD GATES** ei ole soovitused — need on kohad, kus AI-agent peab tegevuse **PEATAMA ja paluma kinnitust**. Sellega säilitab analüütik/PO kontrolli AI-juhitud protsessis.

### Arutelu: Kuhu peaks sprindid talletuma?

| Vaade | Sobib kellele | Allikas |
| --- | --- | --- |
| `docs/sprints/` kataloog (Git) | Arendajatele, AI-agendile | Ainus tõeallikas |
| GitHub Issues + label'id | Analüütikule, PO-le, stakeholderile | Reaalajas |
| GitHub Milestones | PM-le, juhtkonnale | Sprint-tasemel agregaat |
| GitHub Projects (Kanban) | Kogu meeskonnale, Scrum-üritusteks | Visuaalne |
| `docs/CHANGELOG.md` | Avalik (kasutajad) | Pärast sprindi lõppu |

### Lisavõimalus: Speckit on valikuline — kaks teed

Sõltumata sellest, kas kasutad päris Speckit'i või Lite mustrit, sprint-paketi alusfailid (`spec.md` + `sprint-plan.md`) jäävad **samaks**.

#### Variant 1 (vaikimisi): Speckit Lite

Sama 5-sammuline voog (Spec → Clarify → Plan → Tasks → Implement), **ilma installita**. Kogu reeglistik elab:

-   **Variant A:** `AGENTS.md` sektsioonis `## Sprint workflow (Speckit-lite)` — kõik AI-tööriistad näevad
    
-   **Variant B:** `.claude/skills/sprint-planning/SKILL.md` — Claude Code spetsiifiline, triggerub automaatselt
    

Vt täielik juhend: `help/speckit/lite-alternative.md`

#### Variant 2: päris Speckit

Eeldused: Python 3.11+, `uv`, `git`, toetatud AI-agent.

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v0.8.13
cd smit-ohukaart-naide
specify init . --integration cursor   # või claude-code, copilot, jne
```

Vt täielik juhend ja 7 slash-käsu kirjeldus: `help/speckit/README.md`

| Speckit käsk | Mida teeb | Speckit Lite vaste |
| --- | --- | --- |
| `/speckit.constitution` | Projekti printsiibid | **AGENTS.md** (sama eesmärk) |
| `/speckit.specify` | Nõuded (MIDA) | Käsitsi `spec.md` malli järgi |
| `/speckit.clarify` | Lüngad ja küsimused | Käsitsi review + `clarifications.md` |
| `/speckit.plan` | Tehniline plaan (KUIDAS koodi) | Käsitsi `technical-plan.md` |
| `/speckit.tasks` | Tasks checklist | Käsitsi `tasks.md` |
| `/speckit.analyze` | Konsistentsi-kontroll | Käsitsi review |
| `/speckit.implement` | Käivitab kõik tasks | Käsitsi commit-haaval |

### Sprint-paketi struktuur

```plaintext
docs/sprints/sprint-XX-<luhinimi>/
├── sprint-plan.md       # Eesmärk, scope, success criteria, faasid (Phase 0..N)
├── spec.md              # Nõuete kontuur (R1, R2, ...)
├── scenarios.md         # Gherkin-stiilis käitumislepingud
├── technical-plan.md    # Arhitektuuri kontuur (täidab arhitekt)
├── tasks.md             # Implementeerimise kontrollnimekiri
├── prototype/           # H4 prototüüp staatilise HTML-na
└── research/            # Adversarial review, audit, taustaviited
```

Mall: `docs/sprints/_template/` — kopeeri see uue sprindi alustamiseks.

### Näidisprompt — sprint-paketi alusfailidide loomine

Loob **mõlemad** alusfailid (spec.md + sprint-plan.md) korraga.

```plaintext
KONTEKST: Olen H2 etapis loonud roadmap'i. Valisin sprindi: <kopeeri
sprint-rida roadmap.md-st, nt "Sprint 02: Foto isikuandmete maskimise
pipeline">. AGENTS.md sisaldab projekti konstitutsiooni (sektsioon 5).
Sprint-paketi mall on `docs/sprints/_template/`.

ÜLESANNE: Loo uus sprint-pakett `docs/sprints/sprint-02-foto-maskimine/`
ja täida selles KAKS alusfaili:

==========================================
FAIL 1: spec.md  (MIDA teeme — käivitatav spetsifikatsioon)
==========================================

Vali üks variant:

VARIANT 1 (vaikimisi — Speckit Lite): järgi mustrit failist
`help/speckit/lite-alternative.md`. Loo fail käsitsi malli
`docs/sprints/_template/spec.md` põhjal.

VARIANT 2 (valikuline — päris Speckit): kui sul on `specify-cli`
installitud ja `specify init` juba läbi viidud, kasuta käsku
`/speckit.specify` ja anna talle ülevalpool olev sprindi kontekst
sisendiks. Salvesta väljund failina
`docs/sprints/sprint-02-foto-maskimine/spec.md`.

Mõlemad variandid annavad sama lõpptulemuse — alusfaili sama
struktuuriga:

# Sprint 02: Foto isikuandmete maskimine — Spec

## Eesmärk
3-5 lauset (mida lahendame, kellele, miks praegu).

## Põhimõtted
3-5 ärilist printsiipi.

## Requirements (Nõuded)
### R1: <Pealkiri>
As a <stakeholder>, I want <võime>, so that <väärtus>.
Acceptance criteria:
- konkreetne, testitav punkt
- konkreetne, testitav punkt

### R2: ...

## Out of Scope
Mida selles sprintis EI tee.

## Avatud küsimused
Mis vajab selgitamist, kellelt küsida.

==========================================
FAIL 2: sprint-plan.md  (KUIDAS teeme — sprindi protsess)
==========================================

Loo fail `docs/sprints/sprint-02-foto-maskimine/sprint-plan.md` malli
`docs/sprints/_template/sprint-plan.md` põhjal. MIINIMUM sisu:

# Sprint 02: Foto isikuandmete maskimine

## Agent Runtime Instructions
(Kopeeri mallist — read 1-7, mis ütlevad AI-agendile mis järjekorras
faile lugeda enne koodi muutmist.)

## Goal
<1-2 lauset sprindi eesmärgist>

## Linked Issues
- (lisa H2 etapis loodud GitHub Issue link, kui olemas)

## MVP Scope
### Workstream 1: <Nimi>
- punkt 1

## Out of Scope
- (mis sprintis EI tee)

## Success Criteria
- [ ] R1 acceptance criteria läbib
- [ ] R2 acceptance criteria läbib
- [ ] docs/CHANGELOG.md uuendatud

## Proposed Delivery Path
### Phase 0: Audit and plan
- [ ] Loo sprint-haru: git checkout -b sprint-02-foto-maskimine
- [ ] Initial audit -> research/initial-audit.md
- [ ] Adversarial review -> research/adversarial-review.md

### Phase 1: <Implementatsioon>
- [ ] <task R1-st>

### Phase N: QA ja closeout
- [ ] Käivita fokuseeritud testid
- [ ] Uuenda CHANGELOG ja release notes
- [ ] Sulge GitHub Issue

## Risks
| Risk | Mitigation |
| --- | --- |
| <risk 1> | <maandus> |

## Status
**Track:** Full 6-phase  (või "Lightweight" kui < 200 LOC)
**Current phase:** Phase 0 — Planning
**Branch:** sprint-02-foto-maskimine  (luuakse Phase 3 algul)

==========================================
REEGLID
==========================================

- Iga acceptance criteria peab olema kohe testitav.
- spec.md sisaldab AINULT "mida". sprint-plan.md sisaldab AINULT
  "kuidas". Ära sega.
- ÄRA loo veel scenarios.md, technical-plan.md, tasks.md — need
  täidetakse sprindi käigus (Phase 1+).
- VÄLJUND: kaks Markdown-faili õigesse sprint-kataloogi.
```

Arutelu: Kuidas me sellest loome skilli?

### Viited

-   [GitHub Spec-Kit](https://github.com/github/spec-kit)
    
-   `help/speckit/README.md` — päris Speckit ülevaade
    
-   `help/speckit/lite-alternative.md` — Speckit Lite muster
    
-   `docs/sprints/README.md` — sprint-paketi konventsioon
    
-   [Cucumber / Gherkin süntaks](https://cucumber.io/docs/gherkin/reference/)
    

* * *

# 4\. Prototüüpimine spec'i põhjal (Cursori staatiline HTML)

## Eesmärk

Eesmärk on täiendada sprindi materjale ka visuaalse prototüübiga.

## Prototüübi koht

Klassikaline probleem: prototüüp tehakse eraldi (Figma, v0.dev, Lovable), näidatakse stakeholderitele, unustatakse. Spec ja prototüüp lähevad ajas lahku.

Agentse arenduse loogika: **prototüüp on sprindi paketi failirühm** `prototype/` **kataloogis.** See kuvab spec'i visuaalselt, annab arendajale referentsi. Sellepärast meie kontekstis: ei kasuta Lovable, ega v0.dev — Cursori staatiline HTML otse sprint-kataloogi. Lihtne, versioneeritav, AI-loetav.

## Näidisprompt — Ohukaardi HTML prototüüp

```plaintext
KONTEKST: Olen sprindi kataloogis `docs/sprints/sprint-XX-<nimi>/`.
Spec on `spec.md`, käitumislepingud `scenarios.md`. Projekti
disainipõhimõtted on AGENTS.md sektsioonis 5.

ÜLESANNE: Loo 2-3 variatsiooni põhiliidese prototüübist staatilise
JS/HTML/CSS-na. Eelista Tailwind stiile (https://cdn.tailwindcss.com). 

DEMONSTREERI: scenarios.md PEAMINE õnnelik rada (S1 või esimene
"Given/When/Then" stsenaarium). Erijuhte ei pea katta.

VARIATSIOONID — tee 2-3 disaini-LÄHTEKOHTA, mis erinevad ÄRILISES
loogikas, mitte ainult värvides:
- v1-<nimi>.html — nt "ülaribaga peamine nupp, sekundaarsed valikud
  altpoolt"
- v2-<nimi>.html — nt "alusriba kiirnupp + täisekraani kontekst"
- v3-<nimi>.html — nt "fullscreen splash + üks suur primaarne tegevus"

Ära mine enne sügavusse, kui ma pole valinud ühte variatsiooni.

DISAINI PÕHIMÕTTED (võta AGENTS.md sektsioonist 5):
- Mobile-first (iPhone 14 viewport, ~390x844)
- Suurte puute-aladega (vähemalt 48x48 pt nupud)
- Riigi disainisüsteemi tunnetus (puhas, funktsionaalne, ei dekoratsiooni)
- Eesti keel kõikides tekstides
- Mock'i kõik andmed — ei mingit kasutaja-sisestust prototüübis

VÄLJUND: Index HTML-fail kataloogis `prototype/`, kust saan valida variatsiooni ja anda tagasisidet. Iga variatsiooni fail on self-contained (avaneb otse brauseris). 

ÄRA modifitseeri spec.md ega scenarios.md — kui prototüüp paljastab
spec'i lünga, märgi see eraldi kommentaariga prototüübi-failis (nt
"<!-- Spec gap: scenarios.md S1 ei täpsusta, kas nupp on lock-screenil
nähtav -->").
```

## Variatsiooni avamine brauseris

-   **Lihtne:** ava fail `file://` URLina (paremklõps → "Open with browser")
    
-   **Kõige parem (Cursoris):** kasuta Cursori built-in brauserit.
    

## Täiendused

Täienda prototüüpi paari kolme promptiga valides ühe suuna põhjaks.

## Viited

-   [Tailwind CDN — Play CDN](https://tailwindcss.com/docs/installation/play-cdn) — kõige kiirem viis HTML-i stiili anda
    
-   [Riigi disainisüsteem (RIA komponendid)](https://disainis%C3%BCsteem.ria.ee/)
    
-   [shadcn/ui — staatilise HTML näited](https://ui.shadcn.com/)
    

* * *

# Üldised viited

## Metoodikad

-   [GitHub Spec-Kit](https://github.com/github/spec-kit)
    
-   [Anthropic — Building agents with Claude](https://www.anthropic.com/news/building-effective-agents)
    
-   [AGENTS.md spec](https://agents.md/)
    

## Tööriistad

-   [Cursor docs](https://docs.cursor.com/)
    
-   [Microsoft Copilot Studio docs](https://learn.microsoft.com/en-us/microsoft-copilot-studio/)
    
-   [GitHub Copilot — context features](https://docs.github.com/en/copilot/using-github-copilot/copilot-chat)
    
-   [GitHub CLI](https://cli.github.com/)
    

## Avaliku sektori kontekst

-   [RIA disainisüsteem](https://disainis%C3%BCsteem.ria.ee/)
    
-   [Eesti e-riigi standardid](https://www.ria.ee/)