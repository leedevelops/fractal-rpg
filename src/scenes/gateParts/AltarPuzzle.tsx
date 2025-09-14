import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import DimensionPuzzle from '../../game/puzzles/DimensionPuzzles'
import GateModifier from '../../game/modifiers/GateModifiers'
import { getCurrentChapterData } from '../../game/utils/ChapterData'
import { getLevelContent } from '../../game/generators/LevelGenerator'
import { getLevelSpec } from '../../game/data/LevelSpecifications'
import QuizRemediation from '../../game/components/QuizRemediation'

interface AltarPuzzleProps {
  gateStatus: any
  onInteract: (event: { type: string; data?: any; payload?: any }) => void
  onComplete: () => void
}

const corners = [
  { key: 'Glory', label: 'Glory', position: { top: '10%', left: '10%' }, meaning: 'Morning - God above me' },
  { key: 'Presence', label: 'Presence', position: { top: '10%', right: '10%' }, meaning: 'Midday - God with me' },
  { key: 'Voice', label: 'Voice', position: { bottom: '10%', left: '10%' }, meaning: 'Evening - God through me' },
  { key: 'Rest', label: 'Rest', position: { bottom: '10%', right: '10%' }, meaning: 'Night - God within me' }
]

const assessmentQuestions = [
  { question: "I have a clear sense of who I am beyond my roles and achievements", category: "Core Identity Security" },
  { question: "I feel secure in my identity even when criticized or challenged", category: "Core Identity Security" },
  { question: "I understand my spiritual lineage and heritage", category: "Spiritual Heritage" },
  { question: "I resonate strongly with the Reuben archetype - The Trailblazer", category: "Tribal Pattern" }
]

const quizQuestions = [
  {
    question: "What is the core difference between Abel and Cain's approach to leadership?",
    options: ["Abel was more talented", "Abel led from offering, Cain from outcome", "Abel was chosen by God", "Abel worked harder"],
    correct: 1
  },
  {
    question: "What do the four corners of the altar represent?",
    options: ["Four seasons", "Four elements", "Daily rhythm with God", "Four disciples"],
    correct: 2
  },
  {
    question: "The Reuben tribal archetype is characterized as:",
    options: ["The Warrior", "The Trailblazer", "The Priest", "The King"],
    correct: 1
  }
]

export default function AltarPuzzle({ gateStatus, onInteract, onComplete }: AltarPuzzleProps) {
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [practiceTimer, setPracticeTimer] = useState(60)
  const [practiceActive, setPracticeActive] = useState(false)
  const [showRemediation, setShowRemediation] = useState(false)
  const [remediationQuestion, setRemediationQuestion] = useState<any>(null)
  const [currentRemediationIndex, setCurrentRemediationIndex] = useState(0)
  const [incorrectAnswers, setIncorrectAnswers] = useState<Array<{question: any, userAnswer: number}>>([])
  
  const phase = gateStatus?.phase || 'scripture'
  const cornersPlaced = gateStatus?.cornersPlaced || 0
  const totalCorners = corners.length
  
  // Get dynamic level content
  const levelContent = getLevelContent(1) // Chapter 1 for now, will be dynamic later
  const scriptureContent = levelContent?.scripture
  const practiceContent = levelContent?.practice
  const quizContent = levelContent?.quiz || []

  const handleCornerClick = (index: number) => {
    if (index === cornersPlaced) {
      onInteract({ type: 'place_corner' })
    }
  }
  
  const handleScriptureComplete = () => {
    onInteract({ type: 'scripture_complete' })
  }
  
  const handlePracticeStart = () => {
    setPracticeActive(true)
    const timer = setInterval(() => {
      setPracticeTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setPracticeActive(false)
          onInteract({ type: 'practice_complete' })
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }
  
  const handleAltarComplete = () => {
    onInteract({ type: 'altar_complete' })
    setTimeout(onComplete, 500)
  }
  
  const handleQuizSubmit = () => {
    const correctAnswers = quizAnswers.filter((answer, index) => answer === quizContent[index]?.correct).length
    const passThreshold = Math.ceil(quizContent.length * 0.8) // 80% pass rate
    
    // Find incorrect answers for remediation
    const incorrect = quizContent
      .map((question, index) => ({
        question,
        userAnswer: quizAnswers[index],
        correct: quizAnswers[index] === question.correct
      }))
      .filter(item => !item.correct)
      .map(item => ({ question: item.question, userAnswer: item.userAnswer }))
    
    if (incorrect.length > 0) {
      setIncorrectAnswers(incorrect)
      setCurrentRemediationIndex(0)
      setRemediationQuestion(incorrect[0])
      setShowRemediation(true)
    } else {
      onInteract({ type: 'quiz_complete', payload: { score: correctAnswers, passed: correctAnswers >= passThreshold } })
    }
  }

  const handleRemediationComplete = () => {
    if (currentRemediationIndex < incorrectAnswers.length - 1) {
      const nextIndex = currentRemediationIndex + 1
      setCurrentRemediationIndex(nextIndex)
      setRemediationQuestion(incorrectAnswers[nextIndex])
    } else {
      setShowRemediation(false)
      const correctAnswers = quizAnswers.filter((answer, index) => answer === quizContent[index]?.correct).length
      const passThreshold = Math.ceil(quizContent.length * 0.8)
      onInteract({ type: 'quiz_complete', payload: { score: correctAnswers, passed: correctAnswers >= passThreshold } })
    }
  }

  const handleGeometryComplete = () => {
    onInteract({ type: 'geometry_complete' })
  }

  // Scripture Phase
  if (phase === 'scripture') {
    return (
      <div className="container-sm">
        <div className="text-center mb-4">
          <h2>Step 1: Scripture Foundation</h2>
          <p className="text-muted">{scriptureContent?.passage}</p>
        </div>
        
        <div className="card mb-4">
          <h3>The First Altar Pattern</h3>
          <blockquote style={{ 
            borderLeft: '4px solid var(--accent-primary)', 
            paddingLeft: 'var(--space-lg)', 
            fontStyle: 'italic',
            margin: 'var(--space-lg) 0'
          }}>
            {scriptureContent?.focus}
          </blockquote>
          
          <div className="card-elevated mt-3" style={{ padding: 'var(--space-lg)' }}>
            <h4 className="text-accent">Core Principle</h4>
            <p className="mb-0">{scriptureContent?.principle}</p>
          </div>
        </div>
        
        <button 
          onClick={handleScriptureComplete}
          className="primary"
          style={{ display: 'block', margin: '0 auto' }}
        >
          Continue to Practice
        </button>
      </div>
    )
  }
  
  // Geometry Phase - Dynamic Dimension Puzzle with Gate Modifier
  if (phase === 'geometry') {
    const levelSpec = getLevelSpec(1) // Level 1 for now, will be dynamic later
    const [modifierCompleted, setModifierCompleted] = useState(false)
    
    if (!levelSpec) return null
    
    return (
      <div className="container-sm">
        <div className="text-center mb-4">
          <h2>Step 3: {levelSpec.dimension} Puzzle</h2>
          <p className="text-muted">{levelSpec.description}</p>
        </div>
        
        <GateModifier
          modifier={levelSpec.gate}
          onModifierComplete={() => setModifierCompleted(true)}
        >
          <DimensionPuzzle
            dimension={levelSpec.dimension}
            geometryIcon={levelSpec.geometry}
            onComplete={handleGeometryComplete}
          />
        </GateModifier>
      </div>
    )
  }
  
  // Practice Phase
  if (phase === 'practice') {
    return (
      <div className="container-sm">
        <div className="text-center mb-4">
          <h2>Step 2: One-Minute Practice</h2>
          <p className="text-muted">Duration: {practiceContent?.duration}</p>
        </div>
        
        <div className="card mb-4">
          <h3>Altar Practice</h3>
          <p>{practiceContent?.instruction}</p>
          
          <div className="card-elevated mt-3" style={{ padding: 'var(--space-lg)' }}>
            <h4 className="text-accent">Purpose</h4>
            <p className="mb-0">{practiceContent?.purpose}</p>
          </div>
        </div>
        
        {!practiceActive && practiceTimer === 60 && (
          <button 
            onClick={handlePracticeStart}
            className="primary"
            style={{ display: 'block', margin: '0 auto' }}
          >
            Start 1-Minute Practice
          </button>
        )}
        
        {practiceActive && (
          <div className="text-center">
            <div style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              color: 'var(--accent-primary)',
              marginBottom: 'var(--space-lg)'
            }}>
              {practiceTimer}
            </div>
            <p className="text-muted">Practice in progress...</p>
          </div>
        )}
        
        {!practiceActive && practiceTimer === 0 && (
          <div className="text-center">
            <h3 className="text-accent">Practice Complete!</h3>
            <p>Moving to geometry puzzle...</p>
          </div>
        )}
      </div>
    )
  }
  
  // Altar Phase
  if (phase === 'altar') {
    return (
      <div className="container-sm">
        <div className="text-center mb-4">
          <h2>Step 5: Altar Declaration</h2>
          <p className="text-muted">Make your commitment before the Lord</p>
        </div>
        
        <div className="card mb-4">
          <h3>Your Altar Commitment</h3>
          <p>You have completed the geometry puzzle and demonstrated mastery through the quiz. Now declare your commitment to this principle.</p>
          
          <div className="card-elevated mt-3" style={{ padding: 'var(--space-lg)' }}>
            <h4 className="text-accent">Declaration</h4>
            <blockquote style={{ 
              borderLeft: '4px solid var(--accent-warm)', 
              paddingLeft: 'var(--space-lg)', 
              fontStyle: 'italic',
              margin: 'var(--space-lg) 0'
            }}>
              {levelContent?.altar.declaration || "I choose the altar before the platform. I will lead from offering, not outcome."}
            </blockquote>
            <div className="mt-3">
              <h5 className="text-accent">Commitment</h5>
              <p className="text-sm">{levelContent?.altar.commitment}</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleAltarComplete}
          className="secondary"
          style={{ display: 'block', margin: '0 auto' }}
        >
          Make Altar Declaration
        </button>
      </div>
    )
  }
  
  // Quiz Phase with Auto-Remediation
  if (phase === 'quiz') {
    if (showRemediation && remediationQuestion) {
      return (
        <div className="container-sm">
          <div className="text-center mb-4">
            <h2>Step 4: Quick Review</h2>
            <p className="text-muted">Reviewing {currentRemediationIndex + 1} of {incorrectAnswers.length} missed questions</p>
          </div>
          
          <QuizRemediation
            question={remediationQuestion}
            userAnswer={remediationQuestion.userAnswer}
            onComplete={handleRemediationComplete}
          />
        </div>
      )
    }

    return (
      <div className="container-sm">
        <div className="text-center mb-4">
          <h2>Step 4: Mastery Quiz</h2>
          <p className="text-muted">7 questions - Need 6+ correct (≥80%)</p>
        </div>
        
        <div className="card mb-4">
          {quizContent.map((q: any, index: number) => (
            <div key={index} className="mb-4">
              <h4 className="mb-2">{index + 1}. {q.question}</h4>
              <div className="grid" style={{ gap: 'var(--space-sm)' }}>
                {q.options.map((option: string, optionIndex: number) => (
                  <button
                    key={optionIndex}
                    onClick={() => {
                      const newAnswers = [...quizAnswers]
                      newAnswers[index] = optionIndex
                      setQuizAnswers(newAnswers)
                    }}
                    className={quizAnswers[index] === optionIndex ? 'primary' : ''}
                    style={{ textAlign: 'left', justifyContent: 'flex-start' }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-muted mb-2">Progress: {quizAnswers.length}/{quizContent.length}</p>
          <button
            onClick={handleQuizSubmit}
            disabled={quizAnswers.length < quizContent.length}
            className="primary"
            style={{
              display: 'block',
              margin: '0 auto',
              opacity: quizAnswers.length < quizContent.length ? 0.5 : 1
            }}
          >
            Submit Quiz
          </button>
        </div>
      </div>
    )
  }
  
  // Badge Phase
  if (phase === 'badge') {
    const badge = levelContent?.badge
    const chapterData = getCurrentChapterData()
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container-sm text-center"
      >
        <h1 className="mb-4">🔥 Chapter {chapterData.id} Complete! 🔥</h1>
        
        <div className="card card-gradient mb-4">
          <h3>Badge Earned</h3>
          <div style={{ fontSize: '3rem', margin: 'var(--space-lg) 0' }}>✨</div>
          <h2>{badge?.name || 'Glory Revelation'}</h2>
          <p className="mb-0">{chapterData.geometryIcon} • {chapterData.dimension} • {chapterData.fractalGate} • {chapterData.element}</p>
        </div>
        
        <div className="card mb-4">
          <h3>Chapter Summary</h3>
          <p>{badge?.description || `You have mastered ${chapterData.chapterTitle} through the ${chapterData.dimension} dimension.`}</p>
          <div className="mt-3">
            <small className="text-muted">
              Tribe: {chapterData.tribe} • Stone: {chapterData.stone} • Temple: {chapterData.templeSpace}
            </small>
          </div>
        </div>
        
        <button onClick={onComplete} className="primary">
          Continue Journey
        </button>
      </motion.div>
    )
  }
  
  return null
}
