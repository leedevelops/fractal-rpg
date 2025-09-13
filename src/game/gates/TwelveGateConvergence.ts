import { IFractalGate, GateResult } from './types'

export default function TwelveGateConvergence(): IFractalGate {
  // Assemble 12 sigils (toy: press 12 times)
  let count = 0
  const target = 12
  return {
    key: 'TwelveGateConvergence',
    title: 'Twelve-Gate Convergence',
    describe(){ return 'Assemble the twelve sigils into the city pattern.' },
    start(){ count=0 },
    interact(e){ if(e.type==='place'){ count = Math.min(target, count+1) } },
    status(){ return { phase:'assemble', progress: count/target } },
    complete(): GateResult { return { success: count===target } }
  }
}
