import { Outlet, Link, useLocation } from 'react-router-dom'
import { useGameStore } from './store/gameStore'
import { motion } from 'framer-motion'

export default function App(){
  const loc = useLocation()
  const { level, xp, completed } = useGameStore()
  const isTitle = loc.pathname === '/'
  
  return (
    <div className="min-h-screen cosmic-gradient">
      {!isTitle && (
        <motion.div 
          className="fixed top-0 left-0 right-0 z-50 glassmorphic"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="hebrew-letter text-2xl">יהוה</div>
              <div className="generation-badge px-3 py-1 rounded-full text-sm">
                <span className="text-cosmic-golden">Level {level}</span>
                <span className="text-cosmic-silver mx-2">·</span>
                <span className="text-cosmic-silver">{xp} XP</span>
                <span className="text-cosmic-silver mx-2">·</span>
                <span className="text-cosmic-golden">{completed.length}/27</span>
              </div>
            </div>
            
            <nav className="flex gap-2">
              <Link to='/'>
                <motion.button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    loc.pathname === '/' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🏠 Home
                </motion.button>
              </Link>
              <Link to='/play'>
                <motion.button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    loc.pathname === '/play' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🗺️ Matrix
                </motion.button>
              </Link>
              <Link to='/bag'>
                <motion.button 
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    loc.pathname === '/bag' 
                      ? 'bg-secondary text-secondary-foreground' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎒 Inventory
                </motion.button>
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
      
      <main className={`${!isTitle ? 'pt-20 pb-16' : ''} min-h-screen`}>
        <Outlet />
      </main>
      
      {!isTitle && (
        <motion.footer 
          className="fixed bottom-0 left-0 right-0 z-40 glassmorphic"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center py-3">
            <div className="text-xs text-muted-foreground">
              <span className="hebrew-letter text-sm">✨</span>
              <span className="mx-2 font-mystical">Genesis Go</span>
              <span className="hebrew-letter text-sm">✨</span>
            </div>
          </div>
        </motion.footer>
      )}
    </div>
  )
}
