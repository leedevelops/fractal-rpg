import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { renderBiblicalGeometry } from '../lib/sacred-geometry'
import { startFrequencyMeditation, stopFrequencyMeditation, isMeditationActive } from '../lib/frequency-meditation'
import * as d3 from 'd3'

export default function Title() {
  const nav = useNavigate()
  const { loading, startNewGame, continueGame, currentChapter, completed, level, xp } = useGameStore()
  const geometryRef = useRef<SVGSVGElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const ch = currentChapter()

  useEffect(() => {
    continueGame()
  }, [continueGame])

  useEffect(() => {
    if (geometryRef.current) {
      const svg = d3.select(geometryRef.current)
      renderBiblicalGeometry(svg, 'Square', 'Fire', 600, 400)
    }
  }, [])

  useEffect(() => {
    const handleMeditationStart = () => setIsPlaying(true)
    const handleMeditationStop = () => setIsPlaying(false)
    
    window.addEventListener('meditationStarted', handleMeditationStart)
    window.addEventListener('meditationStopped', handleMeditationStop)
    
    return () => {
      window.removeEventListener('meditationStarted', handleMeditationStart)
      window.removeEventListener('meditationStopped', handleMeditationStop)
    }
  }, [])

  const handleNewGame = async () => {
    await startNewGame()
    nav('/play')
  }

  const handleContinue = () => {
    nav('/play')
  }

  const handlePlayFrequency = async () => {
    if (isMeditationActive()) {
      stopFrequencyMeditation()
    } else {
      await startFrequencyMeditation(174, 120) // Deep Stillness frequency
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cosmic-deep via-cosmic-void to-cosmic-deep">
        <motion.div
          className="text-cosmic-golden text-2xl font-mystical"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Initializing Sacred Matrix...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen cosmic-gradient relative overflow-hidden">
      {/* Background Sacred Geometry */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-pulse-slow">
        <svg
          ref={geometryRef}
          width={600}
          height={400}
          className="opacity-10"
        />
      </div>
      
      {/* Floating Hebrew Letters */}
      <div className="absolute top-20 left-10 hebrew-letter text-6xl animate-hebrew-glow opacity-20">
        י
      </div>
      <div className="absolute top-40 right-20 hebrew-letter text-4xl animate-hebrew-glow opacity-15" style={{ animationDelay: '1s' }}>
        ה
      </div>
      <div className="absolute bottom-40 left-20 hebrew-letter text-5xl animate-hebrew-glow opacity-10" style={{ animationDelay: '2s' }}>
        ו
      </div>
      <div className="absolute bottom-20 right-10 hebrew-letter text-3xl animate-hebrew-glow opacity-25" style={{ animationDelay: '3s' }}>
        ה
      </div>
      
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div 
          className="max-w-4xl w-full text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Main Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-8"
          >
            <div className="hebrew-letter text-8xl mb-4 animate-hebrew-glow">
              יהוה
            </div>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-golden via-cosmic-ethereal to-cosmic-silver bg-clip-text text-transparent">
              Genesis Go
            </h1>
            <div className="text-xl text-cosmic-silver font-mystical">
              Sacred Geometry • Divine Names • Spiritual Transformation
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed font-mystical"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Journey through the 27-chapter fractal matrix from the Square Altar to the Twelve-Gate Convergence.
            <br />
            <span className="text-cosmic-golden">
              Build sacred foundations • Unlock divine gates • Transform through biblical wisdom
            </span>
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Link to='/play'>
              <motion.button
                className="w-full p-6 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-lg shadow-2xl border border-primary/20"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(135, 81, 204, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-2">🌟</div>
                <div>Enter the Matrix</div>
                <div className="text-sm text-cosmic-silver mb-2">
                  Chapter {ch.id}: {ch.chapterTitle}
                </div>
              </motion.button>
            </Link>
            
            <motion.button 
              onClick={()=>nav('/bag')}
              className="w-full p-6 rounded-xl bg-gradient-to-br from-secondary to-muted text-secondary-foreground font-bold text-lg shadow-2xl border border-secondary/20"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">🎒</div>
              <div>Sacred Inventory</div>
              <div className="text-sm opacity-80 mt-2">
                Badges & Spiritual Progress
              </div>
            </motion.button>
          </motion.div>

          {/* Progress Card */}
          <motion.div 
            className="generation-badge p-6 rounded-xl max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <div className="text-cosmic-golden text-lg font-semibold mb-4">
              ✨ Spiritual Progress ✨
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmic-golden">{completed.length}</div>
                <div className="text-cosmic-silver">Chapters</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmic-golden">{level}</div>
                <div className="text-cosmic-silver">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cosmic-golden">{xp}</div>
                <div className="text-cosmic-silver">XP</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 bg-muted rounded-full h-2">
              <motion.div 
                className="bg-gradient-to-r from-cosmic-golden to-cosmic-ethereal h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completed.length / 27) * 100}%` }}
                transition={{ delay: 2, duration: 1.5 }}
              />
            </div>
            <div className="text-xs text-cosmic-silver mt-2 text-center">
              {Math.round((completed.length / 27) * 100)}% Complete • {27 - completed.length} Chapters Remaining
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
