# Proof Loop — Access Layer (AXW)

## Proof needed
**Product proof:** Operator can explain credential → pass → verify flow in under 2 minutes.

## Fastest test
`pnpm dev` → `/demo` → follow linked routes → issue demo credential at `/v2/credentials` (if env allows).

## Success threshold
- Visitor names the buyer (venue operator / city pilot) and the wedge (unified access credentials).
- One complete demo path clicked without 404 on core links.

## Failure threshold
- Hero does not say who buys or what replaces spreadsheets + badge chaos.
- Build fails or verify route crashes without env docs.

## Data to collect
- Time-to-first-pass (stopwatch)
- Which route confused reviewers (notes)

## Decision rule
**Continue** if 2+ reviewers complete demo path and trust disclaimer is visible. **Pause GTM** if verify/ops routes break without documented env setup.

## Next experiment
Record 3-minute Loom of SF pilot narrative → `/case-studies/sf-pilot` CTA test.
