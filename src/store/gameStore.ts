import { create } from 'zustand'
import localforage from 'localforage'
import { FRACTAL_MATRIX } from '../content/fractalMatrix'
import { FractalChapter } from '../content/schema'

type SaveGame = {
  currentChapterId: number
  completed: number[]
  xp: number
  level: number
  commissioned?: boolean
  sealed?: boolean
}

type GameState = SaveGame & {
  loading: boolean
  error?: string
  currentChapter(): FractalChapter
  startNewGame(): Promise<void>
  continueGame(): Promise<void>
  completeCurrentChapter(): Promise<void>
  goToChapter(id: number): void
}

const STORAGE_KEY = 'fractal-rpg.save.v1'

function calcLevel(xp: number){ return 1 + Math.floor(xp/100) }

export const useGameStore = create<GameState>((set, get) => ({
  loading: true,
  error: undefined,
  currentChapterId: 1,
  completed: [],
  xp: 0,
  level: 1,
  commissioned: false,
  sealed: false,

  currentChapter(){
    const ch = FRACTAL_MATRIX.find(c => c.id === get().currentChapterId)
    if(!ch) throw new Error('Invalid chapter id')
    return ch
  },

  async startNewGame(){
    const seed: SaveGame = { currentChapterId: 1, completed: [], xp: 0, level: 1 }
    await localforage.setItem(STORAGE_KEY, seed)
    set({ ...seed, loading:false })
  },

  async continueGame(){
    const data = await localforage.getItem<SaveGame>(STORAGE_KEY)
    if(data){
      set({ ...data, level: calcLevel(data.xp), loading:false })
    } else {
      const seed: SaveGame = { currentChapterId: 1, completed: [], xp: 0, level: 1 }
      await localforage.setItem(STORAGE_KEY, seed)
      set({ ...seed, loading:false })
    }
  },

  async completeCurrentChapter(){
    const state = get()
    const id = state.currentChapterId
    const completed = Array.from(new Set([ ...state.completed, id ]))
    let xp = state.xp + 50
    let commissioned = state.commissioned
    let sealed = state.sealed
    if(id === 25) commissioned = true
    if(id === 27) sealed = true
    const nextId = nextChapterId(id)
    const payload: SaveGame = { currentChapterId: nextId, completed, xp, level: calcLevel(xp), commissioned, sealed }
    await localforage.setItem(STORAGE_KEY, payload)
    set(payload)
  },

  goToChapter(id:number){
    set({ currentChapterId:id })
  }
}))

export function nextChapterId(id: number){
  // Sequential progression through all 27 chapters
  if(id < 27) return id + 1
  return 27 // Stay at final chapter
}
