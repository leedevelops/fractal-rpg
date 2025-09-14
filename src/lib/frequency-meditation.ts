// Frequency meditation system from fractal-leader
// Integrates spiritual frequencies with the sacred matrix

import { MATRIX_FREQUENCIES, type MatrixFrequency } from '../content/enhancedSchema'

class FrequencyMeditationSystem {
  private audioContext: AudioContext | null = null
  private oscillator: OscillatorNode | null = null
  private gainNode: GainNode | null = null
  private isActive = false
  private currentFrequency: number | null = null
  private meditationTimer: NodeJS.Timeout | null = null

  constructor() {
    // Initialize audio context on user interaction
    if (typeof window !== 'undefined') {
      document.addEventListener('click', this.initializeAudioContext.bind(this), { once: true })
    }
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Audio context not supported:', error)
    }
  }

  async startFrequencyMeditation(frequency: number, durationSeconds: number = 120): Promise<void> {
    if (!this.audioContext) {
      this.initializeAudioContext()
      if (!this.audioContext) {
        throw new Error('Audio context not available')
      }
    }

    // Resume audio context if suspended
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }

    // Stop any existing meditation
    this.stopFrequencyMeditation()

    // Create oscillator and gain nodes
    this.oscillator = this.audioContext.createOscillator()
    this.gainNode = this.audioContext.createGain()

    // Configure oscillator
    this.oscillator.type = 'sine'
    this.oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

    // Configure gain (volume)
    this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    this.gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5) // Fade in

    // Connect nodes
    this.oscillator.connect(this.gainNode)
    this.gainNode.connect(this.audioContext.destination)

    // Start oscillator
    this.oscillator.start()

    this.isActive = true
    this.currentFrequency = frequency

    // Set timer to stop meditation
    this.meditationTimer = setTimeout(() => {
      this.stopFrequencyMeditation()
    }, durationSeconds * 1000)

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('meditationStarted', { 
      detail: { frequency, duration: durationSeconds } 
    }))
  }

  stopFrequencyMeditation(): void {
    if (this.oscillator && this.gainNode && this.audioContext) {
      // Fade out
      this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 0.5)
      
      // Stop oscillator after fade out
      setTimeout(() => {
        if (this.oscillator) {
          this.oscillator.stop()
          this.oscillator.disconnect()
          this.oscillator = null
        }
        if (this.gainNode) {
          this.gainNode.disconnect()
          this.gainNode = null
        }
      }, 500)
    }

    if (this.meditationTimer) {
      clearTimeout(this.meditationTimer)
      this.meditationTimer = null
    }

    this.isActive = false
    this.currentFrequency = null

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('meditationStopped'))
  }

  isMeditationActive(): boolean {
    return this.isActive
  }

  getCurrentFrequency(): number | null {
    return this.currentFrequency
  }
}

// Global instance
const meditationSystem = new FrequencyMeditationSystem()

// Public API functions
export const startFrequencyMeditation = (frequency: number, duration?: number) => 
  meditationSystem.startFrequencyMeditation(frequency, duration)

export const stopFrequencyMeditation = () => 
  meditationSystem.stopFrequencyMeditation()

export const isMeditationActive = () => 
  meditationSystem.isMeditationActive()

export const getCurrentFrequency = () => 
  meditationSystem.getCurrentFrequency()

// Get frequency for spiritual frequency name
export const getMatrixFrequency = (spiritualFrequency: string): number => {
  return MATRIX_FREQUENCIES[spiritualFrequency as MatrixFrequency] || 432 // Default to 432 Hz
}

// Binaural beats for enhanced meditation (optional advanced feature)
export class BinauralBeatsSystem {
  private audioContext: AudioContext | null = null
  private leftOscillator: OscillatorNode | null = null
  private rightOscillator: OscillatorNode | null = null
  private leftGain: GainNode | null = null
  private rightGain: GainNode | null = null
  private merger: ChannelMergerNode | null = null

  async startBinauralBeats(baseFreq: number, beatFreq: number, duration: number = 120): Promise<void> {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    }

    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume()
    }

    this.stopBinauralBeats()

    // Create stereo setup
    this.merger = this.audioContext.createChannelMerger(2)
    
    // Left ear (base frequency)
    this.leftOscillator = this.audioContext.createOscillator()
    this.leftGain = this.audioContext.createGain()
    this.leftOscillator.frequency.value = baseFreq
    this.leftOscillator.type = 'sine'
    this.leftGain.gain.value = 0.1
    
    // Right ear (base + beat frequency)
    this.rightOscillator = this.audioContext.createOscillator()
    this.rightGain = this.audioContext.createGain()
    this.rightOscillator.frequency.value = baseFreq + beatFreq
    this.rightOscillator.type = 'sine'
    this.rightGain.gain.value = 0.1

    // Connect left channel
    this.leftOscillator.connect(this.leftGain)
    this.leftGain.connect(this.merger, 0, 0)

    // Connect right channel
    this.rightOscillator.connect(this.rightGain)
    this.rightGain.connect(this.merger, 0, 1)

    // Connect to destination
    this.merger.connect(this.audioContext.destination)

    // Start oscillators
    this.leftOscillator.start()
    this.rightOscillator.start()

    // Auto-stop after duration
    setTimeout(() => this.stopBinauralBeats(), duration * 1000)
  }

  stopBinauralBeats(): void {
    if (this.leftOscillator) {
      this.leftOscillator.stop()
      this.leftOscillator.disconnect()
      this.leftOscillator = null
    }
    if (this.rightOscillator) {
      this.rightOscillator.stop()
      this.rightOscillator.disconnect()
      this.rightOscillator = null
    }
    if (this.leftGain) {
      this.leftGain.disconnect()
      this.leftGain = null
    }
    if (this.rightGain) {
      this.rightGain.disconnect()
      this.rightGain = null
    }
    if (this.merger) {
      this.merger.disconnect()
      this.merger = null
    }
  }
}

// Preset meditation frequencies for different spiritual states
export const MEDITATION_PRESETS = {
  grounding: { frequency: 174, duration: 300 }, // 5 minutes
  healing: { frequency: 528, duration: 600 }, // 10 minutes
  transformation: { frequency: 741, duration: 480 }, // 8 minutes
  intuition: { frequency: 852, duration: 420 }, // 7 minutes
  unity: { frequency: 963, duration: 900 } // 15 minutes
} as const
