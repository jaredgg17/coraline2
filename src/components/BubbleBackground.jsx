/**
 * BubbleBackground.jsx
 * Generates animated rising bubbles and light rays to simulate
 * an underwater ocean environment.
 */
import { motion } from 'framer-motion'
import { useMemo } from 'react'

// Deterministic bubble config array — generated once, stable across renders.
const BUBBLE_CONFIG = [
  { id: 1, size: 8,  left: 8,  delay: 0,   duration: 6.5 },
  { id: 2, size: 13, left: 18, delay: 1.8, duration: 8.2 },
  { id: 3, size: 6,  left: 30, delay: 0.6, duration: 7.1 },
  { id: 4, size: 10, left: 44, delay: 2.3, duration: 9.0 },
  { id: 5, size: 16, left: 57, delay: 0.9, duration: 6.8 },
  { id: 6, size: 8,  left: 65, delay: 3.2, duration: 7.6 },
  { id: 7, size: 6,  left: 74, delay: 1.1, duration: 8.9 },
  { id: 8, size: 12, left: 83, delay: 2.7, duration: 7.3 },
  { id: 9, size: 9,  left: 24, delay: 4.1, duration: 9.8 },
  { id: 10, size: 7, left: 52, delay: 3.7, duration: 6.2 },
  { id: 11, size: 15, left: 38, delay: 5.2, duration: 10.5 },
  { id: 12, size: 6,  left: 92, delay: 6.3, duration: 8.1 },
  { id: 13, size: 11, left: 70, delay: 0.4, duration: 7.9 },
  { id: 14, size: 8,  left: 6,  delay: 7.0, duration: 9.4 },
]

// Light ray positions and animation delays
const RAY_CONFIG = [
  { left: '8%',  rotate: -12, delay: 0 },
  { left: '24%', rotate: -6,  delay: 0.8 },
  { left: '42%', rotate: 0,   delay: 1.6 },
  { left: '60%', rotate: 6,   delay: 0.4 },
  { left: '78%', rotate: 12,  delay: 1.2 },
]

/* ─── Single Bubble ─────────────────────────────────────── */
function Bubble({ size, left, delay, duration }) {
  const opacity = 0.3 + (size / 20) * 0.5

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        bottom: -size,
        left: `${left}%`,
        width: size,
        height: size,
        borderRadius: '50%',
        border: `1px solid rgba(144, 224, 239, ${opacity})`,
        background: `rgba(144, 224, 239, ${opacity * 0.18})`,
        pointerEvents: 'none',
      }}
      animate={{ y: [0, -(700 + size * 2)], scale: [0.5, 1.3], opacity: [0, opacity, opacity * 0.6, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeIn',
        times: [0, 0.05, 0.9, 1],
      }}
    />
  )
}

/* ─── Light Ray ─────────────────────────────────────────── */
function LightRay({ left, rotate, delay }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left,
        width: 3,
        height: '45%',
        background: 'linear-gradient(to bottom, rgba(144, 224, 239, 0.2), transparent)',
        transform: `rotate(${rotate}deg)`,
        transformOrigin: 'top center',
        pointerEvents: 'none',
        borderRadius: 2,
      }}
      animate={{ opacity: [0.03, 0.1, 0.03] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}

/* ─── Component ──────────────────────────────────────────── */
export default function BubbleBackground() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Caustic light overlay at top */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(0, 180, 216, 0.14) 0%, transparent 55%)',
        }}
      />

      {/* Light rays */}
      {RAY_CONFIG.map((r, i) => (
        <LightRay key={i} {...r} />
      ))}

      {/* Bubbles */}
      {BUBBLE_CONFIG.map(b => (
        <Bubble key={b.id} {...b} />
      ))}
    </div>
  )
}
