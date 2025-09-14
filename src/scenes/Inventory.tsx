import React from 'react'
import { useGameStore } from '../store/gameStore'
import { FRACTAL_MATRIX } from '../content/fractalMatrix'

const BADGE_REWARDS = {
  1: { name: 'Altar Before Platform', icon: '🔥', description: 'Mastered the square altar of leadership foundation' },
  25: { name: 'Commissioned Messenger', icon: '🎺', description: 'Received divine commission through the shofar convergence' },
  26: { name: 'Apostolic Multiplier', icon: '🌐', description: 'Activated the fractal network multiplication pattern' },
  27: { name: 'Pattern Keeper', icon: '💎', description: 'Sealed the eternal pattern of the New Jerusalem' }
}

export default function Inventory(){
  const { completed, commissioned, sealed } = useGameStore()
  
  const earnedBadges = completed.filter(id => id in BADGE_REWARDS)
  const totalXP = completed.length * 50
  
  return (
    <main className='container'>
      <div className='card'>
        <h2>Inventory & Achievements</h2>
        
        {/* Stats Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <div className='badge' style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px' }}>📊</div>
            <div>Levels Complete</div>
            <div style={{ fontSize: '18px', color: '#8ad' }}>{completed.length}/27</div>
          </div>
          <div className='badge' style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px' }}>⭐</div>
            <div>Total XP</div>
            <div style={{ fontSize: '18px', color: '#8ad' }}>{totalXP}</div>
          </div>
          <div className='badge' style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px' }}>🏆</div>
            <div>Badges Earned</div>
            <div style={{ fontSize: '18px', color: '#8ad' }}>{earnedBadges.length}/4</div>
          </div>
        </div>

        {/* Special Status */}
        {(commissioned || sealed) && (
          <div style={{ marginBottom: '2rem' }}>
            <h3>Divine Commissions</h3>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {commissioned && (
                <div className='badge' style={{ background: 'linear-gradient(45deg, #8ad, #ff6b35)', color: '#000' }}>
                  🎺 Commissioned Messenger - Authority to sound the shofar to the nations
                </div>
              )}
              {sealed && (
                <div className='badge' style={{ background: 'linear-gradient(45deg, #ff6b35, #8ad)', color: '#000' }}>
                  💎 Pattern Keeper - Eternal pattern sealed, Amen and Amen
                </div>
              )}
            </div>
          </div>
        )}

        {/* Badge Collection */}
        <h3>Sacred Badges</h3>
        {earnedBadges.length > 0 ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {earnedBadges.map(levelId => {
              const badge = BADGE_REWARDS[levelId as keyof typeof BADGE_REWARDS]
              const chapter = FRACTAL_MATRIX.find(c => c.id === levelId)
              return (
                <div key={levelId} className='card' style={{ 
                  background: 'linear-gradient(45deg, #0f131b, #1b2230)',
                  border: '1px solid #8ad'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '48px' }}>{badge.icon}</div>
                    <div>
                      <h4 style={{ margin: 0, color: '#8ad' }}>{badge.name}</h4>
                      <p style={{ margin: '0.25rem 0', fontSize: '14px', opacity: 0.8 }}>
                        Level {levelId}: {chapter?.chapterTitle}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#9ac' }}>
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className='card' style={{ textAlign: 'center', opacity: 0.6 }}>
            <p>Complete special levels to earn sacred badges</p>
            <p style={{ fontSize: '12px' }}>Available at Levels: 1, 25, 26, 27</p>
          </div>
        )}

        {/* Progress Toward Next Badge */}
        {earnedBadges.length < 4 && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Next Badge</h3>
            {(() => {
              const nextBadgeLevel = [1, 25, 26, 27].find(level => !completed.includes(level))
              if (nextBadgeLevel) {
                const badge = BADGE_REWARDS[nextBadgeLevel as keyof typeof BADGE_REWARDS]
                const chapter = FRACTAL_MATRIX.find(c => c.id === nextBadgeLevel)
                return (
                  <div className='card' style={{ opacity: 0.7 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ fontSize: '32px', opacity: 0.5 }}>{badge.icon}</div>
                      <div>
                        <h4 style={{ margin: 0 }}>{badge.name}</h4>
                        <p style={{ margin: '0.25rem 0', fontSize: '14px' }}>
                          Level {nextBadgeLevel}: {chapter?.chapterTitle}
                        </p>
                        <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              }
              return <p>All badges earned! 🎉</p>
            })()}
          </div>
        )}
      </div>
    </main>
  )
}
