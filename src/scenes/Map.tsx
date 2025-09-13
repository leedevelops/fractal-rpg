import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { FRACTAL_MATRIX } from '../content/fractalMatrix'
import { gateKeyFromGeometry } from '../game/gates'

export default function MapScene(){
  const nav = useNavigate()
  const { currentChapter, goToChapter } = useGameStore()
  const ch = currentChapter()

  return (
    <main className='container'>
      <div className='card'>
        <h2>Chapter {ch.id}: {ch.chapterTitle}</h2>
        <div style={{display:'flex', flexWrap:'wrap', gap:'0.5rem', fontSize:14, opacity:.85}}>
          <span className='badge'>{ch.book} • {ch.divineName}</span>
          <span className='badge'>{ch.templeSpace}</span>
          <span className='badge'>{ch.element}</span>
          <span className='badge'>{ch.geometryIcon}</span>
        </div>
        <p style={{marginTop:'.5rem',opacity:.8}}>{ch.bookTheme}</p>
        <div style={{display:'flex', gap:'.5rem', marginTop:'.5rem'}}>
          <button onClick={()=>nav(`/gate/${ch.id}`)}>Enter Gate</button>
          <Link to='/bag'><button>Inventory</button></Link>
        </div>
      </div>

      <div className='card'>
        <h3>Golden Path</h3>
        <ol className='list'>
          {[1,5,10,15,20,25,26,27].map(id=>{
            const row = FRACTAL_MATRIX.find(r=>r.id===id)!
            const k = gateKeyFromGeometry(row.geometryIcon)
            return <li key={id} style={{margin:'.25rem 0'}}>
              <button onClick={()=>goToChapter(id)}>
                #{id} · {row.chapterTitle} · Gate: {k==='Placeholder'?'—':k}
              </button>
            </li>
          })}
        </ol>
      </div>
    </main>
  )
}
