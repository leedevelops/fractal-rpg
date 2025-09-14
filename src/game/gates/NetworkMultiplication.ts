import { IFractalGate, GateResult } from './types'

type NetworkPhase = 'connect' | 'multiply' | 'replicate' | 'global'
type NetworkState = {
  nodes: Record<string, { connected: boolean; multiplied: boolean; replicated: boolean }>
  connections: string[]
  multiplications: number
  globalReach: boolean
}

const NETWORK_NODES = [
  { id: 'center', name: 'You (Center)', position: { x: 150, y: 150 } },
  { id: 'family', name: 'Family', position: { x: 75, y: 75 } },
  { id: 'church', name: 'Church', position: { x: 225, y: 75 } },
  { id: 'workplace', name: 'Workplace', position: { x: 75, y: 225 } },
  { id: 'community', name: 'Community', position: { x: 225, y: 225 } },
  { id: 'nation', name: 'Nation', position: { x: 150, y: 50 } },
  { id: 'nations', name: 'All Nations', position: { x: 150, y: 250 } }
]

const MULTIPLICATION_PATTERNS = [
  "Each person reaches 2 others",
  "Each group plants 3 new groups", 
  "Each network spawns 5 networks",
  "Exponential kingdom growth"
]

export default function NetworkMultiplication(): IFractalGate {
  let state: NetworkState = {
    nodes: {},
    connections: [],
    multiplications: 0,
    globalReach: false
  }
  let phase: NetworkPhase = 'connect'
  
  // Initialize nodes
  NETWORK_NODES.forEach(node => {
    state.nodes[node.id] = { connected: false, multiplied: false, replicated: false }
  })
  
  function getProgress(): number {
    const connected = Object.values(state.nodes).filter(n => n.connected).length
    const multiplied = Object.values(state.nodes).filter(n => n.multiplied).length
    const replicated = Object.values(state.nodes).filter(n => n.replicated).length
    const global = state.globalReach ? 1 : 0
    
    return (connected + multiplied + replicated + global * 7) / 28
  }
  
  return {
    key: 'NetworkMultiplication',
    title: 'Fractal Network - The Apostolic Multiplication Pattern',
    describe(){ return 'Connect, multiply, and replicate the kingdom network across all spheres of influence.' },
    
    start(){
      state = {
        nodes: {},
        connections: [],
        multiplications: 0,
        globalReach: false
      }
      NETWORK_NODES.forEach(node => {
        state.nodes[node.id] = { connected: false, multiplied: false, replicated: false }
      })
      phase = 'connect'
    },
    
    interact(e){
      if(e.type === 'connect_node' && e.data){
        const nodeId = e.data as string
        if(state.nodes[nodeId]){
          state.nodes[nodeId].connected = true
          state.connections.push(nodeId)
        }
      }
      else if(e.type === 'multiply_node' && e.data){
        const nodeId = e.data as string
        if(state.nodes[nodeId] && state.nodes[nodeId].connected){
          state.nodes[nodeId].multiplied = true
          state.multiplications++
        }
      }
      else if(e.type === 'replicate_node' && e.data){
        const nodeId = e.data as string
        if(state.nodes[nodeId] && state.nodes[nodeId].multiplied){
          state.nodes[nodeId].replicated = true
        }
      }
      else if(e.type === 'activate_global'){
        state.globalReach = true
      }
      
      // Auto-advance phases
      const allConnected = Object.values(state.nodes).every(n => n.connected)
      const allMultiplied = Object.values(state.nodes).every(n => n.multiplied)
      const allReplicated = Object.values(state.nodes).every(n => n.replicated)
      
      if(allConnected && phase === 'connect'){
        phase = 'multiply'
      } else if(allMultiplied && phase === 'multiply'){
        phase = 'replicate'
      } else if(allReplicated && phase === 'replicate'){
        phase = 'global'
      }
    },
    
    status(){ 
      return { 
        phase, 
        progress: getProgress(),
        state: { ...state },
        networkNodes: NETWORK_NODES,
        multiplicationPatterns: MULTIPLICATION_PATTERNS
      } 
    },
    
    complete(): GateResult { 
      const allConnected = Object.values(state.nodes).every(n => n.connected)
      const allMultiplied = Object.values(state.nodes).every(n => n.multiplied)
      const allReplicated = Object.values(state.nodes).every(n => n.replicated)
      const globalReach = state.globalReach
      
      const success = allConnected && allMultiplied && allReplicated && globalReach
      
      return { 
        success,
        payload: {
          badge: success ? 'Apostolic Multiplier' : null,
          commission: success ? 'You are commissioned to multiply the kingdom through fractal networks' : null,
          state
        }
      }
    }
  }
}
