# Local Review — Access Layer

**Date:** 2026-05-16 · **Deploy:** Not run

```bash
cd /Users/joshuadavis/startups/access-layer
rm -rf node_modules .next && pnpm install   # if next binary missing
pnpm build && pnpm dev
```

**Routes:** `/` · `/demo` · `/verify` · `/v2/simulator` · `/ops`

**Acceptance:** build exit 0 · mobile nav usable · demo disclaimer on `/demo` · no fake deployment/certification claims

**Limitations:** Large route surface — pilot scope only; Supabase/env may be required for live verify.
