import { motion } from 'framer-motion'

const BUBBLES = [
  { size: 8,  left: '10%', delay: 0,   duration: 4   },
  { size: 12, left: '25%', delay: 1.5, duration: 5   },
  { size: 6,  left: '60%', delay: 0.8, duration: 3.5 },
  { size: 10, left: '80%', delay: 2.2, duration: 4.5 },
  { size: 7,  left: '45%', delay: 3,   duration: 5.5 },
]

export default function SplashScreen({ onEnter }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
      onClick={onEnter}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background:
          'linear-gradient(180deg, #020b18 0%, #051830 12%, #0a2e52 32%, #0d4d6e 54%, #0d6e7a 74%, #0a5e68 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Burbujas decorativas */}
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className="animate-rise"
          style={{
            position: 'absolute',
            bottom: -20,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: 'rgba(144, 224, 239, 0.25)',
            border: '1px solid rgba(144, 224, 239, 0.4)',
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}

      {/* Tarjeta principal clicable */}
      <div
        className="glass"
        style={{
          width: 'min(300px, 85vw)',
          height: 'min(420px, 72dvh)',
          borderRadius: 0,
          border: '0px solid rgba(0, 230, 255, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow:
            '0 0 40px rgba(0, 200, 255, 0.15), inset 0 0 30px rgba(0, 100, 180, 0.1)',
        }}
      >
        {/* Imagen de portada */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 72,
            overflow: 'hidden',
          }}
        >
          <img
            src="https://raw.githubusercontent.com/jaredgg17/audio/main/WhatsApp%20Image%202026-06-23%20at%2000.40.47.jpeg"
            alt="Coraline"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Texto de acción */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <p
            className="font-display animate-tap-hint"
            style={{
              color: '#90E0EF',
              fontSize: 15,
              letterSpacing: '0.08em',
              marginBottom: 4,
            }}
          >
            ✦ Toca para entrar ✦
          </p>
        </div>
      </div>

      {/* Pista musical */}
      <p
        className="font-body"
        style={{
          color: 'rgba(144, 224, 239, 0.5)',
          fontSize: 'clamp(14px, 4vw, 20px)',
          fontStyle: 'italic',
          marginTop: 16,
          letterSpacing: '0.06em',
          textAlign: 'center',
          padding: '0 12px',
        }}
      >
        !Preparate para sumergirte en la aventura!
      </p>
    </motion.div>
  )
}
