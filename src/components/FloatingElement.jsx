/**
 * FloatingElement.jsx
 * A reusable wrapper that applies a smooth floating / levitation animation
 * to any child element using Framer Motion, simulating an underwater drift.
 *
 * Props:
 *  children   – React node to animate
 *  delay      – animation start delay in seconds (stagger characters)
 *  amplitude  – vertical travel in px (default 15)
 *  duration   – one full cycle in seconds (default 3.5)
 *  rotate     – slight rotation swing in degrees (default 2)
 *  className  – extra Tailwind / CSS classes
 *  style      – inline style overrides
 */
import { motion } from 'framer-motion'

export default function FloatingElement({
  children,
  delay = 0,
  amplitude = 15,
  duration = 3.5,
  rotate = 2,
  className = '',
  style = {},
}) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        y: [0, -amplitude, -amplitude * 0.55, -amplitude, 0],
        rotate: [0, -rotate, 0, rotate, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
