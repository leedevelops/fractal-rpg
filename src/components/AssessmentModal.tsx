import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Star, Target, Heart, Users } from 'lucide-react'
import { EnhancedUserProgress } from '../content/enhancedSchema'

interface AssessmentQuestion {
  id: string
  stage: 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'hidden_track'
  category: string
  question: string
  type: 'likert' | 'multiple_choice' | 'text'
  options?: string[]
  weight: number
}

interface AssessmentModalProps {
  isOpen: boolean
  onClose: () => void
  stage: 'r1' | 'r2' | 'r3' | 'r4' | 'r5' | 'hidden_track'
  userProgress?: EnhancedUserProgress
  onComplete: (results: any) => void
}

// Heart and Soul Leadership Assessment Questions
const ASSESSMENT_QUESTIONS: Record<string, AssessmentQuestion[]> = {
  r1: [ // Stage 1: Tribal Leadership (Identity) - "Who Am I?"
    {
      id: 'r1_identity_1',
      stage: 'r1',
      category: 'Core Identity Security',
      question: 'I have a clear understanding of my unique identity and calling in God',
      type: 'likert',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      weight: 1
    },
    {
      id: 'r1_identity_2',
      stage: 'r1',
      category: 'Core Identity Security',
      question: 'I am confident in who God created me to be, regardless of circumstances',
      type: 'likert',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      weight: 1
    },
    {
      id: 'r1_heritage_1',
      stage: 'r1',
      category: 'Spiritual Heritage Connection',
      question: 'I understand and connect with my spiritual heritage and family lineage',
      type: 'likert',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      weight: 1
    },
    {
      id: 'r1_tribal_1',
      stage: 'r1',
      category: 'Tribal Pattern Recognition',
      question: 'Which tribal archetype best describes your natural leadership style?',
      type: 'multiple_choice',
      options: ['Pioneer (Trailblazer)', 'Organizer (Strategist)', 'Builder (Creator)', 'Guardian (Protector)'],
      weight: 1
    },
    {
      id: 'r1_scenario_1',
      stage: 'r1',
      category: 'Identity Application',
      question: 'When facing a major decision, what is your primary approach?',
      type: 'multiple_choice',
      options: [
        'Seek God first through prayer and scripture',
        'Consult with trusted mentors and advisors',
        'Analyze all options and potential outcomes',
        'Follow my intuition and past experience'
      ],
      weight: 2
    }
  ],
  r2: [ // Stage 2: Apostolic Activation (Calling) - "What Am I Called To?"
    {
      id: 'r2_calling_1',
      stage: 'r2',
      category: 'Calling Clarity',
      question: 'I have clear understanding of my specific apostolic calling and mission',
      type: 'likert',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      weight: 1
    },
    {
      id: 'r2_authority_1',
      stage: 'r2',
      category: 'Spiritual Authority Development',
      question: 'I operate with confidence in the spiritual authority God has given me',
      type: 'likert',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      weight: 1
    },
    {
      id: 'r2_function_1',
      stage: 'r2',
      category: 'Apostolic Function Recognition',
      question: 'Which apostolic function best describes your calling?',
      type: 'multiple_choice',
      options: [
        'Church Planter',
        'Revival Catalyst', 
        'Cultural Transformer',
        'Network Builder',
        'Breakthrough Specialist',
        'Father/Mother to Movements'
      ],
      weight: 1
    },
    {
      id: 'r2_fire_1',
      stage: 'r2',
      category: 'Internal Fire and Passion',
      question: 'I feel a burning passion and urgency for my God-given mission',
      type: 'likert',
      options: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      weight: 1
    },
    {
      id: 'r2_scenario_1',
      stage: 'r2',
      category: 'Calling Application',
      question: 'When God opens a door for ministry expansion, how do you typically respond?',
      type: 'multiple_choice',
      options: [
        'Step through immediately with faith and boldness',
        'Carefully plan and prepare before moving forward',
        'Seek confirmation through multiple sources',
        'Wait for clearer signs and direction'
      ],
      weight: 2
    }
  ]
}

const STAGE_INFO = {
  r1: {
    title: 'Tribal Leadership Assessment',
    subtitle: 'Identity - "Who Am I?"',
    icon: Star,
    color: '#ef4444',
    description: 'Discover your core identity, spiritual heritage, and tribal archetype'
  },
  r2: {
    title: 'Apostolic Activation Assessment', 
    subtitle: 'Calling - "What Am I Called To?"',
    icon: Target,
    color: '#3b82f6',
    description: 'Clarify your apostolic calling and spiritual authority'
  },
  r3: {
    title: 'Jesus Pattern Assessment',
    subtitle: 'Commissioning - "How Do I Lead Like Jesus?"',
    icon: Heart,
    color: '#14b8a6',
    description: 'Align with Jesus\' love-based, servant leadership patterns'
  },
  r4: {
    title: 'Paul Replication Assessment',
    subtitle: 'Global Impact - "How Do I Multiply This?"',
    icon: Users,
    color: '#22c55e',
    description: 'Master pattern replication and global multiplication'
  }
}

export default function AssessmentModal({ 
  isOpen, 
  onClose, 
  stage, 
  userProgress,
  onComplete 
}: AssessmentModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [isCompleting, setIsCompleting] = useState(false)

  const questions = ASSESSMENT_QUESTIONS[stage] || []
  const currentQuestion = questions[currentQuestionIndex]
  const stageInfo = STAGE_INFO[stage as keyof typeof STAGE_INFO]

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0)
      setResponses({})
      setIsCompleting(false)
    }
  }, [isOpen, stage])

  const handleResponse = (questionId: string, response: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }))
  }

  const canProceed = () => {
    return currentQuestion && responses[currentQuestion.id] !== undefined
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const calculateResults = () => {
    const categoryScores: Record<string, { total: number, max: number }> = {}
    
    questions.forEach(question => {
      const response = responses[question.id]
      if (response !== undefined) {
        if (!categoryScores[question.category]) {
          categoryScores[question.category] = { total: 0, max: 0 }
        }
        
        let score = 0
        if (question.type === 'likert') {
          score = response * question.weight // 0-4 scale
          categoryScores[question.category].max += 4 * question.weight
        } else if (question.type === 'multiple_choice') {
          score = question.weight // Just weight for multiple choice
          categoryScores[question.category].max += question.weight
        }
        
        categoryScores[question.category].total += score
      }
    })

    // Calculate percentages
    const results = Object.entries(categoryScores).reduce((acc, [category, scores]) => {
      acc[category] = Math.round((scores.total / scores.max) * 100)
      return acc
    }, {} as Record<string, number>)

    return results
  }

  const handleComplete = async () => {
    setIsCompleting(true)
    
    const results = calculateResults()
    const assessmentData = {
      stage,
      responses,
      results,
      completedAt: new Date(),
      createdAt: new Date()
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    onComplete(assessmentData)
    setIsCompleting(false)
    onClose()
  }

  if (!isOpen || !stageInfo) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="card w-full max-w-2xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="p-6 text-white"
            style={{ backgroundColor: stageInfo.color }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <stageInfo.icon className="w-6 h-6" />
                <div>
                  <h2 className="text-xl font-semibold">{stageInfo.title}</h2>
                  <p className="text-sm opacity-90">{stageInfo.subtitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm mt-2 opacity-80">{stageInfo.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-3 bg-surface-elevated">
            <div className="flex items-center justify-between text-sm text-muted mb-2">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full bg-surface rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: stageInfo.color }}
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6 flex-1 overflow-y-auto">
            {currentQuestion && (
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <span className="text-xs px-2 py-1 bg-surface rounded text-muted">
                    {currentQuestion.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-medium mb-6 text-white">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.type === 'likert' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-600 hover:bg-surface-elevated cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={index}
                          checked={responses[currentQuestion.id] === index}
                          onChange={(e) => handleResponse(currentQuestion.id, parseInt(e.target.value))}
                          className="text-accent"
                        />
                        <span className="text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-600 hover:bg-surface-elevated cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={index}
                          checked={responses[currentQuestion.id] === index}
                          onChange={(e) => handleResponse(currentQuestion.id, parseInt(e.target.value))}
                          className="text-accent"
                        />
                        <span className="text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {currentQuestion.type === 'text' && (
                  <textarea
                    className="w-full p-3 rounded-lg border border-gray-600 bg-surface text-white resize-none"
                    rows={4}
                    placeholder="Share your thoughts..."
                    value={responses[currentQuestion.id] || ''}
                    onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                  />
                )}
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="p-6 border-t border-gray-600 flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 text-muted hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed() || isCompleting}
              className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-bright disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isCompleting ? (
                'Completing...'
              ) : currentQuestionIndex === questions.length - 1 ? (
                'Complete Assessment'
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
