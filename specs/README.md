# ⚠️ DEPRECATED — see kaust ei ole enam kasutusel

> See `specs/` kaust oli varem H3 harjutuse sihtkoht. **Praegu kasutame sprint-paketi struktuuri** kataloogis [`docs/sprints/`](../docs/sprints/).

## Mida teha?

- **Uue sprindi loomine:** Kopeeri [`docs/sprints/_template/`](../docs/sprints/_template/) uue nimega `docs/sprints/sprint-XX-<luhinimi>/`
- **Speckit `/specify` käivitamine:** Vt [`docs/sprints/README.md`](../docs/sprints/README.md) — sprint-paketi sees on `spec.md` faili koht
- **Olemasolev `_MALL-feature.spec.md`:** Säilitatud allpool ajaloolise viite jaoks, aga uus mall on `docs/sprints/_template/spec.md`

## Põhjendus muudatusele

Spec üksi ei ole tervet pilt. Sprint-pakett (spec + scenarios + technical-plan + tasks + prototype + research) elab koos ja annab AI agendile + arendajale **täieliku konteksti** ühes kataloogis. See on tänase agentse arenduse argipäeva-muster.

Vt ka eeskuju: [`ritemark-native/docs/development/sprints/sprint-72-markdown-navigation-annotations/`](file:///Users/jarmotuisk/Projects/ritemark-native/docs/development/sprints/sprint-72-markdown-navigation-annotations/)
