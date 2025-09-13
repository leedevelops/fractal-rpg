import React from 'react'

export default function Placeholder({ onDone }:{ onDone: ()=>void }){
  return (
    <div>
      <p>Practice gate. Press to complete.</p>
      <button onClick={onDone}>Complete</button>
    </div>
  )
}
