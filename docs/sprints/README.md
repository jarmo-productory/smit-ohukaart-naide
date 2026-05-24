# Sprintide kataloog (Productory tööloogika)

Iga feature meie kontekstis läheb **omasse sprinti** kataloogi `sprint-XX-<luhinimi>/`. See on agentse arenduse argipäeva-muster — spec, prototüüp, plaan, taskid elavad **koos** ühes sprint-paketis, mitte hajusalt eri kohtades.

## Sprintide nummerdamine

`sprint-XX-<luhinimi>` kus:
- `XX` on jooksev kahekohaline number (01, 02, ...). Reserveeritud roadmap'is.
- `<luhinimi>` on `kebab-case` formaadis 2-4 sõna, mis kirjeldab feature'it. Näide: `sprint-02-foto-maskimine`.

Esimene sprint on alati MVP — minimaalne aga töötav äriline väärtus. Vt `docs/roadmap.md`.

## Sprindi paketi struktuur

```
docs/sprints/sprint-XX-<luhinimi>/
├── sprint-plan.md       # Eesmärk, scope, success criteria, faasid
├── spec.md              # Speckit /specify väljund: nõuete kontuur (R1, R2, ...)
├── scenarios.md         # Gherkin-stiilis käitumislepingud (Given/When/Then)
├── technical-plan.md    # Arhitektuuri kontuur (täidab arhitekt)
├── tasks.md             # Implementeerimise kontrollnimekiri (Speckit /tasks)
├── prototype/           # Staatiline HTML prototüüp (Cursori loodud, H4)
│   ├── v1-<nimi>.html   # Variatsioon 1
│   ├── v2-<nimi>.html   # Variatsioon 2
│   ├── v3-<nimi>.html   # Variatsioon 3
│   ├── main.html        # Valitud variatsioon (ümber nimetatud)
│   └── rejected/        # Kõrvale jäetud variatsioonid (kui jätad alles)
└── research/            # Adversarial review, audit'id, prototype-feedback
```

## Faili-kohased reeglid

| Fail | Vastutab | Sisaldab |
| --- | --- | --- |
| `sprint-plan.md` | Analüütik + PM/PO | Agent Runtime Instructions, Goal, MVP Scope, Success Criteria, Phases, Status |
| `spec.md` | Analüütik | Eesmärk, Põhimõtted, Requirements (R1, R2, ...), Out of Scope, Avatud küsimused |
| `scenarios.md` | Analüütik | Gherkin Given/When/Then käitumislepingud (S1, S2, ...) |
| `technical-plan.md` | Arhitekt + Lead arendaja | Arhitektuuri valikud, tehnoloogia, andmemudel, integratsioonid |
| `tasks.md` | Lead arendaja | Implementatsiooni checklist (linkitud R1, R2, ... viidetele) |
| `prototype/` | Analüütik + UX | Staatilised HTML/CSS variatsioonid (vanilla + Tailwind CDN) |
| `research/` | Kõik | Adversarial review, audit, feedback, otsus-jälg |

## Tööloogika

1. **Sprint algab roadmap'ist** (`docs/roadmap.md`) — üks sprint = üks rida tabelist
2. **Loo sprint-kataloog** kopeerides `docs/sprints/_template/` uue nimega
3. **Lingi GitHub Issue** sprint-plan.md `Linked Issues` sektsiooni (issue loodud H2 etapis)
4. **Speckit `/specify`** loob spec.md sisu (või kirjuta käsitsi malli järgi)
5. **Scenarios.md** koos spec'iga — käitumislepingud, mis on otse testitavad
6. **Prototype/** sprint-paketi visuaalne osa, 2-3 variatsiooni Cursori abil
7. **Technical-plan.md** — arhitekt täidab pärast spec'i kinnitamist
8. **Tasks.md** — Speckit `/tasks` või käsitsi
9. **Implementation** — arendaja/AI agent loeb TÄIELIKULT sprint-kataloogi enne koodi muutmist

## AI agent käitumine sprint-kataloogis

Iga sprint-kataloogi `sprint-plan.md` algab "Agent Runtime Instructions" sektsiooniga, mis ütleb AI agendile **mis järjekorras** faile lugeda enne koodi muutmist:

```
1. Read this `sprint-plan.md`.
2. Read [spec.md](spec.md), [technical-plan.md](technical-plan.md),
   [scenarios.md](scenarios.md), and [tasks.md](tasks.md).
3. Treat [spec.md](spec.md) as the behavior contract.
4. Treat [technical-plan.md](technical-plan.md) as the current architecture plan.
5. Treat [tasks.md](tasks.md) as the implementation source of truth.
6. If behavior, scope, architecture, or acceptance criteria need to change,
   update the relevant SDD artifact first, then change code.
```

See on **kriitiline** — see takistab AI agendil koodi muutmast spec'i järgi vaadamata.

## Eeskuju (väline)

Productory enda toote sprint näide:
[`/Users/jarmotuisk/Projects/ritemark-native/docs/development/sprints/sprint-72-markdown-navigation-annotations/`](file:///Users/jarmotuisk/Projects/ritemark-native/docs/development/sprints/sprint-72-markdown-navigation-annotations/)

Sealt vaata eriti:
- `sprint-plan.md` — kogu sprint-pakett tervikuna ja Agent Runtime Instructions
- `spec.md` — Requirements (R1, R2, ...) mustri näide
- `scenarios.md` — Gherkin käitumislepingud
- `research/adversarial-review.md` — kuidas dokumenteerida adversarial review enne implementatsiooni
