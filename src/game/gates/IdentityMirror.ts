import { IFractalGate, GateResult } from './types'

interface LevelState {
  phase: 'scripture' | 'practice' | 'geometry' | 'quiz' | 'altar' | 'badge'
  scriptureRead: boolean
  practiceCompleted: boolean
  puzzleSolved: boolean
  quizScore: number
  altarCompleted: boolean
  cornersPlaced: number
}

export default function IdentityMirror(): IFractalGate {
  let state: LevelState = {
    phase: 'scripture',
    scriptureRead: false,
    practiceCompleted: false,
    puzzleSolved: false,
    quizScore: 0,
    altarCompleted: false,
    cornersPlaced: 0
  }
  
  const corners = ['Glory', 'Presence', 'Voice', 'Rest']
  const cornerMeanings = {
    Glory: 'Morning - God above me',
    Presence: 'Midday - God with me', 
    Voice: 'Evening - God through me',
    Rest: 'Night - God within me'
  }
  
  return {
    key: 'IdentityMirror',
    title: 'Chapter 1: Leadership Begins at the Altar',
    describe(){ 
      switch(state.phase) {
        case 'scripture': return 'Read Genesis 4:1-7 - The first altar pattern'
        case 'practice': return 'One-minute altar practice: "This is my altar. I offer my day."'
        case 'geometry': return 'Glory Dimension: Align the four corners of the square altar'
        case 'quiz': return 'Answer 7 questions about altar patterns and leadership'
        case 'altar': return 'Declare your altar commitment before the Lord'
        case 'badge': return 'Receive your "Altar Before Platform" badge'
        default: return 'Chapter 1: Leadership Begins at the Altar'
      }
    },
    
    start(){
      state = {
        phase: 'scripture',
        scriptureRead: false,
        practiceCompleted: false,
        puzzleSolved: false,
        quizScore: 0,
        altarCompleted: false,
        cornersPlaced: 0
      }
    },
    
    interact(e){
      switch(e.type) {
        case 'scripture_complete':
          if(state.phase === 'scripture') {
            state.scriptureRead = true
            state.phase = 'practice'
          }
          break
          
        case 'practice_complete':
          if(state.phase === 'practice') {
            state.practiceCompleted = true
            state.phase = 'geometry'
          }
          break
          
        case 'geometry_complete':
          if(state.phase === 'geometry') {
            state.puzzleSolved = true
            state.phase = 'quiz'
          }
          break
          
        case 'quiz_complete':
          if(state.phase === 'quiz') {
            state.quizScore = e.payload?.score || 0
            const passed = e.payload?.passed || false
            if(passed) { // Must pass 80% threshold
              state.phase = 'altar'
            }
          }
          break
          
        case 'altar_complete':
          if(state.phase === 'altar') {
            state.altarCompleted = true
            state.phase = 'badge'
          }
          break
      }
    },
    
    status(){ 
      const totalSteps = 6
      let completedSteps = 0
      
      if(state.scriptureRead) completedSteps++
      if(state.practiceCompleted) completedSteps++
      if(state.puzzleSolved) completedSteps++
      if(state.quizScore >= 5) completedSteps++
      if(state.altarCompleted) completedSteps++
      if(state.phase === 'badge') completedSteps++
      
      return { 
        phase: state.phase,
        progress: completedSteps / totalSteps,
        
        // Level metadata
        level: 1,
        geometry: 'Square',
        dimension: 'Glory',
        gate: 'Revelation',
        element: 'Fire',
        templeSpace: 'Altar',
        
        // Progress tracking
        scriptureRead: state.scriptureRead,
        practiceCompleted: state.practiceCompleted,
        puzzleSolved: state.puzzleSolved,
        quizScore: state.quizScore,
        altarCompleted: state.altarCompleted,
        
        // Puzzle state
        cornersPlaced: state.cornersPlaced,
        totalCorners: 4,
        cornerMeanings,
        
        // Content
        scriptureContent: {
          passage: 'Genesis 4:1-7',
          focus: 'Abel brought the firstfruits of his flock... The Lord looked with favor on Abel and his offering.',
          principle: 'Leadership begins with offering, not outcome.'
        },
        practiceContent: {
          duration: '1 minute',
          instruction: 'Choose a physical square space. Say aloud: "This is my altar. I offer my day."',
          purpose: 'Establish your daily altar rhythm'
        },
        quizContent: [
          { question: 'What geometry represents the altar?', options: ['Circle', 'Square', 'Triangle', 'Spiral'], correct: 1 },
          { question: 'What dimension does Chapter 1 focus on?', options: ['Presence', 'Glory', 'Voice', 'Word'], correct: 1 },
          { question: 'What gate type is Chapter 1?', options: ['Revelation', 'Integration', 'Hidden', 'Embodiment'], correct: 0 },
          { question: 'What element is associated with the altar?', options: ['Water', 'Air', 'Fire', 'Earth'], correct: 2 },
          { question: 'What temple space does Chapter 1 represent?', options: ['Holy Place', 'Altar', 'Holy of Holies', 'Outer Court'], correct: 1 },
          { question: 'Abel\'s offering was accepted because he:', options: ['Worked harder', 'Brought the best', 'Was chosen', 'Led from offering'], correct: 3 },
          { question: 'The altar principle is:', options: ['Platform before altar', 'Altar before platform', 'No altar needed', 'Altar equals platform'], correct: 1 }
        ]
      } 
    },
    
    complete(): GateResult { 
      const success = state.phase === 'badge'
      
      return { 
        success,
        payload: {
          badge: success ? 'Altar Before Platform' : null,
          geometry: 'Square',
          dimension: 'Glory',
          gate: 'Revelation',
          altarRhythm: success ? cornerMeanings : null
        }
      }
    }
  }
}
