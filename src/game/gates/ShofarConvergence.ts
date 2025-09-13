import { IFractalGate, GateResult } from './types'

export default function ShofarConvergence(): IFractalGate {
  let phase = 'listen'
  let progress = 0
  const seq = ['call','respond','send']
  return {
    key: 'ShofarConvergence',
    title: 'Shofar Convergence',
    describe(){ return 'Match the three-phase call → response → send.' },
    start(){ phase='listen'; progress=0 },
    interact(e){
      if(e.type===seq[progress]){ progress++ }
    },
    status(){ return { phase, progress: progress/seq.length } },
    complete(): GateResult { return { success: progress===seq.length } }
  }
}
