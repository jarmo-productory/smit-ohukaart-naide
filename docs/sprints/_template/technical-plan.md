# Sprint XX Technical Plan

> Selle faili täidab **arhitekt + lead arendaja** pärast spec.md kinnitamist. Analüütik/PO ei pea seda täitma — aga peaks lugema, et mõista mis on tehniliselt teostatav ja mis ohud kerkivad.

## Arhitektuuri kontuur

<Lühike kirjeldus: kuidas see feature paigutub olemasoleva süsteemi sisse. Diagrammid (ASCII või link Excalidraw/Mermaid'i) on teretulnud.>

## Andmemudel

<Mis uued entiteedid? Mis muutused olemasolevatele tabelitele? Migrations?>

## API-muudatused

<Uued endpoint'id, payload'id, autentimine, error-koodid.>

## Sõltuvused

| Sõltuvus | Tüüp | Märkused |
| --- | --- | --- |
| <Teek/teenus> | Internal / External | <Versioon, kasutusotstarve> |

## Riskid (tehnilised)

| Risk | Tõenäosus | Mõju | Maandamine |
| --- | --- | --- | --- |
| <Risk 1> | <H/M/L> | <H/M/L> | <Maandamise plaan> |

## Testimisstrateegia

- **Unit:** <Mis komponendid, mis raamistik>
- **Integration:** <Mis liidesed, mis keskkond>
- **End-to-end:** <Mis kasutaja-rajad, mis tööriist>
- **Manual:** <Mis ei ole automatiseeritav, kes testib>

## Performance-eeldused

- <Vastusaeg X p99 alla Y ms>
- <Koormus: Z päringut sekundis>

## Turvalisus ja privaatsus

- <Kas puudutab isikuandmeid? GDPR-mõjuanalüüs?>
- <Autentimine, autorisatsioon, audit-loog?>
- <Andmete säilitamine, kustutamine?>

## Ligipääsetavus

- <WCAG 2.1 AA punktid, mida see sprint peab täitma>
- <Eesti riigi disainisüsteemi viited>

## Avatud küsimused (tehnilised)

| Küsimus | Kellelt küsida | Tähtaeg |
| --- | --- | --- |
| <Küsimus 1> | <Roll/Isik> | <Sprint XX algus> |
