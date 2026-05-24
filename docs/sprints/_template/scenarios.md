# Sprint XX Scenarios

> Käitumislepingud Gherkin-stiilis. Iga stsenaarium peab olema sõnastatud nii, et arendaja saaks selle põhjal otse testi luua. Vihje: kui `Given` on liiga ebamäärane ("kasutaja on autenditud"), siis täpsusta ("kasutaja on autenditud ID-kaardi sessiooniga, mille TTL on > 10 min").

## S1 — Õnnelik rada: <pealkiri>

**Seotud nõue:** R1

```gherkin
Given <konkreetne algolukord>
And <täiendav kontekst>
When <kasutaja tegevus>
Then <oodatav süsteemi reaktsioon>
And <täiendav verifikatsioon>
```

## S2 — Erijuhtum: <pealkiri>

**Seotud nõue:** R1, R2

```gherkin
Given <konkreetne algolukord>
When <kasutaja tegevus erilises kontekstis>
Then <oodatav käitumine erijuhtumis>
```

## S3 — Vea-stsenaarium: <pealkiri>

**Seotud nõue:** R2

```gherkin
Given <konkreetne algolukord>
When <tegevus mis võib ebaõnnestuda>
And <viga ilmneb>
Then <süsteem käsitleb viga viisil X>
And <kasutaja näeb sõnumit Y>
```

## S4 — <pealkiri>

...

## S5 — <pealkiri>

...

## Stsenaariumite katvuse kontroll

| Stsenaarium | Nõue | Stakeholder | Tüüp |
| --- | --- | --- | --- |
| S1 | R1 | Kasutaja | Õnnelik rada |
| S2 | R1, R2 | Kasutaja | Erijuhtum |
| S3 | R2 | Dispetšer | Vea-stsenaarium |
| S4 | R3 | Dispetšer | Õnnelik rada |
| S5 | R3 | Operatiivjuht | Erijuhtum |
