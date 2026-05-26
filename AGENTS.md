# AGENTS.md — Ohukaart

> Ohukaart on Eesti kodaniku ohuteavituse mobiilirakendus.
> Kodaniku teavitus → kahetasemeline triage (AI + dispetšeri kinnitus) → asutuse-spetsiifiline tegutsemine.

## Viited

- Tellija brief: `README.md`
- Taustauuringud: `docs/background-research/`
- Roadmap: `docs/roadmap.md`
- Sprint-konventsioon: `docs/sprints/README.md`
- Sprint-paketi mall: `docs/sprints/_template/`

## 1. Arendusreeglid 

## 2. Tech stack 

## 3. CI/CD 

## 4. Projekti struktuur 

## 5. AI agendi käitumine
### Mõtle enne koodi kirjutamist
- Ütle eeldused välja sõnaselgelt. Kui pole kindel — küsi mult juurde (ask_user_tool).
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

