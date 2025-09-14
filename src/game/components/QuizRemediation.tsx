import { useState, useEffect } from 'react'

interface QuizRemediationProps {
  question: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }
  userAnswer: number
  onComplete: () => void
}

export default function QuizRemediation({ question, userAnswer, onComplete }: QuizRemediationProps) {
  const [timeLeft, setTimeLeft] = useState(30)
  const [showExplanation, setShowExplanation] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Show explanation after 2 seconds
    const explanationTimer = setTimeout(() => {
      setShowExplanation(true)
    }, 2000)

    return () => {
      clearInterval(timer)
      clearTimeout(explanationTimer)
    }
  }, [onComplete])

  return (
    <div className="card" style={{ backgroundColor: 'var(--surface-elevated)', border: '2px solid var(--accent-warm)' }}>
      <div className="text-center mb-3">
        <h4 className="text-accent">📚 Quick Review</h4>
        <p className="text-sm text-muted">Auto-advancing in {timeLeft}s</p>
      </div>

      <div className="mb-3">
        <p className="text-sm mb-2">{question.question}</p>
        <div className="grid" style={{ gap: 'var(--space-xs)' }}>
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`
                ${index === question.correct ? 'text-accent' : ''}
                ${index === userAnswer && index !== question.correct ? 'text-muted' : ''}
              `}
              style={{
                padding: 'var(--space-xs)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: index === question.correct 
                  ? 'rgba(var(--accent-primary-rgb), 0.1)' 
                  : index === userAnswer && index !== question.correct
                  ? 'rgba(255, 0, 0, 0.1)'
                  : 'transparent',
                border: index === question.correct 
                  ? '1px solid var(--accent-primary)'
                  : index === userAnswer && index !== question.correct
                  ? '1px solid #ff6b6b'
                  : '1px solid transparent'
              }}
            >
              <span className="text-xs">
                {index === question.correct && '✓ '}
                {index === userAnswer && index !== question.correct && '✗ '}
              </span>
              {option}
            </div>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="card-elevated" style={{ padding: 'var(--space-sm)' }}>
          <h5 className="text-accent mb-1">Why this matters:</h5>
          <p className="text-sm mb-0">{question.explanation}</p>
        </div>
      )}

      <div className="text-center mt-3">
        <button onClick={onComplete} className="secondary" style={{ fontSize: '12px', padding: '4px 12px' }}>
          Continue ({timeLeft}s)
        </button>
      </div>
    </div>
  )
}
