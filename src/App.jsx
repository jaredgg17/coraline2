/**
 * App.jsx
 * Root component. Holds modal state and wires characters → modals.
 *
 * ┌──────────────────────────────────────┐
 * │  HOW TO CUSTOMIZE                    │
 * │  1. Edit PARTY_INFO below            │
 * │  2. Replace placehold.co URLs in     │
 * │     Hero.jsx with your PNG imports   │
 * │  3. Run: npm install && npm run dev  │
 * └──────────────────────────────────────┘
 */
import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import BubbleBackground from './components/BubbleBackground'
import Hero from './components/Hero'
import InfoModal from './components/InfoModal'
import SplashScreen from './components/SplashScreen'

/* ──────────────────────────────────────────────────────────
   PARTY INFO  ← Edita aquí todos los datos del evento
────────────────────────────────────────────────────────── */
const PARTY_INFO = {
  childName: 'Coraline',
  age: '2',
  date: 'Sábado, 25 de Julio 2026',
  time: '14:30 PM ',
  location: 'Ursulo galván\nDiaz ordaz, 96620\nAgua dulce, Ver.',
  mapsUrl: 'https://maps.app.goo.gl/KMBCDMzDVHxY8LpF9?g_st=ac',
  whatsapp: '9212053558',                  // ← número sin + ni espacios
  whatsappMsg: '¡Hola! Confirmo mi asistencia al cumpleaños de Coraline 🎉',
  dress: '¡No olvides traer tu traje de baño y toalla!\n¡Temática "La sirenita"!',
  gifts: 'Lo que salga de tu corazón 🩷\n\n¡Tu presencia es el mejor regalo!',
}

/* ──────────────────────────────────────────────────────────
   MODAL DEFINITIONS (one per interactive character)
────────────────────────────────────────────────────────── */
function DateContent({ info }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p
        className="font-body"
        style={{ color: '#90E0EF', fontSize: 20, fontWeight: 300, letterSpacing: '0.04em' }}
      >
        {info.date}
      </p>
      <p
        className="font-body"
        style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginTop: 8 }}
      >
        {info.time}
      </p>
      <p style={{ color: 'rgba(255, 215, 0, 0.7)', fontSize: 13, marginTop: 10 }}>
         ¡No faltes! 
      </p>
    </div>
  )
}

function LocationContent({ info }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p className="font-body" style={{ color: '#90E0EF', fontSize: 18, fontWeight: 300 }}>
        {info.location.split('\n')[0]}
      </p>
      <p className="font-body" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 6 }}>
        {info.location.split('\n').slice(1).join('\n')}
      </p>
      <a
        href={info.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          marginTop: 18,
          padding: '10px 22px',
          background: 'rgba(0, 180, 216, 0.18)',
          border: '1px solid rgba(0, 230, 255, 0.4)',
          borderRadius: 20,
          color: '#90E0EF',
          textDecoration: 'none',
          fontSize: 14,
          fontFamily: '"Cormorant Garamond", serif',
          letterSpacing: '0.05em',
        }}
      >
        📍 Abrir en Google Maps
      </a>
    </div>
  )
}

function GiftsContent({ info }) {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Dress code */}
      <p
        style={{
          color: '#D4A4FF',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        ¡Importante!
      </p>
      <p className="font-body" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15 }}>
        {info.dress.split('\n').map((line, i) => (
          <span key={i}>
            {line}
            {i < info.dress.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>

      {/* Divider */}
      <div
        style={{
          height: 1,
          margin: '16px 0',
          background: 'linear-gradient(90deg, transparent, rgba(212, 164, 255, 0.3), transparent)',
        }}
      />

      {/* Gift list */}
      <p
        style={{
          color: '#FFD700',
          fontSize: 11,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Lista de Regalos
      </p>
      <p className="font-body" style={{ color: 'rgba(255,255,255,0.78)', fontSize: 15 }}>
        {info.gifts.split('\n').map((line, i) => (
          <span key={i}>
            {line || <br />}
            {i < info.gifts.split('\n').length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  )
}

const MODAL_CONFIG = {
  flounder: { title: 'Fecha y Hora',          icon: '', Content: DateContent     },
  sebastian: { title: '¡Dónde Celebramos!',   icon: '', Content: LocationContent },
  chest:     { title: 'Regalos y Vestimenta', icon: '', Content: GiftsContent    },
}

/* ──────────────────────────────────────────────────────────
   APP
────────────────────────────────────────────────────────── */
const AUDIO_URL =
  'https://raw.githubusercontent.com/jaredgg17/audio/main/Bajo%20el%20mar%20%20La%20Sirenita.mp3'

export default function App() {
  const [activeModal, setActiveModal] = useState(null)
  const [showSplash, setShowSplash]   = useState(true)
  const audioRef = useRef(null)

  const handleEnter = () => {
    audioRef.current?.play()
    setShowSplash(false)
  }

  const modal = activeModal ? MODAL_CONFIG[activeModal] : null

  return (
    /* Ocean gradient background — the entire viewport */
    <div
      style={{
        width: '100%',
        height: '100dvh',      // dynamic viewport height (handles mobile browser chrome)
        overflow: 'hidden',
        position: 'relative',
        background:
          'linear-gradient(180deg, #020b18 0%, #051830 12%, #0a2e52 32%, #0d4d6e 54%, #0d6e7a 74%, #0a5e68 100%)',
      }}
    >
      {/* Audio de fondo */}
      <audio ref={audioRef} src={AUDIO_URL} loop preload="auto" />

      {/* Pantalla de bienvenida — se muestra al abrir y desaparece al tocar */}
      <AnimatePresence>
        {showSplash && <SplashScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {/* Animated bubbles + light rays */}
      <BubbleBackground />

      {/* All characters and title text */}
      <Hero info={PARTY_INFO} onCharacterTap={setActiveModal} />

      {/* Information modals — AnimatePresence handles enter/exit */}
      <InfoModal
        isOpen={!!modal}
        onClose={() => setActiveModal(null)}
        title={modal?.title ?? ''}
        icon={modal?.icon ?? ''}
      >
        {modal && <modal.Content info={PARTY_INFO} />}
      </InfoModal>
    </div>
  )
}
