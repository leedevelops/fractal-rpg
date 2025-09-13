# Fractal RPG — Scaffold

Matrix‑first mobile PWA scaffold that loads/validates the 27‑row FRACTAL_MATRIX and wires four core gates:
- IdentityMirror (Square / Ch1)
- ShofarConvergence (Nested Fib Circles / Ch25)
- NetworkMultiplication (Fractal Network / Ch26)
- TwelveGateConvergence (New Jerusalem Grid / Ch27)

## Quick start
```bash
npm i
npm run dev
# open http://localhost:5173
```
Run tests:
```bash
npm run test
npm run test:e2e
```

## Vibe‑coding guardrails
- The app **fails at startup** if `FRACTAL_MATRIX` fails schema validation.
- Gates are selected by **geometryIcon → gateKey** mapping.
- Golden Path: `1 → 5 → 10 → 15 → 20 → 25 → 26 → 27`.

## What to build next
- Inventory/Sigils/Auras
- Resonance Engine (PRF world modifiers)
- Temple Templates (UI/audio rules per temple space)
- Real puzzles for each gate
