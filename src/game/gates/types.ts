export type GateResult = { success: boolean; payload?: Record<string, unknown> }

export interface IFractalGate {
  key: string
  title: string
  describe(): string
  start(options?: Record<string, unknown>): void
  interact(event: { type: string; data?: unknown }): void
  status(): { phase: string; progress: number }
  complete(): GateResult
}

export type GateFactory = (config?: Record<string, unknown>) => IFractalGate
export type GateRegistry = Record<string, GateFactory>
