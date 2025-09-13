import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'

export default function Title(){
  const nav = useNavigate()
  const { continueGame, completed } = useGameStore()
  useEffect(()=>{ continueGame() }, [])
  return (
    <main className='container'>
      <h1>Fractal RPG</h1>
      <p>Leadership journey from the Square Altar to the Twelve-Gate Convergence.</p>
      <div className='grid' style={{gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))'}}>
        <Link to='/play'><button>New / Continue</button></Link>
        <button onClick={()=>nav('/log')}>Quest Log</button>
        <a href='https://heartandsoulglobal.com' target='_blank' rel='noreferrer'><button>About</button></a>
      </div>
      <p style={{opacity:.65,marginTop:'1rem'}}>Completed: {completed.length} chapters</p>
    </main>
  )
}
