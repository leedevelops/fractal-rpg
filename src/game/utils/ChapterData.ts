import { FRACTAL_MATRIX } from '../../content/fractalMatrix'

export interface ChapterMetadata {
  id: number
  chapterTitle: string
  dimension: string
  geometryIcon: string
  fractalGate: string
  stone: string
  element: string
  templeSpace: string
  tribe: string
  bookTheme: string
}

export function getChapterData(chapterId: number): ChapterMetadata | null {
  const chapter = FRACTAL_MATRIX.find(c => c.id === chapterId)
  
  if (!chapter) {
    return null
  }
  
  return {
    id: chapter.id,
    chapterTitle: chapter.chapterTitle,
    dimension: chapter.dimension,
    geometryIcon: chapter.geometryIcon,
    fractalGate: chapter.fractalGate,
    stone: chapter.stone,
    element: chapter.element,
    templeSpace: chapter.templeSpace,
    tribe: chapter.tribe || '',
    bookTheme: chapter.bookTheme
  }
}

export function getCurrentChapterData(): ChapterMetadata {
  // For now, default to Chapter 1, but this will be dynamic based on game state
  return getChapterData(1) || {
    id: 1,
    chapterTitle: 'Leadership Begins at the Altar',
    dimension: '1 Glory',
    geometryIcon: 'Square',
    fractalGate: 'Revelation',
    stone: 'Sardius',
    element: 'Fire',
    templeSpace: 'Altar',
    tribe: 'Reuben',
    bookTheme: 'Identity, Calling, and the Formation of Glory'
  }
}

export function getAllChapterData(): ChapterMetadata[] {
  return FRACTAL_MATRIX.map(chapter => ({
    id: chapter.id,
    chapterTitle: chapter.chapterTitle,
    dimension: chapter.dimension,
    geometryIcon: chapter.geometryIcon,
    fractalGate: chapter.fractalGate,
    stone: chapter.stone,
    element: chapter.element,
    templeSpace: chapter.templeSpace,
    tribe: chapter.tribe || '',
    bookTheme: chapter.bookTheme
  }))
}
