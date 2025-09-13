import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useGameStore } from './store/gameStore'

export default function App(){
  const loc = useLocation()
  const { level, xp } = useGameStore()
  return (
    <>
      <div className='hud'>
        <div className='badge'>Lvl {level} · XP {xp}</div>
        <nav style={{display:'flex', gap:'0.5rem', pointerEvents:'auto'}}>
          <Link to='/'><button>Title</button></Link>
          <Link to='/play'><button>Play</button></Link>
          <Link to='/bag'><button>Bag</button></Link>
          <Link to='/log'><button>Log</button></Link>
        </nav>
      </div>
      <Outlet />
      <footer className='container' style={{position:'fixed',bottom:0,left:0,right:0}}>
        <div style={{opacity:.5,fontSize:12,padding:'0.5rem 0 1rem'}}>Fractal RPG · Matrix‑First • PWA</div>
      </footer>
    </>
  )
}
