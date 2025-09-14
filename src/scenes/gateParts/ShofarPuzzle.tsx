import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShofarPuzzleProps {
  gateStatus: any
  onInteract: (event: { type: string; data?: any }) => void
  onComplete: () => void
}

const FIBONACCI_RADII = [30, 30, 60, 90, 150] // Fibonacci sequence scaled for circles

export default function ShofarPuzzle({ gateStatus, onInteract, onComplete }: ShofarPuzzleProps) {
  const [currentStep, setCurrentStep] = useState<'align' | 'breathe' | 'sound' | 'commission'>('align')
  const [breathIndex, setBreathIndex] = useState(0)
  const [shofarIndex, setShofarIndex] = useState(0)

  const state = gateStatus?.state || {}
  const fibonacciCircles = gateStatus?.fibonacciCircles || []
  const breathPatterns = gateStatus?.breathPatterns || []
  const shofarCalls = gateStatus?.shofarCalls || []
  const phase = gateStatus?.phase || 'align'

  useEffect(() => {
    setCurrentStep(phase)
  }, [phase])

  const handleCircleClick = (circleIndex: number) => {
    if (currentStep === 'align' && !state.circles?.[circleIndex]) {
      onInteract('align_circle', circleIndex)
    }
  }

  const handleBreathStep = () => {
    if (currentStep === 'breathe' && breathIndex < breathPatterns.length) {
      onInteract('breath_step', breathIndex)
      setBreathIndex(breathIndex + 1)
    }
  }

  const handleShofarCall = () => {
    if (currentStep === 'sound' && shofarIndex < shofarCalls.length) {
      onInteract('shofar_call', shofarIndex)
      setShofarIndex(shofarIndex + 1)
    }
  }

  const handleCommission = () => {
    if (currentStep === 'commission') {
      onInteract('receive_commission')
      onComplete()
    }
  }

  const canComplete = () => {
    const allCirclesAligned = Object.values(state.circles || {}).every(Boolean)
    const breathComplete = (state.breathPattern || []).length >= 5
    const shofarComplete = (state.shofarSounds || []).length >= 5
    const commissioned = state.commissioned
    return allCirclesAligned && breathComplete && shofarComplete && commissioned
  }

  return (
    <div style={{ minHeight: '60vh', position: 'relative' }}>
      {/* Progress indicator */}
      <div className="badge" style={{ marginBottom: '1rem' }}>
        Progress: {((gateStatus?.progress || 0) * 100).toFixed(0)}%
      </div>

      {/* Nested Fibonacci Circles */}
      <div style={{
        position: 'relative',
        width: '400px',
        height: '400px',
        margin: '2rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {FIBONACCI_RADII.map((radius, index) => {
          const isAligned = state.circles?.[index + 1]
          const fibNumber = fibonacciCircles[index]
          
          return (
            <motion.div
              key={index}
              style={{
                position: 'absolute',
                width: radius * 2,
                height: radius * 2,
                borderRadius: '50%',
                border: `2px solid ${isAligned ? '#8ad' : '#334'}`,
                background: isAligned ? 'radial-gradient(circle, rgba(136,170,221,0.1), transparent)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentStep === 'align' ? 'pointer' : 'default',
                fontSize: '12px',
                color: isAligned ? '#8ad' : '#666'
              }}
              onClick={() => handleCircleClick(index + 1)}
              whileHover={currentStep === 'align' ? { scale: 1.05 } : {}}
              animate={isAligned ? {
                borderColor: ['#8ad', '#ff6b35', '#8ad'],
                boxShadow: ['0 0 10px #8ad', '0 0 20px #ff6b35', '0 0 10px #8ad']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {fibNumber}
            </motion.div>
          )
        })}
      </div>

      {/* Step-specific UI */}
      <AnimatePresence mode="wait">
        {currentStep === 'align' && (
          <motion.div
            key="align"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h3>Align the Fibonacci Circles</h3>
            <p>Click each circle in sequence to align them with the divine pattern: 1, 1, 2, 3, 5</p>
            <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1rem' }}>
              {fibonacciCircles.map((num: number, index: number) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  opacity: state.circles?.[index + 1] ? 1 : 0.5
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: state.circles?.[index + 1] ? '#8ad' : '#334'
                  }} />
                  Circle {index + 1}: {num}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {currentStep === 'breathe' && (
          <motion.div
            key="breathe"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h3>Master the Breath of Heaven</h3>
            <p>Follow each breathing pattern to prepare for the shofar call:</p>
            {breathIndex < breathPatterns.length ? (
              <div>
                <p><strong>Step {breathIndex + 1}:</strong> {breathPatterns[breathIndex]}</p>
                <button onClick={handleBreathStep}>
                  Complete Breath Step
                </button>
              </div>
            ) : (
              <p style={{ color: '#8ad' }}>✓ Breath pattern mastered</p>
            )}
            <div style={{ marginTop: '1rem', fontSize: '12px' }}>
              Progress: {breathIndex}/{breathPatterns.length}
            </div>
          </motion.div>
        )}

        {currentStep === 'sound' && (
          <motion.div
            key="sound"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h3>Sound the Shofar</h3>
            <p>Sound each shofar call with intention and power:</p>
            {shofarIndex < shofarCalls.length ? (
              <div>
                <h4>{shofarCalls[shofarIndex]?.name}</h4>
                <p><strong>{shofarCalls[shofarIndex]?.meaning}</strong></p>
                <p>Duration: {shofarCalls[shofarIndex]?.duration}</p>
                <button onClick={handleShofarCall}>
                  🎺 Sound {shofarCalls[shofarIndex]?.name}
                </button>
              </div>
            ) : (
              <p style={{ color: '#8ad' }}>✓ All shofar calls completed</p>
            )}
            <div style={{ marginTop: '1rem', fontSize: '12px' }}>
              Progress: {shofarIndex}/{shofarCalls.length}
            </div>
          </motion.div>
        )}

        {currentStep === 'commission' && (
          <motion.div
            key="commission"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card"
          >
            <h3>Receive Your Commission</h3>
            <p>You have mastered the Fibonacci pattern, the breath of heaven, and the shofar calls.</p>
            <p>You are now ready to be commissioned as a messenger to the nations.</p>
            <button 
              onClick={handleCommission}
              style={{ 
                background: 'linear-gradient(45deg, #8ad, #ff6b35)',
                color: '#000',
                fontWeight: 'bold'
              }}
            >
              🎺 Receive Commission
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion status */}
      {canComplete() && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card"
          style={{ 
            marginTop: '1rem', 
            background: 'linear-gradient(45deg, #8ad, #ff6b35)',
            color: '#000'
          }}
        >
          <h3>🎺 Commissioned Messenger!</h3>
          <p>You have earned the "Commissioned Messenger" badge.</p>
          <p>Go forth and sound the shofar of awakening to the nations!</p>
        </motion.div>
      )}
    </div>
  )
}
