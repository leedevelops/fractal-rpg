import React from 'react'
import { FRACTAL_MATRIX } from '../content/fractalMatrix'
import { useGameStore } from '../store/gameStore'

export default function QuestLog(){
  const { completed } = useGameStore()
  return (
    <main className='container'>
      <div className='card'>
        <h2>Journey Log</h2>
        <ul className='list'>
          {FRACTAL_MATRIX.map(row=>{
            const done = completed.includes(row.id)
            return <li key={row.id} style={{margin:'.25rem 0'}}>
              <span className='badge'>#{row.id}</span> {row.chapterTitle} {done?'✅':''}
            </li>
          })}
        </ul>
      </div>
    </main>
  )
}
