/**
 * InfoModal.jsx
 * A glassmorphism modal that reveals party information when a
 * character is tapped. Uses Framer Motion AnimatePresence for
 * smooth spring-based enter / exit animations.
 *
 * Props:
 *  isOpen    – boolean
 *  onClose   – callback to close the modal
 *  title     – modal heading string
 *  iconSrc   – ruta a tu imagen PNG/WebP personalizada (reemplaza el emoji)
 *  iconAlt   – texto alternativo para la imagen (accesibilidad)
 *  children  – modal body content (JSX)
 *
 * ─── CÓMO USAR iconSrc ──────────────────────────────────
 *  1. Importa tu imagen en el archivo padre (p. ej. App.jsx):
 *       import ArielIcon   from './assets/Ariel_icon.png'
 *       import FlounderIcon from './assets/Flounder_icon.png'
 *       import SebastianIcon from './assets/Sebastian_icon.png'
 *       import CofreeIcon  from './assets/Cofre_icon.png'
 *
 *  2. Pásala como prop al abrir el modal:
 *       <InfoModal iconSrc={ArielIcon} iconAlt="Ariel" … />
 *
 *  Mientras no tengas la imagen, se muestra un recuadro
 *  punteado como guía visual.
 * ─────────────────────────────────────────────────────────
 */
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Decorative shimmer divider ───────────────────────── */
function Divider() {
  return (
    <div
      style={{
        height: 1,
        margin: '16px 0',
        background:
          'linear-gradient(90deg, transparent, rgba(0, 230, 255, 0.45), transparent)',
      }}
    />
  )
}

/* ─── Icon / Placeholder ────────────────────────────────── */
function ModalIcon({ src, alt }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: 80,
          height: 80,
          objectFit: 'contain',
          display: 'block',
          margin: '0 auto',
          filter: 'drop-shadow(0 0 12px rgba(0, 200, 255, 0.45))',
        }}
      />
    )
  }

  /* ── Placeholder visible mientras no hay imagen ── */
  return (
    <div
      title={`Imagen: ${alt || 'ícono del personaje'}`}
      style={{
        width: 80,
        height: 80,
        margin: '0 auto',
        borderRadius: 16,
        border: '2px dashed rgba(144, 224, 239, 0.38)',
        background: 'rgba(0, 150, 180, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <span style={{ fontSize: 22, opacity: 0.45 }}>🖼</span>
      <span
        style={{
          fontSize: 8,
          color: 'rgba(144, 224, 239, 0.5)',
          fontFamily: 'monospace',
          letterSpacing: '0.04em',
          textAlign: 'center',
          lineHeight: 1.3,
          padding: '0 6px',
        }}
      >
        {alt || 'iconSrc'}
      </span>
    </div>
  )
}

/* ─── Component ──────────────────────────────────────────── */
export default function InfoModal({ isOpen, onClose, title, iconSrc, iconAlt, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ── */
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(2, 8, 20, 0.78)', backdropFilter: 'blur(5px)' }}
        >
          {/* ── Modal card ── */}
          <motion.div
            key="modal"
            initial={{ scale: 0.65, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.65, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.9 }}
            onClick={e => e.stopPropagation()}
            className="glass relative rounded-3xl w-[88%] max-w-xs"
            style={{ padding: '36px 28px 28px' }}
          >
            {/* Top shimmer border accent */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '18%',
                right: '18%',
                height: 2,
                background:
                  'linear-gradient(90deg, transparent, rgba(0, 230, 255, 0.9), transparent)',
                borderRadius: 2,
              }}
            />

            {/* Character icon — imagen personalizada o placeholder */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
              style={{ marginBottom: 12 }}
            >
              <ModalIcon src={"https://raw.githubusercontent.com/jaredgg17/audio/main/IMG-20260508-WA0031-removebg-preview.png"} alt={iconAlt} />
            </motion.div>

            {/* Title */}
            <h2
              className="shimmer-ocean font-display"
              style={{
                textAlign: 'center',
                fontSize: 15,
                letterSpacing: '0.06em',
                marginBottom: 4,
              }}
            >
              {title}
            </h2>

            <Divider />

            {/* Slot for caller-provided content */}
            <div className="font-body" style={{ color: 'rgba(255,255,255,0.88)' }}>
              {children}
            </div>

            <Divider />

            {/* Close button */}
            <button
              onClick={onClose}
              className="font-display w-full"
              style={{
                padding: '10px 0',
                background: 'rgba(0, 180, 216, 0.14)',
                border: '1px solid rgba(0, 230, 255, 0.32)',
                borderRadius: 14,
                color: 'rgba(144, 224, 239, 0.9)',
                cursor: 'pointer',
                fontSize: 12,
                letterSpacing: '0.14em',
              }}
            >
              ✦ Cerrar ✦
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}