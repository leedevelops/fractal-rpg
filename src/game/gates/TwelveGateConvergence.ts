import { IFractalGate, GateResult } from './types'

type ConvergencePhase = 'gates' | 'tribes' | 'foundations' | 'seal'
type ConvergenceState = {
  gates: Record<string, boolean>
  tribes: Record<string, boolean>
  foundations: Record<string, boolean>
  sealed: boolean
}

const TWELVE_GATES = [
  { direction: 'North', gates: ['Judah', 'Reuben', 'Gad'] },
  { direction: 'East', gates: ['Joseph', 'Benjamin', 'Dan'] },
  { direction: 'South', gates: ['Simeon', 'Levi', 'Issachar'] },
  { direction: 'West', gates: ['Zebulun', 'Naphtali', 'Asher'] }
]

const TWELVE_FOUNDATIONS = [
  'Peter', 'Andrew', 'James', 'John', 'Philip', 'Bartholomew',
  'Matthew', 'Thomas', 'James (Alphaeus)', 'Thaddeus', 'Simon', 'Matthias'
]

export default function TwelveGateConvergence(): IFractalGate {
  let state: ConvergenceState = {
    gates: {},
    tribes: {},
    foundations: {},
    sealed: false
  }
  let phase: ConvergencePhase = 'gates'
  
  // Initialize all gates, tribes, and foundations
  TWELVE_GATES.forEach(direction => {
    direction.gates.forEach(gate => {
      state.gates[gate] = false
      state.tribes[gate] = false
    })
  })
  TWELVE_FOUNDATIONS.forEach(foundation => {
    state.foundations[foundation] = false
  })
  
  function getProgress(): number {
    const gatesPlaced = Object.values(state.gates).filter(Boolean).length
    const tribesAligned = Object.values(state.tribes).filter(Boolean).length
    const foundationsSet = Object.values(state.foundations).filter(Boolean).length
    const sealComplete = state.sealed ? 1 : 0
    
    return (gatesPlaced + tribesAligned + foundationsSet + sealComplete * 12) / 48
  }
  
  return {
    key: 'TwelveGateConvergence',
    title: 'New Jerusalem Grid - The Pattern Sealed',
    describe(){ return 'Place the 12 gates, align the tribes, set the apostolic foundations, and seal the eternal pattern.' },
    
    start(){
      state = {
        gates: {},
        tribes: {},
        foundations: {},
        sealed: false
      }
      TWELVE_GATES.forEach(direction => {
        direction.gates.forEach(gate => {
          state.gates[gate] = false
          state.tribes[gate] = false
        })
      })
      TWELVE_FOUNDATIONS.forEach(foundation => {
        state.foundations[foundation] = false
      })
      phase = 'gates'
    },
    
    interact(e){
      if(e.type === 'place_gate' && e.data){
        const gateName = e.data as string
        if(gateName in state.gates){
          state.gates[gateName] = true
        }
      }
      else if(e.type === 'align_tribe' && e.data){
        const tribeName = e.data as string
        if(tribeName in state.tribes){
          state.tribes[tribeName] = true
        }
      }
      else if(e.type === 'set_foundation' && e.data){
        const foundationName = e.data as string
        if(foundationName in state.foundations){
          state.foundations[foundationName] = true
        }
      }
      else if(e.type === 'seal_pattern'){
        state.sealed = true
      }
      
      // Auto-advance phases
      const allGatesPlaced = Object.values(state.gates).every(Boolean)
      const allTribesAligned = Object.values(state.tribes).every(Boolean)
      const allFoundationsSet = Object.values(state.foundations).every(Boolean)
      
      if(allGatesPlaced && phase === 'gates'){
        phase = 'tribes'
      } else if(allTribesAligned && phase === 'tribes'){
        phase = 'foundations'
      } else if(allFoundationsSet && phase === 'foundations'){
        phase = 'seal'
      }
    },
    
    status(){ 
      return { 
        phase, 
        progress: getProgress(),
        state: { ...state },
        twelveGates: TWELVE_GATES,
        twelveFoundations: TWELVE_FOUNDATIONS
      } 
    },
    
    complete(): GateResult { 
      const allGatesPlaced = Object.values(state.gates).every(Boolean)
      const allTribesAligned = Object.values(state.tribes).every(Boolean)
      const allFoundationsSet = Object.values(state.foundations).every(Boolean)
      const patternSealed = state.sealed
      
      const success = allGatesPlaced && allTribesAligned && allFoundationsSet && patternSealed
      
      return { 
        success,
        payload: {
          badge: success ? 'Pattern Keeper' : null,
          seal: success ? 'The eternal pattern is sealed - Amen and Amen' : null,
          state
        }
      }
    }
  }
}
