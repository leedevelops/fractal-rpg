import { GateRegistry } from './types'
import IdentityMirror from './IdentityMirror'
import ShofarConvergence from './ShofarConvergence'
import NetworkMultiplication from './NetworkMultiplication'
import TwelveGateConvergence from './TwelveGateConvergence'

export const Gates: GateRegistry = {
  IdentityMirror: () => IdentityMirror(),
  ShofarConvergence: () => ShofarConvergence(),
  NetworkMultiplication: () => NetworkMultiplication(),
  TwelveGateConvergence: () => TwelveGateConvergence()
}

// map geometry to gate key
export function gateKeyFromGeometry(geometryIcon: string): keyof typeof Gates | 'Placeholder' {
  if(geometryIcon.includes('Square')) return 'IdentityMirror'
  if(geometryIcon.includes('Nested Fib')) return 'ShofarConvergence'
  if(geometryIcon.includes('Fractal Network')) return 'NetworkMultiplication'
  if(geometryIcon.includes('New Jerusalem')) return 'TwelveGateConvergence'
  return 'Placeholder'
}
