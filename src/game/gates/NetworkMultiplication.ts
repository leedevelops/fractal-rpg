import { IFractalGate, GateResult } from './types'

export default function NetworkMultiplication(): IFractalGate {
  // Connect 3 links without crossing budget (toy version)
  let links = 0
  const needed = 3
  return {
    key: 'NetworkMultiplication',
    title: 'Network Multiplication',
    describe(){ return 'Create three links to expand the network.' },
    start(){ links = 0 },
    interact(e){ if(e.type==='link'){ links = Math.min(needed, links+1) } },
    status(){ return { phase:'link', progress: links/needed } },
    complete(): GateResult { return { success: links===needed, payload:{links} } }
  }
}
