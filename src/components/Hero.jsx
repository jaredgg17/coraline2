/**
 * Hero.jsx
 * The main underwater scene. Renders the title, all interactive
 * characters (Ariel, Flounder, Sebastián, treasure chest),
 * seaweed decorations, and the WhatsApp RSVP button.
 *
 * Props:
 *  info           – party data object (name, date, time …)
 *  onCharacterTap – callback(characterId: string) when user taps a character
 */
import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloatingElement from './FloatingElement'

/* ─────────────────────────────────────────────────────────
   BUBBLE EFFECT
   Renders a burst of animated bubbles at a given (x, y) position.
   Each bubble floats upward and fades out independently.
────────────────────────────────────────────────────────── */
function BubbleEffect({ bubbles }) {
  return (
    <AnimatePresence>
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          initial={{ x: b.x, y: b.y, scale: 0, opacity: 0.85 }}
          animate={{
            y: b.y - b.rise,
            x: b.x + b.drift,
            scale: [0, 1, 1, 0.6],
            opacity: [0.85, 0.75, 0.4, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: b.duration, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            border: `1.5px solid rgba(144, 224, 239, ${b.opacity})`,
            background: `radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35), rgba(144, 224, 239, 0.08))`,
            boxShadow: `0 0 ${b.size * 0.6}px rgba(0, 200, 255, 0.25)`,
            pointerEvents: 'none',
            zIndex: 50,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────────────────────
   CHARACTER BUTTON
────────────────────────────────────────────────────────── */
function CharacterButton({ src, alt, label, glowColor, onClick, delay, amplitude, rotate, onBubbleBurst, imgSize }) {
  const [pressed, setPressed] = useState(false)
  const buttonRef = useRef(null)

  const handleClick = useCallback((e) => {
    // Calculate click position relative to the Hero container
    const rect = buttonRef.current?.getBoundingClientRect()
    if (rect && onBubbleBurst) {
      const x = (e.clientX || rect.left + rect.width / 2) - 0 // absolute clientX
      const y = (e.clientY || rect.top + rect.height / 2) - 0  // absolute clientY
      onBubbleBurst(x, y)
    }
    onClick?.()
  }, [onClick, onBubbleBurst])

  return (
    <FloatingElement delay={delay} amplitude={amplitude} rotate={rotate}>
      <button
        ref={buttonRef}
        onClick={handleClick}
        onPointerDown={() => setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        aria-label={`Descubrir: ${label}`}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {/* Image ring */}
        <motion.div
          animate={{ scale: pressed ? 0.9 : 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{
            borderRadius: '0%',
            overflow: 'hidden',
            border: `0px solid ${glowColor}66`,
            boxShadow: pressed
              ? `0 0 0px ${glowColor}99, 0 0 56px ${glowColor}44`
              : `0 0 0px ${glowColor}44`,
            transition: 'box-shadow 0.3s',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: imgSize ?? 'clamp(72px, 20vw, 105px)',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </motion.div>

        {/* Tap hint label */}
        <motion.span
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontSize: 1,
            color: glowColor,
            fontFamily: '"Cormorant Garamond", serif',
            letterSpacing: '0.1em',
            textShadow: `0 0 8px ${glowColor}`,
          }}
        >
          ✦ {label}
        </motion.span>
      </button>
    </FloatingElement>
  )
}

/* ─────────────────────────────────────────────────────────
   SEAWEED (SVG path)
────────────────────────────────────────────────────────── */
function Seaweed({ color = '#0d7a58', height = 80, swayDelay = 0 }) {
  const h = height
  return (
    <motion.svg
      width={20}
      height={h}
      viewBox={`0 0 20 ${h}`}
      aria-hidden="true"
      animate={{ skewX: [4, -4, 4] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: swayDelay }}
      style={{ transformOrigin: 'bottom center', display: 'block' }}
    >
      <path
        d={`M10 ${h} Q16 ${h * 0.78} 10 ${h * 0.62} Q4 ${h * 0.46} 10 ${h * 0.3} Q16 ${h * 0.15} 10 2`}
        stroke={color}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  )
}

/* ─────────────────────────────────────────────────────────
   CORAL IMAGE PLACEHOLDER
   Reemplaza los emojis de coral. Coloca tu imagen en src.
   Ejemplo: import CoralPNG from '../assets/Coral_PNG.png'
            luego: <CoralPlaceholder src={CoralPNG} … />
────────────────────────────────────────────────────────── */
function CoralPlaceholder({ src = '', alt = 'Coral', width = 36, height = 36, style = {} }) {
  return src ? (
    <img
      src={src}
      alt={alt}
      style={{
        width,
        height,
        objectFit: 'contain',
        display: 'block',
        ...style,
      }}
    />
  ) : (
    /*
     * ─── PLACEHOLDER ─────────────────────────────────────────
     * Se muestra mientras no hay imagen. Reemplaza src con tu PNG.
     * ─────────────────────────────────────────────────────────
     */
    <div
      title={`Imagen: ${alt}`}
      style={{
        width,
        height,
        borderRadius: 6,
        border: '1.5px dashed rgba(144, 224, 239, 0.4)',
        background: 'rgba(0, 150, 180, 0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        ...style,
      }}
    >
      <span style={{ fontSize: 14, opacity: 0.5 }}></span>
      <span
        style={{
          fontSize: 7,
          color: 'rgba(144, 224, 239, 0.5)',
          fontFamily: 'monospace',
          letterSpacing: '0.04em',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {alt}
      </span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────
   BUBBLE HELPERS
────────────────────────────────────────────────────────── */
let bubbleIdCounter = 0

function createBubbleBurst(clientX, clientY, containerRef) {
  const containerRect = containerRef.current?.getBoundingClientRect()
  const offsetX = containerRect ? clientX - containerRect.left : clientX
  const offsetY = containerRect ? clientY - containerRect.top : clientY

  const count = 8 + Math.floor(Math.random() * 5) // 8–12 bubbles

  return Array.from({ length: count }).map(() => {
    const size = 6 + Math.random() * 18           // 6–24 px
    const rise = 60 + Math.random() * 100          // how far up they float
    const drift = (Math.random() - 0.5) * 60       // horizontal drift
    const duration = 0.9 + Math.random() * 0.8     // 0.9–1.7 s
    const opacity = 0.55 + Math.random() * 0.45

    return {
      id: ++bubbleIdCounter,
      x: offsetX + (Math.random() - 0.5) * 30,
      y: offsetY + (Math.random() - 0.5) * 20,
      size,
      rise,
      drift,
      duration,
      opacity,
    }
  })
}

/* ─────────────────────────────────────────────────────────
   HERO COMPONENT
────────────────────────────────────────────────────────── */
export default function Hero({ info, onCharacterTap }) {
  const [bubbles, setBubbles] = useState([])
  const containerRef = useRef(null)

  // Spawns a burst of bubbles at the tap position, then cleans them up
  const handleBubbleBurst = useCallback((clientX, clientY) => {
    const newBubbles = createBubbleBurst(clientX, clientY, containerRef)
    setBubbles((prev) => [...prev, ...newBubbles])

    // Remove after longest bubble lifetime
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => !newBubbles.find((nb) => nb.id === b.id)))
    }, 2200)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ overflow: 'hidden' }}
    >
      {/* ══ BUBBLE LAYER ══════════════════════════════════════ */}
      <BubbleEffect bubbles={bubbles} />

      {/* ══ TITLE ══════════════════════════════════════════════ */}
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.2 }}
        className="absolute left-0 right-0 text-center"
        style={{ top: '5%', padding: '0 16px' }}
      >
        <p
          className="font-display"
          style={{
            fontSize: 15,
            letterSpacing: '0.35em',
            color: 'rgba(144, 224, 239, 0.7)',
            textTransform: 'uppercase',
            marginBottom: 4,
          }}
        >
          ✦ Estás Invitad@ a ✦
        </p>

        <h1
          className="shimmer-gold font-display"
          style={{ fontSize: 'clamp(36px, 10vw, 52px)', lineHeight: 1, margin: '4px 0' }}
        >
          {info.childName.toUpperCase()}
        </h1>

        <p
          className="font-display"
          style={{
            fontSize: 15,
            letterSpacing: '0.18em',
            color: 'rgba(144, 224, 239, 0.6)',
            marginTop: 4,
          }}
        >
          ❧ Celebra sus {info.age} Añitos ❧
        </p>

        <p
          className="font-body"
          style={{
            fontSize: 'clamp(13px, 3.8vw, 20px)',
            color: 'rgba(255, 255, 255, 0.42)',
            marginTop: 8,
            fontStyle: 'italic',
          }}
        >
          Toca a los personajes para descubrir más ✦
        </p>
      </motion.div>

      {/* ══ FLOUNDER  (top-left) ══════════════════════════════ */}
      <div style={{ position: 'absolute', top: '30%', left: '3%', }}>
        <CharacterButton
          src="https://raw.githubusercontent.com/jaredgg17/audio/5542bbc0dd7228cf2a22c8620363b9a09960ee40/taqueria/cadcec1883d7133496e1e13d72191f06-removebg-preview.png"
          alt="Flounder — el pez amigo de Ariel"
          label="Fecha"
          glowColor="#FFD700"
          delay={0}
          amplitude={14}
          rotate={3}
          imgSize="clamp(120px, 20vw, 105px)"
          onClick={() => onCharacterTap('flounder')}
          onBubbleBurst={handleBubbleBurst}
        />
      </div>

      {/* ══ ARIEL  (center) ═══════════════════════════════════ */}
      <FloatingElement
        delay={0.6}
        amplitude={12}
        duration={5}
        rotate={1}
        style={{
          position: 'absolute',
          top: '60%',
          left: '30%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <a
          href={`https://wa.me/${info.whatsapp}?text=${encodeURIComponent(info.whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}
        >
          <motion.div
            className="ariel-glow"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.5 }}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="https://raw.githubusercontent.com/jaredgg17/audio/main/IMG-20260508-WA0031-removebg-preview.png"
              alt="Ariel la Sirenita"
              style={{
                width: '60%',
                height: '60%',
                objectFit: 'contain',
                borderRadius: '0% 0% 0% 0%',
                border: '0px solid rgba(155, 89, 182, 0.45)',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </motion.div>
        </a>
      </FloatingElement>

      {/* ══ SEBASTIÁN  (top-right) ════════════════════════════ */}
      <div style={{ position: 'absolute', top: '35%', right: '17%' }}>
        <CharacterButton
          src="https://raw.githubusercontent.com/jaredgg17/audio/main/Sebastian_LS_render_1.webp"
          alt="Sebastián el cangrejo"
          label="Lugar"
          glowColor="#FF6B6B"
          delay={0.8}
          amplitude={10}
          rotate={-3}
          imgSize="clamp(120px, 20vw, 105px)"
          onClick={() => onCharacterTap('sebastian')}
          onBubbleBurst={handleBubbleBurst}
        />
      </div>

      {/* ══ COFRE / CACHIVACHES  (bottom-left) ═══════════════ */}
      <div style={{ position: 'absolute', top: '52%', left: '14%'}}>
        <CharacterButton
          src="https://raw.githubusercontent.com/jaredgg17/audio/main/ChatGPT_Image_11_may_2026__05_47_20_p.m.-removebg-preview.png"
          alt="Cofre de tesoros de Ariel"
          label="Regalos"
          glowColor="#FFD700"
          delay={1.2}
          amplitude={10}
          rotate={2}
          imgSize="clamp(120px, 22vw, 115px)"
          onClick={() => onCharacterTap('chest')}
          onBubbleBurst={handleBubbleBurst}
        />
      </div>

      {/* ══ SEAWEED + SANDY BOTTOM ════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-around',
          padding: '0 0px',
        }}
      >
        {/* Sandy / murky bottom gradient */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            background:
              'linear-gradient(to top, rgba(8, 50, 38, 0.85), transparent)',
          }}
        />

        {/* Seaweed plants */}
        {[
          { color: '#0d7a58', h: 95,  d: 0    },
          { color: '#0a5e3f', h: 72,  d: 0.25 },
          { color: '#0f8060', h: 88,  d: 0.5  },
          { color: '#0d7a58', h: 62,  d: 0.1  },
          { color: '#147a4a', h: 100, d: 0.7  },
          { color: '#0a5e3f', h: 78,  d: 0.35 },
          { color: '#0f8060', h: 84,  d: 0.6  },
          { color: '#0d7a58', h: 66,  d: 0.2  },
          { color: '#0a5e3f', h: 92,  d: 0.45 },
        ].map((s, i) => (
          <Seaweed key={i} color={s.color} height={s.h} swayDelay={s.d} />
        ))}

        {/* ══ CORAL DECORATIONS ════════════════════════════════
         *
         *  Reemplaza los emojis por imágenes propias.
         *
         *  Pasos:
         *    1. Importa tu PNG al inicio del archivo:
         *         import Coral1PNG from '../assets/Coral1_PNG.png'
         *         import Coral2PNG from '../assets/Coral2_PNG.png'
         *         import Coral3PNG from '../assets/Coral3_PNG.png'
         *
         *    2. Pasa el import como prop `src`:
         *         <CoralPlaceholder src={Coral1PNG} … />
         *
         *  Mientras no tengas la imagen, se muestra un recuadro
         *  punteado como guía visual.
         * ════════════════════════════════════════════════════ */}
        <span style={{ position: 'absolute', bottom: 6, left: '14%' }}>
          {/*
           * ─── IMAGEN: Coral izquierdo ─────────────────────────
           * import Coral1PNG from '../assets/Coral1_PNG.png'
           * <CoralPlaceholder src={Coral1PNG} alt="Coral 1" width={36} height={36} />
           * ─────────────────────────────────────────────────────
           */}
         
        </span>

        <span style={{ position: 'absolute', bottom: 4, left: '38%' }}>
          {/*
           * ─── IMAGEN: Coral centro ────────────────────────────
           * import Coral2PNG from '../assets/Coral2_PNG.png'
           * <CoralPlaceholder src={Coral2PNG} alt="Coral 2" width={28} height={28} />
           * ─────────────────────────────────────────────────────
           */}
          
        </span>

        <span style={{ position: 'absolute', bottom: 6, right: '18%' }}>
          {/*
           * ─── IMAGEN: Coral derecho ───────────────────────────
           * import Coral3PNG from '../assets/Coral3_PNG.png'
           * <CoralPlaceholder src={Coral3PNG} alt="Coral 3" width={32} height={32} />
           * ─────────────────────────────────────────────────────
           */}
        
        </span>
      </div>

      {/* ══ BOTTOM WATERMARK ══════════════════════════════════ */}
      <p
        className="font-display absolute bottom-7 left-0 right-0 text-center"
        style={{ fontSize: 9, letterSpacing: '0.22em', color: 'rgba(144, 224, 239, 0.28)' }}
      >
        ∼ Creado por <a href="https://www.instagram.com/21studio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300 font-bold">21 STUDIO</a> ● todos los derechos reservados ∼
      </p>
    </div>
  )
}