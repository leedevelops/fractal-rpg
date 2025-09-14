import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Play, Pause, Grid3X3, List, ChevronRight, Lock, CheckCircle2, Circle } from 'lucide-react'
import { useGameStore } from '../store/gameStore'
import { FRACTAL_MATRIX } from '../content/fractalMatrix'
import { startFrequencyMeditation, stopFrequencyMeditation, isMeditationActive } from '../lib/frequency-meditation'
import { renderBiblicalGeometry } from '../lib/sacred-geometry'
import * as d3 from 'd3'

interface SacredMatrixExplorerProps {
  onChapterSelect?: (chapterId: number) => void
  onEnterGate?: (chapterId: number) => void
}

const BOOKS = [
  { name: 'Genesis', chapters: [1, 2, 3, 4, 5], color: 'from-red-500 to-orange-500', hebrewLetter: 'י' },
  { name: 'Exodus', chapters: [6, 7, 8, 9, 10], color: 'from-blue-500 to-cyan-500', hebrewLetter: 'ה' },
  { name: 'Leviticus', chapters: [11, 12, 13, 14, 15], color: 'from-green-500 to-emerald-500', hebrewLetter: 'ו' },
  { name: 'Numbers', chapters: [16, 17, 18, 19, 20], color: 'from-purple-500 to-violet-500', hebrewLetter: 'ה' },
  { name: 'Deuteronomy', chapters: [21, 22, 23, 24, 25], color: 'from-yellow-500 to-amber-500', hebrewLetter: 'יהוה' },
  { name: 'Hidden Path', chapters: [26, 27], color: 'from-gray-500 to-slate-500', hebrewLetter: '∞' }
]

const gateKeyFromGeometry = (geometryIcon: string): string => {
  const gateKeys: { [key: string]: string } = {
    '⬜': 'Foundation',
    '🔺': 'Ascension', 
    '🌀': 'Transformation',
    '💎': 'Illumination',
    '⭐': 'Manifestation',
    '🔷': 'Integration',
    '🌟': 'Transcendence'
  }
  return gateKeys[geometryIcon] || 'Mystery'
}

export default function SacredMatrixExplorer({ onChapterSelect, onEnterGate }: SacredMatrixExplorerProps) {
  const navigate = useNavigate()
  const { currentChapter, completed, xp, level } = useGameStore()
  const [selectedBook, setSelectedBook] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'flow'>('grid')
  const [meditationActive, setMeditationActive] = useState(false)
  const geometryRef = useRef<SVGSVGElement>(null)

  // Frequency meditation controls
  const handleMeditationToggle = () => {
    if (meditationActive) {
      stopFrequencyMeditation()
      setMeditationActive(false)
    } else {
      const currentCh = FRACTAL_MATRIX.find(ch => ch.id === currentChapter().id)
      if (currentCh?.spiritualFrequency) {
        startFrequencyMeditation(432) // Default frequency for now
        setMeditationActive(true)
      }
    }
  }

  // Sacred geometry rendering
  useEffect(() => {
    if (geometryRef.current) {
      const currentCh = FRACTAL_MATRIX.find(ch => ch.id === currentChapter().id)
      if (currentCh) {
        const svg = d3.select(geometryRef.current)
        renderBiblicalGeometry(svg, currentCh.geometryIcon, currentCh.element, 600, 400)
      }
    }
  }, [currentChapter().id])

  // Chapter accessibility logic
  const isChapterAccessible = (chapterId: number): boolean => {
    if (chapterId === 1) return true
    return completed.includes(chapterId - 1)
  }

  const isChapterCompleted = (chapterId: number): boolean => {
    return completed.includes(chapterId)
  }

  const isChapterCurrent = (chapterId: number): boolean => {
    return chapterId === currentChapter().id
  }

  // Navigation handlers
  const handleChapterSelect = (chapterId: number) => {
    if (isChapterAccessible(chapterId)) {
      onChapterSelect?.(chapterId)
    }
  }

  const handleEnterGate = (chapterId: number) => {
    if (isChapterAccessible(chapterId)) {
      onEnterGate?.(chapterId)
      navigate(`/gate/${chapterId}`)
    }
  }

  return (
    <div className="sacred-matrix-explorer min-h-screen bg-gradient-to-br from-cosmic-void via-cosmic-deep to-cosmic-void p-6">
      {/* Header with Sacred Geometry Background */}
      <div className="relative mb-8">
        <svg ref={geometryRef} className="absolute inset-0 w-full h-32 opacity-20" />
        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-4xl font-bold text-cosmic-golden mb-2 hebrew-glow"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Sacred Matrix Explorer
          </motion.h1>
          <motion.p 
            className="text-cosmic-silver"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Navigate the 27 Gates of Biblical Leadership
          </motion.p>
        </div>
      </div>

      {/* Progress Overview */}
      <motion.div 
        className="generation-badge p-6 rounded-xl mb-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-cosmic-golden">Your Journey</h3>
            <p className="text-cosmic-silver">Level {level} • {xp} XP • {completed.length}/27 Chapters</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Frequency Meditation Controls */}
            <motion.button
              onClick={handleMeditationToggle}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                meditationActive 
                  ? 'bg-cosmic-golden text-cosmic-void' 
                  : 'bg-cosmic-void/50 text-cosmic-golden border border-cosmic-golden/30'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {meditationActive ? <Pause size={16} /> : <Play size={16} />}
              {meditationActive ? 'Pause' : 'Meditate'}
            </motion.button>
            
            {/* View Mode Toggle */}
            <div className="flex bg-cosmic-void/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cosmic-golden text-cosmic-void' : 'text-cosmic-silver'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('flow')}
                className={`p-2 rounded ${viewMode === 'flow' ? 'bg-cosmic-golden text-cosmic-void' : 'text-cosmic-silver'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-cosmic-void/50 rounded-full h-2">
          <motion.div 
            className="h-2 bg-gradient-to-r from-cosmic-golden to-cosmic-silver rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(completed.length / 27) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Book Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {BOOKS.map((book, index) => (
          <motion.button
            key={book.name}
            onClick={() => setSelectedBook(index)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedBook === index
                ? 'bg-gradient-to-r ' + book.color + ' text-white'
                : 'bg-cosmic-void/30 text-cosmic-silver hover:bg-cosmic-void/50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="hebrew-letter mr-2">{book.hebrewLetter}</span>
            {book.name}
          </motion.button>
        ))}
      </div>

      {/* Chapter Grid/Flow View */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedBook}-${viewMode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BOOKS[selectedBook].chapters.map(chapterId => {
                const ch = FRACTAL_MATRIX.find(chapter => chapter.id === chapterId)
                if (!ch) return null

                const accessible = isChapterAccessible(chapterId)
                const completed = isChapterCompleted(chapterId)
                const current = isChapterCurrent(chapterId)

                return (
                  <motion.div
                    key={chapterId}
                    className={`chapter-card p-6 rounded-xl border transition-all cursor-pointer ${
                      current 
                        ? 'border-cosmic-golden bg-cosmic-golden/10' 
                        : completed
                        ? 'border-cosmic-silver/50 bg-cosmic-silver/5'
                        : accessible
                        ? 'border-cosmic-void/50 bg-cosmic-void/20 hover:border-cosmic-golden/30'
                        : 'border-cosmic-void/30 bg-cosmic-void/10 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => accessible && handleChapterSelect(chapterId)}
                    whileHover={accessible ? { scale: 1.02, y: -2 } : {}}
                    whileTap={accessible ? { scale: 0.98 } : {}}
                    layout
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{ch.geometryIcon}</div>
                      <div className="flex items-center gap-2">
                        {completed && <CheckCircle2 className="text-cosmic-silver" size={20} />}
                        {current && <Circle className="text-cosmic-golden animate-pulse" size={20} />}
                        {!accessible && <Lock className="text-cosmic-void" size={20} />}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-cosmic-golden mb-2">
                      Chapter {ch.id}: {ch.chapterTitle}
                    </h3>
                    <p className="text-cosmic-silver text-sm mb-3">{ch.bookTheme}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 rounded bg-primary/20 text-cosmic-golden text-xs">
                        {ch.book}
                      </span>
                      <span className="px-2 py-1 rounded bg-secondary/20 text-cosmic-silver text-xs">
                        {ch.element}
                      </span>
                      <span className="px-2 py-1 rounded bg-accent/20 text-cosmic-silver text-xs">
                        {gateKeyFromGeometry(ch.geometryIcon)}
                      </span>
                    </div>

                    {accessible && (
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEnterGate(chapterId)
                        }}
                        className="w-full bg-gradient-to-r from-cosmic-golden/20 to-cosmic-silver/20 hover:from-cosmic-golden/30 hover:to-cosmic-silver/30 text-cosmic-golden border border-cosmic-golden/30 rounded-lg py-2 px-4 flex items-center justify-center gap-2 transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Enter Gate <ChevronRight size={16} />
                      </motion.button>
                    )}
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {BOOKS[selectedBook].chapters.map(chapterId => {
                const ch = FRACTAL_MATRIX.find(chapter => chapter.id === chapterId)
                if (!ch) return null

                const accessible = isChapterAccessible(chapterId)
                const completed = isChapterCompleted(chapterId)
                const current = isChapterCurrent(chapterId)

                return (
                  <motion.div
                    key={chapterId}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                      current 
                        ? 'border-cosmic-golden bg-cosmic-golden/10' 
                        : completed
                        ? 'border-cosmic-silver/50 bg-cosmic-silver/5'
                        : accessible
                        ? 'border-cosmic-void/50 bg-cosmic-void/20 hover:border-cosmic-golden/30'
                        : 'border-cosmic-void/30 bg-cosmic-void/10 opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => accessible && handleChapterSelect(chapterId)}
                    whileHover={accessible ? { x: 4 } : {}}
                    layout
                  >
                    <div className="text-2xl">{ch.geometryIcon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-cosmic-golden">
                        Chapter {ch.id}: {ch.chapterTitle}
                      </h3>
                      <p className="text-cosmic-silver text-sm">{ch.bookTheme}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {completed && <CheckCircle2 className="text-cosmic-silver" size={20} />}
                      {current && <Circle className="text-cosmic-golden animate-pulse" size={20} />}
                      {!accessible && <Lock className="text-cosmic-void" size={20} />}
                      {accessible && (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEnterGate(chapterId)
                          }}
                          className="bg-cosmic-golden/20 hover:bg-cosmic-golden/30 text-cosmic-golden border border-cosmic-golden/30 rounded-lg py-1 px-3 flex items-center gap-1 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Enter <ChevronRight size={14} />
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
