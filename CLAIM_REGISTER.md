# Claim Register: Access Layer

## Public Claim Rules
- Do not claim production security certification.
- Demo workspace is explicitly labeled DEMO.

## Claims

| Claim | Reality Label | Evidence | Risk | Safe Public Version | Proof Needed |
|-------|---------------|----------|------|---------------------|--------------|
| Issue and verify credentials in demo | DEMO | `AccessLayerDemoWorkspace` on `/demo` | low | "Walk through demo credential flow (sample rules)." | local test |
| v2 credentials, verify, ops routes exist | KNOWN | `src/app/v2`, `/verify`, `/ops` | low | "Explore product routes locally." | none |
| Production municipal deployment | PLANNED | marketing copy only | high | "Pilot-oriented; not proven live here." | customer proof |
| Local build passes | VERIFIED | portfolio matrix | low | Build verified. | none |
| app.accessxworld.com alternate URL | KNOWN | journey docs | low | Document both URLs if used. | DNS |

## Launch readiness
- **LOCAL REVIEW READY**
- **DEMO READY:** yes
- **PUBLIC READY:** no
