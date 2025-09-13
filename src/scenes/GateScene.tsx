import React, { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FRACTAL_MATRIX } from '../content/fractalMatrix'
import { Gates, gateKeyFromGeometry } from '../game/gates'
import Placeholder from './gateParts/Placeholder'
import { useGameStore } from '../store/gameStore'

export default function GateScene(){
  const nav = useNavigate()
  const { id } = useParams()
  const chapterId = Number(id)
  const row = FRACTAL_MATRIX.find(r=>r.id===chapterId)!
  const key = gateKeyFromGeometry(row.geometryIcon)
  const { completeCurrentChapter } = useGameStore()

  const [progress, setProgress] = useState(0)
  const factory = key==='Placeholder'? null : Gates[key]
  const gate = useMemo(()=> factory? factory({}): null, [factory])

  React.useEffect(()=>{ gate?.start() }, [gate])

  function onInteract(type: string){
    gate?.interact({type})
    const s = gate?.status()
    setProgress(s? s.progress : 0)
  }

  function onComplete(){
    const done = gate? gate.complete().success : true
    if(done){
      completeCurrentChapter().then(()=>{
        if(chapterId===27) nav('/epilogue')
        else nav('/play')
      })
    }
  }

  return (
    <main className='container'>
      <div className='card'>
        <h2>Gate: {key==='Placeholder'?'Practice':gate?.title}</h2>
        <p>{row.chapterTitle}</p>
        {key==='Placeholder' && <Placeholder onDone={onComplete} />}
        {key!=='Placeholder' && (
          <div style={{display:'grid', gap:'.5rem', marginTop:'.5rem'}}>
            <div className='badge'>Progress: {(progress*100).toFixed(0)}%</div>
            <div style={{display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
              <button onClick={()=>onInteract('flip')}>Flip</button>
              <button onClick={()=>onInteract('call')}>Call</button>
              <button onClick={()=>onInteract('respond')}>Respond</button>
              <button onClick={()=>onInteract('send')}>Send</button>
              <button onClick={()=>onInteract('link')}>Link</button>
              <button onClick={()=>onInteract('place')}>Place</button>
            </div>
            <button onClick={onComplete}>Complete Gate</button>
          </div>
        )}
      </div>
    </main>
  )
}
