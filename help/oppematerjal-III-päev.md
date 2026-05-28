# SMIT koolituse õppematerjal: päev III ehk praktiline arendus ja QA

> See on koolituse **osalejatele mõeldud materjal** — sisaldab harjutuste lühikirjeldusi ja copy-paste prompte. Kasuta koos koolitusel toimuva juhendamisega.
> 
> **Tööriistad:** materjal eeldab Cursor IDE-d (Agent + Source Control tab + built-in brauser) ja `gh` CLI-d. Claude Code / VS Code Copilot kasutajad saavad enamiku samme läbi teha, aga § 1.2 brauseri-tee ja § 5.2 Agent Review on Cursori-spetsiifilised.

## Kontekst

II päeval valmis sprint-paketi alusmaterjal (`spec.md` + `sprint-plan.md`) ning `sprint-planning` skill PO osa. III päeval arendaja+QA täidavad ülejäänud SDD-artefaktid (`scenarios.md`, `technical-plan.md`, `tasks.md`), ehitavad ülejäänud skill'id ja viivad sprindi täieliku elutsükli läbi — planeerimisest kuni PR-i ja AI review'ni.

```plaintext
smit-ohukaart-naide/
├── AGENTS.md                         # II päev: Viited + sektsioon 5 täidetud
├── docs/
│   └── sprints/sprint-01-mvp-kiirteavitus/
│       ├── spec.md                   # II päev — MIDA (R1..R6: tekst + GPS + ack)
│       ├── sprint-plan.md            # II päev — protsess
│       ├── prototype/                # II päev — kodaniku UI v2 (HTML)
│       └── research/                 # II päev — prototype-feedback
│       └── scenarios.md              # III päev Phase 1 — Gherkin
│       └── technical-plan.md         # III päev Phase 1 — arhitektuur
│       └── tasks.md                  # III päev Phase 1 — implementatsiooni checklist
├── .agents/skills/
│   ├── sprint-planning/              # II päev PO-osa; III päev arendaja-osa juurde
│   ├── nextjs-implementation/        # III päev — sina ehitad
│   ├── playwright-spec/              # III päev — sina ehitad
│   └── pr-creation/                  # III päev — sina ehitad
└── .cursor/skills/sprint-planning/   # II päev (Cursori jaoks; sisu sama mis .agents/-i all)
```

**Repo:** `https://github.com/jarmo-productory/smit-ohukaart-naide`

* * *

# 1 Setup ja konteksti sisselugemine

## 1.1. Repo lokaalseks

**Eeltöö (käsitsi, üks kord):**

1.  Loo endale **uus GitHub konto** koolituseks (või kasuta olemasolevat — peaasi, et `gh` saaks autentida).
    
2.  Ava Cursoris **tühi koolituskaust** (nt `~/Projects/smit-koolitus/`) — agent paneb selle sisse repo.
    

**Setup (agent teeb):**

> **NB!** II päeva lõpus on repos ainult dokumentatsioon ja prototüüp — Next.js skeletoni veel pole. `package.json` luuakse alles T1 task'is (vt 3.2). `npm install` annab seetõttu vea kuni T1 lõpuni.

Konkreetset `gh` / `git clone` käsku me ette ei kirjuta — agent valib õige tee (fork vs clone) eesmärgi põhjal ja hoolitseb autentimise eest ise.

```plaintext
Sea siia kausta sisse https://github.com/jarmo-productory/smit-ohukaart-naide.

Eesmärk: ma tahan III päeva lõpus saata oma muudatused tagasi upstream'i
Pull Request'iga. Vali õige strateegia (fork vs lihtne clone), kontrolli
`gh` autentimist, seadista remote'id õigesti (origin = minu fork, upstream =
jarmo-productory/smit-ohukaart-naide).

Kui `gh` pole installitud või autentimata, ütle mulle, mida käsitsi teha.
```

Kontrolli üle.

## 1.2. Brauseri-kontroll: Cursori built-in brauser

**Plaan A — Cursori sisseehitatud brauser** (vaikimisi, ei vaja seadistust). Agent oskab brauseri ise avada, URL-i laadida, screenshotti võtta ja interaktsioone teha. Kuiv-test:

```plaintext
Testime — ava built-in Cursor brauser ja lae sealt
docs/sprints/sprint-01-mvp-kiirteavitus/prototype/index.html.
Tee screenshot ja kirjelda, mis ekraanil näha on.
```

**Plaan B — Playwright MCP (backup):** Kui Cursori built-in brauseril mingil põhjusel ei suju (nt tugevamad selectorid, isoleeritud browser context, automaatne PASS/FAIL retry), võid paluda agendil vahetada Playwright MCP peale. Setup pole praegu vaja — see ehitatakse § 4-s niikuinii.

## 1.3. Sprint-paketi sisselugemine

```plaintext
Loe sisse: AGENTS.md, docs/sprints/sprint-01-mvp-kiirteavitus/ (kõik failid),
.agents/skills/sprint-planning/SKILL.md.

Tee 5-rea kokkuvõte:
- Sprint Goal (sprint-plan.md-st)?
- R-ide arv spec.md-s?
- scenarios.md staatus (II päeval ei loodud — Phase 1 ülesanne III päeval)?
- AGENTS.md sektsioonide 1-4 staatus (täidetud / tühi)?
- sprint-planning skill: Workflow sammude arv (PO osa)?
```

## 1.4. AGENTS.md sektsioonid 1-4 täiendamine

AGENTS.md-s on praegu tühjad järgmised sektsioonid, mis tuleb täita:

1.  **Arendusreeglid** — projekti üldised reeglid (täiendab juba olemasolevat § 5 AI agendi käitumist; nt commit-stiil, branch-nimi, code review ootused, kommenteerimise reegel).
    
2.  **Tech stack** — kasutatav tehnoloogiakomplekt (vt alltoodud tabel).
    
3.  **CI/CD** — kuidas kood jõuab dev → main → tootmiseni (millised checks, kus host'itakse, kuidas deploy käivitub).
    
4.  **Projekti struktuur** — kataloogipuu ülevaade ja iga kataloogi otstarve.
    

Tech stack-i osas on vaikimisi otsus juba tehtud:

```plaintext
Kiht, Tehnoloogia
Frontend, Next.js 14+ (App Router) + TypeScript
Stiilid, Tailwind CSS
API, Next.js API routes (mock API, real backend API to be added in later sprints)
Testimine, Playwright (+ MCP)
Versioonihaldus, Git + GitHub
Hostimine, Netlify (Frontend + API routes (serverless))
AI tööriistad, Cursor + Playwright MCP
Code review, Cursor BugBot (P1) / Claude Code Review GitHub Action (P2)
```

Sektsioonidele 1, 3 ja 4 sisu pole ette antud — agent peab need kasutajaga koos läbi rääkima.

```plaintext
Täienda AGENTS.md tühje sektsioone selles järjekorras: 1. Arendusreeglid,
2. Tech stack, 3. CI/CD, 4. Projekti struktuur.

§ 2 Tech stack täida alltoodud tabeli põhjal (kasutaja on selle valiku juba teinud):

Kiht, Tehnoloogia
Frontend, Next.js 14+ (App Router) + TypeScript
Stiilid, Tailwind CSS
API, Next.js API routes (mock API, real backend API to be added in later sprints)
Testimine, Playwright (+ MCP)
Versioonihaldus, Git + GitHub
Hostimine, Netlify (Frontend + API routes (serverless))
AI tööriistad, Cursor + Playwright MCP
Code review, Cursor BugBot (P1) / Claude Code Review GitHub Action (P2)

§ 1, § 3 ja § 4 sisu pole ette antud. ÄRA mõtle välja. Iga sektsiooni juures:
- nimeta, mis info on puudu;
- esita kasutajale 2-4 fokuseeritud küsimust (nt § 1: "Kas commit'id käivad
  Conventional Commits stiilis?"; § 3: "Kas Netlify build käivitub iga PR-i
  peale?"; § 4: "Kas Next.js App Router kataloog on `app/` või `src/app/`?");
- oota vastust enne kirjutamist;
- vormista sektsioon vastuse põhjal lühidalt ja ühtses stiilis § 5-ga.

Esita üks küsimus korraga, soovita vastuseid ja oota ära vastus enne kui avad uue küsimuse.

Kui mõni vastus on "pole veel otsustatud", märgi see AGENTS.md-s expliciidselt
("TBD: sprint 02 otsus" vms), mitte ära peida.

Kontroll: pärast prompt'i läbimist on kõik 4 sektsiooni täidetud või sisaldavad
selget TBD-märget.
```

Arutelu: kas Cursor BugBot vs Claude Code Review valik on koolituse jaoks lõplik või jätame mõlemad sisse? Mis peaks tabelis veel olema (logging, error tracking, analytics)?

* * *

# 2 Planeerimine: sprint-planning skill

**Skill:** `.agents/skills/sprint-planning/SKILL.md`

## 2.1. Tutvumine laiendatud sprint-planning skilliga

II päeval valmis skilli **Bootstrap-osa** (PO: `spec.md` + `sprint-plan.md`). Selleks et III päev saaks lihtsa käsuga `käivita sprint-planning` minna kogu planeerimise elutsükkel läbi, on skill juba repos laiendatud katma kolme järjestikust faasi:

```plaintext
Bootstrap (PO, II päev) → Phase 0 (audit + branch) → Phase 1 (SDD artefaktid)
```

**Faili asukoht:** `.agents/skills/sprint-planning/SKILL.md` (peegel `.cursor/skills/sprint-planning/SKILL.md` all).

Selles sammus me **ei kirjuta skilli** — loeme valmis skilli ja saame aru, kuidas hea skill peaks olema struktureeritud. See on eeskuju järgmiste skillide ehitamisel (`nextjs-implementation`, `playwright-mcp`, `playwright-spec`, `pr-creation`).

```plaintext
Loe .agents/skills/sprint-planning/SKILL.md läbi ja vasta:

1. Frontmatter `description`: milliste fraaside peale skill käivitub? Loe ette
   3-5 näidisfraasi.

2. `When to use` tabel: kuidas skill aru saab, KUS faasis (Bootstrap / Phase 0 /
   Phase 1) ta peab alustama? Mis on auto-detect reegel?

3. Phase 0 sisaldab `git checkout -b ...` käsku. Miks ei tee skill seda
   automaatselt, vaid alustab pre-flight kontrolliga (`git status`, branch nimi)?

4. Phase 1 loob 3 faili kindlas järjekorras: scenarios.md →
   technical-plan.md → tasks.md. Miks just selles järjekorras? Mis sõltuvused
   on failide vahel?

5. Iga sammu lõpus on "gate" checklist. Mis vahe on Bootstrap gate'il,
   Phase 0 gate'il ja Phase 1 gate'il?
```

Arutelu: kus on skill nõrk? Mida sa lisaksid (nt täiendav samm, lisakontroll, parem error-handling)?

## 2.2. Loo Sprint-01 lõppdokumentatsioon

II päeval valmisid ainult `spec.md` + `sprint-plan.md`. III päeval skill katab kaks faasi: **Phase 0** (sprint-haru + `research/initial-audit.md` + `research/adversarial-review.md`) ja **Phase 1** (`scenarios.md` Gherkin S1..Sn + `technical-plan.md` Next.js stack + `tasks.md` T1 skeleton + T2..Tn feature + Tn closeout). HARD GATE all olevate R-nõuete juures peatub skill ja küsib kasutajalt.

```plaintext
Käivita `sprint-planning` skill paketile
- docs/sprints/sprint-01-mvp-kiirteavitus/.
```

Uuri, kuidas näeb sprindi plaan välja pärast täiendusi. Pärast Phase 1 lõppu suunab skill ise § 3-le (nextjs-implementation).

# 3 Implementatsioon: nextjs-implementation skill

## 3.1. Skill loomine

Tavalises chatis (nt Copilot) või siis agendi aknas eeltöö

```plaintext
Kirjelda hetke (mai 2026) parimad praktikad ja kindlad reeglid kodeerimisagendile nextjs rakenduste loomiseks. Tee web search. Ära kirjuta lohisevat pikka ülevaadet vaid väga selge "executable guide".
```

Seejärel:

```plaintext
Kasuta oma skillide loomise oskust ja loo selle põhjal nextjs-implementation-skill.

Hinda ka, kas AGENTS.md sektsioonid 1-4 vajavad selle skill'i valguses
täiendust (nt projekti konventsioon, mis seni ei olnud kirjas).
```

Tutvus skilliga.

## 3.2. Sprint-01 implementatsioon

Repos on praegu ainult dokumentatsioon ja konfiguratsioon — Next.js skeleton tuleb enne T1 feature-taskide juurde minekut püsti panna. Eraldi käsku me agendile ette ei kirjuta: agent oskab Next.js'i ise vastavalt AGENTS.md § 2 stack-ile õigesti seadistada (sh konflikt-failidega `README.md` / `.gitignore` toime tulla).

```plaintext
Alustame sprint-01 implementatsiooniga. Enne tasks.md taskide juurde minekut
sea sisse Next.js web-äpi projekt vastavalt AGENTS.md § 2 Tech stack-ile.

Repos on juba dokumentatsioon (AGENTS.md, docs/, help/, .agents/, README.md,
.gitignore) — projekt tuleb skeletoniga sulandada, mitte üle kirjutada. Pärast
skeletonit peab `localhost:3000` töötama ja olemasolev dokumentatsioon olema
puutumata.

Siis käivita nextjs-implementation skill ja tee tasks.md T1..Tn läbi.
Iga task = eraldi commit (vt § 3.3 review-loop enne commiti).
Pärast iga task'i kontroll brauseris localhost:3000.
```

## 3.3. Enne commit'i: kiire review

Pärast iga task'i implementatsiooni, aga enne commit'i, tee lühike lokaalne agent-review.  
Eesmärk ei ole veel täielik QA, vaid diff'i sanity check: kas muudatus on scope'is,  
kas midagi ilmselget läks katki, kas test või edge case on puudu.

Cursoris võib kasutada käsurea soovitust `/review` ("Review code instead of editing it") või paluda agenti tavavestluses:

```plaintext
Review the current changes before I commit.
Do not edit files.

Check against:
- docs/sprints/sprint-01-mvp-kiirteavitus/tasks.md
- docs/sprints/sprint-01-mvp-kiirteavitus/scenarios.md
- AGENTS.md

Classify findings:
- real bug
- missing test
- scope creep
- false positive
- needs discussion
- outside current task / pre-existing
```

**Ära kasuta "Fix All" pimesi.** Kui leid on päris ja task'i scope'is, paranda see  
enne commit'i. Kui leid on väljaspool scope'i või varasem probleem, märgi see üles,  
aga ära kasvata käimasolevat task'i.

Soovitatav task-loop:

```plaintext
implementeeri task → read-only review → paranda päris scope'is vead → smoke check → commit
```

* * *

# 4 Testimine: playwright-testing skill

**Skill'id:** `.agents/skills/playwright-mcp/SKILL.md` + `.agents/skills/playwright-spec/SKILL.md`

## 4.0. Playwright setup (enne playwright-spec skilli)

Enne `.spec.ts` failide genereerimist (§ 4.2) tuleb projekti lisada Playwright. Konkreetset käsku me ette ei kirjuta — agent oskab ise valida õige paketi, browserid alla laadida ja `playwright.config.ts` genereerida.

```plaintext
Sea projekti sisse Playwright testide jaoks. Eesmärk: pärast setuppi peab
`npx playwright test` käivituma ilma puuduolevate dep'ide veata (ka kui teste
veel pole, peab käsk vähemalt korrektselt teadma "no tests found"). Hooli ise
sellest, et browser binaries oleksid alla laetud ja config oleks olemas.
```

> NB! Esimene Playwright setup laeb alla ~100+MB browser binaries (Chromium / Firefox / WebKit) — võtab paar minutit. See on ühekordne.

## 4.1. E2E exploratsioon: Cursori built-in brauser + scenarios.md

Esimese kihina käime sprindi stsenaariumid kasutaja vaates läbi **Cursori sisseehitatud brauseriga** — see oskab navigeerida, klikkida, vorme täita ja screenshotti teha ilma eraldi MCP-d või skilli. scenarios.md on testikomplekti definitiivne allikas.

Eesmärk: 1) avastada päris-DOM-i selectorid ja interaktsioonid, 2) saada PASS/FAIL koondpilt enne `.spec.ts` automatiseerimist (§ 4.3), 3) leida bugid, mida T1..Tn implementatsioon tekitas.

```plaintext
Käivita kogu sprint-01 E2E testikomplekt Cursori built-in brauseris.

Allikas: docs/sprints/sprint-01-mvp-kiirteavitus/scenarios.md
Sihtmärk: localhost:3000 (lokaalne dev-server — käivita kui pole jooksmas)

Iga scenarios.md stsenaariumi kohta:
1. Loe Given/When/Then-blokk ette.
2. Vii sammud built-in brauseris läbi (navigate, click, fill, observe).
3. Raporteeri PASS / FAIL + screenshot + viide S<n>+R<n>.
4. FAIL korral: lühike bug-report (mis oodati vs mida nägid, mis selektor
   või mis interaktsioon murdus, ettepanek kus probleem on).

OLE RANGE: kui Then-tingimus ei ole TÄPSELT vastavuses (sõnasõnaline tekst,
oodatud HTTP staatus, õige veaolek), see on FAIL — mitte "näis töötavat" või
"enam-vähem". Leebed PASS-id on QA mõttetuks tegemine.

Lõpus: kokkuvõttetabel — kõik S-id, PASS/FAIL veerg, märkmed.
Ära paranda koodi seansis — see on QA samm, mitte fix samm.
```

> Plaan B: kui mingi stsenaarium nõuab funktsionaalsust, mida Cursori built-in ei suuda (nt isoleeritud browser context, deterministlik retry, custom headers), võib agent vahetada Playwright MCP peale. Setup pole vaikimisi vaja — built-in katab MVP juhud.

## 4.2. Skill loomine: playwright-spec (.spec.ts genereerimine)

`playwright-spec` skill genereerib `.spec.ts` testifailid — kas Gherkin stsenaariumide või MCP eksploratsioon-tulemuste põhjal. See **ei käivita brauserit ise** — kirjutab testid, mida CI jooksutab.

```plaintext
Loo `playwright-spec` skill `.agents/skills/` alla. Kasuta sprint-planning
SKILL.md struktuuri eeskujuna (frontmatter + When to use + Workflow + Output +
Gate). Kui `skill-creator` skill on saadaval, kasuta seda.

Kontekst: skill genereerib Playwright .spec.ts testifailid olemasoleva info põhjal
(Gherkin stsenaariumid scenarios.md-st, § 4.1 built-in brauseri seansi tulemused).
Käivitub fraasidelt: "genereeri testifailid", "kirjuta spec.ts", "loo Playwright
testid", "pane testid kirja", "genereeri CI testid". MITTE: "kontrolli UI" ega
"testi brauseris".

Output: tests/ kataloogis .spec.ts failid, mis läbivad `npx playwright test`.
Iga test peab viitama scenarios.md S<n>+R<n> identifikaatorile (kommentaaris või
test name'is) — see seob CI tulemused tagasi spec'iga.
```

## 4.3. .spec.ts genereerimine § 4.1 seansi põhjal

§ 4.1 built-in brauseri seanss andis päris-DOM-i selectorid, töötavad interaktsioonid ja PASS/FAIL koondpildi. Nüüd automatiseerime sama komplekti deterministlikuks `.spec.ts` failideks, et CI saaks regressiooni vastu kaitsta.

```plaintext
Käivita `playwright-spec` skill — genereeri .spec.ts testifailid § 4.1 brauseri-
seansil nähtud selectorite ja flow põhjal. Allikas: scenarios.md (S1..Sn) +
§ 4.1 seansi märkmed.

Jooksuta: npx playwright test. Iga test peab vastama scenarios.md Then-tingimusele
TÄPSELT (mitte "läheneb õigele"). FAIL tähendab: kas implementatsioon on katki
või scenario on liiga lõdvalt sõnastatud — kirjelda kumb ja kus.
```

> `.spec.ts` failid on CI pipeline'i ja regressioonikaitse lõppeesmärk. Built-in brauseri eksploratsioon eemaldab 80% tüütust tööst (selector discovery, flow tracing) — seega kirjuta testid pärast, mitte enne eksploratsiooni.

* * *

# 5 PR loomine + AI review: pr-creation skill

**Skill:** `.agents/skills/pr-creation/SKILL.md`

## 5.0. Eeltöö enne PR-i: BugBot ühendus

AI reviewer'i (Cursor BugBot) saab käivitada ainult siis, kui see on **sinu fork'iga ühendatud**. Setup on browser-OAuth ja agent seda teha ei saa — see on käsitsi 2-minutiline samm, mille teed üks kord ja unustad ära.

**Kontrollnimekiri (üks kord, enne § 5.4):**

1.  Logi sisse [cursor.com/dashboard](https://cursor.com/dashboard) (sama konto, millega Cursor app on autoriseeritud).
    
2.  Vasak menüü → **BugBot** → **"Connect repository"**.
    
3.  Autoriseeri GitHub → vali oma fork (`<sinu-user>/smit-ohukaart-naide`) → Connect.
    
4.  Veendu, et BugBot dashboard näitab fork'i staatuses **"Active"** või sarnane.
    

**Kontroll (kuiv-test):** ava oma forki GitHubis → "Pull requests" tab → "New pull request" (tühi PR pole vaja luua, ainult vaata, et oleksid õiges repos). Praegu PR-i sisu pole — tegelik PR luuakse § 5.3-s.

> Plaan B (Codex): kui Cursor BugBot mingil põhjusel ei tööta, võib § 5.4-s asendada selle OpenAI Codex-iga (`@codex review`). Vajab eraldi GitHub Appi installimist Codex'i poolt — vt `help/ai-reviewers/README.md`. Koolituse põhitee on BugBot.

## 5.1. Skill loomine

`pr-creation` skill'i mõte ei ole lihtsalt PR body teksti genereerida. See on agenti  
juhtiv töövoog: kui kasutaja ütleb "tee PR", siis agent kontrollib eeldused üle,  
vormistab PR-i kokkulepitud reeglite järgi ja loob PR-i GitHubis.

```plaintext
Loo `pr-creation` skill `.agents/skills/pr-creation/SKILL.md` alla. Kasuta
sprint-planning SKILL.md struktuuri eeskujuna; kui `skill-creator` skill on
saadaval, kasuta seda.

Kontekst: SMITi projektis ei tohi agent PR-i juhuslikult vormistada. Kui kasutaja
ütleb "tee PR", "loo PR", "create pull request" või "ava merge request", peab agent
kasutama seda skill'i.

Skill'i eesmärk:
- kontrollida enne PR-i loomist readiness checklist'i;
- lugeda sprint-paketi kontekst (`spec.md`, `scenarios.md`, `technical-plan.md`,
  `tasks.md`, `sprint-plan.md`);
- kontrollida branchi, commit'e, tööpuud ja testitulemusi;
- kontrollida, kas enne PR-i on tehtud Cursor Agent Review või samaväärne lokaalne review;
- vormistada PR title/body kokkulepitud SMITi reeglite järgi;
- pushida branch remote'i;
- luua PR `gh pr create` abil; AI review tööriistade valiku taust:
  `help/ai-reviewers/README.md`;
- tagastada PR URL ja lühike kokkuvõte.

Olulised reeglid:
- Ära loo PR-i `main` branchist.
- Ära loo PR-i, kui tööpuu on must või olulised failid on commit'imata.
- Ära merge'i PR-i.
- Ära approve'i enda PR-i.
- Kui SMITi PR-vormistuse reegel on puudu või ebaselge, küsi enne kasutajalt.
- Kui testid ei läbi või neid ei jooksutatud, märgi see PR body "Test evidence"
  sektsioonis ausalt välja.
- Kui Cursor Agent Review jäi enne PR-i tegemata, küsi kasutajalt, kas teha see nüüd
  või märkida PR body-sse, et lokaalset agent-review'd ei tehtud.

PR body peab vähemalt sisaldama:
- Summary
- Sprint / task references
- Acceptance criteria coverage
- Test evidence
- Local review evidence: Cursor Agent Review / muu lokaalne review, kui tehtud
- Screenshots / Playwright evidence, kui olemas
- Risks and known limitations
- AI usage note: millist agenti/skill'i kasutati

Output Format:
- readiness result: PASS / BLOCKED
- loodud PR URL või põhjus, miks PR jäi loomata
- lühike kokkuvõte, mis PR-i pandi
- next steps: AI review käivitamine / inimese review / merge gate
```

## 5.2. Enne PR-i: Cursor Agent Review

Enne `pr-creation` skill'i käivitamist tee üks terviklik lokaalne review kogu branchi  
muudatustele. See on erinev 3.3 lühikesest task-review'st.

**Cursor Agent Review** on Cursori eraldi funktsioon. Cursor docs kirjeldab seda kui  
dedicated code review'd local changes jaoks:

-   Agent Review docs: [https://cursor.com/docs/agent/agent-review](https://cursor.com/docs/agent/agent-review)
    
-   Cursor Learn: [https://cursor.com/learn/reviewing-testing](https://cursor.com/learn/reviewing-testing)
    

Cursori järgi saab Agent Review'd käivitada kolmel viisil:

1.  **Automatic** — kui seadetes lubatud, jookseb pärast commit'i.
    
2.  **Slash command** — `/agent-review`.
    
3.  **Source Control tab** — Agent Review võrdleb local changes'i main branchiga.
    

Koolituse soovitus: enne PR-i kasuta **Source Control tab → Agent Review**, sest see  
vaatab kogu branchi muudatuste komplekti, mitte ainult viimast edit'it.

Triage reeglid:

-   **real bug / missing test** — paranda enne PR-i;
    
-   **false positive** — ignoreeri, aga oska põhjendada;
    
-   **outside current task / pre-existing** — ära paranda automaatselt; loo follow-up või küsi;
    
-   **needs discussion** — küsi koolitajalt või reviewer'ilt enne PR-i.
    

> NB! Agent Review võib leida ka väljaspool diff'i või väljaspool task'i probleeme.  
> See on kasulik signaal, aga mitte põhjus scope'i kontrollimatult kasvatada.

## 5.3. PR loomine skill'iga

Kui skill on loodud, peab kasutaja saama anda lihtsa käsu:

```plaintext
Kasuta `pr-creation` skill'i ja tee selle sprinti töödest korrektne PR.

Sprint: docs/sprints/sprint-01-mvp-kiirteavitus/
Base branch: main

Ära loo PR-i enne, kui readiness-check on läbitud.
Kui mõni SMITi PR-vormistuse nõue on puudu või ebaselge, küsi enne.
```

Oodatav agendi käitumine:

1.  loeb sprint-paketi ja `tasks.md`;
    
2.  kontrollib branchi, commit'e ja tööpuud;
    
3.  kontrollib või küsib testitulemused;
    
4.  koostab PR title/body;
    
5.  teeb `git push`, kui vaja;
    
6.  teeb `gh pr create`;
    
7.  annab PR URL-i.
    

## 5.4. Pärast PR-i: Cursor BugBot review

Kui § 5.0 setup tehtud ja § 5.3 PR loodud, käivitub BugBot review tavaliselt automaatselt mõne minuti jooksul. Kui mitte (või tahad korrata fokuseeritud promptiga), kommenteeri PR-is:

```plaintext
cursor review

Focus on:
- regressions against docs/sprints/sprint-01-mvp-kiirteavitus/scenarios.md
- GPS õigused ja veaolekud (R2, R3 sad-rajad)
- topelt-saatmine / kiired klõpsud (R1)
- mock API vs päris integratsiooni piir
```

BugBot kirjutab inline-kommentaarid PR-i diff'i juurde. Kommentaaride severity on **signaal, mitte otsus** — triage tee sina (vt § 5.5).

> Plaan B (Codex, kui BugBot ei tööta): kommenteeri PR-is `@codex review for security regressions, missing tests, risky behavior changes, and mismatches with docs/sprints/sprint-01-mvp-kiirteavitus/scenarios.md.` — eeldab Codex GitHub App installi (vt `help/ai-reviewers/README.md`).

## 5.5. Review otsus

AI reviewer ei tee merge-otsust. Osaleja loeb AI leiud läbi ja klassifitseerib:

-   **real bug** — fix enne merge'i;
    
-   **missing test** — lisa test või põhjenda erand;
    
-   **needs discussion** — küsi koolitajalt / reviewer'ilt;
    
-   **false positive** — märgi põhjendus PR kommentaaris;
    
-   **out of scope / pre-existing** — loo issue või backlog item.
    

Merge-otsus jääb inimesele: **APPROVE / REQUEST CHANGES / NEEDS DISCUSSION**.

* * *