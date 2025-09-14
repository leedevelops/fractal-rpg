// Sacred geometry rendering system from fractal-leader
// Renders biblical geometric patterns with D3.js

import * as d3 from 'd3'

export interface GeometryConfig {
  width: number
  height: number
  element: string
  animated?: boolean
  interactive?: boolean
}

// Color mappings for elements
const ELEMENT_COLORS = {
  fire: '#ff4444',
  air: '#4488ff', 
  water: '#44aaaa',
  earth: '#44aa44',
  plasma: '#ffdd44'
} as const

// Sacred geometry patterns
export const renderBiblicalGeometry = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  geometryIcon: string,
  element: string,
  width: number,
  height: number
) => {
  const centerX = width / 2
  const centerY = height / 2
  const elementColor = ELEMENT_COLORS[element.toLowerCase() as keyof typeof ELEMENT_COLORS] || '#888888'
  
  // Clear previous content
  svg.selectAll('*').remove()
  
  // Add background
  svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'rgba(0,0,0,0.05)')
    .attr('stroke', elementColor)
    .attr('stroke-width', 2)
    .attr('rx', 8)

  switch (geometryIcon.toLowerCase()) {
    case 'square':
      renderSquare(svg, centerX, centerY, elementColor)
      break
    case 'triangle':
      renderTriangle(svg, centerX, centerY, elementColor)
      break
    case 'circle':
      renderCircle(svg, centerX, centerY, elementColor)
      break
    case 'spiral':
      renderSpiral(svg, centerX, centerY, elementColor)
      break
    case 'hexagon':
      renderHexagon(svg, centerX, centerY, elementColor)
      break
    case 'star':
      renderStar(svg, centerX, centerY, elementColor)
      break
    case 'cross':
      renderCross(svg, centerX, centerY, elementColor)
      break
    case 'diamond':
      renderDiamond(svg, centerX, centerY, elementColor)
      break
    case 'octagon':
      renderOctagon(svg, centerX, centerY, elementColor)
      break
    default:
      renderDefaultPattern(svg, centerX, centerY, elementColor)
  }

  // Add sacred center point
  svg.append('circle')
    .attr('cx', centerX)
    .attr('cy', centerY)
    .attr('r', 3)
    .attr('fill', elementColor)
    .attr('opacity', 0.8)
}

const renderSquare = (svg: any, centerX: number, centerY: number, color: string) => {
  const size = 80
  
  // Main square
  svg.append('rect')
    .attr('x', centerX - size/2)
    .attr('y', centerY - size/2)
    .attr('width', size)
    .attr('height', size)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
  
  // Corner markers (for altar corners)
  const corners = [
    { x: centerX - size/2, y: centerY - size/2, label: 'Glory' },
    { x: centerX + size/2, y: centerY - size/2, label: 'Presence' },
    { x: centerX - size/2, y: centerY + size/2, label: 'Voice' },
    { x: centerX + size/2, y: centerY + size/2, label: 'Rest' }
  ]
  
  corners.forEach((corner, i) => {
    svg.append('circle')
      .attr('cx', corner.x)
      .attr('cy', corner.y)
      .attr('r', 6)
      .attr('fill', color)
      .attr('opacity', 0.7)
    
    svg.append('text')
      .attr('x', corner.x)
      .attr('y', corner.y - 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', color)
      .text(corner.label)
  })
}

const renderTriangle = (svg: any, centerX: number, centerY: number, color: string) => {
  const size = 70
  const height = size * Math.sqrt(3) / 2
  
  const points = [
    [centerX, centerY - height/2],
    [centerX - size/2, centerY + height/2],
    [centerX + size/2, centerY + height/2]
  ]
  
  svg.append('polygon')
    .attr('points', points.map(p => p.join(',')).join(' '))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
  
  // Trinity points
  points.forEach((point, i) => {
    svg.append('circle')
      .attr('cx', point[0])
      .attr('cy', point[1])
      .attr('r', 5)
      .attr('fill', color)
      .attr('opacity', 0.7)
  })
}

const renderCircle = (svg: any, centerX: number, centerY: number, color: string) => {
  const radius = 60
  
  // Outer circle
  svg.append('circle')
    .attr('cx', centerX)
    .attr('cy', centerY)
    .attr('r', radius)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
  
  // Inner circles (divine unity pattern)
  for (let i = 1; i <= 3; i++) {
    svg.append('circle')
      .attr('cx', centerX)
      .attr('cy', centerY)
      .attr('r', radius * (i / 4))
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)
      .attr('opacity', 0.5)
  }
}

const renderSpiral = (svg: any, centerX: number, centerY: number, color: string) => {
  const turns = 3
  const maxRadius = 60
  const points: [number, number][] = []
  
  for (let i = 0; i <= 360 * turns; i += 5) {
    const angle = (i * Math.PI) / 180
    const radius = (i / (360 * turns)) * maxRadius
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push([x, y])
  }
  
  const line = d3.line()
    .curve(d3.curveCardinal)
  
  svg.append('path')
    .datum(points)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 2)
}

const renderHexagon = (svg: any, centerX: number, centerY: number, color: string) => {
  const radius = 60
  const points: [number, number][] = []
  
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push([x, y])
  }
  
  svg.append('polygon')
    .attr('points', points.map(p => p.join(',')).join(' '))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
  
  // Center hexagon
  const innerPoints: [number, number][] = []
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180
    const x = centerX + (radius/2) * Math.cos(angle)
    const y = centerY + (radius/2) * Math.sin(angle)
    innerPoints.push([x, y])
  }
  
  svg.append('polygon')
    .attr('points', innerPoints.map(p => p.join(',')).join(' '))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 1)
    .attr('opacity', 0.6)
}

const renderStar = (svg: any, centerX: number, centerY: number, color: string) => {
  const outerRadius = 60
  const innerRadius = 25
  const points: [number, number][] = []
  
  for (let i = 0; i < 10; i++) {
    const angle = (i * 36 * Math.PI) / 180
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const x = centerX + radius * Math.cos(angle - Math.PI/2)
    const y = centerY + radius * Math.sin(angle - Math.PI/2)
    points.push([x, y])
  }
  
  svg.append('polygon')
    .attr('points', points.map(p => p.join(',')).join(' '))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
}

const renderCross = (svg: any, centerX: number, centerY: number, color: string) => {
  const size = 80
  const thickness = 20
  
  // Vertical bar
  svg.append('rect')
    .attr('x', centerX - thickness/2)
    .attr('y', centerY - size/2)
    .attr('width', thickness)
    .attr('height', size)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
  
  // Horizontal bar
  svg.append('rect')
    .attr('x', centerX - size/2)
    .attr('y', centerY - thickness/2)
    .attr('width', size)
    .attr('height', thickness)
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
}

const renderDiamond = (svg: any, centerX: number, centerY: number, color: string) => {
  const size = 70
  
  const points = [
    [centerX, centerY - size/2],
    [centerX + size/2, centerY],
    [centerX, centerY + size/2],
    [centerX - size/2, centerY]
  ]
  
  svg.append('polygon')
    .attr('points', points.map(p => p.join(',')).join(' '))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
}

const renderOctagon = (svg: any, centerX: number, centerY: number, color: string) => {
  const radius = 60
  const points: [number, number][] = []
  
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45 * Math.PI) / 180
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)
    points.push([x, y])
  }
  
  svg.append('polygon')
    .attr('points', points.map(p => p.join(',')).join(' '))
    .attr('fill', 'none')
    .attr('stroke', color)
    .attr('stroke-width', 3)
}

const renderDefaultPattern = (svg: any, centerX: number, centerY: number, color: string) => {
  // Default sacred pattern - flower of life inspired
  const radius = 20
  const positions = [
    [0, 0],
    [radius * 1.5, 0],
    [radius * 0.75, radius * 1.3],
    [-radius * 0.75, radius * 1.3],
    [-radius * 1.5, 0],
    [-radius * 0.75, -radius * 1.3],
    [radius * 0.75, -radius * 1.3]
  ]
  
  positions.forEach(([dx, dy]) => {
    svg.append('circle')
      .attr('cx', centerX + dx)
      .attr('cy', centerY + dy)
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)
      .attr('opacity', 0.7)
  })
}

// Animation utilities
export const animateGeometry = (svg: any, duration: number = 2000) => {
  svg.selectAll('*')
    .style('opacity', 0)
    .transition()
    .duration(duration)
    .style('opacity', 1)
    .ease(d3.easeElastic)
}

export const pulseGeometry = (svg: any, element: string) => {
  const color = ELEMENT_COLORS[element.toLowerCase() as keyof typeof ELEMENT_COLORS] || '#888888'
  
  svg.selectAll('circle, rect, polygon, path')
    .transition()
    .duration(1000)
    .attr('stroke', d3.color(color)?.brighter(0.5)?.toString() || color)
    .transition()
    .duration(1000)
    .attr('stroke', color)
    .on('end', () => pulseGeometry(svg, element))
}
