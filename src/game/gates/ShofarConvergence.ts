import { IFractalGate, GateResult } from './types'

type ShofarPhase = 'align' | 'breathe' | 'sound' | 'commission'
type CircleState = {
  circles: Record<number, boolean> // Fibonacci sequence: 1,1,2,3,5
  breathPattern: number[]
  shofarSounds: string[]
  commissioned: boolean
}

const FIBONACCI_CIRCLES = [1, 1, 2, 3, 5]
const BREATH_PATTERNS = [
  "Deep inhale for 4 counts",
  "Hold breath for 7 counts", 
  "Exhale slowly for 8 counts",
  "Rest in silence for 3 counts",
  "Feel the convergence"
]

const SHOFAR_CALLS = [
  { name: "Tekiah", meaning: "Blast - Awakening call", duration: "long" },
  { name: "Shevarim", meaning: "Broken - Repentance", duration: "3 short" },
  { name: "Teruah", meaning: "Alarm - Urgent call", duration: "9 staccato" },
  { name: "Tekiah Gedolah", meaning: "Great Blast - Final call", duration: "very long" },
  { name: "Convergence", meaning: "All sounds unite", duration: "eternal" }
]

export default function ShofarConvergence(): IFractalGate {
  let state: CircleState = {
    circles: { 1: false, 2: false, 3: false, 4: false, 5: false },
    breathPattern: [],
    shofarSounds: [],
    commissioned: false
  }
  let phase: ShofarPhase = 'align'
  
  function getProgress(): number {
    const circlesAligned = Object.values(state.circles).filter(Boolean).length
    const breathComplete = state.breathPattern.length >= 5 ? 1 : 0
    const shofarComplete = state.shofarSounds.length >= 5 ? 1 : 0
    const commissionComplete = state.commissioned ? 1 : 0
    
    return (circlesAligned + breathComplete * 5 + shofarComplete * 5 + commissionComplete * 5) / 20
  }
  
  return {
    key: 'ShofarConvergence',
    title: 'Nested Fibonacci Circles - The Commissioning Pattern',
    describe(){ return 'Align the 5 nested Fibonacci circles, master the breath of heaven, and sound the shofar of commissioning.' },
    
    start(){
      state = {
        circles: { 1: false, 2: false, 3: false, 4: false, 5: false },
        breathPattern: [],
        shofarSounds: [],
        commissioned: false
      }
      phase = 'align'
    },
    
    interact(e){
      if(e.type === 'align_circle' && e.data){
        const circleIndex = e.data as number
        if(circleIndex >= 1 && circleIndex <= 5){
          state.circles[circleIndex] = true
        }
      }
      else if(e.type === 'breath_step' && e.data){
        const stepIndex = e.data as number
        if(stepIndex >= 0 && stepIndex < BREATH_PATTERNS.length){
          state.breathPattern.push(stepIndex)
        }
      }
      else if(e.type === 'shofar_call' && e.data){
        const callIndex = e.data as number
        if(callIndex >= 0 && callIndex < SHOFAR_CALLS.length){
          state.shofarSounds.push(SHOFAR_CALLS[callIndex].name)
        }
      }
      else if(e.type === 'receive_commission'){
        state.commissioned = true
      }
      
      // Auto-advance phases
      const allCirclesAligned = Object.values(state.circles).every(Boolean)
      const breathComplete = state.breathPattern.length >= 5
      const shofarComplete = state.shofarSounds.length >= 5
      
      if(allCirclesAligned && phase === 'align'){
        phase = 'breathe'
      } else if(breathComplete && phase === 'breathe'){
        phase = 'sound'
      } else if(shofarComplete && phase === 'sound'){
        phase = 'commission'
      }
    },
    
    status(){ 
      return { 
        phase, 
        progress: getProgress(),
        state: { ...state },
        fibonacciCircles: FIBONACCI_CIRCLES,
        breathPatterns: BREATH_PATTERNS,
        shofarCalls: SHOFAR_CALLS
      } 
    },
    
    complete(): GateResult { 
      const allCirclesAligned = Object.values(state.circles).every(Boolean)
      const breathComplete = state.breathPattern.length >= 5
      const shofarComplete = state.shofarSounds.length >= 5
      const commissioned = state.commissioned
      
      const success = allCirclesAligned && breathComplete && shofarComplete && commissioned
      
      return { 
        success,
        payload: {
          badge: success ? 'Commissioned Messenger' : null,
          commission: success ? 'You are commissioned to sound the shofar of awakening to the nations' : null,
          state
        }
      }
    }
  }
}
