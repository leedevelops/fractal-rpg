import { useState, useEffect } from 'react'

// Puzzle Types by Dimension (from memory)
export interface PuzzleProps {
  onComplete: () => void
  dimension: string
  geometryIcon: string
  difficulty?: number
}

// 1. Glory (Alignment): light the pattern; stabilize grid/altar
export function GloryAlignmentPuzzle({ onComplete, geometryIcon }: PuzzleProps) {
  const [lightedCells, setLightedCells] = useState<boolean[]>(new Array(9).fill(false))
  const [targetPattern, setTargetPattern] = useState<boolean[]>([])

  useEffect(() => {
    // Generate target pattern based on geometry
    const patterns = {
      'Square': [true, false, true, false, true, false, true, false, true],
      'Tetrahedron + Rays': [false, true, false, true, true, true, false, true, false],
      'Icosahedron': [true, true, false, true, false, true, false, true, true]
    }
    setTargetPattern(patterns[geometryIcon as keyof typeof patterns] || patterns['Square'])
  }, [geometryIcon])

  const toggleCell = (index: number) => {
    const newLighted = [...lightedCells]
    newLighted[index] = !newLighted[index]
    // Also toggle adjacent cells (alignment effect)
    if (index > 0) newLighted[index - 1] = !newLighted[index - 1]
    if (index < 8) newLighted[index + 1] = !newLighted[index + 1]
    setLightedCells(newLighted)

    // Check if pattern matches
    if (newLighted.every((lit, i) => lit === targetPattern[i])) {
      setTimeout(onComplete, 500)
    }
  }

  return (
    <div className="card">
      <h3>Glory Alignment</h3>
      <p className="text-muted mb-3">Light the pattern to align with divine glory</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-sm)', maxWidth: '200px', margin: '0 auto' }}>
        {lightedCells.map((lit, index) => (
          <button
            key={index}
            onClick={() => toggleCell(index)}
            className={lit ? 'primary' : ''}
            style={{
              aspectRatio: '1',
              backgroundColor: lit ? 'var(--accent-primary)' : 'var(--surface-elevated)',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              transition: 'all 0.2s ease'
            }}
          />
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <small className="text-muted">Target Pattern:</small>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', maxWidth: '60px', margin: '0 auto' }}>
          {targetPattern.map((target, index) => (
            <div
              key={index}
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: target ? 'var(--accent-primary)' : 'var(--surface-base)',
                border: '1px solid var(--border-color)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// 2. Presence (Proximity): path/breath timing; stay near "Presence" aura
export function PresenceProximityPuzzle({ onComplete }: PuzzleProps) {
  const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 })
  const [presencePos] = useState({ x: 2, y: 2 })
  const [timeInRange, setTimeInRange] = useState(0)
  const [breathing, setBreathing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const distance = Math.abs(playerPos.x - presencePos.x) + Math.abs(playerPos.y - presencePos.y)
      if (distance <= 1 && breathing) {
        setTimeInRange(prev => prev + 1)
        if (timeInRange >= 5) {
          onComplete()
        }
      } else {
        setTimeInRange(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [playerPos, breathing, timeInRange, onComplete])

  const movePlayer = (dx: number, dy: number) => {
    setPlayerPos(prev => ({
      x: Math.max(0, Math.min(4, prev.x + dx)),
      y: Math.max(0, Math.min(4, prev.y + dy))
    }))
  }

  return (
    <div className="card">
      <h3>Presence Proximity</h3>
      <p className="text-muted mb-3">Stay near the Presence and breathe deeply</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '4px', maxWidth: '200px', margin: '0 auto' }}>
        {Array.from({ length: 25 }, (_, i) => {
          const x = i % 5
          const y = Math.floor(i / 5)
          const isPlayer = x === playerPos.x && y === playerPos.y
          const isPresence = x === presencePos.x && y === presencePos.y
          const inRange = Math.abs(x - presencePos.x) + Math.abs(y - presencePos.y) <= 1
          
          return (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                backgroundColor: isPresence ? 'var(--accent-primary)' : inRange ? 'var(--accent-secondary)' : 'var(--surface-elevated)',
                border: isPlayer ? '3px solid var(--text-primary)' : '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                opacity: inRange ? 0.8 : 0.4
              }}
            />
          )
        })}
      </div>
      
      <div className="mt-3 text-center">
        <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-sm)', maxWidth: '150px', margin: '0 auto' }}>
          <div></div>
          <button onClick={() => movePlayer(0, -1)} className="secondary">↑</button>
          <div></div>
          <button onClick={() => movePlayer(-1, 0)} className="secondary">←</button>
          <button 
            onClick={() => setBreathing(!breathing)}
            className={breathing ? 'primary' : 'secondary'}
          >
            {breathing ? '🫁' : '💨'}
          </button>
          <button onClick={() => movePlayer(1, 0)} className="secondary">→</button>
          <div></div>
          <button onClick={() => movePlayer(0, 1)} className="secondary">↓</button>
          <div></div>
        </div>
        <p className="text-sm mt-2">Time in range: {timeInRange}/5</p>
      </div>
    </div>
  )
}

// 3. Voice (Sequence): echo/Simon-style call-and-response; order matters
export function VoiceSequencePuzzle({ onComplete }: PuzzleProps) {
  const [sequence, setSequence] = useState<number[]>([])
  const [playerSequence, setPlayerSequence] = useState<number[]>([])
  const [showingSequence, setShowingSequence] = useState(false)
  const [activeNote, setActiveNote] = useState<number | null>(null)

  useEffect(() => {
    // Generate initial sequence
    setSequence([0, 1, 2, 1])
    showSequence()
  }, [])

  const showSequence = async () => {
    setShowingSequence(true)
    setPlayerSequence([])
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 600))
      setActiveNote(sequence[i])
      await new Promise(resolve => setTimeout(resolve, 400))
      setActiveNote(null)
    }
    
    setShowingSequence(false)
  }

  const playNote = (note: number) => {
    if (showingSequence) return
    
    const newPlayerSequence = [...playerSequence, note]
    setPlayerSequence(newPlayerSequence)
    
    setActiveNote(note)
    setTimeout(() => setActiveNote(null), 200)
    
    // Check if sequence matches so far
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      // Wrong note - reset
      setTimeout(() => {
        setPlayerSequence([])
        showSequence()
      }, 1000)
    } else if (newPlayerSequence.length === sequence.length) {
      // Complete!
      setTimeout(onComplete, 500)
    }
  }

  const notes = ['Do', 'Re', 'Mi', 'Fa']
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4']

  return (
    <div className="card">
      <h3>Voice Sequence</h3>
      <p className="text-muted mb-3">Listen and repeat the divine call</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-sm)', maxWidth: '200px', margin: '0 auto' }}>
        {notes.map((note, index) => (
          <button
            key={index}
            onClick={() => playNote(index)}
            disabled={showingSequence}
            style={{
              aspectRatio: '1',
              backgroundColor: activeNote === index ? colors[index] : 'var(--surface-elevated)',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: activeNote === index ? 'white' : 'var(--text-primary)',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
          >
            {note}
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-sm">
          {showingSequence ? 'Listen...' : `Progress: ${playerSequence.length}/${sequence.length}`}
        </p>
        <button onClick={showSequence} className="secondary mt-2" disabled={showingSequence}>
          Replay Sequence
        </button>
      </div>
    </div>
  )
}

// 4. Word (Logic): connect glyphs/verses; rule-based graph
export function WordLogicPuzzle({ onComplete, geometryIcon }: PuzzleProps) {
  const [connections, setConnections] = useState<Array<[number, number]>>([])
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  
  const nodes = [
    { id: 0, label: 'Truth', x: 1, y: 0 },
    { id: 1, label: 'Grace', x: 0, y: 1 },
    { id: 2, label: 'Love', x: 2, y: 1 },
    { id: 3, label: 'Unity', x: 1, y: 2 }
  ]
  
  const targetConnections = [[0, 1], [0, 2], [1, 3], [2, 3]]

  const selectNode = (nodeId: number) => {
    if (selectedNode === null) {
      setSelectedNode(nodeId)
    } else if (selectedNode === nodeId) {
      setSelectedNode(null)
    } else {
      // Create connection
      const newConnection: [number, number] = [Math.min(selectedNode, nodeId), Math.max(selectedNode, nodeId)]
      const exists = connections.some(([a, b]) => a === newConnection[0] && b === newConnection[1])
      
      if (!exists) {
        const newConnections = [...connections, newConnection]
        setConnections(newConnections)
        
        // Check if all target connections are made
        if (targetConnections.every(target => 
          newConnections.some(([a, b]) => a === target[0] && b === target[1])
        )) {
          setTimeout(onComplete, 500)
        }
      }
      
      setSelectedNode(null)
    }
  }

  return (
    <div className="card">
      <h3>Word Logic</h3>
      <p className="text-muted mb-3">Connect the divine attributes in proper order</p>
      
      <div style={{ position: 'relative', width: '200px', height: '150px', margin: '0 auto' }}>
        {/* Render connections */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {connections.map(([from, to], index) => {
            const fromNode = nodes.find(n => n.id === from)!
            const toNode = nodes.find(n => n.id === to)!
            return (
              <line
                key={index}
                x1={fromNode.x * 80 + 40}
                y1={fromNode.y * 60 + 30}
                x2={toNode.x * 80 + 40}
                y2={toNode.y * 60 + 30}
                stroke="var(--accent-primary)"
                strokeWidth="2"
              />
            )
          })}
        </svg>
        
        {/* Render nodes */}
        {nodes.map(node => (
          <button
            key={node.id}
            onClick={() => selectNode(node.id)}
            className={selectedNode === node.id ? 'primary' : 'secondary'}
            style={{
              position: 'absolute',
              left: node.x * 80 + 10,
              top: node.y * 60 + 10,
              width: '60px',
              height: '40px',
              fontSize: '12px',
              padding: '4px'
            }}
          >
            {node.label}
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-sm">Connections: {connections.length}/{targetConnections.length}</p>
      </div>
    </div>
  )
}

// 5. Spirit (Synergy): combine elements to trigger emergent effect
export function SpiritSynergyPuzzle({ onComplete }: PuzzleProps) {
  const [elements, setElements] = useState({ fire: 0, water: 0, air: 0, earth: 0 })
  const [combination, setCombination] = useState<string[]>([])
  
  const addElement = (element: string) => {
    if (combination.length < 4) {
      setCombination([...combination, element])
      setElements(prev => ({ ...prev, [element]: prev[element as keyof typeof prev] + 1 }))
    }
  }
  
  const reset = () => {
    setCombination([])
    setElements({ fire: 0, water: 0, air: 0, earth: 0 })
  }
  
  useEffect(() => {
    // Check for valid combinations that create synergy
    if (combination.length === 4) {
      const hasBalance = Object.values(elements).every(count => count === 1)
      if (hasBalance) {
        setTimeout(onComplete, 500)
      } else {
        setTimeout(reset, 1000)
      }
    }
  }, [combination, elements, onComplete])

  const elementColors = {
    fire: '#ff6b6b',
    water: '#4ecdc4', 
    air: '#45b7d1',
    earth: '#96ceb4'
  }

  return (
    <div className="card">
      <h3>Spirit Synergy</h3>
      <p className="text-muted mb-3">Combine elements in perfect balance</p>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-sm)', maxWidth: '200px', margin: '0 auto' }}>
        {Object.entries(elementColors).map(([element, color]) => (
          <button
            key={element}
            onClick={() => addElement(element)}
            disabled={combination.length >= 4}
            style={{
              aspectRatio: '1',
              backgroundColor: color,
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'capitalize'
            }}
          >
            {element}
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-center">
        <div className="flex" style={{ justifyContent: 'center', gap: 'var(--space-xs)', marginBottom: 'var(--space-sm)' }}>
          {combination.map((element, index) => (
            <div
              key={index}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: elementColors[element as keyof typeof elementColors],
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {element[0].toUpperCase()}
            </div>
          ))}
          {Array.from({ length: 4 - combination.length }, (_, i) => (
            <div
              key={`empty-${i}`}
              style={{
                width: '30px',
                height: '30px',
                backgroundColor: 'var(--surface-elevated)',
                border: '2px dashed var(--border-color)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          ))}
        </div>
        <button onClick={reset} className="secondary">Reset</button>
      </div>
    </div>
  )
}

// 6. Image (Mirror): symmetry/mosaic completion; reflect without distortion
export function ImageMirrorPuzzle({ onComplete }: PuzzleProps) {
  const [leftSide] = useState([true, false, true, false, true, false])
  const [rightSide, setRightSide] = useState([false, false, false, false, false, false])
  
  const toggleRightCell = (index: number) => {
    const newRightSide = [...rightSide]
    newRightSide[index] = !newRightSide[index]
    setRightSide(newRightSide)
    
    // Check if right side mirrors left side
    if (newRightSide.every((cell, i) => cell === leftSide[i])) {
      setTimeout(onComplete, 500)
    }
  }

  return (
    <div className="card">
      <h3>Image Mirror</h3>
      <p className="text-muted mb-3">Reflect the pattern without distortion</p>
      
      <div className="flex" style={{ justifyContent: 'center', gap: 'var(--space-lg)' }}>
        {/* Left side (template) */}
        <div>
          <h4 className="text-center mb-2">Template</h4>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
            {leftSide.map((filled, index) => (
              <div
                key={index}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: filled ? 'var(--accent-primary)' : 'var(--surface-elevated)',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Right side (interactive) */}
        <div>
          <h4 className="text-center mb-2">Mirror</h4>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
            {rightSide.map((filled, index) => (
              <button
                key={index}
                onClick={() => toggleRightCell(index)}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: filled ? 'var(--accent-primary)' : 'var(--surface-elevated)',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 7. Name (Meta/Hidden): multi-step secret; combine prior skills
export function NameMetaPuzzle({ onComplete }: PuzzleProps) {
  const [step, setStep] = useState(0)
  const [code, setCode] = useState('')
  const [revealed, setRevealed] = useState(false)
  
  const steps = [
    { hint: "First letter of Glory", answer: "G" },
    { hint: "First letter of Presence", answer: "P" },
    { hint: "First letter of Voice", answer: "V" },
    { hint: "First letter of Word", answer: "W" }
  ]
  
  const handleInput = (value: string) => {
    const newCode = code + value
    setCode(newCode)
    
    if (value === steps[step].answer) {
      if (step < steps.length - 1) {
        setStep(step + 1)
      } else {
        setRevealed(true)
        setTimeout(onComplete, 1000)
      }
    } else {
      // Reset on wrong input
      setTimeout(() => {
        setCode('')
        setStep(0)
      }, 500)
    }
  }

  if (revealed) {
    return (
      <div className="card text-center">
        <h3>Name Revealed</h3>
        <p className="text-accent" style={{ fontSize: '24px', fontWeight: 'bold' }}>YHWH</p>
        <p className="text-muted">The hidden name is revealed through the pattern</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h3>Name Meta</h3>
      <p className="text-muted mb-3">Discover the hidden name through the pattern</p>
      
      <div className="text-center mb-4">
        <p>Step {step + 1}: {steps[step].hint}</p>
        <div style={{ fontSize: '20px', fontFamily: 'monospace', marginBottom: 'var(--space-md)' }}>
          {code}
        </div>
      </div>
      
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-sm)', maxWidth: '200px', margin: '0 auto' }}>
        {['G', 'P', 'V', 'W', 'S', 'I', 'N', 'Y'].map(letter => (
          <button
            key={letter}
            onClick={() => handleInput(letter)}
            className="secondary"
            style={{ aspectRatio: '1' }}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  )
}

// Main puzzle component that renders the appropriate puzzle based on dimension
export default function DimensionPuzzle({ dimension, geometryIcon, onComplete }: PuzzleProps) {
  const dimensionNumber = dimension.split(' ')[0]
  
  switch (dimensionNumber) {
    case '1':
      return <GloryAlignmentPuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
    case '2':
      return <PresenceProximityPuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
    case '3':
      return <VoiceSequencePuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
    case '4':
      return <WordLogicPuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
    case '5':
      return <SpiritSynergyPuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
    case '6':
      return <ImageMirrorPuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
    case '7':
      return <NameMetaPuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
    default:
      return <GloryAlignmentPuzzle dimension={dimension} geometryIcon={geometryIcon} onComplete={onComplete} />
  }
}
