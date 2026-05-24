# Kuidas iga AI-tööriist aitab AGENTS.md / CLAUDE.md luua

> **Küsimus:** Kas peab AGENTS.md käsitsi tühjalt lehelt kirjutama, või on tööriistadel käske, mis selle alustuseks scaffold'ivad?
>
> **Lühike vastus:** Kõigil neljal suuremal tööriistal on käsk, mis genereerib esmase versiooni sinu repo põhjal. Aga **iga tööriist genereerib eri formaati ja eri kohta** — pead enne otsustama, millist faili sa tegelikult tahad.

## Võrdlustabel

| Tööriist | Käsk | Mis genereerib | Kuhu salvestab |
|---|---|---|---|
| **Claude Code** (CLI) | `/init` | `CLAUDE.md` koos repo ülevaate, scriptide, konventsioonidega | repo juur (`./CLAUDE.md`) |
| **OpenAI Codex CLI** | `/init` | `AGENTS.md` scaffold koos build-, test-käskude ja konventsioonidega | jooksva kausta juur (`./AGENTS.md`) |
| **Cursor** (IDE) | `/create-rule` (Agent chat) | Üksik `.mdc` reegli-fail koos õige frontmatter'iga | `.cursor/rules/<name>.mdc` |
| **GitHub Copilot** (VS Code) | `/init` või `/create-instructions` (chat) | `copilot-instructions.md` | `.github/copilot-instructions.md` |

## Detailsemalt

### Claude Code — `/init`

Käivita repo juurkaustas Claude Code, kirjuta vestluse aknas `/init`. Claude käib repo läbi (README, package.json, scriptid, struktuur), küsib mõned täpsustused ja kirjutab `CLAUDE.md` faili, mis kirjeldab:
- Projekti identiteeti
- Build / test / dev käsklusi
- Failistruktuuri olulisi kohti
- Konventsioone, mida koodist näeb

**Hea/halb:** annab kiire stardi, aga "leiab" ainult seda, mis koodist nähtav — **strateegilised otsused, sidusrühmad, regulatsioonid** (nt Ohukaart `AGENTS.md` ülaosa) tuleb ise käsitsi lisada.

### OpenAI Codex CLI — `/init`

Sama loogika nagu Claude Code'il, aga genereerib **`AGENTS.md`** (mitte CLAUDE.md), mis on agents.md spec'iga ühilduv. Codex loeb seda faili automaatselt iga sessiooni alguses.

> **Märkimisväärne:** Codex toetab ka `AGENTS.override.md`-d (lokaalsed personaalsed üle-kirjutused, mida ei pushita) ja kaustahierarhilist `AGENTS.md` ahelat (juures globaalne, allkaustades konkreetsem).

### Cursor — `/create-rule`

**Tähelepanu:** Cursor **ei genereeri** `AGENTS.md`-d automaatselt. Selle asemel on tema natiivne formaat `.cursor/rules/*.mdc` — väiksed, scope'itud reegli-failid frontmatter'iga, mis ütleb millal reegel laaditakse (globs, file types, conditional).

Käsk `/create-rule` Agent-i vestluses palub sul kirjeldada mida tahad ja Cursor loob ühe `.mdc` faili. Korda mitu korda → saad reeglite kogu.

**Kui tahad AGENTS.md-d Cursoris:** loo see käsitsi (või palu Agent'il see kirjutada Agent-i vestluses, nt *"Loe `.cursor/rules/*.mdc` ja koonda need AGENTS.md sisse, mis järgib [agents.md spec'i](https://agents.md/)"*). Cursor loeb AGENTS.md fallback'ina, aga eelistab oma natiivset `.mdc` formaati.

### GitHub Copilot (VS Code) — `/init` või `/create-instructions`

VS Code Copilot chat'is `/init` paneb tööriista:
1. Otsima olemasolevaid AI konventsioone (kas on juba `copilot-instructions.md`, `AGENTS.md`, `.cursor/rules/` jne)
2. Analüüsima projekti struktuuri ja koodimustreid
3. Genereerima `.github/copilot-instructions.md`

**Boonus:** Esimene kord, kui Copilot cloud agent loob PR-i sinu repos, jätab ta automaatselt kommentaari lingiga, mis pakub kohe selle faili genereerimist.

## Mida soovitan Ohukaart H2 jaoks

Praegu Ohukaart projektis on **käsitsi tehtud** `AGENTS.md`, kus strateegiline osa (identiteet, sidusrühmad, kriitilisus) on olemas, aga taktikaline osa on tühi. **Ära kasuta `/init`-i selle ülekirjutamiseks** — kaotad olulise konteksti.

Selle asemel:

1. **Variant A (õpetlik):** Täida `AGENTS.md` taktikaline osa **käsitsi**, vaadates `help/agents-examples/` näiteid. See on H2 harjutuse mõte.

2. **Variant B (kiire):** Käivita `/init` **eraldi katsekaustas** (nt `/tmp/`), vaata mida tööriist genereerib, ja **kopeeri ainult kasulik tükk** Ohukaart `AGENTS.md` taktikalisse ossa (build-käsud, test-skriptid, dev-setup).

3. **Variant C (multi-tool):** Kui H2-s tahad demonstreerida mitme tööriista koostööd, jäta Ohukaart `AGENTS.md` põhi-failiks (loevad nii Codex kui Claude), ja lisa lühike `CLAUDE.md` repo juurde, mis ütleb *"vaata `AGENTS.md`-d, aga Claude-spetsiifilised reeglid on siin"* (näide: `help/agents-examples/ritemark-native-CLAUDE.md`).

## Allikad

- [Codex `/init` ja AGENTS.md ülevaade](https://developers.openai.com/codex/guides/agents-md)
- [Codex CLI slash commands](https://developers.openai.com/codex/cli/slash-commands)
- [Cursor Rules dokumentatsioon (`/create-rule`)](https://cursor.com/docs/rules)
- [VS Code Custom Instructions (`/init`, `/create-instructions`)](https://code.visualstudio.com/docs/copilot/customization/custom-instructions)
- [Copilot CLI feature request — `copilot init`](https://github.com/github/copilot-cli/issues/101) (CLI-le pole veel, ainult VS Code chat'is)
- [agents.md spec (Linux Foundation, dets 2025)](https://agents.md/)
