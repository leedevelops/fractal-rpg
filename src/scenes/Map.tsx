import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { FRACTAL_MATRIX } from '../content/fractalMatrix'
import { gateKeyFromGeometry } from '../game/gates'
import SacredMatrixExplorer from '../components/SacredMatrixExplorer'
import AssessmentModal from '../components/AssessmentModal'

export default function MapScene(){
  const nav = useNavigate()
  const { currentChapter, goToChapter, completed } = useGameStore()
  const [showAssessment, setShowAssessment] = useState(false)
  const ch = currentChapter()

  return (
    <div className="min-h-screen cosmic-gradient p-4">
      {/* Sacred Matrix Explorer - Main Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <SacredMatrixExplorer />
      </motion.div>

      {/* Current Chapter Card */}
      <motion.div 
        className="glassmorphic-card p-6 rounded-xl mb-6 max-w-4xl mx-auto cosmic-glow"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="text-4xl hebrew-letter animate-hebrew-glow">
            {ch.geometryIcon}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-cosmic-golden mb-2">
              Chapter {ch.id}: {ch.chapterTitle}
            </h2>
            <p className="text-cosmic-silver font-mystical">
              {ch.bookTheme}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-primary/20 text-cosmic-golden text-sm">
            {ch.book} • {ch.divineName}
          </span>
          <span className="px-3 py-1 rounded-full bg-secondary/20 text-cosmic-silver text-sm">
            {ch.templeSpace}
          </span>
          <span className="px-3 py-1 rounded-full bg-accent/20 text-cosmic-silver text-sm">
            {ch.element}
          </span>
          <span className="px-3 py-1 rounded-full bg-muted/20 text-cosmic-silver text-sm">
            {gateKeyFromGeometry(ch.geometryIcon)}
          </span>
        </div>
        
        <div className="flex gap-4">
          <motion.button 
            onClick={()=>nav(`/gate/${ch.id}`)}
            className="flex-1 p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-xl mb-1">🚪</div>
            <div>Enter Sacred Gate</div>
          </motion.button>
          
          <motion.button 
            onClick={() => setShowAssessment(true)}
            className="flex-1 p-4 rounded-xl bg-gradient-to-r from-secondary to-muted text-secondary-foreground font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-xl mb-1">📋</div>
            <div>Leadership Assessment</div>
          </motion.button>
          
          <motion.button 
            onClick={()=>nav('/bag')}
            className="p-4 rounded-xl bg-gradient-to-r from-accent/60 to-primary/60 text-accent-foreground font-bold"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-xl mb-1">🎒</div>
            <div>Inventory</div>
          </motion.button>
        </div>
      </motion.div>

      {/* Golden Path Journey */}
      <motion.div 
        className="glassmorphic-card p-6 rounded-xl max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="hebrew-letter text-2xl">✨</span>
          <h3 className="text-xl font-bold text-cosmic-golden">Golden Path Journey</h3>
          <span className="hebrew-letter text-2xl">✨</span>
        </div>
        
        <div className="grid gap-3">
          {[1,5,10,15,20,25,26,27].map((id, index)=>{
            const row = FRACTAL_MATRIX.find(r=>r.id===id)!
            const k = gateKeyFromGeometry(row.geometryIcon)
            const isCompleted = completed.includes(id)
            const isCurrent = ch.id === id
            const isAccessible = id <= ch.id || isCompleted
            
            return (
              <motion.button 
                key={id}
                onClick={()=>isAccessible ? goToChapter(id) : null}
                disabled={!isAccessible}
                className={`p-4 rounded-xl text-left transition-all ${
                  isCurrent 
                    ? 'bg-primary/20 border-2 border-primary' 
                    : isCompleted 
                    ? 'bg-green-500/20 border border-green-500/30' 
                    : isAccessible
                    ? 'bg-secondary/20 border border-secondary/30 hover:bg-secondary/30'
                    : 'bg-muted/10 border border-muted/20 opacity-50 cursor-not-allowed'
                }`}
                whileHover={isAccessible ? { scale: 1.02 } : {}}
                whileTap={isAccessible ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div className={`text-2xl w-12 h-12 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-500/30 text-green-400' : 
                    isCurrent ? 'bg-primary/30 text-cosmic-golden' : 
                    'bg-muted/20 text-muted-foreground'
                  }`}>
                    {isCompleted ? '✓' : row.geometryIcon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-foreground">
                      Chapter {id}: {row.chapterTitle}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Gate: {k==='Placeholder'? 'Practice' : k}
                      {isCompleted && <span className="text-green-400 ml-2">• Completed</span>}
                      {isCurrent && <span className="text-cosmic-golden ml-2">• Current</span>}
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </motion.div>

      {/* Assessment Modal */}
      {showAssessment && (
        <AssessmentModal 
          isOpen={showAssessment}
          stage="r1"
          onClose={() => setShowAssessment(false)}
          onComplete={(results: any) => {
            console.log('Assessment completed:', results)
            setShowAssessment(false)
          }}
        />
      )}
    </div>
  )
}
