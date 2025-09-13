import { IFractalGate, GateResult } from './types'

export default function IdentityMirror(): IFractalGate {
  let progress = 0
  let phase = 'flip'
  const total = 3
  return {
    key: 'IdentityMirror',
    title: 'Identity Mirror',
    describe(){ return 'Flip three tiles to reveal the core pattern.' },
    start(){ progress = 0; phase = 'flip' },
    interact(e){ if(e.type==='flip'){ progress = Math.min(total, progress+1) } },
    status(){ return { phase, progress: progress/total } },
    complete(): GateResult { return { success: progress===total } }
  }
}
