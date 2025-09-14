import { z } from 'zod'

// Enhanced schema integrating fractal-leader's sacred matrix structure
// while preserving existing chapter/level flow

// Enums from fractal-leader
export const generationEnum = ['gen_z', 'millennial', 'gen_x', 'boomer'] as const
export const archetypeEnum = ['pioneer', 'organizer', 'builder', 'guardian'] as const
export const developmentStageEnum = ['r1', 'r2', 'r3', 'r4', 'r5', 'hidden_track'] as const
export const subscriptionTierEnum = ['seeker', 'pioneer', 'visionary'] as const

// Enhanced Sacred Matrix Schema - merging fractal-leader with existing structure
export const EnhancedSacredMatrixSchema = z.object({
  // Core identifiers (existing)
  id: z.number(),
  
  // Biblical framework (from fractal-leader)
  chapterNumber: z.number(),
  bookNumber: z.number(),
  divineName: z.string(), // Yod, Heh, Vav, Final Heh, YESHUA
  bookName: z.string(),
  bookTheme: z.string(),
  chapterTitle: z.string(),
  
  // Sacred geometry and elements (enhanced)
  geometryIcon: z.string(),
  stone: z.string(),
  element: z.string(), // Fire, Air, Water, Earth, Plasma
  templeSpace: z.string(),
  
  // Story and progression (existing + enhanced)
  storyStage: z.string(),
  dimension: z.string(), // 1 Glory, 2 Presence, etc.
  fractalGate: z.string(), // Revelation, Internalization, etc.
  
  // Spiritual frequencies (from fractal-leader)
  spiritualFrequency: z.string(),
  bookColor: z.string(),
  
  // Biblical characters (from fractal-leader)
  tribe: z.string().optional(),
  prophet: z.string().optional(),
  apostle: z.string().optional(),
  
  // Directional mapping (from fractal-leader)
  directionalMapping: z.string().optional(), // North, South, East, West, Center, Global
  
  // Existing RPG-specific fields
  name: z.string(),
  description: z.string(),
  unlocked: z.boolean().default(false),
  completed: z.boolean().default(false),
  
  // Enhanced with fractal-leader assessment integration
  assessmentData: z.object({
    tribalAlignment: z.number().optional(),
    apostolicFunction: z.number().optional(),
    jesusPatternAlignment: z.number().optional(),
    paulReplicationPattern: z.number().optional()
  }).optional()
})

// User progress schema enhanced with fractal-leader features
export const EnhancedUserProgressSchema = z.object({
  // Existing progress
  currentChapter: z.number(),
  xp: z.number(),
  level: z.number(),
  completedChapters: z.array(z.number()),
  commissioned: z.boolean(),
  sealed: z.boolean(),
  
  // Enhanced with fractal-leader user data
  userId: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  hebrewName: z.string().optional(),
  generation: z.enum(generationEnum).optional(),
  archetype: z.enum(archetypeEnum).optional(),
  currentStage: z.enum(developmentStageEnum).default('r1'),
  subscriptionTier: z.enum(subscriptionTierEnum).default('seeker'),
  
  // Assessment results
  assessments: z.array(z.object({
    stage: z.enum(developmentStageEnum),
    responses: z.record(z.any()),
    results: z.record(z.any()).optional(),
    completedAt: z.date().optional(),
    createdAt: z.date()
  })).default([]),
  
  // Daily practices tracking
  dailyPractices: z.array(z.object({
    date: z.date(),
    practiceType: z.string(), // genesis_reflection, frequency_meditation, team_checkin
    completed: z.boolean().default(false),
    duration: z.number().optional(), // in minutes
    notes: z.string().optional(),
    generationAdaptation: z.record(z.any()).optional()
  })).default([]),
  
  // Progress metrics
  progressMetrics: z.array(z.object({
    metricType: z.string(), // completion_rate, tribal_alignment, cross_gen_effectiveness
    value: z.number(),
    period: z.string(), // daily, weekly, monthly
    calculatedAt: z.date()
  })).default([])
})

// Game state enhanced with fractal-leader features
export const EnhancedGameStateSchema = z.object({
  // Existing game state
  currentScene: z.string(),
  inventory: z.array(z.string()),
  flags: z.record(z.boolean()),
  
  // Enhanced with fractal-leader features
  userProgress: EnhancedUserProgressSchema,
  sacredMatrix: z.array(EnhancedSacredMatrixSchema),
  
  // Frequency meditation state
  meditationState: z.object({
    isActive: z.boolean().default(false),
    currentFrequency: z.number().optional(),
    duration: z.number().optional(),
    startTime: z.date().optional()
  }).default({ isActive: false }),
  
  // Team/organization data (optional for multiplayer features)
  organizationId: z.string().optional(),
  teamMemberships: z.array(z.object({
    teamId: z.string(),
    role: z.string().default('member'),
    joinedAt: z.date()
  })).default([])
})

// Types
export type EnhancedSacredMatrix = z.infer<typeof EnhancedSacredMatrixSchema>
export type EnhancedUserProgress = z.infer<typeof EnhancedUserProgressSchema>
export type EnhancedGameState = z.infer<typeof EnhancedGameStateSchema>

// Assessment question types (from fractal-leader)
export const AssessmentQuestionSchema = z.object({
  id: z.string(),
  stage: z.enum(developmentStageEnum),
  category: z.string(), // identity_security, spiritual_heritage, etc.
  question: z.string(),
  type: z.enum(['likert', 'multiple_choice', 'text']),
  options: z.array(z.string()).optional(),
  weight: z.number().default(1)
})

export type AssessmentQuestion = z.infer<typeof AssessmentQuestionSchema>

// Frequency meditation utilities
export const MATRIX_FREQUENCIES = {
  // Book 1 - Fire frequencies
  'Altar Foundation': 174, // Pain relief, foundation
  'Glory Alignment': 285, // Healing, regeneration
  'Sacred Rhythm': 396, // Liberation from fear
  'Offering Posture': 417, // Transformation, change
  'Divine Encounter': 528, // Love, DNA repair
  
  // Book 2 - Air frequencies  
  'Breath of Life': 639, // Relationships, connection
  'Voice Activation': 741, // Expression, solutions
  'Prophetic Flow': 852, // Intuition, spiritual order
  'Heavenly Perspective': 963, // Divine connection
  
  // Book 3 - Water frequencies
  'Living Water': 432, // Natural harmony
  'Cleansing Flow': 528, // Transformation
  'Deep Currents': 396, // Root chakra healing
  'Baptismal Depths': 174, // Foundation, grounding
  
  // Book 4 - Earth frequencies
  'Solid Ground': 256, // Root stability
  'Fruitful Seasons': 341, // Growth, manifestation
  'Harvest Time': 426, // Abundance, completion
  'Generational Blessing': 852, // Spiritual order
  
  // Book 5 - Plasma frequencies
  'Resurrection Power': 1111, // Spiritual awakening
  'Ascension Frequency': 999, // Completion, wisdom
  'Divine Unity': 777, // Spiritual perfection
  'Eternal Life': 888 // Abundance, infinity
} as const

export type MatrixFrequency = keyof typeof MATRIX_FREQUENCIES
