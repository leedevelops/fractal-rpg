import { describe, it, expect } from 'vitest'
import { FractalMatrixZ } from '../src/content/schema'
import { FRACTAL_MATRIX } from '../src/content/fractalMatrix'
import { nextChapterId } from '../src/store/gameStore'

describe('matrix validation', () => {
  it('is valid', () => {
    expect(() => FractalMatrixZ.parse(FRACTAL_MATRIX)).not.toThrow()
  })
})

describe('golden path', () => {
  it('progresses in correct order', () => {
    const path = [1,5,10,15,20,25,26,27]
    for(let i=0;i<path.length-1;i++){
      expect(nextChapterId(path[i])).toBe(path[i+1])
    }
  })
})
