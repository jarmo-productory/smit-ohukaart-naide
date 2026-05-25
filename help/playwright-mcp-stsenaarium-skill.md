# playwright-mcp: stsenaariumipõhine skill-struktuur

> Edasijõudnud pattern — sobib neile, kes tahavad iga Gherkin stsenaariumi eraldi failina MCP sammudena kapseleerida.

## Kataloogistruktuur

```
.agents/skills/playwright-mcp/
├── SKILL.md              ← koor-kompetents: kuidas MCP tööriistu kasutada
└── scenarios/
    ├── S1-happy-path.md  ← Given/When/Then → konkreetsed MCP sammud
    ├── S2-gps-missing.md
    └── S3-server-error.md
```

## Stsenaariumi faili formaat

Iga `scenarios/S*.md` fail kirjeldab ühe stsenaariumi MCP-sammudena:

```markdown
# S1 — Happy path

## Given
- Kasutaja on lehel /send

## Sammud (MCP)
1. browser_navigate → localhost:3000/send
2. browser_screenshot → kontrolli et leht laadis
3. browser_click → pildivaliku nupp
4. browser_fill → vormiväljad
5. browser_click → "Saada" nupp

## Expected
- ACK sõnum kuvatakse ekraanil
```

Agent laeb konkreetse stsenaariumi, käivitab MCP sammud järjest live brauseri vastu ja raporteerib PASS/FAIL + screenshot. Sama lähenemine, mida kasutab nt `gamma-slides` skill — agent juhib brauserit süstemaatiliselt, mitte ei genereeri testi koodi.

## Käivitamise prompt

```plaintext
Käivita `playwright-mcp` skill — jooksuta stsenaarium S1 MCP kaudu.
Kasuta sisemist brauserit (localhost:3000). Raportoi PASS/FAIL + screenshot.
```

## Millal kasutada

| Olukord | Valik |
|---------|-------|
| Kiire eksploratsioon, CI-ta keskkond (nt koolitusel) | MCP-stsenaarium |
| Regressioonkaitse, CI pipeline | `.spec.ts` (playwright-spec skill) |
