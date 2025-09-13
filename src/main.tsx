import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import Title from './scenes/Title'
import MapScene from './scenes/Map'
import Inventory from './scenes/Inventory'
import Epilogue from './scenes/Epilogue'
import QuestLog from './scenes/QuestLog'
import GateScene from './scenes/GateScene'
import './styles.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Title /> },
      { path: 'play', element: <MapScene /> },
      { path: 'bag', element: <Inventory /> },
      { path: 'log', element: <QuestLog /> },
      { path: 'gate/:id', element: <GateScene /> },
      { path: 'epilogue', element: <Epilogue /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
