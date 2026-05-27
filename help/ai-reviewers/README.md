# AI kasutamine PR review's: hetke praktikad ja soovitused

**Kuupäev:** 2026-05-27  
**Kontekst:** SMIT / Ohukaart koolitus, III päev — PR loomine, AI reviewer ja inimese merge-otsus.  
**Eesmärk:** anda praktiline raamistik, kuidas kasutada AI reviewer'it PR review protsessis nii, et see tõstaks kvaliteeti, aga ei asendaks vastutavat inimreview'd.

## Kokkuvõte

AI PR reviewer on kõige kasulikum **lisakontrollina enne inimese lõplikku otsust**. Ta aitab leida regressioone, riskantseid muudatusi, turvaauke, puuduvaid teste ja dokumentatsiooni lünki. Ta ei peaks olema ainus kvaliteedivärav ega automaatne approve/request-changes mehhanism.

Soovitus SMITi koolitusvoogu:

1. **PR creation skill** loob korrektse PR-i: väike scope, selge kirjeldus, acceptance coverage, test evidence.
2. **Cursor Agent Review** annab enne PR-i lokaalse ülevaate kogu branchi muudatustest.
3. **Üks PR-level AI reviewer** annab pärast PR-i esimese signaali: Cursor BugBot või Codex Code Review.
4. **Inimene triage'ib leiud**: fix / false positive / needs discussion / out of scope / pre-existing.
5. **Merge-otsus jääb inimesele** ja branch protection'ile, mitte AI reviewer'ile.

## Mida tööriistad ise ütlevad

| Tööriist | Roll | Oluline tähelepanek |
| --- | --- | --- |
| Cursor Agent Review | Lokaalne review Cursoris enne PR-i | Mõeldud local changes'i ülevaatuseks; Source Control tabist käivitades võrdleb muudatusi main branchiga ja võib leida probleeme kogu branchi ulatuses. |
| Cursor BugBot | PR-de automaatne või käsitsi review Cursor/GitHub töövoos | Mõeldud bugide, turvaprobleemide ja kvaliteediprobleemide leidmiseks; käsitsi saab käivitada PR kommentaariga `cursor review` või `bugbot run`. |
| OpenAI Codex Code Review | GitHub PR-i review `@codex review` kaudu või automaatse review'na | OpenAI positsioneerib seda kui lisasignaali enne human merge approval'it; sobib regressioonide, puuduva testikatte ja riskantsete käitumismuudatuste otsimiseks. |
| GitHub Copilot Code Review | Copilot reviewer GitHubis / IDE-s | Copilot jätab GitHubis tavaliselt `Comment` review, mitte `Approve` ega `Request changes`; see ei asenda nõutud inimapprove'i ega blokeeri merge'i. |
| Claude Code Review | GitHub PR inline comments + check run | Claude dokumentatsioon rõhutab, et leiud on severity'ga, aga review ei approve'i ega blokeeri PR-i; kui tahad selle gate'iks teha, peab organisatsioon selle eraldi CI-sse ehitama. |

Järeldus: tööriistad ise liiguvad sama mustri poole — **AI review = signaal**, mitte lõplik autoriteet.

## Parimad praktikad

### 1. Tee PR väikseks ja review-kõlbulikuks

AI reviewer ei päästa halba PR-i. Kui PR on suur, hajus või ilma kontekstita, kasvab müra ja väheneb leidude väärtus.

Hea PR enne AI review'd:

- üks eesmärk / üks sprint-taskide komplekt;
- selge title ja body;
- seotud `spec.md`, `scenarios.md`, `tasks.md`;
- test evidence on olemas või ausalt puudu märgitud;
- riskantsed kohad on PR body-s ette nimetatud.

### 2. Anna reviewer'ile repo-spetsiifilised juhised

AI reviewer vajab samu projektireegleid, mida inimene:

- `AGENTS.md` / `CLAUDE.md` / `.github/copilot-instructions.md`;
- security checklist;
- path-specific juhised, kui backend, frontend ja infra riskid erinevad;
- PR template, mis toob välja acceptance criteria ja test evidence.

Ohukaardi kontekstis peab reviewer teadma vähemalt:

- Eesti keel UI tekstides;
- ohuinfo ja asukohaandmete tundlikkus;
- AI ei tohi vaikimisi valida päris 112 integratsiooni;
- mock/demo piirid peavad PR-is nähtavad olema.

### 3. Vali üks primaarne AI reviewer korraga

Mitme AI reviewer'i paralleelne kasutamine võib anda hea teise arvamuse, aga koolituse või väikese tiimi tavavoos tekitab see tihti dubleerivaid kommentaare.

Praktiline reegel:

- **Põhivoog:** Cursor BugBot või Codex Code Review.
- **Teine arvamus:** käivita teine reviewer ainult riskantsel PR-il või kui esimene review tundub pinnapealne.
- **Ära tee:** “kõik reviewer'id alati peale” — müra kasvab kiiremini kui kvaliteet.

### 4. Review prompt peab olema fokuseeritud

Hea AI review prompt ei ole “review this PR”. Parem on öelda, mida otsida:

```plaintext
@codex review for security regressions, missing tests, risky behavior changes,
and mismatches with docs/sprints/sprint-01-mvp-kiirteavitus/scenarios.md.
```

Või BugBot/Cursor kontekstis:

```plaintext
cursor review

Focus on:
- regressions against scenarios.md
- GPS permission and error states
- duplicate submit / rapid click behavior
- mock API vs real integration boundary
```

### 5. Normaliseeri leiud oma otsuseraamistikku

Eri tööriistad kasutavad eri severity-süsteeme. Tiimil peaks olema oma lihtne triage:

| Klass | Tähendus | Tegevus |
| --- | --- | --- |
| Real bug | PR tõi kaasa vea, regressiooni, turvariski või katkise acceptance criteria | Fix enne merge'i |
| Missing test | Riskantne käitumine on testimata | Lisa test või põhjenda, miks mitte |
| Needs discussion | Leid võib olla õige, aga nõuab toote/QA/architecture otsust | Aruta enne merge'i |
| False positive | AI eksis või ei mõistnud konteksti | Märgi kommentaaris põhjendus |
| Out of scope | Õige tähelepanek, aga ei kuulu sellesse PR-i | Loo issue või backlog item |
| Pre-existing | Viga oli enne PR-i olemas | Ära peida; loo eraldi issue, kui oluline |

### 6. Küsi kodeerimisagendilt teist arvamust, mitte automaatset parandust

Hea praktiline muster: kui AI reviewer jätab PR-i kommentaari, siis ära aktsepteeri seda pimesi. Küsi koodi kirjutanud agendilt või teiselt kodeerimisagendilt **hinnangut leiule**:

```plaintext
Vaata AI reviewer'i kommentaar PR-is <link või kommentaari tekst>.
Ära muuda veel koodi.

Ütle:
- kas leid on päris bug, false positive, out of scope või vajab arutelu;
- millise faili/rea/käitumise põhjal sa nii arvad;
- kui see on päris bug, mis oleks minimaalne fix;
- kas olemasolev test katab seda või on vaja uut testi.
```

See tekitab kasuliku “reviewer → kodeerimisagent → inimene” kontrollahela:

1. AI reviewer leiab potentsiaalse probleemi.
2. Kodeerimisagent kontrollib seda diff'i ja repo konteksti põhjal.
3. Inimene otsustab, kas teha fix, lisada test, lükata leid tagasi või avada arutelu.

Oluline piir: ära anna agendile kohe käsku “fix all comments”. Enne peab iga leid olema liigitatud. Vastasel juhul võib agent parandada false positive'id, kasvatada scope'i või muuta käitumist, mida PR ei pidanud puudutama.

### 7. Erista kolme review taset

Koolituses on kasulik eristada kolme eri kontrolli:

| Aeg | Tööriist / käivitus | Milleks |
| --- | --- | --- |
| Enne commit'i | Cursor `/review` või tavaline read-only agent prompt | Kiire taski/diff'i sanity check enne commit'i |
| Enne PR-i | Cursor **Agent Review** (`/agent-review` või Source Control tab) | Terviklik lokaalne review kogu branchi muudatustele |
| Pärast PR-i | BugBot / Codex Code Review / Claude Action | PR-level review GitHubis, inline kommentaarid ja tiimi nähtav jälg |

Praktiline reegel: mida hilisem review, seda formaalsem ja nähtavam see on. Enne commit'i
hoia review kerge ja kiire; enne PR-i kontrolli kogu branch; pärast PR-i käsitle leide
tiimi review-protsessi osana.

### 8. Ära lase AI reviewer'il branch protection'it asendada

Branch protection peaks jätkuvalt tuginema deterministlikele kontrollidele:

- build;
- lint;
- unit/integration/Playwright tests;
- required human approval;
- vajadusel CODEOWNERS.

AI review võib olla required process step, aga mitte ainus merge gate. Kui organisatsioon tahab AI leide gate'ida, tuleb täpselt määratleda:

- milline severity blokeerib;
- kuidas false positive vabastatakse;
- kes saab override'i teha;
- kuidas tulemust auditeeritakse.

### 9. Hoia tundlikud andmed ja õigused kontrolli all

Avaliku sektori / ohuteavituse kontekstis kontrolli enne tööriista ühendamist:

- milliseid repo õigusi GitHub App küsib;
- kas tööriist saadab koodi välisesse teenusesse;
- kas Zero Data Retention või sarnane nõue on vajalik;
- kas PR võib sisaldada tundlikke näiteandmeid, logisid või token'eid;
- kas fork'idest tulevad PR-id saavad automaatse review ilma saladusi avamata.

Ohukaardi koolitusrepos on risk madal, aga sama protsessi päris SMIT reposse viies peab see olema otsustatud enne automaatse review sisselülitamist.

## Soovitus III päeva õppematerjali jaoks

Ära ehita eraldi `code-review` skill'i, kui tegelik reviewer on BugBot või Codex. See dubleerib tööriista ja võib osalejatele tunduda kunstlik.

Ehita selle asemel:

1. **`pr-creation` skill** — standardiseerib käsu “tee PR”.
2. **AI review samm** — käivita valitud tööriist.
3. **Review triage checklist** — inimene otsustab, mida leidudega teha.

Õppematerjali loogika:

```plaintext
task read-only review → Agent Review → PR creation skill → gh pr create → PR-level AI reviewer → human triage → fix loop → human merge decision
```

## Soovitatud koolituse default

Kui vaja valida üks lihtne, kaitstav default:

1. **PR loomine:** `pr-creation` skill.
2. **Enne PR-i:** Cursor Agent Review Source Control tabist.
3. **AI reviewer pärast PR-i:** Cursor BugBot, kui Cursor on koolituse põhitööriist ja repo ühendamine on lihtne.
4. **Alternatiiv:** Codex Code Review, kui osalejad kasutavad OpenAI/Codex GitHub integratsiooni.
5. **Mitte vaikimisi:** Claude Code Review GitHub Action — sobib tagavaraks või organisatsiooniliseks setup'iks, aga nõuab rohkem seadistust ja saladuste haldust.

## Allikad

- Cursor BugBot docs — <https://docs.cursor.com/bugbot>
- Cursor Agent Review docs — <https://cursor.com/docs/agent/agent-review>
- Cursor Learn: Reviewing and Testing Code — <https://cursor.com/learn/reviewing-testing>
- OpenAI Codex: Review GitHub pull requests — <https://developers.openai.com/codex/use-cases/github-code-reviews>
- OpenAI Codex web setup / GitHub integration — <https://developers.openai.com/codex/cloud>
- GitHub Copilot Code Review docs — <https://docs.github.com/en/copilot/how-tos/use-copilot-agents/request-a-code-review/use-code-review>
- Claude Code Review docs — <https://code.claude.com/docs/en/code-review>
