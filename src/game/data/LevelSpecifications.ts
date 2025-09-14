// Exact 27-Level Specification as provided
export interface LevelSpec {
  id: number
  book: number
  bookName: string
  element: string
  templeSpace: string
  geometry: string
  dimension: string
  gate: string
  description: string
  puzzleType: string
}

export const LEVEL_SPECIFICATIONS: LevelSpec[] = [
  // Book 1 – Fire / Altar
  { id: 1, book: 1, bookName: "Fire", element: "Fire", templeSpace: "Altar", geometry: "Square", dimension: "Glory", gate: "Revelation", description: "align four altar corners; quiz on Ch.1 basics", puzzleType: "alignment" },
  { id: 2, book: 1, bookName: "Fire", element: "Fire", templeSpace: "Altar", geometry: "Equilateral Triangle", dimension: "Image", gate: "Internalization", description: "mirror the triad; 1-line 'first things' reflection gates hint", puzzleType: "mirror" },
  { id: 3, book: 1, bookName: "Fire", element: "Fire", templeSpace: "Altar", geometry: "2D Spiral", dimension: "Presence", gate: "Embodiment", description: "breath-paced spiral tracing; quick pause practice", puzzleType: "proximity" },
  { id: 4, book: 1, bookName: "Fire", element: "Fire", templeSpace: "Altar", geometry: "Isometric Cube", dimension: "Word", gate: "Integration", description: "connect verse-glyphs on a cube net", puzzleType: "logic" },
  { id: 5, book: 1, bookName: "Fire", element: "Fire", templeSpace: "Altar", geometry: "Monad Point", dimension: "Name", gate: "Hidden (North)", description: "find the single hidden center; meta quiz", puzzleType: "meta" },

  // Book 2 – Air / Holy Place
  { id: 6, book: 2, bookName: "Air", element: "Air", templeSpace: "Holy Place", geometry: "Tetra + Rays", dimension: "Image", gate: "Revelation", description: "build radiant symmetry; discover ray rule", puzzleType: "mirror" },
  { id: 7, book: 2, bookName: "Air", element: "Air", templeSpace: "Holy Place", geometry: "Hex Mandala", dimension: "Word", gate: "Internalization", description: "form hex-phrases; reorder 'altar before platform' statement", puzzleType: "logic" },
  { id: 8, book: 2, bookName: "Air", element: "Air", templeSpace: "Holy Place", geometry: "Octahedron", dimension: "Presence", gate: "Embodiment", description: "proximity orbits; timed stillness hold", puzzleType: "proximity" },
  { id: 9, book: 2, bookName: "Air", element: "Air", templeSpace: "Holy Place", geometry: "Fibonacci Spiral", dimension: "Spirit", gate: "Integration", description: "combine wind currents to grow the spiral", puzzleType: "synergy" },
  { id: 10, book: 2, bookName: "Air", element: "Air", templeSpace: "Holy Place", geometry: "Fractal Tree", dimension: "Name", gate: "Hidden (South)", description: "reveal root nodes; concealed pathway", puzzleType: "meta" },

  // Book 3 – Water / Inner Light
  { id: 11, book: 3, bookName: "Water", element: "Water", templeSpace: "Inner Light", geometry: "Icosahedron", dimension: "Glory", gate: "Revelation", description: "light 12/20 nodes in holy order", puzzleType: "alignment" },
  { id: 12, book: 3, bookName: "Water", element: "Water", templeSpace: "Inner Light", geometry: "Hex Prism", dimension: "Voice", gate: "Internalization", description: "echo sequences; 1-line 'first words bless' reflection", puzzleType: "sequence" },
  { id: 13, book: 3, bookName: "Water", element: "Water", templeSpace: "Inner Light", geometry: "Golden Ratio Spiral", dimension: "Word", gate: "Embodiment", description: "speak/type a mission phrase in rhythm", puzzleType: "logic" },
  { id: 14, book: 3, bookName: "Water", element: "Water", templeSpace: "Inner Light", geometry: "Möbius Strip", dimension: "Image", gate: "Integration", description: "complete a non-orientable mosaic", puzzleType: "mirror" },
  { id: 15, book: 3, bookName: "Water", element: "Water", templeSpace: "Inner Light", geometry: "Metatron Cube", dimension: "Name", gate: "Hidden (East)", description: "unlock nested gates; quiet, slow reveal", puzzleType: "meta" },

  // Book 4 – Earth / Holy of Holies
  { id: 16, book: 4, bookName: "Earth", element: "Earth", templeSpace: "Holy of Holies", geometry: "3D Pentagon", dimension: "Spirit", gate: "Revelation", description: "energize five currents; discover synergy rule", puzzleType: "synergy" },
  { id: 17, book: 4, bookName: "Earth", element: "Earth", templeSpace: "Holy of Holies", geometry: "Tetrahedron", dimension: "Word", gate: "Internalization", description: "law-of-love logic sort; short journaling gate", puzzleType: "logic" },
  { id: 18, book: 4, bookName: "Earth", element: "Earth", templeSpace: "Holy of Holies", geometry: "Isometric Grid", dimension: "Image", gate: "Embodiment", description: "posture/micro-movement alignments", puzzleType: "mirror" },
  { id: 19, book: 4, bookName: "Earth", element: "Earth", templeSpace: "Holy of Holies", geometry: "Reflection Diagram", dimension: "Presence", gate: "Integration", description: "pair mentors/mirrors correctly", puzzleType: "proximity" },
  { id: 20, book: 4, bookName: "Earth", element: "Earth", templeSpace: "Holy of Holies", geometry: "Flower of Life", dimension: "Name", gate: "Hidden (West)", description: "find overlapping 'Name' rosette", puzzleType: "meta" },

  // Book 5 – Plasma / Ark
  { id: 21, book: 5, bookName: "Plasma", element: "Plasma", templeSpace: "Ark", geometry: "Star of David", dimension: "Name", gate: "Revelation", description: "light covenant star; identity declaration", puzzleType: "meta" },
  { id: 22, book: 5, bookName: "Plasma", element: "Plasma", templeSpace: "Ark", geometry: "Fibonacci Circle", dimension: "Image", gate: "Internalization", description: "concentric symmetry; inner vow line", puzzleType: "mirror" },
  { id: 23, book: 5, bookName: "Plasma", element: "Plasma", templeSpace: "Ark", geometry: "Torus (3D)", dimension: "Word", gate: "Embodiment", description: "speak and walk loop; continuous flow task", puzzleType: "logic" },
  { id: 24, book: 5, bookName: "Plasma", element: "Plasma", templeSpace: "Ark", geometry: "64 Star Tetra", dimension: "Name", gate: "Integration", description: "combine prior badges into a single lattice", puzzleType: "meta" },
  { id: 25, book: 5, bookName: "Plasma", element: "Plasma", templeSpace: "Ark", geometry: "Nested Fib Circles", dimension: "Name", gate: "Hidden (Center)", description: "center-line commissioning; shofar pulse", puzzleType: "meta" },

  // Apostolic Expansion
  { id: 26, book: 6, bookName: "Apostolic", element: "Plasma", templeSpace: "Nations", geometry: "Fractal Network", dimension: "Name", gate: "Revelation", description: "replicate nodes; send flame to nations", puzzleType: "meta" },
  { id: 27, book: 6, bookName: "Apostolic", element: "Plasma", templeSpace: "Commission", geometry: "Final Commission", dimension: "Name", gate: "Synthesis", description: "meta-trial combining all six prior dimensions; final commissioning", puzzleType: "meta" }
]

export function getLevelSpec(levelId: number): LevelSpec | null {
  return LEVEL_SPECIFICATIONS.find(spec => spec.id === levelId) || null
}

export function getBookBossLevels(): number[] {
  return [5, 10, 15, 20, 25]
}

export function isBookBoss(levelId: number): boolean {
  return getBookBossLevels().includes(levelId)
}
