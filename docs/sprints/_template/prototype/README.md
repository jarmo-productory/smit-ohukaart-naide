# Prototype/

Selle sprindi UI-prototüüp staatilise HTML/CSS-na (Tailwind CDN).

## Failid

- `v1-<nimi>.html` — variatsioon 1 (kirjelda ülaservas faili kommentaariga)
- `v2-<nimi>.html` — variatsioon 2
- `v3-<nimi>.html` — variatsioon 3 (vajadusel)
- `main.html` — valitud variatsioon (ümber nimetatud üks v1/v2/v3-st)
- `rejected/` — kõrvale jäetud variatsioonid (kui jätad alles dokumenteerimiseks)

## Avamine brauseris

Lihtne viis: ava fail `file://` URLina (paremklõps → "Open with browser").

Parem viis: käivita kohalik server kataloogis:

```bash
python3 -m http.server 8000
# Ava http://localhost:8000/
```

Kõige parem viis (Cursoris): kasuta Cursori Live Preview pluginit otse failil.

## Loogika

Prototüüp on **osa sprindi paketist**, mitte eraldi tööriist. Spec → prototüüp → spec on tagasiside-tsükkel, mis paraneb spec'i kvaliteeti enne implementatsiooni alustamist.
