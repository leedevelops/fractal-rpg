import { useState, useEffect } from 'react'

export interface GateModifierProps {
  modifier: string
  onModifierComplete: () => void
  children: React.ReactNode
}

// Revelation Modifier: discover hidden rule; minimal text
export function RevelationModifier({ onModifierComplete, children }: GateModifierProps) {
  const [hintsRevealed, setHintsRevealed] = useState(0)
  const [ruleDiscovered, setRuleDiscovered] = useState(false)
  
  const hints = [
    "Look for the pattern...",
    "What connects all elements?",
    "The answer lies in the sequence."
  ]
  
  const revealNextHint = () => {
    if (hintsRevealed < hints.length - 1) {
      setHintsRevealed(hintsRevealed + 1)
    } else {
      setRuleDiscovered(true)
      onModifierComplete()
    }
  }
  
  return (
    <div>
      <div className="card mb-3" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--accent-primary)' }}>
        <h4 className="text-accent">🔍 Revelation Gate</h4>
        <p className="text-sm mb-2">Discover the hidden rule to unlock the puzzle</p>
        
        {hintsRevealed < hints.length && (
          <div className="mb-2">
            <p className="text-muted">{hints[hintsRevealed]}</p>
            <button onClick={revealNextHint} className="secondary" style={{ fontSize: '12px', padding: '4px 8px' }}>
              {hintsRevealed === hints.length - 1 ? 'Discover Rule' : 'Next Hint'}
            </button>
          </div>
        )}
        
        {ruleDiscovered && (
          <div className="text-center">
            <p className="text-accent">✨ Rule Discovered! Puzzle unlocked.</p>
          </div>
        )}
      </div>
      
      <div style={{ opacity: ruleDiscovered ? 1 : 0.5, pointerEvents: ruleDiscovered ? 'auto' : 'none' }}>
        {children}
      </div>
    </div>
  )
}

// Internalization Modifier: 1-2 line reflection unlocks puzzle aid
export function InternalizationModifier({ onModifierComplete, children }: GateModifierProps) {
  const [reflection, setReflection] = useState('')
  const [aidUnlocked, setAidUnlocked] = useState(false)
  
  const handleReflectionSubmit = () => {
    if (reflection.trim().length >= 10) { // Minimum meaningful reflection
      setAidUnlocked(true)
      onModifierComplete()
    }
  }
  
  return (
    <div>
      <div className="card mb-3" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--accent-secondary)' }}>
        <h4 className="text-accent">💭 Internalization Gate</h4>
        <p className="text-sm mb-2">Reflect on this truth to receive guidance</p>
        
        {!aidUnlocked ? (
          <div>
            <p className="text-muted mb-2">How does this principle apply to your leadership?</p>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Share your reflection (1-2 lines)..."
              className="w-full"
              style={{ 
                minHeight: '60px', 
                padding: 'var(--space-sm)', 
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--surface-base)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                resize: 'vertical'
              }}
            />
            <button 
              onClick={handleReflectionSubmit} 
              disabled={reflection.trim().length < 10}
              className="primary mt-2"
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              Submit Reflection
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-accent">✨ Reflection complete! Guidance activated.</p>
            <div className="card-elevated mt-2" style={{ padding: 'var(--space-sm)' }}>
              <p className="text-sm text-muted">💡 Hint: Look for symmetrical patterns</p>
            </div>
          </div>
        )}
      </div>
      
      <div style={{ opacity: aidUnlocked ? 1 : 0.7 }}>
        {children}
      </div>
    </div>
  )
}

// Embodiment Modifier: breath/voice/physical micro-action required
export function EmbodimentModifier({ onModifierComplete, children }: GateModifierProps) {
  const [actionCompleted, setActionCompleted] = useState(false)
  const [breathCount, setBreathCount] = useState(0)
  const [isBreathing, setIsBreathing] = useState(false)
  
  const startBreathingExercise = () => {
    setIsBreathing(true)
    const breathingTimer = setInterval(() => {
      setBreathCount(prev => {
        const newCount = prev + 1
        if (newCount >= 3) {
          clearInterval(breathingTimer)
          setActionCompleted(true)
          setIsBreathing(false)
          onModifierComplete()
        }
        return newCount
      })
    }, 3000) // 3 seconds per breath cycle
  }
  
  return (
    <div>
      <div className="card mb-3" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--accent-warm)' }}>
        <h4 className="text-accent">🫁 Embodiment Gate</h4>
        <p className="text-sm mb-2">Engage your body to unlock the puzzle</p>
        
        {!actionCompleted ? (
          <div className="text-center">
            <p className="text-muted mb-2">Take 3 deep breaths to center yourself</p>
            {!isBreathing ? (
              <button onClick={startBreathingExercise} className="primary">
                Begin Breathing Exercise
              </button>
            ) : (
              <div>
                <div 
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 3s infinite'
                  }}
                >
                  🫁
                </div>
                <p className="mt-2">Breath {breathCount + 1}/3</p>
                <p className="text-sm text-muted">Breathe slowly and deeply...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-accent">✨ Embodiment complete! You are centered.</p>
          </div>
        )}
      </div>
      
      <div style={{ opacity: actionCompleted ? 1 : 0.6 }}>
        {children}
      </div>
    </div>
  )
}

// Integration Modifier: link two prior concepts in one board
export function IntegrationModifier({ onModifierComplete, children }: GateModifierProps) {
  const [concept1Selected, setConcept1Selected] = useState('')
  const [concept2Selected, setConcept2Selected] = useState('')
  const [integrationComplete, setIntegrationComplete] = useState(false)
  
  const concepts = ['Glory', 'Presence', 'Voice', 'Word', 'Spirit', 'Image']
  
  const handleIntegration = () => {
    if (concept1Selected && concept2Selected && concept1Selected !== concept2Selected) {
      setIntegrationComplete(true)
      onModifierComplete()
    }
  }
  
  return (
    <div>
      <div className="card mb-3" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid var(--accent-secondary)' }}>
        <h4 className="text-accent">🔗 Integration Gate</h4>
        <p className="text-sm mb-2">Connect two dimensions to unlock deeper understanding</p>
        
        {!integrationComplete ? (
          <div>
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-sm)', marginBottom: 'var(--space-sm)' }}>
              <div>
                <label className="text-sm">First Concept:</label>
                <select 
                  value={concept1Selected} 
                  onChange={(e) => setConcept1Selected(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '4px', 
                    backgroundColor: 'var(--surface-base)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Select...</option>
                  {concepts.map(concept => (
                    <option key={concept} value={concept}>{concept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm">Second Concept:</label>
                <select 
                  value={concept2Selected} 
                  onChange={(e) => setConcept2Selected(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '4px', 
                    backgroundColor: 'var(--surface-base)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Select...</option>
                  {concepts.filter(c => c !== concept1Selected).map(concept => (
                    <option key={concept} value={concept}>{concept}</option>
                  ))}
                </select>
              </div>
            </div>
            <button 
              onClick={handleIntegration}
              disabled={!concept1Selected || !concept2Selected}
              className="primary"
              style={{ fontSize: '12px', padding: '4px 8px' }}
            >
              Integrate Concepts
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-accent">✨ Integration complete!</p>
            <p className="text-sm text-muted">{concept1Selected} + {concept2Selected} = Unified Understanding</p>
          </div>
        )}
      </div>
      
      <div style={{ opacity: integrationComplete ? 1 : 0.7 }}>
        {children}
      </div>
    </div>
  )
}

// Hidden Modifier: secret room/overlay reveals final lock
export function HiddenModifier({ modifier, onModifierComplete, children }: GateModifierProps) {
  const [secretRevealed, setSecretRevealed] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  
  const direction = modifier.includes('North') ? 'North' : 
                   modifier.includes('South') ? 'South' :
                   modifier.includes('East') ? 'East' :
                   modifier.includes('West') ? 'West' : 'Center'
  
  const handleSecretClick = () => {
    const newCount = clickCount + 1
    setClickCount(newCount)
    
    if (newCount >= 3) {
      setSecretRevealed(true)
      onModifierComplete()
    }
  }
  
  return (
    <div>
      <div className="card mb-3" style={{ backgroundColor: 'var(--surface-elevated)', border: '1px solid #666' }}>
        <h4 className="text-accent">🔒 Hidden Gate ({direction})</h4>
        <p className="text-sm mb-2">Discover the secret to unlock the hidden truth</p>
        
        {!secretRevealed ? (
          <div className="text-center">
            <p className="text-muted mb-2">Something is hidden here... ({clickCount}/3)</p>
            <div 
              onClick={handleSecretClick}
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto',
                backgroundColor: 'var(--surface-base)',
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                opacity: 0.6 + (clickCount * 0.2)
              }}
            >
              {clickCount === 0 && '?'}
              {clickCount === 1 && '👁️'}
              {clickCount === 2 && '🗝️'}
            </div>
            <p className="text-xs text-muted mt-1">Click to investigate</p>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-accent">✨ Hidden truth revealed!</p>
            <div className="card-elevated mt-2" style={{ padding: 'var(--space-sm)' }}>
              <p className="text-sm">🔓 The {direction} gate holds the key to deeper mysteries</p>
            </div>
          </div>
        )}
      </div>
      
      <div style={{ opacity: secretRevealed ? 1 : 0.5 }}>
        {children}
      </div>
    </div>
  )
}

// Main Gate Modifier Wrapper
export default function GateModifier({ modifier, onModifierComplete, children }: GateModifierProps) {
  if (modifier.includes('Revelation')) {
    return <RevelationModifier modifier={modifier} onModifierComplete={onModifierComplete}>{children}</RevelationModifier>
  }
  
  if (modifier.includes('Internalization')) {
    return <InternalizationModifier modifier={modifier} onModifierComplete={onModifierComplete}>{children}</InternalizationModifier>
  }
  
  if (modifier.includes('Embodiment')) {
    return <EmbodimentModifier modifier={modifier} onModifierComplete={onModifierComplete}>{children}</EmbodimentModifier>
  }
  
  if (modifier.includes('Integration')) {
    return <IntegrationModifier modifier={modifier} onModifierComplete={onModifierComplete}>{children}</IntegrationModifier>
  }
  
  if (modifier.includes('Hidden')) {
    return <HiddenModifier modifier={modifier} onModifierComplete={onModifierComplete}>{children}</HiddenModifier>
  }
  
  // Default: no modifier, just render children
  return <>{children}</>
}
