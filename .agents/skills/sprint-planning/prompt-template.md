# Sprint planning — kasutaja prompt (mall)

Kopeeri vestlusse ja täida `<…>` väljad. Sobib igale roadmap'i reale.

---

**KONTEKST**

- Roadmap: `docs/roadmap.md` (H2 etapp valmis).
- Valitud sprint: kopeeri **täis rida** tabelist, nt:
  ```
  <paste roadmap row, e.g. 02 | sprint-02-fotoga-teavitus - Fotoga teavitus...>
  ```
- Projekt: loe `AGENTS.md` (§5) ja `docs/sprints/README.md`.
- Mall: `docs/sprints/_template/`.

**ÜLESANNE**

Kasuta **sprint-planning** skilli. Loo või uuenda sprint-pakett:

`docs/sprints/sprint-<XX>-<slug>/`

Täida **ainult** need kaks faili:

1. **`spec.md`** — MIDA (eesmärk, põhimõtted, R1…Rn koos testitavate AC-dega, out of scope, avatud küsimused, viited AGENTS.md-sse).
2. **`sprint-plan.md`** — KUIDAS (Agent Runtime Instructions mallist, Goal, Linked Issues, MVP Scope, faasid, riskid, Status).

**REEGLID**

- Iga acceptance criterion peab olema kohe testitav.
- `spec.md` = ainult "mida"; `sprint-plan.md` = ainult "kuidas".
- Ära loo veel `scenarios.md`, `technical-plan.md`, `tasks.md`, `prototype/`, ega `research/*.md`.
- Ära commiti ega loo git-haru, kui ma ei küsi eraldi.
- Kui mõni äriotsus on ebaselge, pane **Avatud küsimused** / HARD GATE — ära vali vaikimisi.

**LISAKONTEKST (valikuline)**

- GitHub issue(d): `<URL või "puudub — loo Phase 0-s">`
- Analüüs / taust: `<path docs/analysis/... või background-research>`
- Eelmine sprint, millele see sõltub: `<sprint-XX-...>`

**VÄLJUND**

Kaks Markdown-faili õiges sprint-kataloogis + lühike kokkuvõte: HARD GATE-d, 3 peamist lahtist küsimust, soovitatud järgmine samm.

---

## Speckit (valikuline)

Kui `specify-cli` on installitud ja `specify init` tehtud, võid `spec.md` jaoks kasutada `/speckit.specify` sama kontekstiga. Lõppstruktuur peab siiski vastama Ohukaardi mallile ülal.
