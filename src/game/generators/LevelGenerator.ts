import { FRACTAL_MATRIX } from '../../content/fractalMatrix'
import { ChapterMetadata, getChapterData } from '../utils/ChapterData'
import { getLevelSpec, LevelSpec } from '../data/LevelSpecifications'

export interface LevelContent {
  id: number
  metadata: ChapterMetadata
  scripture: {
    passage: string
    focus: string
    principle: string
  }
  practice: {
    duration: string
    instruction: string
    purpose: string
  }
  quiz: QuizQuestion[]
  altar: {
    declaration: string
    commitment: string
  }
  badge: {
    name: string
    description: string
    icon: string
  }
}

export interface QuizQuestion {
  question: string
  options: string[]
  correct: number
  explanation: string
}

// Generate scripture content based on chapter theme and dimension
function generateScriptureContent(chapter: ChapterMetadata): LevelContent['scripture'] {
  const scriptureMap: Record<string, LevelContent['scripture']> = {
    '1': {
      passage: 'Genesis 4:3-4 - "In the course of time Cain brought some of the fruits of the soil as an offering to the Lord. And Abel also brought an offering—fat portions from some of the firstborn of his flock."',
      focus: 'The first altar pattern reveals the difference between offering and outcome. Abel offered from the firstborn, Cain from leftovers.',
      principle: 'Leadership begins with the altar—offering our first and best, not our leftovers.'
    },
    '2': {
      passage: '1 Thessalonians 5:23 - "May God himself, the God of peace, sanctify you through and through. May your whole spirit, soul and body be kept blameless at his coming."',
      focus: 'The tripartite nature of humanity reflects divine order—spirit, soul, and body working in harmony.',
      principle: 'Effective leadership requires integration of spirit, soul, and body in divine alignment.'
    },
    '3': {
      passage: 'Genesis 3:23-24 - "So the Lord God banished him from the Garden of Eden to work the ground from which he had been taken. After he banished the man, he placed on the east side of the Garden of Eden cherubim and a flaming sword flashing back and forth to guard the way to the tree of life."',
      focus: 'Exile from Eden was not punishment but preparation—a necessary journey toward maturity.',
      principle: 'True leadership is forged in exile, learning to lead outside of paradise.'
    }
    // Add more as needed...
  }
  
  return scriptureMap[chapter.id.toString()] || scriptureMap['1']
}

// Generate practice content based on dimension and gate modifier
function generatePracticeContent(chapter: ChapterMetadata): LevelContent['practice'] {
  const practiceMap: Record<string, LevelContent['practice']> = {
    'Revelation': {
      duration: '1 minute',
      instruction: 'Sit quietly and ask: "What is God revealing to me through this pattern?" Listen for insights without forcing answers.',
      purpose: 'To cultivate receptivity to divine revelation and pattern recognition.'
    },
    'Internalization': {
      duration: '1 minute',
      instruction: 'Reflect deeply on how this principle applies to your current leadership challenges. Write down one specific application.',
      purpose: 'To move truth from head knowledge to heart understanding.'
    },
    'Embodiment': {
      duration: '1 minute',
      instruction: 'Take three deep breaths and physically practice the posture of this principle. How does your body express this truth?',
      purpose: 'To integrate spiritual truth into physical expression and presence.'
    },
    'Integration': {
      duration: '1 minute',
      instruction: 'Consider how this principle connects with previous lessons. What patterns are emerging in your leadership journey?',
      purpose: 'To synthesize learning and see the bigger picture of spiritual development.'
    },
    'Hidden': {
      duration: '1 minute',
      instruction: 'Meditate on what might be hidden beneath the surface of this teaching. What deeper mystery is being revealed?',
      purpose: 'To develop spiritual discernment and access deeper levels of truth.'
    }
  }
  
  const gateType = chapter.fractalGate.split(' ')[0] // Get base gate type
  return practiceMap[gateType] || practiceMap['Revelation']
}

// Generate quiz questions based on exact specification: 5 factual + 2 scenario
function generateQuizContent(levelId: number): QuizQuestion[] {
  const levelSpec = getLevelSpec(levelId)
  const chapter = getChapterData(levelId)
  
  if (!levelSpec || !chapter) return []
  
  // 5 Factual Questions (geometry, element, temple space, dimension, gate)
  const factualQuestions: QuizQuestion[] = [
    {
      question: `What geometric shape represents Level ${levelId}?`,
      options: ['Square', 'Triangle', 'Spiral', 'Cube'],
      correct: levelSpec.geometry.includes('Square') ? 0 : 
               levelSpec.geometry.includes('Triangle') ? 1 :
               levelSpec.geometry.includes('Spiral') ? 2 : 3,
      explanation: `The ${levelSpec.geometry} represents the foundational pattern for this level.`
    },
    {
      question: `Which element powers this level?`,
      options: ['Fire', 'Water', 'Air', 'Earth', 'Plasma'],
      correct: ['Fire', 'Water', 'Air', 'Earth', 'Plasma'].indexOf(levelSpec.element),
      explanation: `${levelSpec.element} is the elemental force for Book ${levelSpec.book}.`
    },
    {
      question: `What temple space corresponds to this level?`,
      options: ['Altar', 'Holy Place', 'Inner Light', 'Holy of Holies', 'Ark'],
      correct: ['Altar', 'Holy Place', 'Inner Light', 'Holy of Holies', 'Ark'].indexOf(levelSpec.templeSpace),
      explanation: `The ${levelSpec.templeSpace} represents the spiritual environment for this stage.`
    },
    {
      question: `Which dimension is emphasized here?`,
      options: ['Glory', 'Presence', 'Voice', 'Word', 'Spirit', 'Image', 'Name'],
      correct: ['Glory', 'Presence', 'Voice', 'Word', 'Spirit', 'Image', 'Name'].indexOf(levelSpec.dimension),
      explanation: `The ${levelSpec.dimension} dimension focuses on specific leadership aspects.`
    },
    {
      question: `What gate modifier applies to this level?`,
      options: ['Revelation', 'Internalization', 'Embodiment', 'Integration', 'Hidden'],
      correct: levelSpec.gate.includes('Revelation') ? 0 :
               levelSpec.gate.includes('Internalization') ? 1 :
               levelSpec.gate.includes('Embodiment') ? 2 :
               levelSpec.gate.includes('Integration') ? 3 : 4,
      explanation: `The ${levelSpec.gate} gate provides the specific practice for accessing this level.`
    }
  ]
  
  // 2 Scenario Questions (apply the pattern)
  const scenarioQuestions: QuizQuestion[] = [
    {
      question: `A team member challenges your authority. Based on this level's ${levelSpec.dimension} principle, how do you respond?`,
      options: [
        'Assert your position firmly',
        'Listen first, then respond from the principle you learned',
        'Ignore the challenge',
        'Delegate the decision to someone else'
      ],
      correct: 1,
      explanation: `${levelSpec.dimension} leadership means responding from the principle, not defensiveness.`
    },
    {
      question: `You face a major decision with unclear outcomes. What does this ${levelSpec.gate} gate teach about decision-making?`,
      options: [
        'Make quick decisions to show confidence',
        'Gather all possible data first',
        'Apply the gate practice before acting',
        'Let others decide for you'
      ],
      correct: 2,
      explanation: `The ${levelSpec.gate} gate practice should guide your decision-making process.`
    }
  ]
  
  return [...factualQuestions, ...scenarioQuestions]
}

// Generate altar declaration based on chapter theme
function generateAltarContent(chapter: ChapterMetadata): LevelContent['altar'] {
  const altarMap: Record<string, LevelContent['altar']> = {
    '1': {
      declaration: '"I choose the altar before the platform. I will lead from offering, not outcome. This is my altar - I offer my day, my leadership, my life to You."',
      commitment: 'I commit to establishing a daily altar practice, offering my leadership to God before taking action.'
    },
    '2': {
      declaration: '"I embrace the tripartite nature of leadership - spirit, soul, and body aligned in divine purpose. I will not lead from one dimension alone."',
      commitment: 'I commit to integrating spirit, soul, and body in my leadership decisions and presence.'
    },
    '3': {
      declaration: '"I accept the exile journey as preparation for greater purpose. I will not despise the wilderness seasons of leadership formation."',
      commitment: 'I commit to embracing difficult seasons as opportunities for character development and deeper dependence on God.'
    }
    // Add more as needed...
  }
  
  return altarMap[chapter.id.toString()] || altarMap['1']
}

// Generate badge information
function generateBadgeContent(chapter: ChapterMetadata): LevelContent['badge'] {
  return {
    name: `${chapter.dimension.split(' ')[1]} ${chapter.fractalGate.split(' ')[0]}`,
    description: `Mastered ${chapter.chapterTitle} - ${chapter.dimension} through ${chapter.fractalGate}`,
    icon: chapter.geometryIcon
  }
}

// Main function to generate complete level content
export function generateLevel(chapterId: number): LevelContent | null {
  const metadata = getChapterData(chapterId)
  if (!metadata) return null
  
  return {
    id: chapterId,
    metadata,
    scripture: generateScriptureContent(metadata),
    practice: generatePracticeContent(metadata),
    quiz: generateQuizContent(chapterId),
    altar: generateAltarContent(metadata),
    badge: generateBadgeContent(metadata)
  }
}

// Generate all 27 levels
export function generateAllLevels(): LevelContent[] {
  const levels: LevelContent[] = []
  
  for (let i = 1; i <= 27; i++) {
    const level = generateLevel(i)
    if (level) {
      levels.push(level)
    }
  }
  
  return levels
}

// Get specific level content
export function getLevelContent(chapterId: number): LevelContent | null {
  return generateLevel(chapterId)
}
